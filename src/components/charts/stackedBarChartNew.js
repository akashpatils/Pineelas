import React from 'react';
import ReactECharts from 'echarts-for-react';
import { capitalizeWords } from './doublelinechart2';
import { convertFormattedNumber } from '../utlis';

const StackedBarChartNew = ({grid, xaxisLabel, barWidth, interval, yaxisLabel, ysplitLine, yaxisLine,  data1,  data2, yaxisLine2, ysplitLine2, yaxisLabel2, interval2, yaxisshow = false, label }) => {

  const option = {
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 15,
    },
    confine: true

    },
    legend: {
      show: true,
      type: 'scroll',
      textStyle: { color: "#2C363F", fontSize: 11 },
      bottom: '0%',
      left:10,
      itemWidth: 10,
      itemHeight: 10,
      data: ["Import", "Export"]
    },
    grid: grid,
    xAxis: [{
      type: 'value',
      // min: min,
      // max: max,
      interval: interval,
      axisLabel: yaxisLabel,
      splitLine: ysplitLine,
      axisLine: yaxisLine
    },
    {
      show: yaxisshow,
      type: 'value',
      // min: min2,
      // max: max2,
      interval: interval2,
      axisLabel: yaxisLabel2,
      splitLine: ysplitLine2,
      axisLine: yaxisLine2
    }
    ],
    yAxis:{
      show: xaxisLabel,
      type: "category",
      data: label,
      axisLabel: {
        color: "#000", 
        fontSize: 11,
        fontWeight: "bold",
        margin: 40,
        interval: 0, 
        formatter: function (value) {
          return value.length > 0 ? value.substring(0, 12) + "..." : value;
        },
      },
      splitLine: { 
        show: true, 
        lineStyle: { color: "#ffffff" }
      },
      axisLine: { 
        show: true, 
        lineStyle: { color: "#ffffff" }
      },
    },
    series: [
      {
        name: "Import",
        stack: "total",
        type: "bar",
        data: data1,
        barWidth: barWidth,
        barGap : '40%',
        itemStyle: {
          color: "#73292C",
          borderRadius: [0, 0, 0, 0],
        },
        emphasis:{
          focus: 'self'
        },
        label: {
          show: true,
          position: "left",
          color: "#000", 
          fontSize: 10,
          fontWeight: "bold",
          formatter: ({value}) => {
            return value > 0 ? convertFormattedNumber(value) : ''
          },
          rich: {
          a: {
            padding:  [0, 6, 6, 0], 
            fontSize: 14,
          },
        }
        }
      },
      {
        name: "Export",
        stack: "total",
        type: "bar",
        data: data2,
        barWidth: 40,
        itemStyle: {
          color: "#11B87C",
          borderRadius: [0, 4, 4, 0],
        },
        emphasis:{
          focus: 'self'
        },
        label: {
          show: true,
          position: "right",
          color: "#000", 
          fontSize: 10,
          fontWeight: "bold",
          formatter: ({value})=> {
            return value > 0 ? convertFormattedNumber(value) : ''
          },
          rich: {
          a: {
            padding: [0, 6, 0, 6], 
            fontSize: 14,
          },
        }
        },
      }
    ],
    dataZoom: data1?.length > 5 ? [
      {
        type: 'slider',
        yAxisIndex: 0,
        start: 0,
        end: 4 / data1?.length * 100,
        height: '90%',
        zoomLock: true,
        width: '3%',
        bottom: '10%',
        showDetail: false,
        brushSelect: false
        // right: '0%'
      }
    ] : []

  };

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: '100%' }}
    />
  )
};

export default StackedBarChartNew;
