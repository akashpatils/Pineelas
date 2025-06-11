import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function Teacherbarchart({legend,grid,min,max,axisLabel,borderRadius1,splitLine,xAxisLine,yAxisLine,axisLabel1,axisTick, interval, yAxisData, name1,label1, data1,color1,axisLabel2,axisTick2,yAxisLine2,yAxisData2,backgroundStyle}) {

    const option = {
        legend: legend,
        grid: grid,
        xAxis: {
            type: 'value',
            min: min,
            max: max,
            interval: interval,
            axisLabel: axisLabel,
            splitLine: splitLine,
            axisLine: xAxisLine,
        },
        yAxis: [{
            type: 'category',
            axisLabel: axisLabel1,
            axisTick: axisTick,
            axisLine: yAxisLine,
            data: yAxisData
        },
        {
            type: 'category',
            axisLabel: axisLabel2,
            axisTick: axisTick2,
            axisLine: yAxisLine2,
            data: yAxisData2
        }
    ],
        series: [
            {
                name: name1,
                stack: 'a',
                type: 'bar',
                showBackground: true,
                backgroundStyle: backgroundStyle,
                label: label1,
                itemStyle: {
                    color: color1,
                    borderRadius: borderRadius1 
                },
                data: data1
            },
        ]
    };

    return (
        <ReactEcharts
            option={option}
            style={{ width: '100%', height: '100%' }}
        />
    )
}
