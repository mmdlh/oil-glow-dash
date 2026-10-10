import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/oilfield/dashboard';
export const Route = createFileRoute('/wells')({
 head: () => ({meta: [{title:'油井监测 | 智慧油田综合管控平台'},{name:'description',content:'油井全域分布、井口压力与运行档案。'},{property:'og:title',content:'油井监测 | 智慧油田'},{property:'og:description',content:'油井全域分布、井口压力与运行档案。'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: () => <Dashboard page="wells" />,
});
