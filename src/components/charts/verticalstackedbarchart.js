import React from "react";
import ReactEcharts from "echarts-for-react";
import { color } from "echarts";
import { toMillion } from "../utlis";

export default function Verticalstackedbarchart(props){
  // const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

  // const categories = [
  //   { name: 'Repair&Maintenance Svcs', color: '#752e3c' },
  //   { name: 'Software-Purchased', color: '#d06b4f' },
  //   { name: 'Prepaid Expenses', color: '#e1a84b' },
  //   { name: 'Operating Supplies Exp', color: '#c49a6c' },
  //   { name: 'Training and Education Co...', color: '#caa85e' },
  //   { name: 'Professional Services', color: '#94a964' },
  //   { name: 'Contract Services-Other', color: '#7fa98e' },
  //   { name: 'Others', color: '#5b8c9b' },
  //   { name: 'Other Contractual Svcs', color: '#a94442' },
  // ];
  

  // const rawData = {
  //   'Repair&Maintenance Svcs': [0.4, 0.5, 0.5, 0.3, 0.8, 1.0],
  //   'Software-Purchased': [0.2, 0.3, 0.3, 0.2, 0.6, -0.2],
  //   'Prepaid Expenses': [0.1, 0.2, 0.3, 0.2, 0.4, 0.3],
  //   'Operating Supplies Exp': [0.3, 0.4, 0.4, 0.3, 0.5, 0.4],
  //   'Training and Education Co...': [0.2, 0.3, 0.2, 0.1, 0.3, 0.2],
  //   'Professional Services': [0.2, 0.3, 0.4, 0.3, 0.5, 0.4],
  //   'Contract Services-Other': [0.1, 0.2, 0.3, 0.2, 0.4, 0.3],
  //   'Others': [0.1, 0.2, 0.3, 0.4, 0.3, 0.2],
  //   'Other Contractual Svcs': [0.2, 0.2, 0.2, 0.2, 0.3, 0.4],
  // };
  
  const series = Object.entries(props.seriesData ?? {}).map(([name, data]) => ({
    name,
    type: 'bar',
    barWidth: '50%',
    stack: 'total',
    // itemStyle: {
    //   color: cat.color,
    // },
    emphasis: {
      focus: 'series',
    },
    data: data.map(row => {
      return {
        ...row,
        value: row.ACTUAL_SPEND ?? null
      }
    }),
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'none' },
      formatter: params =>
        params
          .map(p => `${p.seriesName}: $${p.value.toFixed(2)}M`)
          .join('<br/>'),
    },
    legend: {
      type: 'scroll',
      bottom: 0,
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
    },
    grid: {
      left: '7%',
      right: '5%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: props.labels ?? [],
      axisLine: {show: true},
      splitLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        color: '#333'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        // formatter: '${value}M',
        formatter: value => toMillion(value),
        color: '#333'
      },
      // interval: 0.5,
      // max: 2.5,
      axisLine: {show: true},
      splitLine: {show: false},
      name: "Amount in $",
      nameLocation: "middle",
      nameRotate: 90,
      nameGap: 50,
      nameTextStyle: {
          fontSize: 12,
          color: '#333',
          fontWeight: 500
      },
    },
    color: ['#752e3c', '#d06b4f', '#e1a84b', '#c49a6c', '#caa85e', '#94a964', '#7fa98e', '#5b8c9b', '#a94442'],
    series,
  };
  
  return (
    <ReactEcharts
      option={option}
      opts={{ renderer: "svg" }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
