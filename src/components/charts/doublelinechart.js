import React from 'react'
import ReactEcharts from 'echarts-for-react';
import * as echarts from "echarts";
// import { toMillionWithNoDollarM } from '../utlis';

export default function DoubleLineChart({name ,data,filterValue, grid, legend,XaxisData,yaxisData,Series,displayMaximiseExportImport}) {
  // console.log(filterValue,'filterValue')
 const option = {
  animation: false,
    legend: legend,
    //  {
    //   show: true,
    //     bottom: 0,
    //     padding:[10,0,0,15],
    //     left: 'start',
    //     itemGap: 5,
    //     itemWidth: 8,
    //     itemHeight: 8,
    //     textStyle: {
    //         color: '#19212A',
    //         fontSize: 9
    //       },
    //       data: filterValue === "EXPORT" || filterValue === "Export" ? ["Export"] : filterValue === "IMPORT" || filterValue === "Import" ? ['Import']: ["Import", "Export"] },
    tooltip: {
      show: true,
      // trigger: 'axis',
      formatter: function(params){
        return `${params?.name} <br> ${params?.seriesName} ${params?.value?.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0})}`
      }
    },
    grid: {
      ...grid,
      top: "15%",
      // left: displayMaximiseExportImport ? "0%" : '6%',
      right: "6%",
      bottom: displayMaximiseExportImport ? "12%" : '15%',
      containLabel: true,
    },
    xAxis: XaxisData,

    yAxis: yaxisData,
    

    series: Series
  };


  return (
     <ReactEcharts
                option={option}
                opts={{renderer:'svg'}}
                style={{ width: '100%', height: '100%' }}
            />
  )
}
