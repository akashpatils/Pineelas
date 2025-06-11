import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function DoubleLinechartwithgradient({ grid, data,legend,yAxisdata, label,label2,axisLabel,name1,name2,lineStyle, areaStyle, xAxisdata,itemStyle2,itemStyle,symbolSize2,showsymbol2,symbolSize,showsymbol,symbol,symbol2, smooth, dataZoom = null, tooltip = null, loading = false, smooth2, lineStyle2, areaStyle2, data2 }) {

    const options = {
        legend: legend,
        grid: grid,
        xAxis: xAxisdata,
        dataZoom: dataZoom,
        tooltip: tooltip,
        yAxis: yAxisdata,
        series: [
            {
                name: name1,
                type: 'line',
                smooth: smooth,
                lineStyle: lineStyle,
                areaStyle: areaStyle,
                showSymbol: showsymbol,
                symbolSize: symbolSize,
                symbol: symbol,
                itemStyle: itemStyle,
                data: data.value,
                label:label
            },
            {
                name: name2,
                type: 'line',
                smooth: smooth2,
                label:label2,
                lineStyle: lineStyle2,
                areaStyle: areaStyle2,
                showSymbol: showsymbol2,
                symbolSize: symbolSize2,
                symbol: symbol2,
                itemStyle: itemStyle2,
                data: data.value2
            }
        ]
    };

    // console.log("options",options)

    return (
        <ReactEcharts
            // echarts={echarts}
            opts={{ renderer: 'svg' }}
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