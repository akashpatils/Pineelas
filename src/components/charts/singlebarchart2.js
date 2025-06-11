import React from "react";
import ReactEcharts from "echarts-for-react";

export default function SingleBarChart2({
  yAxisData = [],
  seriesData = [],
  grid,
  ...props
}) {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderColor: "#7C2F3E",
      borderWidth: 2,
      textStyle: {
        color: "#000",
        fontSize: 12,
        fontWeight: "normal",
      },
      ...props.tooltip
    },
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: {
      type: "category",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#000",
        formatter: value => value.length > 25 ? value.slice(0, 25) + '...' : value
      },
      data: yAxisData,
    },
    dataZoom: [
      {
        type: "slider",
        yAxisIndex: 0,
        start: 0,
        end: 100,
        width: 12,
        right: 4,
        handleSize: 16,
        handleIcon: 'path://M8,0 a8,8 0 1,0 0,16 a8,8 0 1,0 0,-16 M6,3 L6,13 M10,3 L10,13',
        handleStyle: {
          color: "#000000",
          borderColor: "#000000",
          stroke: "#FFFFFF",
          lineWidth: 2,
        },
        fillerColor: "#ededed",
        backgroundColor: "#ededed",
        borderColor: "#ededed",
        showDetail: false,
        showDataShadow: false,
      },
    ],
    grid: grid,
    series: [
      {
        type: "bar",
        barWidth: 30,
        data: seriesData.map((item) => ({
          value: item.value,
          itemStyle: {
            color: item.color,
            borderRadius: [0, 8, 8, 0],
          },
          name: item.name,
          label: item.label,
          percentage: item.percentage
        })),
        label: {
          show: true,
          color: "#000",
          fontWeight: "bold",
          position: "right",
          formatter: (params) => params.data.label,
        },
      },
    ],
  };

  return (
    <ReactEcharts
      option={option}
      opts={{ renderer: "svg" }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
