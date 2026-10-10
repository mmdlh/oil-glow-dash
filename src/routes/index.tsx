import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/oilfield/dashboard';
export const Route = createFileRoute('/')({
 head: () => ({meta: [{title:'油田总览 | 智慧油田综合管控平台'},{name:'description',content:'全域油田生产运营总览，实时产量、油井运行与安全监测。'},{property:'og:title',content:'油田总览 | 智慧油田'},{property:'og:description',content:'全域感知、协同运营、智慧决策的油田综合管控平台。'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: () => <Dashboard page="overview" />,
});
