import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/oilfield/dashboard";
export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "安全环保 | 智慧油田综合管控平台" },
      { name: "description", content: "安全风险评估、环境监测与预警处置。" },
      { property: "og:title", content: "安全环保 | 智慧油田" },
      { property: "og:description", content: "安全风险评估、环境监测与预警处置。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Dashboard page="safety" />,
});
