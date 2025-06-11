import React from 'react'
import ReactEcharts from 'echarts-for-react';
import * as echarts from "echarts";

export const capitalizeWords = (str) => {
  // if (!str) return "";
  // return str
  //     ?.split(" ") 
  //     ?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
  //     ?.join(" "); 
  if (!str) return "";
  return str
    .split(/(\W+)/) // splits by non-word characters but keeps them (e.g., commas, spaces)
    .map(word => /^[a-zA-Z]/.test(word)
      ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      : word
    )
    .join('');
};


export default function DoubleLineChart2({importExportData}) {
 const option = {
    legend: {
      show: false,
        bottom: 2,
        padding:[0,0,0,10],
        left: 'start',
        itemGap: 4,
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
            color: '#828A91',
            fontSize: 10
          },
          data: [ 'Import','Export'],
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    grid: {
      top: "10%",
      left: "5%",
      right: "10%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: { color: "rgba(255,255,255,0.14)" },
      },
      axisLine: { show: true,
        lineStyle:{
          color:'#BECDE3'
        }
       },
      axisTick: { show: false },
      axisLabel: {
        color: "#2C363F",
        fontSize: 12,
        overflow: "break",
        interval: 0,
        formatter: (value)=>{
           return capitalizeWords(value);
        }
      },
      // data: ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug"],
      data: importExportData?.month,
    },
    yAxis: {
      type: "value",
      splitLine: { show: true,
        lineStyle:{
          color:'#F1EFEF'
        }
       },
      axisLabel: {
        show: true,
        color: "#2C363F",
        fontSize: 12,
      },
      // min: 0,
      // max: 25,
      // interval: 5,
    },
    series: [
      {
        name: "Import",
        type: "line",
        symbolSize: 5,
        symbol: "none",
        smooth:true,
        itemStyle: { color: "#263040" , borderWidth: 2, },
        lineStyle: { color: "#057a55", width: 1 ,type:'dashed'},
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#91bfae" },
            { offset: 1, color: "rgba(229, 241, 232, 0.10)" },
          ]),
        },
        // data: [20, 15, 25, 20, 15, 21,15,20],
        data: importExportData?.import,
        label: {
          show: true,
          position: "top",
          color: "#19212A",
          fontSize: 8,
          distance: 3,
        },
      },
      {
        name: "Export",
        type: "line",
        symbolSize: 5,
        symbol: "none",
        smooth:true,
        itemStyle: { color: "#73292C" ,  borderWidth: 2, },
        lineStyle: { color: "#61503f", width: 1,type:'dashed' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#d6c295" },
            { offset: 1, color: "rgba(229, 241, 232, 0.50)" },
          ]),
        },
        // data: [10, 12, 15, 20, 15, 10,15,20],
        data: importExportData?.export,
        label: {
          show: true,
          position: "top",
          color: "#19212A",
          fontSize: 8,
          distance: 2,
        },
      },
    ],
  };


  return (
     <ReactEcharts
                option={option}
                opts={{renderer:'svg'}}
                style={{ width: '100%', height: '100%' }}
            />
  )
}
