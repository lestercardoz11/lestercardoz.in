// Teletext page 302 was the football results. This page borrows the format.
export const RESULTS: { pre?: string; count: number; post: string; label: string; where: string }[] = [
  { count: 5, post: "M+", label: "bill pages processed", where: "Opex Genie" },
  { pre: "$", count: 100, post: "M", label: "telecom spend analysed", where: "Opex Genie" },
  { pre: "~", count: 200, post: "%", label: "faster bill parsing", where: "Opex Genie" },
  { count: 200, post: "%", label: "user growth I contributed to", where: "Tacnique" },
  { count: 80, post: "%", label: "fewer booking conflicts", where: "Global software company" },
  { count: 40, post: "%+", label: "less manual processing", where: "Government IT services" },
  { count: 15310, post: "", label: "users on an ITSM rollout", where: "Insurance broker" },
  { count: 95, post: "%+", label: "client satisfaction across 15 to 20+ live projects", where: "Technical lead" },
];

export const HONOURS: { year: string; title: string; detail: string; kind: "cup" | "shield" | "medal" | "book" }[] = [
  {
    year: "2023–24",
    title: "MSc Computer Science",
    detail: "Liverpool John Moores University. Distributed systems, DevOps, advanced software engineering.",
    kind: "cup",
  },
  {
    year: "2017–20",
    title: "BTech Computer Science",
    detail: "Symbiosis Institute of Technology, India. Thesis on bearing fault detection.",
    kind: "shield",
  },
  {
    year: "Springer",
    title: "Published paper",
    detail: "Bearing fault detection: Random Forest, ANN and autoencoders compared.",
    kind: "book",
  },
  {
    year: "ServiceNow",
    title: "Certified System Administrator",
    detail: "CSA. The platform from the administrator's side.",
    kind: "medal",
  },
  {
    year: "ServiceNow",
    title: "Certified Application Developer",
    detail: "CAD. Scoped applications, scripting and the developer toolkit.",
    kind: "medal",
  },
  {
    year: "ServiceNow",
    title: "CIS Data Foundations",
    detail: "Certified Implementation Specialist for CMDB and CSDM.",
    kind: "medal",
  },
];
