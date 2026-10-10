import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/oilfield/dashboard';
export const Route = createFileRoute('/energy')({
 head: () => ({meta: [{title:'能源管理 | 智慧油田综合管控平台'},{name:'description',content:'能源消耗、清洁能源与碳减排分析。'},{property:'og:title',content:'能源管理 | 智慧油田'},{property:'og:description',content:'能源消耗、清洁能源与碳减排分析。'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: () => <Dashboard page="energy" />,
});
