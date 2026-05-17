import { z } from "zod";

const ukPhoneRegex = /^(?:\+?44|0)\s?\d{3,4}\s?\d{3}\s?\d{3,4}$/;

export const contactSchema = z.object({
  enquiryType: z.enum([
    "first-time-buyer",
    "remortgage",
    "buy-to-let",
    "self-employed",
    "bad-credit",
    "commercial",
    "equity-release",
    "general",
  ]),
  firstName: z.string().min(2, "Please enter your first name"),
  lastName: z.string().min(2, "Please enter your surname"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(ukPhoneRegex, "Enter a valid UK phone number")
    .optional()
    .or(z.literal("")),
  postcode: z
    .string()
    .min(2, "Postcode required")
    .max(10, "Postcode looks too long"),
  propertyValue: z.coerce.number().min(0).optional(),
  loanRequired: z.coerce.number().min(0).optional(),
  notes: z.string().max(2000).optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please accept the privacy notice to continue",
  }),
  // honeypot field. Must be empty.
  website: z.string().max(0).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const quickQuoteSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(ukPhoneRegex, "Enter a valid UK phone number")
    .optional()
    .or(z.literal("")),
  enquiry: z.string().min(10, "Tell us a little about what you need"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please accept the privacy notice",
  }),
  website: z.string().max(0).optional(),
});

export type QuickQuoteValues = z.infer<typeof quickQuoteSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  website: z.string().max(0).optional(),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const calculatorEmailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  resultsType: z.enum(["repayment", "affordability", "stamp-duty"]),
  payload: z.record(z.string(), z.unknown()),
  website: z.string().max(0).optional(),
});

export type CalculatorEmailValues = z.infer<typeof calculatorEmailSchema>;
