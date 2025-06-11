import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Horizontalsinglebar({
  data,
  yAxisLabel,
  grid,
  legend,
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
      appendToBody: true,
      formatter: (params) => {
        const [param] = params;
        const { data: item } = param ?? {};
        return `
      <b>Fiscal year : ${item?.FISCAL_YEAR}</b><br/>
      Budget : ${item?.BUDGET_LABEL || "-"} / ${item?.BUDGET_PERCENTAGE || 0}%<br/>
      Expense: ${item?.ACTUAL_LABEL || "-"} / ${item?.SPENDPERCENTAGE?.toFixed(2) || 0}%<br/>
      Obligation: ${item?.ENCUMERED_LABEL || "-"} / ${item?.ENCUMBEREDPERCENTAGE?.toFixed(2) || 0}%
    `;
      }
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
      data: [data?.FISCAL_YEAR],
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
    data: [{
      ...data,
      value: data?.BUDGET
    }],
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
    data: [data?.ACTUAL],
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
    data: [data?.ENCUMERED],
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
