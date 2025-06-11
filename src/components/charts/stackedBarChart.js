import React from 'react';
import ReactECharts from 'echarts-for-react';

const StackedBarChart = ({legend,grid,xaxisLabel,xaxisTick,xaxisLine,xAxisdata,min,max,interval,yaxisLabel,ysplitLine,yaxisLine,name1,label1,itemStyle1,data1,name2,label2,itemStyle2,data2,name3,label3,itemStyle3,data3,name4,label4,itemStyle4,data4}) => {
    const option = {
      legend: legend,
      grid: grid,
      xAxis: {
        type: 'category',
        axisLabel: xaxisLabel,
        axisTick: xaxisTick,
        axisLine: xaxisLine,
        data: xAxisdata
      },
      yAxis: {
        type: 'value',
        min: min,
        max: max,
        interval: interval,
        axisLabel: yaxisLabel,
        splitLine: ysplitLine,
        axisLine: yaxisLine
      },
      series: [
        {
          name: name1,
          stack: 'a',
          type: 'bar',
          label: label1,
          itemStyle: itemStyle1,
          data: data1
        },
        {
          name: name2,
          stack: 'a',
          type: 'bar',
          label: label2,
          itemStyle: itemStyle2,
          data: data2
        },
        {
            name: name3,
            stack: 'a',
            type: 'bar',
            label: label3,
            itemStyle: itemStyle3,
            data: data3
          },
          {
            name: name4,
            stack: 'a',
            type: 'bar',
            label: label4,
            itemStyle: itemStyle4,
            data: data4
          },
      ],
    };

  return (
    <ReactECharts
        option={option}
        style={{ width: '100%', height: '100%' }}
    />
)
};

export default StackedBarChart;
