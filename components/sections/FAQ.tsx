import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { Container, Section } from "@/components/ui/Container";

export type FAQItem = { q: string; a: string };

const homepageFaqs: FAQItem[] = [
  {
    q: "How much deposit do I need to buy a house in the UK?",
    a: "Most lenders want at least a 5% deposit. With 10% you'll see materially better rates, and at 15–25% you reach the deals reserved for lower-LTV borrowers. First-time buyer schemes can sometimes get you in with less; ask us about what's currently available where you're buying.",
  },
  {
    q: "Should I go to my bank or use a mortgage broker?",
    a: "Your bank can only offer you their own products. A whole-of-market broker compares 90+ lenders, many of whom you can't access directly, including building societies that handle complex incomes, contractor pay, or recent credit issues. In most cases the broker route is materially cheaper across the term.",
  },
  {
    q: "How long does it take to get a mortgage?",
    a: "A decision in principle typically takes 24–48 hours once we have your documents. The full mortgage offer takes between 2 and 6 weeks depending on the lender, valuation type, and property complexity. We'll give you a realistic timeline at the consultation.",
  },
  {
    q: "Do you charge a broker fee?",
    a: "Initial consultations are always free. If you decide to use us we may charge an arrangement fee, which we'll confirm in writing before any work begins. We're paid a procuration fee by the lender on completion, and this is disclosed transparently.",
  },
  {
    q: "Can I get a mortgage if I'm self-employed?",
    a: "Yes. We have lenders that accept one year of accounts (some accept day-rate contractor income with a current contract only). The key is presenting your income correctly. We'll tell you which lenders fit your profile before you apply, so you don't waste a credit search.",
  },
  {
    q: "What's the difference between a fixed and tracker mortgage?",
    a: "A fix locks in your rate for a set period (typically 2, 3, 5, or 10 years), so you know exactly what you'll pay each month. A tracker moves up and down with the Bank of England base rate. Fixes give certainty. Trackers give flexibility and can be cheaper if rates fall. We'll model both for your situation.",
  },
  {
    q: "What credit history do I need?",
    a: "Lenders look at the full picture, not just a credit score. A clean record helps, but defaults, CCJs, late payments, even past bankruptcy don't necessarily rule you out. They just narrow which lenders will say yes. Specialist lenders consider context and time elapsed.",
  },
  {
    q: "How much can I borrow?",
    a: "Most high-street lenders cap borrowing at around 4.5x combined income, but the real figure depends on outgoings, credit, dependants, and the deposit. Use our affordability calculator for an indicative figure, then book a free consultation for a definitive answer.",
  },
];

export function FAQ({
  title = "Frequently asked questions",
  items = homepageFaqs,
  bg = "surface",
}: {
  title?: string;
  items?: FAQItem[];
  bg?: "white" | "surface";
}) {
  return (
    <Section bg={bg}>
      <Container className="max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            FAQs
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            {title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
