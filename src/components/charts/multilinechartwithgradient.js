import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function MultiLinechartwithgradient({ grid, data, name1, name2, lineStyle, lineStyle2, smooth2, areaStyle, label, xAxisdata, xAxisdata2, yAxis2, smooth }) {

    const options = {
        legend: { show: false },
        grid: grid,
        xAxis: xAxisdata,
        // xAxis: xAxisdata2,
        yAxis: [
            { type: 'value',
                axisLabel: { show: false },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255, 255, 255, 0.14)",
                }
            },
            min: 3900,
            max: 4400,
            interval: 100,
            data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"]

         },
            {
                type: 'value',
                boundaryGap: [0, '30%'],
                min: 3900,
                max: 4400,
                interval: 100,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.14)",
                    }
                },
                axisLabel: { show: true,
                    color: "#5E5E5E",
                    fontSize: 13,
                    fontWeight:500,
                    formatter: '$ {value}'
                 },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.14)",
                    }
                },
                axisTick: { show: false },
                // data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"]
            },
        ],
        series: [
            {
                name: name1,
                type: 'line',
                smooth: smooth,
                // stack:'all',
                symbol: 'none',
                symbolSize: 100,
                lineStyle: lineStyle,
                areaStyle: areaStyle,
                data: data.value
            },
            {
                name: name2,
                type: 'line',
                smooth: smooth2,
                // stack:'all',
                symbol: 'none',
                symbolSize: 100,
                lineStyle: lineStyle2,
                data: data.value2
            }
        ]
    };

    return (
        <ReactEcharts
            opts={{ renderer: 'svg' }}
            option={options}
            style={{ width: '100%', height: '100%' }}
        />
    )
};