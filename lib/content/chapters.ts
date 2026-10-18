export type Visual =
  | { kind: "scope" }
  | { kind: "photo"; src: string; alt: string; caption: string; focus?: [number, number]; zoom?: number }
  | { kind: "extract" }
  | { kind: "opex" }
  | { kind: "flap"; rows: { value: string; label: string }[] }
  | { kind: "route" }
  | { kind: "morph" }
  | { kind: "states" }
  | { kind: "map" }
  | { kind: "scanner" }
  | { kind: "instances" }
  | { kind: "bookings" }
  | { kind: "pitch" };

export type Chapter = {
  id: string;
  years: string;
  title: string;
  role: string;
  story: string[];
  stats: { value: string; label: string }[];
  stack: string[];
  visual: Visual;
};

export const FULL_STACK: Chapter[] = [
  {
    id: "academy",
    years: "2017–20",
    title: "The academy",
    role: "BTech in Computer Science, Symbiosis Institute of Technology",
    story: [
      "My thesis compared Random Forest, ANN and autoencoder models for detecting faults in machine bearings from their vibration signal. Springer published it, and the code on GitHub still collects stars.",
      "On the side I interned as a .NET developer in Oman, building a housing management system in C# and SQL Server, and built the first website for Tribus, an NGO that helps tribal communities sell handmade goods.",
    ],
    stats: [
      { value: "1", label: "Springer paper" },
      { value: "148", label: "GitHub stars on the research code" },
      { value: "1st", label: "website for an NGO" },
    ],
    stack: ["Python", "C#", "SQL Server", "HTML", "CSS"],
    visual: { kind: "scope" },
  },
  {
    id: "debut",
    years: "2020",
    title: "Debut in Mumbai",
    role: "Associate Software Engineer, Ajackus",
    story: [
      "I joined Ajackus in Mumbai in July 2020. My first months were PHP and Laravel on a travel-safety product.",
      "Then a four-person team was formed to build a hiring platform from an empty repository, and I was in it.",
    ],
    stats: [
      { value: "Jul 2020", label: "first professional contract" },
      { value: "6 yrs", label: "at the same club" },
    ],
    stack: ["PHP", "Laravel", "MySQL"],
    visual: {
      kind: "photo",
      src: "/pictures/mumbai.jpg",
      alt: "Marine Drive in Mumbai at dusk, dithered",
      caption: "Marine Drive, Mumbai.",
      focus: [60, 62],
      zoom: 1.7,
    },
  },
  {
    id: "tacnique",
    years: "2020–23",
    title: "Tacnique",
    role: "Founding engineer in a team of four",
    story: [
      "Tacnique is an AI-powered technical hiring platform. We took it from an empty repository to a production SaaS product.",
      "I built the OpenAI resume extraction that turns a CV into a structured profile of skills and keywords, the matching and scoring that lets a client find candidates with the skills they need, and the Next.js frontend that clients use.",
    ],
    stats: [
      { value: "0 → 1", label: "empty repo to production" },
      { value: "+200%", label: "user growth I contributed to" },
      { value: "+20%", label: "revenue growth I contributed to" },
    ],
    stack: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "AWS", "OpenAI"],
    visual: { kind: "extract" },
  },
  {
    id: "opex-genie",
    years: "2023–26",
    title: "Opex Genie",
    role: "Primary developer, end to end",
    story: [
      "Enterprises lose money on telecom bills they cannot read. Opex Genie reads them: carrier PDFs go through a queue and the parsers into a dashboard that shows where the money goes. For most of the project I was the only developer, from the architecture and multi-tenant isolation to AWS and production support.",
      "Then the parser fix. Rows were written one at a time and each bill was read several times. I batched the writes through an in-memory map and read each bill once. Parsing got roughly 200% faster, with the tests to prove it.",
    ],
    stats: [
      { value: "5M+", label: "bill pages processed" },
      { value: "$100M", label: "telecom spend analysed" },
      { value: "~200%", label: "faster parsing after the fix" },
    ],
    stack: ["Java", "Spring Boot", "Angular", "PostgreSQL", "PDFBox", "ECS/Fargate", "SQS", "JUnit"],
    visual: { kind: "opex" },
  },
  {
    id: "lead",
    years: "2024–26",
    title: "Technical lead, hands on",
    role: "Technical Lead, Ajackus",
    story: [
      "I kept writing code while I owned the technical design across full-stack, backend and ServiceNow systems. I set the engineering standards and the code review framework, and ran design reviews and release readiness.",
      "When something broke in a way nobody could explain, it came to me. I also ran more than 50 senior technical interviews and built proofs of concept that helped win new clients.",
    ],
    stats: [
      { value: "95%+", label: "client satisfaction as escalation lead" },
      { value: "50+", label: "senior technical interviews" },
      { value: "60%+", label: "growth in new clients I helped win" },
    ],
    stack: ["Architecture", "Code review", "Design reviews", "Release readiness"],
    visual: {
      kind: "flap",
      rows: [
        { value: "95%", label: "Client satisfaction" },
        { value: "50+", label: "Interviews" },
        { value: "15+", label: "Engineers" },
        { value: "20+", label: "Live projects" },
      ],
    },
  },
  {
    id: "berlin",
    years: "2026",
    title: "Berlin, and what comes next",
    role: "Senior software engineer, based in Berlin",
    story: [
      "In 2026 I moved to Berlin, on purpose. I am eligible to work in Germany, and I am open to exciting opportunities across Germany, Dubai and the rest of the EU.",
      "The work I want is senior full-stack, product, founding or forward deployed engineering, where I own a system from the client's first requirement to the night it breaks. I use Claude Code every day, and I read and own every line it writes.",
    ],
    stats: [
      { value: "BER", label: "home base" },
      { value: "DE", label: "eligible to work in Germany" },
      { value: "EU+", label: "open to Germany, Dubai and the EU" },
    ],
    stack: ["Senior SWE", "Full-stack", "Product engineer", "Founding engineer", "FDE"],
    visual: { kind: "route" },
  },
];

export const SERVICENOW: Chapter[] = [
  {
    id: "switch",
    years: "2020–22",
    title: "Switching positions",
    role: "From full-stack engineer to platform developer",
    story: [
      "Like a winger retrained at centre-back, I moved from full-stack engineering into ServiceNow and learned the position fast: platform architecture, CMDB and CSDM modelling, ACL security and performance.",
      "I built across ITSM, ITOM, Vulnerability Response and custom applications, with out-of-box features where they fit and scripts where they did not. I was promoted to Software Engineer in July 2022.",
    ],
    stats: [
      { value: "4+ yrs", label: "hands-on on the platform" },
      { value: "Jul 2022", label: "promoted to Software Engineer" },
    ],
    stack: ["Glide", "Business Rules", "Script Includes", "Client Scripts", "ACLs"],
    visual: { kind: "morph" },
  },
  {
    id: "custom-apps",
    years: "2022+",
    title: "Building on the platform",
    role: "Custom applications, hands on",
    story: [
      "For a Big Four firm I built parts of their audit framework on ServiceNow: bulk assignment through Scripted REST APIs, notifications for every status change, ACLs across four role levels, and a rebuilt UI Builder workspace with tenant-aware data brokers and live refresh.",
      "For a government IT services company I automated the asset lifecycle and built Call Order workflows for revisions, approvals and audit tracking.",
    ],
    stats: [
      { value: "40%+", label: "less manual processing, government IT" },
      { value: "4", label: "role levels behind the audit ACLs" },
    ],
    stack: ["UI Builder", "Data Brokers", "Scripted REST", "Flow Designer", "Service Portal"],
    visual: { kind: "states" },
  },
  {
    id: "estate",
    years: "2023+",
    title: "Mapping the estate",
    role: "Discovery, Service Mapping and CMDB",
    story: [
      "For a global hospitality group I ran discovery workshops with service owners, then built top-down, tag-based and SaaS service maps, including shared databases, backend APIs and identity providers. I cleaned up the CMDB: wrong classes, duplicates and missing relationships.",
      "For a US bank I wrote custom Discovery patterns for legacy systems, tuned the schedules and chased down MID Server routing gaps. The result was better incident routing and faster change impact analysis.",
    ],
    stats: [
      { value: "3", label: "mapping methods: top-down, tag, SaaS" },
      { value: "CIS", label: "Data Foundations certified" },
    ],
    stack: ["Discovery", "Service Mapping", "CMDB", "CSDM", "MID Server", "Dynamic CI Groups"],
    visual: { kind: "map" },
  },
  {
    id: "security",
    years: "2023+",
    title: "Last line of defence",
    role: "SecOps Vulnerability Response, a US bank",
    story: [
      "I integrated Tenable and Prisma scanners into ServiceNow through REST APIs and transform maps, and fixed the hard part: CVE validation and correlating each vulnerable item with the right configuration item.",
      "I cleared stale and misassigned vulnerable items, automated the remediation workflows, and kept the VR dashboards honest. Alongside it I supported vendor risk work in GRC.",
    ],
    stats: [
      { value: "2", label: "scanners integrated: Tenable, Prisma" },
      { value: "VI ↔ CI", label: "correlation logic rebuilt" },
    ],
    stack: ["Vulnerability Response", "Transform Maps", "REST", "Tenable", "Prisma", "GRC"],
    visual: { kind: "scanner" },
  },
  {
    id: "telecom",
    years: "2023+",
    title: "Governing the instances",
    role: "SOM, COM and access governance, a US telecom",
    story: [
      "A multi-instance telecom platform needed stabilising. I led the order management plugin rollout, set up Azure AD single sign-on across the instances, and scripted out non-SSO roles to cut unnecessary admin access in Test and Prod.",
      "I ran the clones from Prod to Dev, QA and Test, scheduled the Washington and Xanadu patches, connected ApigeeX and Salesforce, and built the order fallout dashboards.",
    ],
    stats: [
      { value: "4", label: "environments kept in step" },
      { value: "SSO", label: "Azure AD on every instance" },
    ],
    stack: ["SOM", "COM", "Azure AD SSO", "OAuth", "ApigeeX", "Salesforce"],
    visual: { kind: "instances" },
  },
  {
    id: "workplace",
    years: "80%",
    title: "Rooms and service desks",
    role: "Workplace Service Delivery and ITSM",
    story: [
      "For a global software company I configured room and space reservations with a full location hierarchy, from region down to room, and wrote the rules that stop double booking.",
      "For an insurance broker I standardised the service catalog, set up Service Operations Workspace and redesigned the incident and change forms, then took it from requirements through UAT to production.",
    ],
    stats: [
      { value: "80%", label: "fewer booking conflicts" },
      { value: "15,310", label: "users on the ITSM rollout" },
    ],
    stack: ["WSD", "Reservation Management", "ITSM", "Service Operations Workspace", "IntegrationHub"],
    visual: { kind: "bookings" },
  },
  {
    id: "captain",
    years: "2024–26",
    title: "Leading the line",
    role: "Technical Lead, ServiceNow",
    story: [
      "I led a ServiceNow team of 15+ engineers across GRC, risk, ITSM, ITOM, SecOps and custom applications, with 15 to 20 enterprise projects live at once, and stayed in the architecture and the code.",
      "The team delivered for a federal defence agency, an aerospace group, an energy company and a retailer. Outcomes included 70% less manual validation and 40% less incident noise. I am CSA, CAD and CIS Data Foundations certified.",
    ],
    stats: [
      { value: "15+", label: "engineers" },
      { value: "15–20+", label: "concurrent projects" },
      { value: "95%+", label: "client satisfaction" },
    ],
    stack: ["IRM/GRC", "ITSM", "ITOM", "SecOps", "CSM", "Custom apps"],
    visual: { kind: "pitch" },
  },
];
