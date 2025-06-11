import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function CashBarChart({ legend ,xAxis,yAxis,name1,barWidth,barGap,data,itemStyle,label}) {

    const option = {
        legend: legend,
        grid: {
            left: '3%',
            right: '2%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: xAxis,
        yAxis:yAxis,
        series: [
            {
                name: name1, // Set legend name
                type: 'bar',
                barWidth: barWidth, // Bar width
                barGap: barGap, // Reduce gap between bars
                data: data, // Data
                itemStyle: itemStyle,
                label: label,
            }
        ]
    };

    return (
        <ReactEcharts
            echarts={echarts}
            option={option}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
