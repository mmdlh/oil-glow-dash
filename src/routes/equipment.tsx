import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/oilfield/dashboard';
export const Route = createFileRoute('/equipment')({
 head: () => ({meta: [{title:'设备管理 | 智慧油田综合管控平台'},{name:'description',content:'设备健康、维护工单与运行效率分析。'},{property:'og:title',content:'设备管理 | 智慧油田'},{property:'og:description',content:'设备健康、维护工单与运行效率分析。'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: () => <Dashboard page="equipment" />,
});
