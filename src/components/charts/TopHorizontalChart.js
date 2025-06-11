import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function TopLinesHorizontalBar({ data, legend, grid, XaxisData, yaxisData, series, ...props }) {
  const categories = data?.map(({ LINE_NAME }) => LINE_NAME).reverse() || [];
  const values = data?.map(({ LINE_TOTAL_SHIPPING }) => LINE_TOTAL_SHIPPING).reverse() || [];


  const option = {
    animation: false,
    tooltip: {
      show: true,
      // trigger: 'axis',
      formatter: function (params) {
        const value = params?.value?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits:0 });
        return `${params?.name} <br> ${params?.seriesName} ${value}`;
      },
      ...props.tooltip
    },
    legend: legend,
    grid: grid,
    xAxis: XaxisData,
    yAxis: yaxisData,
    series: series,
  };

  return <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />;
}
