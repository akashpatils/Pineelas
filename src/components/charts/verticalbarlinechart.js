import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';


export default function VerticalBarLineChart({ legend, name1, name2, name3, yAxisIndex, symbolSize, itemStyle3, symbol, lineStyle, grid, barWidth, barWidth2, barGap, barGap2, barCategoryGap, barCategoryGap2, xAxixdata, yAxixdata, color1, color2, lable, itemStyle, lable2, itemStyle2, data2, data3 }) {
  // prettier-ignore
  const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 100], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 105], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 109], ["2000-06-20", 106], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
  const dateList = data.map(function (item) {
    return item[0];
  });
  const valueList = data.map(function (item) {
    return item[1];
  });

  const option = {

    tooltip: {
      show:false,
      trigger: 'axis'
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.14)'
          }
        },
        axisLabel: {
          show: true,
          color: "#5E5E5E",
          fontSize: 15,
          fontWeight:"Work Sans, sans-serif",
          width: 150,
          overflow: "break",
          interval: 0,
          lineHeight:16
        },
        axisLine: { show: false },
        data: ['Bulk Container', 'Break Bulk', 'Container\n Vessel', 'US Navy', 'Others'],
      },
      {
        data: dateList,
        axisTick: { show: false },
        axisLabel: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },  boundaryGap: false,
        gridIndex: 1
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
        
      },

      {
        gridIndex: 1,
        splitLine: { show: false },
        axisLabel: { show: false },
        axisLine: { show: false },
      },
      {
        type: 'value',
        min: 4200,
        max: 4400,
        interval: 100,
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.14)'
          }
        },
        axisLabel: {
          show: true,
          color: "#5E5E5E",
          fontSize: 16,
          fontWeight:"Work Sans, sans-serif",
          width: 90,
          overflow: "break",
          interval: 0,
          formatter: "${value}",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.14)'
          }
        },
      },
    ],
    grid: [
      {
        bottom: '25%',
        top:'5%',
        left:'2%',
        right:'10%',
      },
      {
        top: '5%',
        left:'2%',
      }
    ],
    series: [
      {
        data: [1500, 1000, 500, 1200, 2000],
        type: 'bar',
        itemStyle: { borderRadius: [8, 8, 0, 0] },
        color: '#213434'
      },
      {
        type: 'line',
        smooth: 'true',
        showSymbol: false,
        lineStyle: {
          color: "#38F0BC",
          type: 'dashed',
          width: 2,
        },
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  };

  return (
    <ReactEcharts
      option={option}
      opts={{ renderer: 'svg' }}
      style={{ width: '100%', height: '100%' }}
    />
  )
};