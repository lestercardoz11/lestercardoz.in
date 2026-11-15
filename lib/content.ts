/*
  Every word on the site lives here. Rules for editing it:
  - No em dashes and no semicolons in copy.
  - Clients on the ServiceNow side are described by sector, never named.
  - Numbers are only the ones Lester has confirmed. Team outcomes say so.
*/

import type { Slug } from "@/lib/slugs";

export type Stat = { value: string; label: string };

export type Visual =
  | { kind: "stats"; items: Stat[]; note?: string }
  | { kind: "chips"; groups: { title: string; items: string[] }[] }
  | { kind: "bills" | "pipeline" | "race" | "repo" | "extract" | "match" | "team" };

export type Step = { tab: string; title: string; body: string; visual: Visual };

export type Track = "fullstack" | "servicenow";

export type Project = {
  slug: Slug;
  tracks: Track[];
  name: string;
  what: string;
  role: string;
  period: string;
  metric: Stat;
  stack: string[];
  steps: Step[];
};

/* ---------------------------------------------------------------- Home */

export type HeroLine = { phrase: string; proof: string; cta: string; href: string };

const HOLD: HeroLine = {
  phrase: "hold the line when production breaks",
  proof: "Accountable for outcomes, and the last line of defence on quality and production issues.",
  cta: "See how I work",
  href: "/about#how",
};

// The site has two versions, chosen with the switch in the header.
export const HOME: Record<Track, { hi: string; lines: HeroLine[]; facts: Stat[] }> = {
  fullstack: {
    hi: "Hi, I'm Lester, a senior software engineer in Berlin.",
    lines: [
      {
        phrase: "build products from an empty repo",
        proof: "Founding engineer on Tacnique, an AI hiring platform that four of us took from an empty repository to production.",
        cta: "See Tacnique",
        href: "/work/tacnique",
      },
      {
        phrase: "build backends that read 5M+ bill pages",
        proof: "Primary developer of Opex Genie, a telecom expense platform on Spring Boot, Angular, PostgreSQL and AWS.",
        cta: "See Opex Genie",
        href: "/work/opex-genie",
      },
      {
        phrase: "lead 15+ engineers and still write the code",
        proof: "Technical lead across 15 to 20+ live client projects, while owning architecture and code myself.",
        cta: "See how I lead",
        href: "/work/technical-lead",
      },
      HOLD,
    ],
    facts: [
      { value: "6+ years", label: "building SaaS and enterprise software" },
      { value: "Java and TypeScript", label: "Spring Boot, Node.js, React, Next.js, Angular" },
      { value: "Berlin", label: "eligible to work in Germany, available now" },
    ],
  },
  servicenow: {
    hi: "Hi, I'm Lester, a ServiceNow technical lead in Berlin.",
    lines: [
      {
        phrase: "make enterprise ServiceNow behave",
        proof: "Four years hands-on across discovery, security, risk and custom applications, for a bank, a hotel group, a telecom carrier and more.",
        cta: "See the work",
        href: "/work",
      },
      {
        phrase: "lead 15+ ServiceNow engineers and still build",
        proof: "Technical lead across 15 to 20+ live client projects, while staying hands-on with architecture and code.",
        cta: "See how I lead",
        href: "/work/technical-lead",
      },
      {
        phrase: "connect ServiceNow to everything around it",
        proof: "Integrations with Tenable, Prisma, ApigeeX and Salesforce, and Azure AD single sign-on across several instances.",
        cta: "See the bank work",
        href: "/work/bank-security",
      },
      {
        phrase: "cut booking conflicts by 80%",
        proof: "Double-booking prevention on a workplace reservation rollout for a global software company.",
        cta: "See the room booking work",
        href: "/work/room-booking",
      },
      HOLD,
    ],
    facts: [
      { value: "6+ years", label: "in enterprise software, 4+ hands-on with ServiceNow" },
      { value: "3 certifications", label: "CSA, CAD and CIS Data Foundations" },
      { value: "Berlin", label: "eligible to work in Germany, available now" },
    ],
  },
};

/* ---------------------------------------------------------------- Work */

export const TRACKS: { id: Track; label: string; blurb: string }[] = [
  { id: "fullstack", label: "Full stack", blurb: "SaaS products I built and owned, from first commit to production support." },
  { id: "servicenow", label: "ServiceNow", blurb: "Hands-on enterprise ServiceNow. Clients are described by sector." },
];

export const PROJECTS: Project[] = [
  {
    slug: "opex-genie",
    tracks: ["fullstack"],
    name: "Opex Genie",
    what: "A platform that reads telecom bills and shows companies where the money goes",
    role: "Primary developer",
    period: "2023 to 2026",
    metric: { value: "5M+", label: "bill pages processed" },
    stack: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Apache PDFBox", "AWS ECS/Fargate", "AWS SQS", "AWS Cognito", "GitHub Actions"],
    steps: [
      {
        tab: "Problem",
        title: "Bills nobody could read",
        body: "Enterprises lose money on telecom bills they cannot easily analyse. The bills arrive as PDFs, and each of the four carriers has its own format, in several versions.",
        visual: { kind: "bills" },
      },
      {
        tab: "Pipeline",
        title: "From PDF to insight",
        body: "Bills join a queue on AWS SQS. Spring Boot services on ECS/Fargate parse them with PDFBox and store every line item in PostgreSQL, kept separate for each customer. An Angular dashboard turns the data into cost insights.",
        visual: { kind: "pipeline" },
      },
      {
        tab: "Speed",
        title: "Roughly 200% faster parsing",
        body: "The parser wrote every row to the database one at a time and read the same bill more than once. I collected rows in memory, wrote them in batches and made sure each bill is read and stored once.",
        visual: { kind: "race" },
      },
      {
        tab: "Scale",
        title: "Owned end to end",
        body: "I took requirements straight from the client and owned the architecture, parsers, carrier onboarding, infrastructure, deployments and production support.",
        visual: {
          kind: "stats",
          items: [
            { value: "5M+", label: "bill pages processed" },
            { value: "$100M", label: "telecom spend analysed" },
            { value: "100+", label: "enterprise customers" },
            { value: "4", label: "telecom carriers supported" },
          ],
        },
      },
    ],
  },
  {
    slug: "tacnique",
    tracks: ["fullstack"],
    name: "Tacnique",
    what: "An AI-powered platform for hiring engineers",
    role: "Founding engineer, team of four",
    period: "2020 to 2023",
    metric: { value: "Empty repo", label: "to a production SaaS product" },
    stack: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "AWS", "OpenAI"],
    steps: [
      {
        tab: "Start",
        title: "An empty repository",
        body: "Four of us started Tacnique from nothing. I was a founding engineer for three years, and the platform went from an empty repository to a production SaaS product.",
        visual: { kind: "repo" },
      },
      {
        tab: "Extract",
        title: "Reading resumes with OpenAI",
        body: "A candidate uploads a resume. The extraction I built uses OpenAI to pull out skills and keywords and turn them into a structured profile.",
        visual: { kind: "extract" },
      },
      {
        tab: "Match",
        title: "Finding the right candidates",
        body: "When a client needs specific skills, the matching and scoring I built surfaces the candidates whose profiles fit.",
        visual: { kind: "match" },
      },
      {
        tab: "Outcome",
        title: "Shipped, and growing",
        body: "I also built the Next.js frontend that sits on top of it all. The numbers here are product outcomes I contributed to as one of the team.",
        visual: {
          kind: "stats",
          items: [
            { value: "20%+", label: "revenue growth" },
            { value: "200%", label: "user growth" },
          ],
          note: "Product outcomes I contributed to, not mine alone.",
        },
      },
    ],
  },
  {
    slug: "technical-lead",
    tracks: ["fullstack", "servicenow"],
    name: "Leading the team",
    what: "Hands-on technical lead across product and client delivery",
    role: "Technical Lead",
    period: "2024 to 2026",
    metric: { value: "15+", label: "engineers led" },
    stack: ["Architecture", "Design reviews", "Code review", "Hiring", "Mentoring", "Client escalations"],
    steps: [
      {
        tab: "Team",
        title: "Fifteen engineers, still hands-on",
        body: "I led a team of 15+ engineers delivering enterprise projects for clients, and kept owning the architecture and code of Opex Genie myself.",
        visual: { kind: "team" },
      },
      {
        tab: "How",
        title: "Standards, reviews and hiring",
        body: "I defined engineering standards and the code review framework, ran design reviews and release readiness, and mentored engineers into lead roles.",
        visual: {
          kind: "stats",
          items: [
            { value: "15 to 20+", label: "client projects running at once" },
            { value: "50+", label: "senior technical interviews" },
          ],
        },
      },
      {
        tab: "Result",
        title: "The person problems escalate to",
        body: "I was the escalation point for hard architecture, integration and performance problems. Proposals and proofs of concept I supported helped win new clients.",
        visual: {
          kind: "stats",
          items: [
            { value: "95%+", label: "client satisfaction" },
            { value: "60%+", label: "growth in new clients" },
          ],
          note: "The growth figure is a company outcome I contributed to.",
        },
      },
    ],
  },
  {
    slug: "telecom-orders",
    tracks: ["servicenow"],
    name: "Order management for a telecom carrier",
    what: "Platform standardisation and access governance across several instances",
    role: "Hands-on developer",
    period: "Telecom",
    metric: { value: "One login", label: "single sign-on, live on every instance" },
    stack: ["SOM", "OMT", "COM", "Azure AD SSO", "ApigeeX", "Salesforce", "OAuth", "REST"],
    steps: [
      {
        tab: "Brief",
        title: "One carrier, many instances",
        body: "A large ServiceNow transformation for a telecom carrier running several instances. The focus was order management and getting the platform stable.",
        visual: {
          kind: "chips",
          groups: [{ title: "In scope", items: ["Service order management", "Order management for telecom", "Customer order management", "Platform administration"] }],
        },
      },
      {
        tab: "Build",
        title: "Sign-on, integrations and order fallout",
        body: "I led the order management plugin work, rolled out Azure AD single sign-on across the instances, connected ApigeeX and Salesforce, and scripted the cleanup of who had admin access.",
        visual: {
          kind: "chips",
          groups: [
            { title: "Connected", items: ["Azure AD SSO", "ApigeeX", "Salesforce", "OAuth"] },
            { title: "Kept healthy", items: ["Instance clones", "Patching", "Role mappings", "Shared GitHub repo"] },
          ],
        },
      },
      {
        tab: "Outcome",
        title: "Safer access, faster answers",
        body: "Fewer people with admin rights they did not need in test and production, and dashboards that cut the time it takes to spot an order falling out.",
        visual: {
          kind: "chips",
          groups: [{ title: "Delivered", items: ["Single sign-on on every instance", "Less admin exposure", "Order and fallout dashboards", "Instance setup guide"] }],
        },
      },
    ],
  },
  {
    slug: "hotel-service-map",
    tracks: ["servicenow"],
    name: "Service mapping for a hotel group",
    what: "Service mapping and a cleaned-up configuration database",
    role: "Hands-on developer",
    period: "Hospitality",
    metric: { value: "One map", label: "of what every service depends on" },
    stack: ["Discovery", "Service Mapping", "CMDB", "Dynamic CI Groups", "CMDB Query Builder"],
    steps: [
      {
        tab: "Brief",
        title: "What depends on what",
        body: "A global hotel group wanted a reliable map of its business services and everything they run on, whether that sits on-premise, in the cloud or with a vendor.",
        visual: { kind: "chips", groups: [{ title: "Kinds of service", items: ["On-premise", "Cloud", "Vendor-managed", "Hybrid"] }] },
      },
      {
        tab: "Build",
        title: "Workshops, then maps",
        body: "I ran discovery workshops with service owners, built top-down and tag-based service maps, and cleaned the CMDB of wrong classes, duplicates and missing relationships.",
        visual: {
          kind: "chips",
          groups: [
            { title: "Mapped", items: ["Top-down maps", "Tag-based maps", "Shared databases", "Identity providers"] },
            { title: "Cleaned", items: ["Classes", "Duplicates", "Relationships", "Owner data"] },
          ],
        },
      },
      {
        tab: "Outcome",
        title: "Incidents reach the right team",
        body: "Incident routing got more accurate and change impact analysis got faster. I handed over the maps with documentation, architecture diagrams and dependency lists.",
        visual: {
          kind: "chips",
          groups: [{ title: "Delivered", items: ["More accurate incident routing", "Faster change impact analysis", "Architecture diagrams", "Dependency lists"] }],
        },
      },
    ],
  },
  {
    slug: "bank-security",
    tracks: ["servicenow"],
    name: "Discovery and security for a bank",
    what: "Infrastructure discovery, vendor risk and vulnerability response",
    role: "Hands-on developer",
    period: "Banking",
    metric: { value: "2", label: "security scanners integrated" },
    stack: ["Discovery", "MID Server", "CMDB", "Vendor Risk Management", "Vulnerability Response", "Tenable", "Prisma", "REST"],
    steps: [
      {
        tab: "Brief",
        title: "Three streams, one platform",
        body: "Work for a US bank across three areas: discovering infrastructure, managing vendor risk and responding to vulnerabilities.",
        visual: { kind: "chips", groups: [{ title: "Streams", items: ["Discovery and CMDB", "Vendor risk management", "Vulnerability response"] }] },
      },
      {
        tab: "Build",
        title: "Patterns and scanner integrations",
        body: "I wrote custom Discovery patterns for enterprise and legacy systems, integrated the Tenable and Prisma scanners through REST APIs and transform maps, and automated remediation workflows.",
        visual: {
          kind: "chips",
          groups: [
            { title: "Integrated", items: ["Tenable", "Prisma", "REST APIs", "Transform maps"] },
            { title: "Tuned", items: ["Discovery schedules", "MID Server routing", "Custom patterns"] },
          ],
        },
      },
      {
        tab: "Outcome",
        title: "Vulnerability data you can trust",
        body: "I fixed CVE validation and the links between vulnerabilities and the systems they affect, cleared out stale items and kept the reporting dashboards honest.",
        visual: {
          kind: "chips",
          groups: [{ title: "Delivered", items: ["Clean CVE data", "Correct system links", "Automated remediation", "Live dashboards"] }],
        },
      },
    ],
  },
  {
    slug: "audit-tracking",
    tracks: ["servicenow"],
    name: "Audit tracking for a Big Four firm",
    what: "A custom application for audit requests and compliance tracking",
    role: "Hands-on developer",
    period: "Professional services",
    metric: { value: "4", label: "role levels, each with its own rules" },
    stack: ["UI Builder", "Data Brokers", "Scripted REST APIs", "Business Rules", "ACLs", "Flow Designer"],
    steps: [
      {
        tab: "Brief",
        title: "Who can do what, and when",
        body: "An audit framework application for a Big Four firm, with four levels of roles and strict rules about who can assign, see and change each request.",
        visual: { kind: "chips", groups: [{ title: "The application", items: ["Audit requests", "Compliance tracking", "Four role levels", "Fiscal year reporting"] }] },
      },
      {
        tab: "Build",
        title: "Bulk actions and a modern interface",
        body: "I built bulk assignment on Scripted REST APIs, rebuilt the interface in UI Builder with lists that refresh on their own, and enforced field-level access by role.",
        visual: {
          kind: "chips",
          groups: [
            { title: "Built", items: ["Bulk assignment", "Self-refreshing lists", "Role-based buttons", "Status notifications"] },
            { title: "Secured", items: ["Field-level access", "Tenant filtering"] },
          ],
        },
      },
      {
        tab: "Outcome",
        title: "Governance that enforces itself",
        body: "Auditors get notified at every status change, reports follow the fiscal year without manual edits, and the rules about access live in the platform.",
        visual: {
          kind: "chips",
          groups: [{ title: "Delivered", items: ["Notifications at every transition", "Dynamic fiscal year logic", "Current and previous year dashboards"] }],
        },
      },
    ],
  },
  {
    slug: "room-booking",
    tracks: ["servicenow"],
    name: "Room booking for a software company",
    what: "Workplace reservations across regions, buildings and floors",
    role: "Hands-on developer",
    period: "Technology",
    metric: { value: "80%", label: "fewer booking conflicts" },
    stack: ["Workplace Service Delivery", "Reservation Management", "Business Rules", "Flow Designer", "IntegrationHub"],
    steps: [
      {
        tab: "Brief",
        title: "One place to book a room",
        body: "A global software company wanted employees to reserve rooms and spaces in one portal, filtered by building, floor and what the room has in it.",
        visual: { kind: "chips", groups: [{ title: "Location levels", items: ["Region", "Site", "Campus", "Building", "Floor", "Area", "Space", "Room"] }] },
      },
      {
        tab: "Build",
        title: "Rules that stop double booking",
        body: "I configured the reservation portal with capacity, seating and AV filters, built the location hierarchy, and wrote the business rules and workflows that stop two people booking the same room.",
        visual: {
          kind: "chips",
          groups: [
            { title: "Configured", items: ["Reservation portal", "Capacity and AV filters", "Multi-room booking", "Janitorial and HVAC services"] },
          ],
        },
      },
      {
        tab: "Outcome",
        title: "Far fewer clashes",
        body: "Double-booking prevention cut booking conflicts by 80%, and everything was built to survive platform upgrades.",
        visual: { kind: "stats", items: [{ value: "80%", label: "fewer booking conflicts" }] },
      },
    ],
  },
  {
    slug: "asset-lifecycle",
    tracks: ["servicenow"],
    name: "Asset lifecycle for government IT",
    what: "A custom application for assets and call orders",
    role: "Hands-on developer",
    period: "Government IT services",
    metric: { value: "40%+", label: "less manual processing" },
    stack: ["Custom applications", "Asset Management", "Business Rules", "Script Includes", "Service Portal"],
    steps: [
      {
        tab: "Brief",
        title: "Too many manual steps",
        body: "A government IT services provider tracked assets and call orders in a custom ServiceNow application, with a lot of the work done by hand.",
        visual: { kind: "chips", groups: [{ title: "The application", items: ["Asset records", "Call orders", "Approvals", "Audit trail"] }] },
      },
      {
        tab: "Build",
        title: "Automate the lifecycle",
        body: "I automated the asset lifecycle with Business Rules and Script Includes, built Service Portal widgets for asset lookup and validation, and implemented Call Order workflows for revisions and approvals.",
        visual: {
          kind: "chips",
          groups: [{ title: "Built", items: ["Lifecycle automation", "Asset lookup widgets", "Call Order workflows", "Audit tracking"] }],
        },
      },
      {
        tab: "Outcome",
        title: "Less typing, better audits",
        body: "Manual processing effort dropped by more than 40% and the application became easier to audit.",
        visual: { kind: "stats", items: [{ value: "40%+", label: "less manual processing" }] },
      },
    ],
  },
];

export function projectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

/* -------------------------------------------------------------- Skills */

export type SkillGroup = { track: Track; id: string; label: string; blurb: string; core: string[]; also: string[]; usedIn: string[]; badges?: string[] };

export const SKILLS: SkillGroup[] = [
  {
    track: "fullstack",
    id: "daily",
    label: "Day to day",
    blurb: "What I reach for first. Java or TypeScript on the server, React or Angular in the browser, PostgreSQL underneath, AWS around it.",
    core: ["Java", "Spring Boot", "TypeScript", "Node.js", "React", "Next.js", "Angular", "PostgreSQL", "AWS"],
    also: ["JavaScript", "Python", "Bash"],
    usedIn: ["opex-genie", "tacnique"],
  },
  {
    track: "fullstack",
    id: "backend",
    label: "Backend",
    blurb: "APIs, queues and batch jobs. I like systems where each step can be watched, retried and explained.",
    core: ["Spring Boot", "Node.js", "REST", "Microservices", "Queue-based processing", "Hibernate/JPA"],
    also: ["GraphQL", "WebSockets", "Kafka", "AWS SQS/SNS", "Drizzle", "Batch processing", "Apache PDFBox"],
    usedIn: ["opex-genie", "tacnique"],
  },
  {
    track: "fullstack",
    id: "frontend",
    label: "Frontend",
    blurb: "Server-rendered React and Next.js, or Angular for data-heavy dashboards. Usually backed by APIs I also wrote.",
    core: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS"],
    also: ["Redux", "NgRx", "shadcn/ui", "CSS Modules", "styled-components", "SCSS"],
    usedIn: ["tacnique", "opex-genie"],
  },
  {
    track: "fullstack",
    id: "cloud",
    label: "Data and cloud",
    blurb: "I own the infrastructure my code runs on: containers, queues, pipelines and the database.",
    core: ["PostgreSQL", "AWS ECS/Fargate", "AWS SQS", "Docker", "GitHub Actions"],
    also: ["MySQL", "Supabase", "pgvector", "Lambda", "S3", "RDS", "Cognito", "CloudWatch", "API Gateway", "GCP Cloud Run", "Terraform", "AWS CodePipeline", "Vercel", "Sentry", "Azure AD SSO"],
    usedIn: ["opex-genie"],
  },
  {
    track: "fullstack",
    id: "ai",
    label: "AI",
    blurb: "LLMs as a working part of a product, with my own orchestration. I also use Claude Code every day as part of how I build.",
    core: ["OpenAI", "LLM data extraction", "Candidate matching and scoring", "Claude Code"],
    also: ["Google Gemini", "pgvector", "Cursor"],
    usedIn: ["tacnique"],
  },
  {
    track: "fullstack",
    id: "quality",
    label: "Quality",
    blurb: "A fix is not finished until it is tested. Find the root cause, fix it, deliver it, prove it.",
    core: ["JUnit", "Mockito", "TDD", "Code review"],
    also: ["SonarQube", "ESLint", "Prettier", "Agile/Scrum"],
    usedIn: ["opex-genie", "technical-lead"],
  },
  {
    track: "servicenow",
    id: "modules",
    label: "Modules",
    blurb: "Four years hands-on across operations, security, risk and custom applications, then leading the team that delivers them.",
    core: ["ITSM", "ITOM", "CMDB", "Discovery", "Service Mapping", "Vulnerability Response", "IRM/GRC"],
    also: ["SOM/COM", "Workplace Service Delivery", "Asset Management", "Service Operations Workspace", "Custom applications"],
    usedIn: ["bank-security", "hotel-service-map", "room-booking"],
    badges: ["Certified System Administrator", "Certified Application Developer", "CIS Data Foundations (CMDB and CSDM)"],
  },
  {
    track: "servicenow",
    id: "platform",
    label: "Platform",
    blurb: "The building blocks I use every day. Out-of-box first, scripted when out-of-box runs out.",
    core: ["Flow Designer", "Business Rules", "Script Includes", "Client Scripts", "ACLs", "UI Builder"],
    also: ["Service Portal", "IntegrationHub", "Scripted REST APIs", "UI Policies", "Transform Maps", "Import Sets", "Update Sets", "MID Server", "Discovery patterns", "Instance clones and patching"],
    usedIn: ["audit-tracking", "asset-lifecycle"],
  },
  {
    track: "servicenow",
    id: "integrations",
    label: "Integrations",
    blurb: "ServiceNow earns its keep when it talks to the systems around it.",
    core: ["Tenable", "Prisma", "ApigeeX", "Salesforce", "Azure AD SSO"],
    also: ["SailPoint", "Datto", "Veeam", "REST", "OAuth"],
    usedIn: ["bank-security", "telecom-orders"],
  },
  {
    track: "servicenow",
    id: "practice",
    label: "Good practice",
    blurb: "Sound data models, tight access rules and builds that survive the next upgrade.",
    core: ["CSDM", "ITIL processes", "ACL and role design", "Code review"],
    also: ["Design reviews", "Agile/Scrum", "Mentoring"],
    usedIn: ["hotel-service-map", "technical-lead"],
  },
  {
    track: "servicenow",
    id: "code",
    label: "Full stack too",
    blurb: "I came to ServiceNow from product engineering, so scripting and integrations are home ground.",
    core: ["JavaScript", "TypeScript", "Java", "REST"],
    also: ["Node.js", "React", "PostgreSQL", "AWS"],
    usedIn: ["opex-genie", "tacnique"],
  },
];

/* --------------------------------------------------------------- About */

export const TIMELINE: { year: string; short: string; title: string; place: string; body: string; href?: string; cta?: string; track?: Track }[] = [
  {
    year: "2017",
    short: "Degree",
    title: "Computer science degree",
    place: "Symbiosis Institute of Technology, India",
    body: "BTech in Computer Science and Engineering. My thesis compared machine learning methods for detecting faults in bearings, and Springer published it.",
  },
  {
    year: "2018",
    short: "Internship",
    title: "First real codebase",
    place: "IMTAC, Oman",
    body: "Interned as a developer and built a housing management system.",
  },
  {
    year: "2019",
    short: "Volunteering",
    title: "A website for Tribus",
    place: "Volunteer",
    body: "Tribus is a non-profit that helps tribal communities sell handmade items. I designed, built and launched its first website, and kept it running.",
  },
  {
    year: "2020",
    short: "Founding engineer",
    title: "Founding engineer",
    place: "Ajackus, Mumbai",
    body: "Joined Ajackus and became one of four engineers who started Tacnique, an AI hiring platform, from an empty repository.",
    href: "/work/tacnique",
    cta: "Open Tacnique",
    track: "fullstack",
  },
  {
    year: "2022",
    short: "Software Engineer",
    title: "Software Engineer",
    place: "Ajackus, Mumbai",
    body: "Promoted, and took on a second world: enterprise ServiceNow. Picked up the platform fast and shipped custom applications for audit and government clients.",
    href: "/work",
    cta: "See the ServiceNow work",
    track: "servicenow",
  },
  {
    year: "2023",
    short: "Senior Engineer",
    title: "Senior Software Engineer",
    place: "Ajackus, Mumbai",
    body: "Became the primary developer of Opex Genie. Started an MSc in Computer Science at Liverpool John Moores University the same year, and finished it in 2024.",
    href: "/work/opex-genie",
    cta: "Open Opex Genie",
    track: "fullstack",
  },
  {
    year: "2024",
    short: "Technical Lead",
    title: "Technical Lead",
    place: "Ajackus, Mumbai",
    body: "Led 15+ engineers across 15 to 20+ client projects at once, and stayed hands-on with architecture and code.",
    href: "/work/technical-lead",
    cta: "See how I lead",
  },
  {
    year: "2026",
    short: "Berlin",
    title: "Berlin",
    place: "Germany",
    body: "Moved to Berlin on purpose. I am here, eligible to work in Germany and available straight away.",
    href: "/contact",
    cta: "Get in touch",
  },
];

export const PRINCIPLES: { title: string; body: string }[] = [
  { title: "Accountable", body: "If I own it, the outcome is mine. Not the ticket, the outcome." },
  { title: "Design first", body: "I own the solution design end to end, so the code has a reason to exist." },
  { title: "Careful when time allows", body: "I aim for perfection whenever there is time for it, and I am honest when there is not." },
  { title: "Last line of defence", body: "On quality and production issues, I am the person it does not get past." },
  { title: "Quick to learn", body: "I went from full stack into ServiceNow and shipped. New technology is something to pick up, not a blocker." },
  { title: "Async by default", body: "Write it down first. Meet live only when it helps." },
];

// How a bug gets fixed. This one really is a sequence.
export const METHOD = ["Understand the issue", "Find the root cause", "Build the fix", "Deliver it", "Test it"];

export const CREDENTIALS: { kind: string; title: string; detail: string }[] = [
  { kind: "Degree", title: "MSc Computer Science", detail: "Liverpool John Moores University, 2023 to 2024. Distributed systems, DevOps and advanced software engineering." },
  { kind: "Degree", title: "BTech Computer Science and Engineering", detail: "Symbiosis Institute of Technology, 2017 to 2020." },
  { kind: "Paper", title: "Published by Springer", detail: "Bearing fault detection using comparative analysis of Random Forest, ANN and autoencoder methods." },
  { kind: "Certificate", title: "ServiceNow Certified System Administrator", detail: "CSA" },
  { kind: "Certificate", title: "ServiceNow Certified Application Developer", detail: "CAD" },
  { kind: "Certificate", title: "ServiceNow CIS, Data Foundations", detail: "CMDB and CSDM" },
];

/* ------------------------------------------------------------- Contact */

export const ROLES = ["Full stack", "Backend", "Frontend", "Tech lead", "ServiceNow", "Something else"];

export const PRACTICAL: Stat[] = [
  { value: "Berlin", label: "Open to relocating within Germany" },
  { value: "Available now", label: "Eligible to work in Germany" },
  { value: "English", label: "Fluent. Actively learning German" },
];

export const LOOKING: Record<Track, string> = {
  fullstack: "I am looking for a senior full stack, backend or hands-on tech lead role.",
  servicenow: "I am looking for a ServiceNow developer or technical lead role, in Berlin or remote.",
};
