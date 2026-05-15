import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  bg = "white",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  bg?: "white" | "surface" | "black" | "gold";
  id?: string;
}) {
  const bgs = {
    white: "bg-white",
    surface: "bg-brand-surface",
    black: "bg-brand-black text-white",
    gold: "bg-brand-gold text-brand-black",
  };
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", bgs[bg], className)}
    >
      {children}
    </section>
  );
}
