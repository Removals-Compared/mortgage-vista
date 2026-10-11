import "server-only";
import { neon, types, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Server-side Neon Postgres access (HTTP driver, so there is no connection
 * pool to exhaust on serverless). Never import this into client components.
 *
 * Storage is optional: `getDb()` returns `null` when DATABASE_URL is missing
 * and callers carry on with email-only delivery.
 *
 * Type parsers: bigint/numeric -> number, date -> "YYYY-MM-DD",
 * timestamptz -> ISO string.
 */
const parsers: Record<number, (v: string) => unknown> = {
  20: (v) => Number(v), // int8
  1700: (v) => Number(v), // numeric
  1082: (v) => v, // date stays a plain string
  1184: (v) => new Date(v).toISOString(), // timestamptz
};
const typeConfig = {
  getTypeParser: (oid: number, fmt?: unknown) =>
    parsers[oid] ??
    (types.getTypeParser as (o: number, f?: unknown) => unknown)(oid, fmt),
};

type Row = Record<string, unknown>;
export type Db = {
  query: <T = Row>(text: string, params?: unknown[]) => Promise<T[]>;
};

let cached: Db | null | undefined;

export function getDb(): Db | null {
  if (cached !== undefined) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("[db] DATABASE_URL not set, storage disabled.");
    cached = null;
    return cached;
  }
  const sql: NeonQueryFunction<false, false> = neon(url);
  cached = {
    query: async <T = Row>(text: string, params: unknown[] = []) =>
      (await sql.query(text, params, {
        types: typeConfig,
      } as never)) as unknown as T[],
  };
  return cached;
}

const COL = /^[a-z_][a-z0-9_]*$/;

/** INSERT one row from a plain object; returns the new id. jsonb values must
 *  be passed as JSON strings (the driver would otherwise send arrays/objects
 *  as Postgres arrays). */
export async function insertRow(
  db: Db,
  table: "enquiries" | "newsletter_subscribers" | "calculator_leads",
  payload: Record<string, unknown>,
  opts?: { onConflictDoNothing?: boolean },
): Promise<string | null> {
  const keys = Object.keys(payload);
  keys.forEach((k) => {
    if (!COL.test(k)) throw new Error(`bad column ${k}`);
  });
  const rows = await db.query<{ id: string }>(
    `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")})${
      opts?.onConflictDoNothing ? " ON CONFLICT DO NOTHING" : ""
    } RETURNING id`,
    keys.map((k) => payload[k]),
  );
  return rows[0]?.id ?? null;
}
