import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function RevenueBarChart({ grid, label1, label2, min, max, data, color1, color2 }) {
  const option = {
    grid: {
      top: 10,
      bottom: 55,
      left: 15,
      right: 15
    },
    xAxis: {
      type: 'value',
      position: 'bottom',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#40444f',
        }
      },
      axisLine: {
        show: true,
        color: '#c4c3c2',
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: 10,
          fontWeight: 'normal',
          color: '#bfbfbd',
        },
        formatter: function (value) {

          if (value === -15) {
            return value + '\nDebit';
          } else if (value === 15) {
            return value + '\nCredit';
          }
          return value;
        },
      },
      min: -15,
      max: 15,
      interval: 5,
    },
    yAxis: {
      type: 'category',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: false,
      },
      data: ['Other Income', 'IT Turnover', 'Revenue Turnover', 'Cost of Sales'],
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          fontSize: 10,
          fontWeight: 'light',
          color: '#2a3022',
        },
      },
    },
    series: [
      {
        name: 'Cost',
        type: 'bar',
        stack: 'Total',
        barWidth: 25,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}',
          textStyle: {
            fontSize: 11,
            fontWeight: 'lighter',
            color: '#d3d7db',
          }
        },
        itemStyle: {
          normal: {
            color: function (params) {
              if (params.dataIndex === 0 || params.dataIndex === 3) {
                return new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                  { offset: 0, color: '#25201611' },
                  { offset: 1, color: '#8B7754' },
                ]);
              } else if (params.dataIndex === 1 || params.dataIndex === 2) {
                return new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                  { offset: 0, color: '#C6525778' },
                  { offset: 1, color: '#60272A08' },
                ]);
              }
            },
            barBorderRadius: [3, 3, 3, 3],
          },
        },
        data: [
          { value: 11 },
          { value: -10.5 },
          -14,
          13,
        ],
      },
    ],
  };

  return (
    <ReactEcharts
      option={option}
      opts={{ renderer: 'svg' }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}


