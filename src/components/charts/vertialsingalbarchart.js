import React from "react";
import ReactEcharts from "echarts-for-react";

export default function VertialSingalbarChart({
  xAxis = {},
  yAxis = {},
  seriesData = [],
  grid,
  tooltipLabel="Expense",
  tooltipLabel1="Fiscal Year"
}) {
  const option = {
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#7C2F3E",
      borderWidth: 2,
      textStyle: {
        color: "#000", 
        fontWeight: "normal",
        fontSize: 12,
      },
      formatter: (params) => {
        const item = params[0];
        return `
          <div style="font-weight: bold; margin-bottom: 5px;">${tooltipLabel1}: ${item.name}</div>
          <div>${tooltipLabel}: ${item.data?.label}</div>
        `;
      },
    },
    grid: grid,
    xAxis: {
      type: "category",
      axisLabel: {
        color: "#000",
      },
      axisTick: {
        show: false,
      },
      ...xAxis, 
    },
    yAxis: {
      type: "value",
      show: false,
      ...yAxis,
    },
    series: [
      {
        type: "bar",
        barWidth: 30,
        data: seriesData,
        label: {
          show: false,
          color: "#000",
          fontWeight: "bold",
          position: "top",
          formatter: (params) => params.label,
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
