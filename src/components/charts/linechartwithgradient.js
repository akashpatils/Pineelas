import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function Linechartwithgradient({ grid, data, lineStyle, areaStyle, xAxisdata,smooth, dataZoom = null, tooltip = null, loading = false }) {

    const options = {
        legend: {show: false},
        grid: grid,
        xAxis: xAxisdata,
        dataZoom: dataZoom,
        tooltip: tooltip,
        yAxis: {
            type: 'value',
            splitLine: { show: false },
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
        },
        series: [
            {
                name: 'Students',
                type: 'line',
                smooth: smooth,
                symbol: 'none',
                symbolSize: 100, 
                lineStyle: lineStyle,
                areaStyle: areaStyle,
                data: data.value
            }
        ]
    };

    // console.log("options",options)

    return (
        <ReactEcharts
            // echarts={echarts}
            opts={{renderer:'svg'}}
            option={options}
            style={{ width: '100%', height: '100%' }}
            showLoading={loading}
            loadingOption={{
                text: "",
                color: 'grey',
            }}
        />
    )
};