export type ServiceContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  // 800+ words of long-form Markdown content. Use ## and ### headings,
  // bullet lists, and short paragraphs.
  body: string;
  eligibility: string[];
  process: { step: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedPostSlugs: [string, string];
  showsCalculator: "repayment" | "affordability" | "stamp-duty";
  // Optional extra warning paragraph (use for equity-release only)
  extraWarning?: string;
};

export const serviceContent: Record<string, ServiceContent> = {
  "first-time-buyer-mortgages": {
    slug: "first-time-buyer-mortgages",
    title: "First-Time Buyer Mortgages",
    metaTitle: "First-Time Buyer Mortgages UK | Mortgage Vista",
    metaDescription:
      "Whole-of-market first-time buyer mortgage advice. 5% deposit options, AIP in 24 hours, SDLT relief explained. Speak to a UK adviser today.",
    hero: {
      eyebrow: "First-time buyers",
      heading: "Buy your first home with the right mortgage, not just the first one offered",
      subheading:
        "We compare lenders across the whole UK market, handle the paperwork, and walk you through every step from Agreement in Principle (AIP) to completion.",
    },
    body: `## What a first-time buyer mortgage actually is

A first-time buyer mortgage is a residential mortgage given to someone who's never owned a property before (anywhere in the world, freehold or leasehold). The product itself is no different from a standard residential mortgage. What changes is the lender criteria you fit, the deposit schemes you qualify for, and the Stamp Duty Land Tax (SDLT) relief available to you.

Lenders treat first-time buyers slightly differently from movers because there's no existing property to sell, no chain to manage, and usually less of a deposit. That can work in your favour. Most high-street lenders ringfence specific products for first-time buyers, and the Government continues to back schemes that let you borrow more against a smaller deposit.

## Deposits: how much you actually need

The headline minimum across the UK is 5% of the purchase price. In practice, the rate you get on a 95% Loan to Value (LTV) mortgage is meaningfully more expensive than at 90%, and 90% costs more than 85%. As a rough guide using current market pricing:

- 95% LTV: rates broadly 4.85%–5.30% on a 5-year fix
- 90% LTV: rates broadly 4.40%–4.75%
- 85% LTV: rates broadly 4.15%–4.45%
- 75% LTV or lower: best of the market, often below 4.10% on a 5-year fix

So if you can stretch from a 5% to a 10% deposit, the monthly saving over a five-year fix can easily run to £80–£150 per month on a £200,000 loan. Whether that's worth waiting for depends on house-price movement in your area and how much rent you'd pay in the meantime.

You'll also need cash for SDLT (where applicable), legal fees (£1,200–£2,000 typically), a survey (£400–£900) and moving costs.

## Stamp Duty for first-time buyers in England and Northern Ireland

Since 1 April 2025 the SDLT thresholds are tighter than they were in 2024. First-time buyer relief now applies as follows:

- 0% on the first £300,000
- 5% between £300,001 and £500,000
- No first-time buyer relief at all if the property costs more than £500,000. Standard rates kick in from £125,000

That cliff-edge at £500,000 catches a lot of London and South East buyers out. If you're buying at £505,000 you suddenly owe £15,000 in SDLT instead of £10,250. Worth asking whether the seller will negotiate to keep you under £500,000.

Scotland (LBTT) and Wales (LTT) operate separate regimes. Your adviser will calculate the exact figure for the country you're buying in.

## How much you can actually borrow

Most lenders cap borrowing at around 4.5 times your gross annual income, with some going to 5x or even 5.5x for higher earners or specific professional schemes (medics, lawyers, teachers). A combined household income of £60,000 typically supports a mortgage of around £270,000, but criteria vary widely:

- Lender A might lend you £270,000 and ignore your student loan
- Lender B might offer £245,000 because it deducts a notional amount for the loan
- Lender C might offer £290,000 because it uses your bonus in full

This is exactly why working with a broker matters more than going direct to your bank. We see all the criteria; you'd otherwise be checking each lender one at a time.

## Documents to have ready

Before your first call, gather:

- Last 3 months' payslips (last 2 years' SA302s if self-employed)
- Last 3 months' personal bank statements
- Photo ID (passport or driving licence)
- Proof of address (utility bill or council tax bill within 3 months)
- Proof of deposit (savings statements, gift letter if family-funded)
- P60 from your most recent tax year

If any of your deposit is gifted, the lender will need a signed letter from the giver confirming it's a gift, not a loan, and that they have no claim on the property.

## Repayment vs interest-only

For a first home, almost everyone goes capital and interest (repayment). Each monthly payment chips away at both the interest and the loan balance. By the end of the term (usually 25 to 35 years) the loan is paid off and the home is yours outright.

Interest-only is rare on a first residential mortgage and almost always requires a separate, demonstrable repayment vehicle: an investment portfolio, a second property to sell, a large pension lump sum. For a typical first-time buyer it isn't an option. That's no bad thing. Repayment is the safer structure when you're building equity for the first time.

The other choice is term length. A 35-year term has lower monthly payments but more total interest paid; a 25-year term costs less overall but is harder to afford month to month. A sensible compromise for many first-time buyers is to take the longer term for affordability headroom, then overpay (most lenders allow 10% per year without penalty) to shorten the effective life of the loan.

## When a first-time buyer mortgage isn't the right move

Honest answer: don't buy if your job is at genuine risk in the next 6 months, if you're planning to relocate within 2 years, or if your deposit would leave you with no emergency fund at all. The transaction costs of buying and selling within 18 months will usually wipe out any equity gain.

We'd rather have a 20-minute call telling you to wait six months than push you into a mortgage you'll regret.`,
    eligibility: [
      "You have never owned a residential property before, in the UK or abroad (sole or joint)",
      "Minimum deposit of 5% of the purchase price, usually from savings, a gift, or a Lifetime ISA",
      "Aged 18 or over with at least 3 months in your current role (or 12 months self-employment)",
      "UK residency and right to reside; non-UK nationals on a visa can still qualify with the right lender",
      "Clean or near-clean credit file. Minor missed payments are workable, recent CCJs need specialist lenders",
      "Property is your main home, in the UK, and within mainstream construction types (no concrete homes for some lenders)",
      "Agreement in Principle (AIP) typically valid for 30–90 days, depending on the lender",
    ],
    process: [
      {
        step: "Initial fact-find call",
        body: "A 20-minute conversation by phone or video. We confirm your income, deposit, target purchase price and any credit issues, then tell you straight away what's realistic and which lenders fit.",
      },
      {
        step: "Agreement in Principle (AIP)",
        body: "We submit a soft credit-search AIP to a lender that fits your profile. You usually have it within 24 hours and can use it to make offers on properties.",
      },
      {
        step: "Property offer accepted",
        body: "Once you've had an offer accepted, we move to the full mortgage application. We package your documents, submit to the lender, and instruct the valuation.",
      },
      {
        step: "Mortgage offer issued",
        body: "Typical turnaround is 2–4 weeks from full application to formal mortgage offer. We chase the lender so you don't have to.",
      },
      {
        step: "Exchange and completion",
        body: "Your solicitor handles the legal side. We stay in touch through to completion day and book a diary note to review your rate before the fix expires.",
      },
    ],
    faqs: [
      {
        q: "Can I get a mortgage with a 5% deposit?",
        a: "Yes. Several high-street lenders and the Mortgage Guarantee Scheme support 95% LTV lending for first-time buyers. The rate is higher than at 90% LTV, but it gets you on the ladder sooner.",
      },
      {
        q: "Do I qualify as a first-time buyer if I've inherited a property?",
        a: "Usually no. If your name has ever been on the title deeds of a residential property (including an inheritance), most lenders won't classify you as a first-time buyer for SDLT relief or product purposes. There are a small number of exceptions. We'll check your specific situation.",
      },
      {
        q: "How long does the whole process take?",
        a: "From AIP to completion, expect 8–14 weeks for a typical purchase. Faster if there's no chain and the lender's service levels are good; longer for new-build or leasehold flats where freeholder packs are slow.",
      },
      {
        q: "What's a Lifetime ISA and should I use one for my deposit?",
        a: "A Lifetime ISA (LISA) lets you save up to £4,000 a year and the Government adds a 25% bonus, so up to £1,000 free per year. You can use it towards a first home up to £450,000. Above that price, you'd pay a withdrawal penalty. For most first-time buyers it's the best deposit-saving vehicle available.",
      },
      {
        q: "Will the bank lend more if I apply with a partner?",
        a: "Usually yes. Joint income normally supports a larger loan. Some lenders also allow joint borrower, sole proprietor (JBSP) arrangements where, for example, a parent's income supports the affordability but the property is in your name only.",
      },
      {
        q: "What credit score do I need?",
        a: "Lenders don't use a single credit-score cut-off. They look at your file: missed payments, defaults, CCJs, and how recent they are. A clean file with active credit (a credit card you pay off in full each month) usually scores well. We'll check your file before we apply, so you don't waste a hard search on a lender that won't accept you.",
      },
      {
        q: "Should I fix for 2 or 5 years?",
        a: "It depends on your view of where rates go next, your job stability, and whether you might move within 5 years. With the base rate at 3.75% and lenders pricing 5-year fixes around 4.12%, the market is broadly betting rates fall slightly. We'll talk you through the trade-off. There's no universally right answer.",
      },
    ],
    relatedPostSlugs: ["first-time-buyer-complete-guide", "fix-2-or-5-years"],
    showsCalculator: "affordability",
  },

  remortgages: {
    slug: "remortgages",
    title: "Remortgages",
    metaTitle: "Remortgage Deals UK | Whole-of-Market | Mortgage Vista",
    metaDescription:
      "Switch lender or product before your fix ends. We compare the whole UK market, handle the legal side, and aim to save you thousands over your next term.",
    hero: {
      eyebrow: "Remortgages",
      heading: "Don't drift onto your lender's standard variable rate. Switch before the fix ends",
      subheading:
        "Most homeowners overpay by hundreds a month when their fixed rate expires. We start the remortgage process up to 6 months early, lock a rate, and switch you on the day your current deal ends.",
    },
    body: `## Why remortgaging matters more than ever

When a fixed-rate mortgage ends, you don't get a polite reminder asking what you'd like to do next. You get rolled onto the lender's Standard Variable Rate (SVR), which sits between 7% and 8.5% across the high street. That's roughly double a typical 5-year fix at current pricing. On a £200,000 mortgage with 20 years remaining, the gap is around £400 a month. Multiply that by even three months of inertia and you've handed the lender £1,200 you didn't need to.

The fix is straightforward: shop the market 5 to 6 months before your current deal ends, secure a new rate, and your remortgage completes the day after the old one finishes.

## When to start the process

You can typically lock in a new rate up to 6 months before your existing fix ends. Lenders honour the rate even if pricing moves against you in that window. If pricing improves before completion, a good broker re-runs the search and switches you to the cheaper product. Most lenders allow this once before the new mortgage starts.

A sensible timeline:

- 6 months before fix end: review your current deal, get an indicative quote
- 4–5 months before: full application submitted, valuation booked
- 2–3 months before: mortgage offer issued
- Day after current fix ends: new mortgage starts, no SVR period

## Product transfer vs remortgage to a new lender

Your existing lender will offer you a "product transfer": a new rate with them, no affordability check, no legal work. It's the path of least resistance.

A product transfer makes sense when:

- The rate offered is genuinely competitive (compare it against the broader market)
- Your circumstances have changed in a way that would fail a fresh affordability check (e.g. a recent income drop)
- You only have a few years left on the mortgage and the fees of switching outweigh the savings

A full remortgage to a new lender makes sense when:

- The market rate is materially better than your current lender's transfer rate
- You want to release equity from the property
- You want to extend or shorten the term
- You want to add or remove a borrower

We'll model both options before you commit, with all fees included.

## Releasing equity through a remortgage

If your home has gone up in value, your LTV has fallen, which usually means a better rate available to you. You can also borrow more against the new lower LTV, releasing cash for home improvements, debt consolidation, or a deposit on a second property.

A worked example: you bought at £300,000 with a £240,000 mortgage (80% LTV). Five years on, the property is worth £360,000 and your balance has dropped to £215,000. Your LTV is now around 60%. Borrowing an extra £40,000 takes you to £255,000 (about 71% LTV). Still well-priced, and you've extracted £40,000 in cash.

Be careful with debt consolidation: you'd be moving short-term, expensive debt (credit cards, car finance) onto a long-term, secured loan. The monthly payment falls, but the total interest paid usually rises. We'll do the maths so you know the real cost.

## Early Repayment Charges (ERCs)

Most fixed-rate mortgages charge an Early Repayment Charge if you redeem during the fixed term. Typical structures:

- 2-year fix: 2% of the balance in year 1, 1% in year 2
- 5-year fix: 5%, 4%, 3%, 2%, 1% sliding scale

If your ERC would be £4,000 and the saving from switching early is only £2,500 over the remaining fix, stay put. If your ERC is £1,000 but you'll save £6,000 over the next two years, switch early. Always do the maths.

## Costs to expect

A typical remortgage to a new lender involves:

- Lender arrangement fee: £0–£1,500 (often optional, fee-free deals exist at slightly higher rates)
- Valuation: usually free on remortgage (the lender pays)
- Legal work: usually free on remortgage (the lender's panel solicitor handles it)
- Broker fee: varies; we explain ours upfront

If you stay with your existing lender on a product transfer, the only typical fee is the lender's product fee. There's no legal work or valuation.

## What we need from you

- Last 3 months' payslips and bank statements
- Most recent mortgage statement and current redemption figure
- Property value estimate (we'll cross-check against valuation comparables)
- Buildings insurance details
- Photo ID and proof of address

If you've changed jobs, gone self-employed, or had a child since your last mortgage, mention it on the first call. Affordability is recalculated from scratch.

## Should you change the term when you remortgage?

Yes, this is one of the underused levers. If your income has grown since you took the original mortgage, shortening the term (say, from 25 years to 18) cuts the total interest paid significantly. Often tens of thousands of pounds, without a huge change in the monthly payment, because the rate at remortgage is often lower than the SVR you'd otherwise be on.

Conversely, if money is tight, extending the term back out to 30 or even 35 years lowers the monthly payment. Be aware: most lenders cap the term so it ends by your expected retirement age (typically 70 or 75), so the room to extend reduces as you get older.

We'll model both directions before you decide.`,
    eligibility: [
      "You typically need to have owned the property for at least 6 months (some lenders require 12)",
      "Your current fix is ending within the next 6 months, or you're already on the SVR",
      "You have a clear picture of your remaining balance and any Early Repayment Charge (ERC)",
      "Your income and outgoings will pass a fresh affordability check (unless you stay with your current lender)",
      "The property is your main residence (BTL remortgages have separate criteria)",
      "Buildings insurance is in place. Lenders won't complete without it",
      "You have a current valuation or recent comparables for the property",
    ],
    process: [
      {
        step: "Free remortgage review",
        body: "We look at your current deal, the ERC if any, your remaining balance, and what the open market is offering. You get a written comparison of staying put vs switching, with all fees included.",
      },
      {
        step: "Lock in a new rate",
        body: "Once you've decided, we submit the application and lock the rate. If pricing improves before completion, we re-run the search and switch you to the better deal where possible.",
      },
      {
        step: "Valuation and underwriting",
        body: "Most remortgages use an automated or desktop valuation, so there's nothing for you to arrange. Underwriting typically completes within 2–3 weeks.",
      },
      {
        step: "Legal work",
        body: "The lender's panel solicitor handles the title transfer and registration. You usually only sign one set of documents and provide ID.",
      },
      {
        step: "Completion on the right day",
        body: "We schedule completion for the day after your current fix ends, so you never spend a day on the SVR.",
      },
    ],
    faqs: [
      {
        q: "How early can I start my remortgage?",
        a: "Most lenders allow you to lock in a new rate up to 6 months before your existing fix ends. You don't pay anything until completion, and the rate is held for you.",
      },
      {
        q: "Will I have to pay an Early Repayment Charge?",
        a: "If you switch before your fixed term ends, yes. Usually 1%–5% of the balance depending on how many years remain. We always model whether the saving from switching beats the ERC. Sometimes it does, often it doesn't.",
      },
      {
        q: "Can I borrow more when I remortgage?",
        a: "Yes. Lenders will reassess your affordability and the property's current value. If both stack up, you can release equity for home improvements, debt consolidation, or a deposit on another property.",
      },
      {
        q: "Do I have to use a solicitor?",
        a: "On most remortgages, the lender's panel solicitor does the legal work for free. You'll need to provide ID and sign documents but won't usually need to instruct your own conveyancer.",
      },
      {
        q: "What's the difference between a product transfer and a remortgage?",
        a: "A product transfer is a new rate with your existing lender. No legal work, no affordability check, fastest route. A remortgage moves the loan to a new lender and usually offers more competitive pricing, but it needs a fresh application.",
      },
      {
        q: "Is it worth remortgaging just to save £30 a month?",
        a: "Probably not, after fees. As a rough rule, the monthly saving needs to cover any product fee within 18–24 months and produce a genuine net benefit over the new fixed term. We'll do the calculation upfront.",
      },
      {
        q: "What happens if I do nothing when my fix ends?",
        a: "You'll roll onto your lender's Standard Variable Rate (SVR), currently 7%–8.5% on the high street. On a £200,000 balance that's roughly £350–£500 a month more than a competitive fix. It's the single most expensive form of inertia in personal finance.",
      },
    ],
    relatedPostSlugs: ["remortgaging-process-step-by-step", "fix-2-or-5-years"],
    showsCalculator: "repayment",
  },

  "buy-to-let-mortgages": {
    slug: "buy-to-let-mortgages",
    title: "Buy-to-Let Mortgages",
    metaTitle: "Buy-to-Let Mortgages UK | Landlord Finance | Mortgage Vista",
    metaDescription:
      "Buy-to-let mortgages for first-time landlords, portfolio landlords and limited company SPVs. Whole-of-market BTL advice with rental stress-test guidance.",
    hero: {
      eyebrow: "Landlords",
      heading: "Buy-to-let mortgages from £75,000 to portfolio scale",
      subheading:
        "From your first rental to a 20-property portfolio held through a limited company SPV, we structure BTL finance that passes the stress test and protects your tax position.",
    },
    body: `## How a buy-to-let mortgage actually works

A buy-to-let (BTL) mortgage is secured against a property you let to tenants rather than live in yourself. Most BTL mortgages are interest-only. You pay only the interest each month, and the original capital is repaid when you eventually sell or refinance. That keeps monthly cashflow strong while the property value (hopefully) grows.

BTL is regulated very differently from residential lending. With a few exceptions (a "consumer BTL" let to a family member), it sits outside FCA mortgage regulation and is treated as a commercial transaction. Lenders get more flexibility on criteria, but you get less consumer protection if things go wrong.

## Deposit and LTV

The standard minimum deposit is 25% of the property value (75% LTV). Some specialist lenders go to 80% LTV at a noticeably higher rate, and a few to 85% in niche circumstances. Below 75% LTV, rates and fees come down meaningfully:

- 75% LTV: most competitive products start around 4.50%–5.10% on a 5-year fix
- 65% LTV: typically 0.20%–0.40% cheaper
- 60% LTV: another 0.10%–0.20% off

There's a meaningful trade-off between rate and arrangement fee. Some lenders price headline rates at 4.30% but charge a 5% arrangement fee. Others offer 5.20% with no fee. The right choice depends on the loan size. Large loans benefit from low rates even with high fees. Small loans usually do better on no-fee products.

## The rental stress test

Every BTL lender will assess whether the rent covers the mortgage with a margin to spare. The standard test is 145% rental cover at a notional rate of 5.5%, but it varies:

- Basic-rate taxpayers: often tested at 125% rental cover
- Higher-rate or additional-rate taxpayers: usually 145% rental cover
- 5-year fixes: stress-tested at the actual product rate, not a notional rate
- Limited company SPV: typically 125% rental cover (no personal income tax to worry about)

A worked example. You're buying a £200,000 BTL with a £150,000 loan. The lender stresses at 145% × 5.5%:

- Notional monthly interest: £150,000 × 5.5% ÷ 12 = £687.50
- Required rent: £687.50 × 145% = £997 a month

If the property only realistically rents for £900, you can't borrow £150,000. You'll need a bigger deposit or a different property. This is why getting an indicative rental valuation before you offer matters more than the lender's house valuation.

## Personal name vs limited company (SPV)

Since the Section 24 tax changes phased in fully from 2020, mortgage interest for individual landlords is no longer a deductible expense. You get a 20% tax credit instead. For higher-rate and additional-rate taxpayers, that hits returns hard.

Holding BTL property in a limited company (a Special Purpose Vehicle, or SPV) avoids Section 24: the company pays Corporation Tax on profits after deducting full mortgage interest. For higher-rate taxpayers buying multiple properties, this is usually more tax-efficient.

It isn't free, though. SPV mortgage rates are 0.30%–0.60% higher than personal-name BTL, you'll pay extra Stamp Duty when transferring existing properties in (treated as a sale), and you need an accountant who understands property companies. We'll talk you through whether SPV is worth it for your specific position. We don't give tax advice, but we know when to send you to someone who does.

## Stamp Duty on a buy-to-let

A BTL is a second property, so it attracts the 5% additional-property surcharge on top of standard SDLT. On a £200,000 BTL in England:

- Standard SDLT (£125,001–£200,000 at 2%): £1,500
- Additional-property surcharge (5% of full price): £10,000
- Total: £11,500

Non-UK residents pay another 2% on top. Plan your cash carefully. SDLT eats into your starting equity.

## Portfolio landlord rules

If you have 4 or more BTL mortgaged properties, most lenders treat you as a "portfolio landlord". You'll need to provide:

- A property schedule listing every BTL you own (address, value, rent, mortgage, lender)
- A business plan or cashflow forecast
- A full asset and liability statement
- Sometimes accountant-prepared portfolio summary

Stress tests are then applied across the whole portfolio, not just the property you're buying. If any of your existing properties are loss-making once stressed, the new application can fail even if the new property looks fine standalone.

## When BTL doesn't make sense

Honest take: in 2026, BTL is harder to make work than it was a decade ago. Higher rates, Section 24, the additional-property surcharge, increased EPC requirements, and tougher tenant legislation have all compressed yields. If you're a higher-rate taxpayer buying a single property in personal name with a 25% deposit, the net yield after costs and tax can easily come in under 3%.

We'll always model the actual cashflow before you commit, including void periods, agent fees (8%–12%), maintenance (typically 1% of property value per year), and tax. Some deals stack up beautifully. Others don't, and we'd rather tell you so before the SDLT cheque clears.`,
    eligibility: [
      "Minimum 25% deposit (75% LTV) for the most competitive products; 20% deposit possible at higher rates",
      "Rental stress test passed: typically 145% cover at 5.5% notional rate (125% for basic-rate taxpayers and SPVs)",
      "Most lenders require minimum personal income of £25,000 a year, even on SPV applications",
      "Aged 21–75 typically; some specialist lenders go to age 85 at end of term",
      "Property is a standard residential let. HMOs, holiday lets and student lets need specialist products",
      "EPC rating of E or above (regulations on minimum C are tightening; check before you buy)",
      "Clean credit file or only minor adverse; specialist BTL lenders cover heavier credit issues at higher rates",
      "First-time landlords accepted by many lenders; first-time buyer + first-time landlord is harder but possible",
    ],
    process: [
      {
        step: "Initial strategy call",
        body: "We discuss whether to buy in personal name or through a limited company SPV, the rental stress-test maths, and what deposit you'll need to make the numbers work. No applications at this stage.",
      },
      {
        step: "Decision in principle (DIP)",
        body: "Once you've identified a target property, we get a DIP from a lender that fits both you and the rental yield. Same-day in most cases.",
      },
      {
        step: "Full application and valuation",
        body: "After your offer is accepted, we submit the full application. The lender instructs a valuation that confirms both market value and achievable rent.",
      },
      {
        step: "Mortgage offer and legal work",
        body: "Typical 3–5 weeks to formal mortgage offer. Your solicitor handles SDLT, including the 5% additional-property surcharge.",
      },
      {
        step: "Completion and let",
        body: "Once completed, you can let the property immediately. We'll diary your remortgage review for 5 months before the fix ends.",
      },
    ],
    faqs: [
      {
        q: "Can I get a buy-to-let mortgage as a first-time buyer?",
        a: "Yes, but the lender pool shrinks significantly. Most BTL lenders require you to already own a residential property. The lenders that do accept first-time buyer landlords usually need a stronger deposit (often 25%–30%) and a clean credit file.",
      },
      {
        q: "Should I buy in my own name or through a limited company?",
        a: "It depends on your tax band, how many properties you plan to own, and whether you need to draw rental income to live on. Higher-rate taxpayers building a portfolio usually benefit from an SPV structure; basic-rate taxpayers buying one property often don't. We work alongside accountants regularly and can refer you for proper tax advice.",
      },
      {
        q: "How is the rental coverage calculated?",
        a: "Most lenders apply 145% rental cover at a 5.5% notional interest rate (125% for basic-rate taxpayers and limited companies). On 5-year fixes, the actual product rate is often used instead, which makes the test easier to pass.",
      },
      {
        q: "Can I live in my own buy-to-let?",
        a: "No. That would be mortgage fraud. If your circumstances change and you need to move in, you must contact the lender first and switch to a residential mortgage (or get specific consent to occupy).",
      },
      {
        q: "What happens with SDLT on a buy-to-let?",
        a: "BTL purchases attract the 5% additional-property surcharge on top of standard SDLT, because you're buying a second home. Non-UK residents pay another 2% on top. Always factor this into your deposit cash needs.",
      },
      {
        q: "Do I need to use a letting agent?",
        a: "No, but most lenders require the property to be on an Assured Shorthold Tenancy (AST). You can self-manage. Just budget for time and the legal know-how (deposit protection, EICR, gas safety, EPC, Right to Rent checks).",
      },
      {
        q: "What's the minimum property value for a BTL mortgage?",
        a: "Most lenders set a minimum property value of £75,000, with some going as low as £50,000 in specific regions. Below that, options thin out fast, and the yield maths needs to be very strong to justify the per-property fixed costs.",
      },
    ],
    relatedPostSlugs: ["buy-to-let-tax-rules", "uk-base-rate-outlook-2026"],
    showsCalculator: "repayment",
  },

  "self-employed-mortgages": {
    slug: "self-employed-mortgages",
    title: "Self-Employed Mortgages",
    metaTitle: "Self-Employed Mortgages UK | Sole Trader & Director | Mortgage Vista",
    metaDescription:
      "Self-employed mortgages for sole traders, partners, limited company directors and contractors. 1-year accounts accepted by select lenders. Free initial review.",
    hero: {
      eyebrow: "Self-employed",
      heading: "A mortgage that recognises how you actually earn, not just what's on your tax return",
      subheading:
        "Sole traders, limited company directors, partners and contractors often borrow significantly less than they should because the wrong lender uses the wrong income figure. We pick the right lender first.",
    },
    body: `## Why self-employed applications fail at the wrong lender

Self-employed borrowers get turned down, or offered a fraction of what they could borrow, for one main reason. The lender used a definition of "income" that doesn't reflect how the business actually operates. A limited company director who pays themselves a £12,500 salary plus £40,000 in dividends, with £30,000 of retained profit in the business, has very different "income" depending on how a lender defines it:

- Strict lender: £12,500 (salary only)
- Standard lender: £52,500 (salary + dividends)
- Director-friendly lender: £82,500 (salary + dividends + retained profit share)

That last figure can support a mortgage almost twice the size of the first. The whole game is matching you to the lender that recognises your real income.

## What lenders mean by "self-employed"

You're treated as self-employed if you:

- Operate as a sole trader (taxed via Self Assessment)
- Are a partner in an LLP or traditional partnership (usually 20%+ stake)
- Are a director of a limited company with a 20%–25%+ shareholding
- Work as a contractor on day rates through your own limited company

PAYE umbrella contractors are usually assessed as employed, which is sometimes the easier route. Worth knowing if you have a choice of contracting structure.

## How long you've been trading

Most lenders ask for 2 full years of accounts or tax returns. That's the textbook answer. In reality:

- 12 lenders or so will accept just 1 year of accounts if the figures are strong and the trade is established
- A handful of lenders accept the projected income from a fresh contractor role with a current contract, even if you've only been contracting a few months
- Some lenders ignore your most recent year if it's lower than the previous one (averaging only the better years)
- Others insist on the latest year being used (which hurts you if business is growing)

There's no single "best lender for self-employed". The right one depends on your trade type, your trajectory, and how aggressively you draw income from the business.

## Documents to have ready

For sole traders and partnerships:

- Last 2–3 years' SA302 (HMRC tax calculation)
- Matching Tax Year Overview from HMRC for each year
- Last 3 months' personal and business bank statements
- Last 3 months' personal bank statements
- Photo ID and proof of address

For limited company directors:

- Last 2 years' filed accounts (full or abbreviated)
- Last 2 years' SA302 and Tax Year Overview
- Accountant's certificate (some lenders require it; we'll tell you which)
- 3 months' business and personal bank statements

For contractors on day rates:

- Current signed contract
- Previous 2 contracts (if available)
- CV showing continuous work
- Professional qualifications

The accountant's certificate is a one-page summary signed by a qualified accountant (ACA, ACCA, CIMA, AAT) confirming income figures. It carries serious weight with lenders. Get it in advance, not the night before exchange.

## How directors should structure income

If you control your own salary/dividend split, plan ahead. A common pattern is to take a low salary and large dividends to minimise National Insurance, then leave significant profit in the company. That's tax-efficient but mortgage-restrictive.

In the 18–24 months before you apply, you have three options:

- Pay yourself a higher salary and dividends (less tax-efficient, easier mortgage)
- Use a lender that recognises retained profit (your share of net company profit, on top of salary and dividends)
- Increase dividends temporarily to grow the income figure

We'll often have this conversation with the accountant on a three-way call before any application.

## Affordability multiples

Self-employed applicants are not penalised on income multiples once a lender has agreed the income figure. Most lenders cap at around 4.5× income, with some going to 4.75×–5× for higher earners. You aren't loaned a smaller multiple just for being self-employed.

What does change is sensitivity to volatility. A 20% drop year-on-year will trigger more questions, and some lenders will simply use the lower year. If your business has had a big swing (Covid, a one-off contract, a parental leave gap), lead with that explanation in writing rather than waiting for the lender to query it.

## Common pitfalls we see

- Submitting tax returns late: lenders need the latest SA302 to be on file with HMRC. If you're applying in June 2026 and haven't filed your 2024–25 return, your most recent confirmed income is from April 2024.
- Heavy use of director's loan account: some lenders treat sustained DLA balances as a flag for cash-flow problems
- Mixing personal and business spending on one bank account: makes underwriting messy and slow
- Recent expansion costs hitting profit: a year of low net profit because you bought a van or hired staff often confuses lenders' affordability models

The fix for all of these is the same: pick the right lender first, package the application properly, and pre-empt the questions in the cover letter.`,
    eligibility: [
      "Sole trader, LLP/partnership member, limited company director (usually 20%+ shareholder), or day-rate contractor",
      "Minimum 1 year of accounts or tax returns for select lenders; 2 years standard; 3 years for the most competitive rates",
      "Latest SA302 and Tax Year Overview from HMRC, fully filed and accepted",
      "Clean or near-clean credit file; specialist self-employed lenders also cover credit issues",
      "Minimum 5%–10% deposit for residential purchase (BTL needs 25%)",
      "Stable business trade. Major recent changes in trade type can require more years of evidence",
      "UK trading address and bank account; non-UK income usually needs a specialist lender",
    ],
    process: [
      {
        step: "Income deep-dive",
        body: "We work through your accounts, SA302s and (for directors) the company financials. We tell you what each lender will treat as your usable income. Figures often vary by £20,000+ between lenders.",
      },
      {
        step: "Lender shortlist",
        body: "We narrow to the 2–3 lenders that give you the strongest borrowing capacity at the best rate, based on your specific income structure and credit profile.",
      },
      {
        step: "Agreement in Principle",
        body: "We submit an AIP with the lender that fits best. Self-employed AIPs sometimes require a brief manual review; we'll know within 24–48 hours.",
      },
      {
        step: "Full application",
        body: "We submit a packaged application with a cover note explaining anything unusual in the figures (one-off costs, growth pattern, parental leave, etc.) so the underwriter doesn't have to guess.",
      },
      {
        step: "Mortgage offer to completion",
        body: "Self-employed cases usually take 2–5 weeks longer than employed cases due to manual underwriting. We chase the lender daily once underwriting starts.",
      },
    ],
    faqs: [
      {
        q: "Can I get a mortgage with only 1 year of accounts?",
        a: "Yes, with select lenders. You'll usually need to demonstrate a clear trading history (sometimes via your previous PAYE role in the same field), strong year-1 figures, and a clean credit profile. The lender pool is smaller and rates can be marginally higher than 2-year-accounts cases.",
      },
      {
        q: "How is my income calculated as a limited company director?",
        a: "Standard lenders use salary + dividends drawn. Director-friendly lenders use salary + dividends + your share of net company profit (retained profit). The latter often increases your borrowing capacity by 30%–60%.",
      },
      {
        q: "I'm a contractor on day rates. How do lenders work out my income?",
        a: "Specialist contractor lenders annualise your day rate: typically day rate × 5 days × 46–48 weeks = annual income. Some accept this from a current contract alone; others want a 12-month track record. The route is much more generous than IR35-friendly accounting often suggests.",
      },
      {
        q: "Will my latest year's drop in profit hurt me?",
        a: "Some lenders take the latest year only (which hurts a falling figure); others average the last 2 or 3 years (which softens it); a few use the lower of the latest or average. We'll pick based on which approach works best for your specific numbers.",
      },
      {
        q: "Do I need an accountant's certificate?",
        a: "Some lenders insist on it for limited company directors. Others accept SA302s and accounts without it. If a certificate would unlock a better lender, we'll ask your accountant to prepare one. It usually takes 1–2 days and costs £50–£200.",
      },
      {
        q: "What if my last tax return isn't filed yet?",
        a: "Lenders generally need the most recent two years filed and accepted by HMRC. If your latest return is overdue, your usable income may be capped at the previous year's figure. Filing late is the single most common reason self-employed cases stall.",
      },
      {
        q: "Can I get a self-employed buy-to-let mortgage?",
        a: "Yes. BTL underwriting focuses on the rental coverage rather than your personal income. Many BTL lenders still ask for a minimum personal income of £25,000, but the bar is lower than for residential.",
      },
    ],
    relatedPostSlugs: ["brokers-vs-direct", "first-time-buyer-complete-guide"],
    showsCalculator: "affordability",
  },

  "bad-credit-mortgages": {
    slug: "bad-credit-mortgages",
    title: "Bad Credit Mortgages",
    metaTitle: "Bad Credit Mortgages UK | Adverse Credit Specialists | Mortgage Vista",
    metaDescription:
      "Mortgages for borrowers with defaults, CCJs, missed payments, IVAs or bankruptcy. Specialist UK lenders, realistic rates, no judgment.",
    hero: {
      eyebrow: "Adverse credit",
      heading: "Defaults, CCJs and missed payments don't have to mean a mortgage refusal",
      subheading:
        "Specialist UK lenders look at the context behind a credit issue, not just the score. We know which lenders accept which types of adverse credit, at what age and severity.",
    },
    body: `## How bad credit mortgages actually work

Mainstream high-street lenders rely heavily on automated credit scoring. If your file shows defaults, CCJs, late payments, an IVA or a bankruptcy in the last few years, you'll usually be declined at the application stage without any human looking at the case.

Specialist (or "adverse credit") lenders work differently. They underwrite each case manually, looking at:

- What type of adverse credit you have
- How recent it is
- How much was involved
- Whether it's been satisfied (paid off / closed)
- The reason behind it (job loss, illness, divorce, fraud, etc.)
- How you've handled credit since

A 4-year-old £300 mobile phone default that you settled 3 years ago is treated very differently from an unpaid £8,000 CCJ from last year. Both might trigger an automatic decline at a high-street lender. With the right specialist lender, the first is often a non-issue at standard rates; the second needs a different lender at a higher rate.

## Types of adverse credit and how lenders see them

**Late payments.** One or two missed payments in the last 12 months on a credit card or unsecured loan are workable with most lenders, sometimes at standard rates. Multiple late payments, or any late payments on a mortgage or rent reference, are taken much more seriously.

**Defaults.** A default is recorded when an account is closed for non-payment. Lenders care about how recent it was and how big. A satisfied default over 3 years old often allows access to near-mainstream rates. An active or very recent default usually pushes you to a specialist lender at 5.5%–7%.

**County Court Judgments (CCJs).** A CCJ is a court order to pay a debt. Satisfied CCJs over 3 years old are widely accepted; unsatisfied CCJs (still showing as owed) are far harder. Some specialist lenders accept CCJs of any age provided they're satisfied at completion.

**Debt Management Plans (DMPs).** An informal arrangement with creditors. Lenders usually want to see at least 12 months of on-time DMP payments, sometimes a full settlement, before considering an application.

**Individual Voluntary Arrangements (IVAs).** A formal insolvency process. Most lenders want the IVA discharged for at least 1–3 years before they'll consider you. A handful go shorter.

**Bankruptcy.** Discharged bankrupts can usually access a mortgage 3 years after discharge with a 25%+ deposit. Some specialist lenders will go to 1 year post-discharge with a 30%+ deposit.

**Repossessions.** Treated harshly across the market. Most lenders want at least 6 years since the repossession, with no further adverse credit since.

## Deposit matters more than ever

The single biggest lever you have with adverse credit is your deposit. The bigger the deposit, the wider the lender pool and the better the rate:

- 5%–10% deposit: very limited options with adverse credit; usually only minor recent issues acceptable
- 15% deposit: most specialist lenders open up
- 25% deposit: pricing becomes meaningfully more competitive
- 40% deposit: even fairly recent CCJs or IVAs can be considered at near-market rates

If you have a serious credit event in the last 2 years, increasing your deposit from 10% to 25% can typically halve the rate premium you pay.

## What "rate premium" actually looks like

Mainstream best-buy 5-year fixes in 2026 sit around 4.12%. Adverse credit lending typically runs:

- Light adverse, satisfied, 3+ years old: 4.30%–4.80%
- Moderate adverse, last 2–3 years: 5.00%–5.80%
- Recent significant adverse (defaults, CCJs in last 12 months): 5.80%–7.00%
- Discharged bankruptcy in last 1–2 years: 6.00%–7.50%

These products usually carry higher arrangement fees too, often £999–£2,995, sometimes added to the loan.

The plan is rarely to stay on these rates forever. Most adverse credit borrowers fix for 2 years and remortgage at the end of the fix to a more mainstream lender, by which time the adverse credit is older and the credit profile is cleaner. Done well, the higher rate is a stepping stone, not a permanent ceiling.

## What you should and shouldn't do before applying

**Do:**

- Get a copy of all 3 credit reports (Experian, Equifax, TransUnion). They often differ
- Settle any small outstanding defaults if you can; lenders treat satisfied defaults much more leniently
- Make sure your address history is consistent across all 3 reports
- Set up direct debits on every active account so nothing accidentally misses

**Don't:**

- Apply to multiple lenders directly. Each hard search hurts your file
- Take out new credit (car finance, store cards, BNPL) in the 6 months before application
- Try to "hide" adverse credit from us. Lenders will find it, and the wasted application is a hard footprint
- Cancel old credit accounts en masse; long-standing accounts in good order help, even if dormant

## When this service is the right fit

This service is for you if you've been declined elsewhere, if you've had any of the credit events above in the last 6 years, or if you simply want a sober assessment of how mortgageable you are right now. The first conversation is free, without a credit search, and we'll tell you straight whether to apply now or wait 6–12 months for a better outcome.`,
    eligibility: [
      "Adverse credit on file: defaults, CCJs, missed payments, DMP, IVA, discharged bankruptcy or repossession",
      "Minimum 10% deposit for the most flexible options; 15%–25% opens up the strongest specialist pricing",
      "Stable income: employed for 6+ months in current role, or 1–2 years self-employed",
      "All adverse credit items disclosed upfront. Surprise defaults discovered during underwriting almost always cause a decline",
      "UK residency and right to reside; non-UK nationals are still considered with the right specialist lender",
      "Property is standard construction and habitable; non-standard properties narrow the lender pool further",
      "You can demonstrate the issue is in the past. Recent missed payments on existing credit usually need to be resolved first",
    ],
    process: [
      {
        step: "Confidential credit review",
        body: "We pull a soft-search summary (no impact on your file) and walk through every adverse item. You get a written summary of what each lender will accept and the realistic rate.",
      },
      {
        step: "Strategy: apply now or wait?",
        body: "Sometimes the right answer is to apply now at a slightly higher rate. Sometimes it's to wait 6 to 12 months, settle a specific debt, and apply when the file clears. We'll be honest about which.",
      },
      {
        step: "Targeted AIP",
        body: "We submit to one specialist lender that we know will accept your specific credit profile, rather than spraying applications. The hard footprint count stays low.",
      },
      {
        step: "Manual underwriting",
        body: "Specialist lenders review every case individually. We provide a cover note explaining the context and circumstances behind the credit issues. This often makes the difference.",
      },
      {
        step: "Future remortgage plan",
        body: "On day one we agree a plan for the next remortgage, usually 2 years out, when the adverse credit will be older and you'll qualify for a more mainstream lender.",
      },
    ],
    faqs: [
      {
        q: "I've had a CCJ. Can I still get a mortgage?",
        a: "Yes, in most cases. Satisfied CCJs older than 3 years are widely accepted, sometimes at near-mainstream rates. Recent or unsatisfied CCJs need specialist lenders and a larger deposit. We'll know which lender suits as soon as we see the dates and amounts.",
      },
      {
        q: "Will I be charged a much higher rate?",
        a: "Usually yes, but the gap varies enormously. Light, older adverse credit might add 0.20%–0.50% to your rate. Recent, severe adverse credit can add 1.5%–3%. We model both your monthly payment and the total cost of the deal so you know the real number.",
      },
      {
        q: "How long do I have to wait after bankruptcy or an IVA?",
        a: "Most lenders want the bankruptcy discharged or IVA satisfied for 3 years; some specialist lenders go to 1 year. The deposit needed at the shorter end is usually 25%–30%.",
      },
      {
        q: "Should I check my credit file before applying?",
        a: "Yes. Pull all 3 reports (Experian, Equifax, TransUnion). They sometimes show different information, and a single error on one report can make the difference between an offer and a decline. We'll review them with you.",
      },
      {
        q: "Will the application show up on my credit file?",
        a: "Initial assessment uses soft searches that don't show to other lenders. Only a full Decision in Principle or full application leaves a hard footprint. We deliberately keep these to a minimum.",
      },
      {
        q: "Can I remortgage onto a better deal once my credit improves?",
        a: "Yes, and that's usually the plan. Most adverse credit borrowers move to a more mainstream lender after their initial 2-year fix. We diary the remortgage review for 5 months before the fix ends.",
      },
      {
        q: "What's the maximum amount I can borrow with bad credit?",
        a: "Income multiples for adverse credit cases are often slightly tighter than mainstream, typically 4× income rather than 4.5×. With strong income and a larger deposit, you can still borrow well into six figures.",
      },
    ],
    relatedPostSlugs: ["brokers-vs-direct", "remortgaging-process-step-by-step"],
    showsCalculator: "affordability",
  },

  "commercial-mortgages": {
    slug: "commercial-mortgages",
    title: "Commercial Mortgages",
    metaTitle: "Commercial Mortgages UK | Owner-Occupier & Investment | Mortgage Vista",
    metaDescription:
      "Commercial mortgages for offices, shops, warehouses, industrial units, mixed-use and HMO portfolios. Owner-occupier and investment finance from £100,000.",
    hero: {
      eyebrow: "Commercial finance",
      heading: "Buy your trading premises or commercial investment with the right structure",
      subheading:
        "From owner-occupied retail units and industrial premises to mixed-use blocks and HMO portfolios, we structure commercial mortgages that match the asset and your business plan.",
    },
    body: `## How commercial mortgages differ from residential

A commercial mortgage is a long-term loan secured against a property used for business purposes: your own trading premises, an investment unit you let to a business tenant, or a mixed-use building (shop with flat above). Unlike residential mortgages, commercial lending is unregulated, manually underwritten, and priced on the specific risk of the asset and the borrower.

That has practical consequences:

- No "best buy" tables. Every deal is bespoke
- Lender pricing varies by asset type, location, lease terms, and your trading history
- Decisions are made by people, not algorithms, so relationships matter
- Timeline runs longer (typically 8 to 14 weeks from application to draw-down)

The flip side is flexibility. If your case is well-presented and the underlying numbers stack up, terms that wouldn't be possible in residential lending (bespoke amortisation profiles, capital repayment holidays, interest-only periods) are routinely available.

## Owner-occupied vs investment commercial

These are two distinct lender markets:

**Owner-occupied (OOCM).** You're buying premises your own business will trade from. Lenders assess your trading accounts, the affordability of the loan against business profits, and the strategic fit of the property. Typical terms: 70%–75% LTV, 15–25 year terms, sometimes interest-only for the first 1–2 years while you settle in.

**Commercial investment (CIM).** You're buying a property to let to a commercial tenant. Lenders assess the lease in place (or projected rent if vacant), the tenant covenant strength, and your experience as a commercial landlord. Typical terms: 65%–70% LTV, 5–15 year fixed periods within a 25-year amortisation.

The same lender will often have very different appetite between the two. Pick the wrong product type and you waste 4 weeks at the wrong lender.

## LTV, deposit and pricing

Most commercial lenders cap at 70%–75% LTV for owner-occupiers and 60%–70% LTV for investment, which means you'll need a 25%–40% deposit. There's also a marked rate difference between LTV bands:

- 50% LTV: typically 5.50%–6.40%
- 65% LTV: typically 6.20%–7.00%
- 75% LTV: typically 6.80%–7.80%

Pricing is usually quoted as a margin over the Bank of England base rate (currently 3.75%) or over SONIA. For example, "base + 3.25%" gives 7.00% today; if base falls, your rate falls.

You can fix the rate in some cases (typically for 5 years), but commercial fixes carry steeper Early Repayment Charges than residential. Often a "make whole" calculation that mirrors the lender's funding cost.

## Asset types and lender appetite

Different property types attract different lender pools:

**Offices.** Workable but tightening since the shift to hybrid working. Lenders want to see strong tenant covenants and lease terms over 5 years where investment.

**Retail (high street).** The hardest sector right now. Independent retail in secondary locations is challenging; prime high-street and food retail (supermarkets, restaurants with strong covenants) much easier.

**Industrial and warehousing.** The strongest sector right now. High demand from logistics and e-commerce occupiers. Lenders compete for good industrial assets.

**Mixed-use (shop with flats above).** Specialist lenders, often priced as a hybrid between commercial and BTL.

**HMOs and large multi-let portfolios.** Sit at the intersection of commercial and BTL. 5+ bedroom HMOs almost always need commercial lending.

**Healthcare, hotels, leisure.** Sector-specialist lenders. Pricing depends heavily on operator covenant.

## Documents you'll need

For owner-occupied:

- Last 2–3 years' filed accounts
- Last 12 months' management accounts
- Year-to-date P&L and cashflow forecast
- Business plan covering the next 3 years
- Personal bank statements and asset/liability statement for all directors
- Details of the property, lease (if leasehold), and any planning permissions

For investment:

- Tenant lease (signed) or letter of intent
- Tenant accounts (where covenant strength matters)
- Schedule of any other commercial properties you own
- Personal bank statements and asset/liability statement
- Proof of deposit source

The cover letter (explaining why you're buying, what the strategic thinking is, and how the loan will be repaid) matters more in commercial lending than anywhere else. We draft it with you.

## Fees and costs

Commercial transactions carry higher fees than residential:

- Lender arrangement fee: typically 1%–2% of the loan, often added to the loan
- Valuation: £1,200–£5,000+ depending on asset value and complexity
- Legal fees (your side): £2,500–£8,000+ for commercial conveyancing
- Lender's legal fees: usually paid by you, £1,500–£4,000
- SDLT on commercial property: 0% to £150k, 2% to £250k, 5% above £250k
- Broker fee: confirmed in writing before you commit

Total transaction costs of 4%–6% of the property value are normal.

## Refinancing existing commercial debt

If you're already on a commercial mortgage and the fixed rate is ending, or you've reached the end of an interest-only period and need a new structure, refinance options divide neatly into:

- Refinance with the same lender (a "renewal" or product transfer): fastest, usually no new valuation, often the path of least resistance
- Refinance to a new lender: more competitive pricing on larger loans, lets you change LTV, switch repayment basis, or release equity for further investment

For owner-occupiers, refinancing is often the moment to extend the term back out to free up monthly cashflow, or to consolidate working-capital debt into the longer-term mortgage at a lower rate.

## When commercial lending isn't right

Commercial mortgages don't suit short-term plans. Bridging finance, development loans or asset-backed business loans may be better if you only need 6–24 month finance. We can refer to specialist providers in those areas if your needs sit outside long-term mortgage finance.`,
    eligibility: [
      "Minimum loan typically £100,000; below that, lenders prefer secured business loans rather than commercial mortgages",
      "Deposit of 25%–40% depending on asset type, owner-occupier vs investment, and lender",
      "2+ years of trading accounts for owner-occupiers; lender will calculate affordability against business profits",
      "Investment cases need a tenant lease or strong rental valuation; vacant possession deals need a clear letting strategy",
      "All directors and majority shareholders disclosed; personal guarantees usually required",
      "Asset must be in marketable condition and of standard construction; specialist assets need specialist lenders",
      "Clear repayment strategy if interest-only: sale, refinance, or amortisation switch at a defined point",
      "Clean or near-clean credit profile across all guarantors; specialist lenders cover adverse cases at higher rates",
    ],
    process: [
      {
        step: "Initial structuring call",
        body: "We discuss the property, the purpose, your business or investment plan, and what realistic terms look like. No applications submitted at this stage. It's purely strategic.",
      },
      {
        step: "Heads of terms (HOTs)",
        body: "We approach 2–3 lenders likely to fit and obtain indicative terms. You compare rate, LTV, fees, and any covenants before committing to a single lender.",
      },
      {
        step: "Full application and valuation",
        body: "Once you've selected a lender, we package the full application with accounts, business plan, and supporting documents. Valuation is instructed and typically takes 2–3 weeks for commercial assets.",
      },
      {
        step: "Credit committee",
        body: "Most commercial lenders take cases through a credit committee. We respond to follow-up queries quickly to keep momentum. Typical 4–6 weeks from full application to formal offer.",
      },
      {
        step: "Legal completion and draw-down",
        body: "Commercial legal work takes 4–8 weeks depending on complexity. We coordinate between your solicitor, the lender's solicitor, and the valuer through to draw-down day.",
      },
    ],
    faqs: [
      {
        q: "What's the minimum I can borrow on a commercial mortgage?",
        a: "Most commercial lenders set a minimum loan of £100,000–£150,000. Below that, secured business loans, asset finance, or commercial bridging are usually better-suited products.",
      },
      {
        q: "How much deposit do I need?",
        a: "Typically 25%–30% for owner-occupied premises and 30%–40% for investment property. Asset type matters. Prime industrial can sometimes go to 75% LTV, while secondary retail rarely exceeds 60% LTV.",
      },
      {
        q: "Can I get an interest-only commercial mortgage?",
        a: "Yes, common for investment properties and sometimes available on owner-occupied for an initial period. Lenders will want a clear repayment strategy at the end of the interest-only term: usually sale, refinance, or switch to capital and interest.",
      },
      {
        q: "Do I need to give a personal guarantee?",
        a: "Almost always, even where the borrower is a limited company. Some lenders cap the guarantee at a percentage of the loan; others require a full personal guarantee. We negotiate where there's room to.",
      },
      {
        q: "How long does a commercial mortgage take to complete?",
        a: "Typically 8–14 weeks from full application to draw-down, depending on lender service levels and the complexity of the property. Plan for 12 weeks as a sensible default and allow 16+ for complex or large transactions.",
      },
      {
        q: "Can I use commercial finance to buy a mixed-use property?",
        a: "Yes. Mixed-use (commercial unit with flats above, for example) is one of the most active segments of the commercial market. Specialist lenders treat the residential and commercial elements separately within a single facility.",
      },
      {
        q: "Are commercial mortgage rates fixed or variable?",
        a: "Both are available. Variable rates are usually quoted as a margin over base rate or SONIA. Fixed rates of 5 years are common. Longer fixes are rare in commercial. ERCs on fixed-rate commercial lending can be substantial, usually a 'make whole' calculation rather than a flat percentage.",
      },
    ],
    relatedPostSlugs: ["uk-base-rate-outlook-2026", "buy-to-let-tax-rules"],
    showsCalculator: "repayment",
  },

  "equity-release": {
    slug: "equity-release",
    title: "Equity Release",
    metaTitle: "Equity Release UK | Lifetime Mortgages | Mortgage Vista",
    metaDescription:
      "Equity release advice for over-55s. Lifetime mortgages and home reversion plans. Equity Release Council standards. Speak to a qualified UK adviser.",
    hero: {
      eyebrow: "Over-55s",
      heading: "Release tax-free cash from your home, without moving and without monthly payments",
      subheading:
        "Equity release lets homeowners aged 55+ access the value tied up in their property. We provide whole-of-market advice, follow Equity Release Council standards, and only recommend a plan when it's genuinely the right answer.",
    },
    body: `## What equity release actually is

Equity release is a way for homeowners typically aged 55 and over to access the cash value tied up in their home without selling and moving out. There are two main types:

**Lifetime mortgages.** A loan secured against your home. You retain full ownership. Interest accrues at a fixed rate and is usually rolled up (added to the loan), so there are no monthly payments unless you choose to make them. The loan plus accrued interest is repaid when you die or move into long-term care, usually from the sale of the property.

**Home reversion plans.** You sell all or part of your home to a provider in exchange for a tax-free lump sum (or income), but you keep the right to live there rent-free for the rest of your life. You no longer own that share of the property, so the provider gets the corresponding share of the eventual sale proceeds.

Lifetime mortgages account for over 99% of the modern equity release market. Home reversion is rare and only suitable in specific circumstances.

## How a lifetime mortgage works in practice

The maximum you can borrow is usually expressed as a percentage of your property value, based on age:

- Age 55: typically up to 26% of property value
- Age 65: typically up to 36%
- Age 75: typically up to 46%
- Age 85: typically up to 55%

Older borrowers can release more because the lender's expected duration of the loan is shorter. Health and lifestyle factors (smoking, certain medical conditions) can sometimes increase the amount available. These are called enhanced lifetime mortgages.

Interest is fixed for life on most modern plans, typically 6.20%–7.40% in 2026. Rolled-up interest compounds: an £80,000 release at 6.80% roughly doubles every 11 years if no payments are made. Over 20 years that £80,000 can become £300,000+ owed against the property. This is the central trade-off of equity release.

## Equity Release Council standards

All plans we recommend are from Equity Release Council member providers. That gives you these guarantees by contract:

- **No negative equity guarantee.** Your estate will never owe more than the property is worth at sale, even if interest rolls up to exceed the property value.
- **Right to remain.** You have the right to live in the property for life or until you move into permanent long-term care.
- **Right to move.** You can move home and take the loan with you, subject to the new property meeting the lender's criteria.
- **Right to make voluntary partial repayments.** Most modern plans allow you to repay a percentage each year (typically 10%) without an Early Repayment Charge, which can dramatically reduce the long-term cost.

We will not recommend a plan that doesn't meet ERC standards, full stop.

## When equity release makes sense

Equity release can be the right answer if:

- You want to stay in your home long-term and don't want to downsize
- Your income from pensions doesn't quite stretch to the lifestyle you want
- You want to gift money to family during your lifetime (often to help children onto the property ladder)
- You have a specific lump-sum need (paying off an interest-only mortgage at maturity, home adaptations, care costs at home, clearing other debts)
- You've already considered downsizing and decided against it for clear reasons (stay near family, stay near medical care, attachment to the home)

## When equity release usually isn't right

We'll often advise against equity release if:

- You could comfortably downsize to release the cash (cheaper, no compounding interest)
- You have meaningful unused pension or ISA assets you could draw on first
- You only need a modest amount and could use a Retirement Interest-Only mortgage (RIO) instead, which has monthly interest payments but no compounding
- Your family relies on inheriting the property and you haven't discussed it with them
- You qualify for unclaimed means-tested benefits that equity release could reduce or end
- You're considering it under pressure from a family member or salesperson

This last one matters. Decisions made under pressure rarely age well.

## Impact on inheritance and benefits

A lifetime mortgage reduces the value of your estate. If your beneficiaries were expecting to inherit the full property value, they will inherit the property less the loan plus accrued interest. We strongly recommend including family members in at least one advice meeting.

Means-tested benefits (Pension Credit, Council Tax Reduction, certain housing-related benefits) can be affected if you take equity release as a lump sum and hold the cash. This is a critical area where we'll always check before recommending a plan, and where independent benefits advice is often valuable.

## Costs to expect

A typical equity release plan involves:

- Initial advice fee (ours, disclosed in writing before any work begins)
- Application and valuation fees: usually £400–£700, sometimes covered by the lender
- Solicitor's fees: £700–£1,400 (must use a qualified solicitor, can't be a paralegal)
- Lender arrangement fee: £600–£1,200, often added to the loan

You'll see the full cost in pounds and pence in your personal illustration before you commit.

## Alternatives we'll always discuss

Before recommending equity release we will always cover:

- Downsizing
- Retirement Interest-Only mortgages (RIO)
- Standard remortgaging if income supports it
- Help from family
- Drawing from other assets (pensions, ISAs, investments)
- Means-tested benefits you may not be claiming

If any of these is a better fit, that's what we'll tell you.`,
    eligibility: [
      "Aged 55 or over (some plans require 60 or 65); youngest joint applicant's age applies",
      "Property valued at £70,000 or more, in standard construction, and your main residence",
      "Property held in your name or joint names; some leasehold properties accepted with sufficient lease length (typically 75+ years)",
      "Located in England, Scotland, Wales or Northern Ireland (Channel Islands and Isle of Man not usually accepted)",
      "Any existing mortgage must be cleared on completion (often from the equity release itself)",
      "Family members involved or aware of the decision. We strongly encourage their attendance at at least one meeting",
      "Independent legal advice from a qualified solicitor is mandatory under Equity Release Council standards",
    ],
    process: [
      {
        step: "Initial conversation, no obligation",
        body: "We discuss what you're trying to achieve, your circumstances and the alternatives. If equity release isn't the right answer, we'll say so. There's no charge for the first meeting.",
      },
      {
        step: "Personal illustration",
        body: "If equity release looks suitable, we produce a personal illustration showing the lump sum or drawdown available, the interest rate, projected balance over 10/15/20 years, and the impact on your estate.",
      },
      {
        step: "Family meeting (recommended)",
        body: "We strongly encourage a meeting with the family members who would otherwise inherit the property. They should understand the trade-off; many of our best outcomes start here.",
      },
      {
        step: "Application, valuation, and independent legal advice",
        body: "Application submitted, surveyor visits, and you instruct your own solicitor for independent legal advice as required by the Equity Release Council. Typical 6–10 weeks from application to completion.",
      },
      {
        step: "Funds released",
        body: "On completion, the funds are paid to your solicitor and then to you. We diary an annual review to check whether the plan still suits your circumstances.",
      },
    ],
    faqs: [
      {
        q: "Will I still own my home after equity release?",
        a: "With a lifetime mortgage, yes. You remain the legal owner, and the loan is secured against the property like a normal mortgage. With home reversion, you sell all or part of your home to the provider, so they own that share, but you keep the right to live there for life.",
      },
      {
        q: "What happens to the loan when I die?",
        a: "The loan and any accrued interest are repaid from the sale of the property after your death (or after the second of you dies, on a joint plan). Your estate receives whatever's left. The Equity Release Council 'no negative equity guarantee' means your estate will never owe more than the property sells for.",
      },
      {
        q: "Can I move house after taking equity release?",
        a: "Yes. Equity Release Council plans include the right to port the loan to a new property, provided the new property meets the lender's criteria (value, construction, location). Some downsizing scenarios may require partial repayment.",
      },
      {
        q: "Can I make payments to stop the interest rolling up?",
        a: "Most modern lifetime mortgages allow voluntary partial repayments, typically up to 10% of the original loan each year without any Early Repayment Charge. Used consistently, this can dramatically reduce the long-term cost.",
      },
      {
        q: "Will equity release affect my benefits?",
        a: "It can. Means-tested benefits like Pension Credit and Council Tax Reduction can be affected if you hold released cash above certain thresholds. We always check this before recommending a plan, and may suggest a drawdown facility (drawing only what you need) to manage the impact.",
      },
      {
        q: "How much does equity release cost?",
        a: "Typical upfront costs are £1,500–£3,000 (advice, valuation, solicitor, lender fees). The bigger long-term cost is the interest, which compounds over time. Your personal illustration will show projected balances over 10, 15, and 20 years.",
      },
      {
        q: "Is equity release safe?",
        a: "Plans regulated by the Financial Conduct Authority and meeting Equity Release Council standards have strong consumer protections: no negative equity guarantee, right to remain, right to move, and access to independent legal advice. The risks are mainly about long-term cost and impact on inheritance, which we'll always lay out clearly.",
      },
    ],
    relatedPostSlugs: ["uk-base-rate-outlook-2026", "remortgaging-process-step-by-step"],
    showsCalculator: "repayment",
    extraWarning:
      "This is a lifetime mortgage. To understand the features and risks, ask for a personalised illustration. Equity release will reduce the value of your estate and may affect your entitlement to means-tested benefits. A lifetime mortgage is a loan secured against your home. Unless you choose to make voluntary repayments, interest is charged on the loan and any unpaid interest, which means the amount you owe grows quickly over time and reduces the equity left in your property. Always consider alternatives such as downsizing or a Retirement Interest-Only (RIO) mortgage before proceeding. Equity release advice is provided in line with Equity Release Council standards, and independent legal advice from a qualified solicitor is required.",
  },
};
