import React from 'react';
import ReactEcharts from 'echarts-for-react';
// import { toMillionWithNoDollarM } from '../utlis';

export default function DualChartBar({
    series,
    grid,
    container,
    xAxisdata,
    yAxisdata,
    data1,
    barWidth,
    itemStyle1,
    label,
    type,
    areaStyle,
    lineStyle,
    symbol,
    symbolSize,
    itemStyle2,
    data2,
    name1,
    name2,
    showsymbol,
    legend,
    tooltip,
    displayMaximiseShipping
}) {
    const option = {
        animation: false,
        tooltip: {
            // trigger: 'axis',
            formatter: function(params){
                
                return `${params?.name} <br> ${params?.seriesName}: ${params?.value?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}`
            }
        },
        legend: legend,
        grid: {
            ...grid,
            left: displayMaximiseShipping ? '10%' : '20%',
            right: displayMaximiseShipping ? '5%' : '10%',
            bottom: '30%',
            top: '10%'
        },
        xAxis: xAxisdata,
        yAxis: yAxisdata,
        series: series
    };

    return (
        <ReactEcharts
            option={option}
            opts={{ renderer: 'svg' }}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
