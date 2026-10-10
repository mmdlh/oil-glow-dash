import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/oilfield/dashboard";
export const Route = createFileRoute("/production")({
  head: () => ({
    meta: [
      { title: "生产运行 | 智慧油田综合管控平台" },
      { name: "description", content: "生产计划、区块产能与运行效率监测。" },
      { property: "og:title", content: "生产运行 | 智慧油田" },
      { property: "og:description", content: "生产计划、区块产能与运行效率监测。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Dashboard page="production" />,
});
