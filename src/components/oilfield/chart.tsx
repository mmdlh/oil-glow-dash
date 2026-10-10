import { useEffect, useRef } from 'react';
import type { EChartsOption } from 'echarts';

export type ChartKind = 'production' | 'bar' | 'donut' | 'radar' | 'energy' | 'pressure' | 'horizontal';
export function OilChart({ kind, period = 'week', compact = false }: { kind: ChartKind; period?: string; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    import('echarts').then((ec) => {
      if (cancelled || !ref.current) return;
      const theme = getComputedStyle(document.documentElement);
      const token = (key: string) => theme.getPropertyValue(key).trim();
      const colors = ['--chart-1','--chart-2','--chart-3','--chart-4','--chart-5'].map(token);
      const muted = token('--muted-foreground');
      const gridColor = token('--border');
      const chart = ec.init(ref.current);
      const gradient = (color: string, vertical = true) => new ec.graphic.LinearGradient(0,0,vertical ? 0 : 1,1,[{offset:0,color},{offset:1,color: token('--chart-fade')}]);
      const names = period === 'month' ? ['10/01','10/05','10/10','10/15','10/20','10/25','10/30'] : ['10/04','10/05','10/06','10/07','10/08','10/09','10/10'];
      const axis = { axisLine: {show:false}, axisTick:{show:false}, axisLabel:{color:muted,fontSize:10}, splitLine:{lineStyle:{color:gridColor,type:'dashed' as const}} };
      const common: EChartsOption = { color:colors, textStyle:{fontFamily:'"IBM Plex Sans", "Microsoft YaHei", sans-serif'}, animationDuration:900, tooltip:{trigger:'axis', backgroundColor:token('--popover'), borderColor:gridColor, textStyle:{color:token('--foreground')}}, legend:{top:8,right:6,itemWidth:10,itemHeight:7,textStyle:{color:muted,fontSize:10}}, grid:{top:48,left:44,right:18,bottom:28}, xAxis:{type:'category',data:names,...axis,splitLine:{show:false}}, yAxis:{type:'value',...axis} };
      let override: EChartsOption;
      switch(kind) {
        case 'production': override = { yAxis:{...axis,type:'value',min:800,max:1600,interval:200}, series:[{name:'原油产量',type:'line',smooth:true,symbol:'circle',symbolSize:5,data:period==='month'?[1100,1230,1160,1300,1380,1260,1490]:[1090,1190,1150,1300,1240,1390,1460],lineStyle:{width:3,color:colors[0],shadowColor:colors[0],shadowBlur:8},areaStyle:{color:gradient(colors[0])}},{name:'计划产量',type:'line',smooth:true,symbol:'none',data:[1000,1110,1120,1200,1220,1300,1350],lineStyle:{type:'dashed',width:2,color:colors[2]}}] }; break;
        case 'donut': override = { tooltip:{trigger:'item'},xAxis:{show:false},yAxis:{show:false},grid:undefined,legend:{show:false},series:[{type:'pie',radius:['62%','82%'],center:['50%','49%'],avoidLabelOverlap:true,label:{show:false},itemStyle:{borderRadius:5,borderWidth:3,borderColor:token('--card-solid'),shadowBlur:12,shadowColor:token('--chart-shadow')},data:[{value:42,name:'第一采油区'},{value:28,name:'第二采油区'},{value:18,name:'第三采油区'},{value:12,name:'第四采油区'}]}],graphic:[{type:'text',left:'center',top:'38%',style:{text:'1,286',fontSize:28,fontWeight:600,fill:token('--foreground')}},{type:'text',left:'center',top:'57%',style:{text:'总产量 / 吨',fontSize:11,fill:muted}}] }; break;
        case 'radar': override = {xAxis:{show:false},yAxis:{show:false},legend:{show:false},tooltip:{trigger:'item'},radar:{radius:'64%',center:['50%','53%'],indicator:[{name:'生产效率',max:100},{name:'安全指数',max:100},{name:'设备状态',max:100},{name:'能源利用',max:100},{name:'环境指标',max:100}],axisName:{color:muted,fontSize:10},splitArea:{areaStyle:{color:[token('--radar-fill'),token('--chart-fade')]}}},series:[{type:'radar',symbolSize:4,data:[{name:'综合指标',value:[92,97,86,89,96],areaStyle:{color:colors[0],opacity:.2},lineStyle:{width:2}}]}]}; break;
        case 'horizontal': override = {grid:{top:22,left:65,right:35,bottom:20},legend:{show:false},xAxis:{type:'value',...axis},yAxis:{type:'category',data:['一号站','二号站','三号站','四号站'],...axis,splitLine:{show:false}},series:[{type:'bar',barWidth:14,data:[{value:92,itemStyle:{color:colors[0]}},{value:86,itemStyle:{color:colors[1]}},{value:78,itemStyle:{color:colors[2]}},{value:95,itemStyle:{color:colors[3]}}],itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',color:muted,formatter:'{c}%'}}]}; break;
        case 'energy': override = {series:[{name:'用电量',type:'bar',barWidth:15,itemStyle:{color:gradient(colors[1]),borderRadius:[4,4,0,0]},data:[520,460,580,450,510,390,420]},{name:'能耗目标',type:'line',smooth:true,symbolSize:4,lineStyle:{width:2},data:[490,480,510,470,460,450,440]}]}; break;
        case 'pressure': override = {series:[{name:'井口压力',type:'line',smooth:true,symbol:'none',lineStyle:{width:3},areaStyle:{color:gradient(colors[0])},data:[18,22,19,25,21,24,23]},{name:'管线压力',type:'line',smooth:true,symbol:'none',lineStyle:{width:2},data:[15,16,15,19,17,18,17]}]}; break;
        default: override = {series:[{name:'实际产量',type:'bar',barWidth:14,itemStyle:{color:gradient(colors[0]),borderRadius:[4,4,0,0],shadowBlur:6,shadowColor:token('--chart-shadow')},data:[780,950,890,1140,1050,1190,1286]},{name:'目标产量',type:'bar',barWidth:14,itemStyle:{color:gradient(colors[2]),borderRadius:[4,4,0,0]},data:[850,900,950,1000,1100,1150,1200]}]};
      }
      chart.setOption({...common,...override}, {notMerge:true});
      const observer = new ResizeObserver(() => chart.resize()); observer.observe(ref.current);
      dispose = () => { observer.disconnect(); chart.dispose(); };
    });
    return () => { cancelled = true; dispose?.(); };
  },[kind,period]);
  return <div ref={ref} className={compact ? 'oil-chart compact' : 'oil-chart'} aria-label={`${kind}数据图表`} />;
}
