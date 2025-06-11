import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Horizontalsinglebar2({
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
      formatter: (params) => {
        const [param] = params;
        const { data: item } = param ?? {};
        return `
      <b>Fiscal year : ${item?.FISCAL_YEAR}</b><br/>
      Budget : ${item?.budget_label || "-"} / ${item?.budgetpercent || 0}%<br/>
      Expense: ${item?.expense_label || "-"} / ${item?.expensepercentage?.toFixed(2) || 0}%<br/>
      Obligation: ${item?.encumbarence_label || "-"} / ${item?.encumberpercentage?.toFixed(2) || 0}%
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
      formatter: ({ data }) => data?.budget_label
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
      value: data?.budgetamount
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
    data: [data?.actualexpenseamount],
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
    data: [data?.encumbarence],
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
