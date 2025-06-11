import React from 'react'
import ReactEcharts from 'echarts-for-react';



export default function TopLinesChart({grid,xAxisdata,yAxisdata,data1,barWidth,itemStyle1,label,type,areaStyle,lineStyle, symbol,symbolSize,itemStyle2,data2, name1, name2,showsymbol,legend,tooltip}) {

    const  option = {
      tooltip:tooltip,
        grid: grid,
       legend:legend,
        xAxis: xAxisdata,
        yAxis: yAxisdata,
        series: [
          {
            name:name1,
            data: data1,
            type: 'bar',
            barWidth: barWidth,
            itemStyle: itemStyle1,
            label: label,



          },
          {
            name:name2,
            data: data2,
            type: 'line',
            showSymbol:showsymbol,
            symbolSize: symbolSize,
            symbol:symbol,
            itemStyle: itemStyle2,
            lineStyle:lineStyle,
            areaStyle:areaStyle,
          }


        ]
      };


    return (
        <ReactEcharts
            option={option}
            opts={{renderer:'svg'}}
            style={{ width: '100%', height: '100%' }}
        />
    )
}


