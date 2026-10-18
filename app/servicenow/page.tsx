import { Reveal } from "@/components/shell/Reveal";
import type { Metadata } from "next";
import { Story } from "@/components/story/Story";
import { SERVICENOW } from "@/lib/content/chapters";

export const metadata: Metadata = {
  title: "ServiceNow, page 300",
  description: "From developer to technical lead: four years of hands-on ServiceNow across ITOM, SecOps, GRC, ITSM and custom apps.",
};

export default function ServiceNowPage() {
  return (
    <>
      <Story stream="ServiceNow" chapters={SERVICENOW} finale={{ href: "/squad", label: "Meet the squad" }} />
      <Reveal />
    </>
  );
}
