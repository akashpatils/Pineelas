import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Horizontalsinglebar3({
  data,
  yAxisLabel,
  grid,
  legend,
  yaxisdata,
  series1data,
  series2data,
  series3data,
  ...props
}) {
  
  const option = {
    tooltip: {
      show: true,
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#7C2F3E",
      borderWidth: 2,
      textStyle: {
        color: "#000",
        fontWeight: "normal",
        fontSize: 12,
      },
      axisPointer: {
        type: "shadow"
      },
      ...props.tooltip
    },
    legend: legend,
    grid: grid,
    xAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: yaxisdata,
      axisLabel: yAxisLabel,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },

  series: [
  {
    name: "Budget",
    type: "bar",
    barMaxWidth: 40,
    label: {
      show: true,
      position: "outside",
      color: "#000",
      fontSize: 12,
      align: "left",
      formatter: ({ data }) => data?.BUDGET_LABEL
    },
    emphasis: {
      "disabled": true,
      focus: 'none'
    },
    itemStyle: {
      color: "#BCBCBC",
    },
    data: series1data,
  },
  {
    name: "Expense",
    type: "bar",
    stack: "overlap",
    barMaxWidth: 20,
    barGap: '-75%',
    emphasis: {
      "disabled": true,
    },
    itemStyle: {
      color: "#7C2F3E",
    },
    data: series2data,
    label: {
      show: false,
      position: "outside",
      color: "#000",
      fontSize: 12,
      align: "left",
    },
    tooltip: {
      show: false
    }
  },
  {
    name: "Obligation",
    type: "bar",
    barMaxWidth: 20,
    barGap: '-75%',
    stack: "overlap",
    itemStyle: {
      color: "#B9814D",
    },
    data: series3data,
    label: {
      show: false,
      position: "outside",
      color: "#000",
      fontSize: 12,
      align: "left",
    },
    emphasis: {
      "disabled": true,
    },
    tooltip: {
      show: false
    }
  },
]
  };
  return (
    <ReactEcharts
      option={option}
      opts={{ renderer: "svg" }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
