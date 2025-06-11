import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Horizontalbar({
  data,
  yAxisLabel,
  grid,
  legend,
  xAxis: xAxisProp,
  yAxis: yAxisProp,
}) {
  

  const option = {
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      formatter: (params) => {
        const [param] = params;
        const { data: item } = param ?? {};
        return `
      <b>Department : ${item?.DEPARTMENT}</b><br/>
      Budget : ${item?.BUDGET_LABEL || "-"} / ${item?.BUDGET_PERCENTAGE || "-"}%<br/>
      Expense: ${item?.ACTUAL_SPEND_LABEL || "-"} /  ${item?.ACTUAL_SPEND_PERCENTAGE || "-"}%<br/>
      Obligation: ${item?.ENCUMBRANCE_LABEL || "-"} / ${item?.ENCUMBRANCE_PERCENTAGE || "-"}%
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
      ...xAxisProp, // override or extend defaults with props
    },
    yAxis: {
      type: "category",
      data: data.map(({ DEPARTMENT }) => DEPARTMENT),
      axisLabel: yAxisLabel,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      ...yAxisProp, // override or extend defaults with props
    },
    data: [1087, 1977, 3178, 2500],
        label: {
          show: false,
          position: "outside",
          color: "#000",
          fontSize: 12,
          align: "left",
        },
    

    series:
      // seriesData
      [
        {
          name: "Budget",
          type: "bar",
          barMinWidth: 30,
          barMaxWidth: 40,
          label: {
            show: true,
            position: "outside",
            color: "#000",
            fontSize: 12,
            align: "left",
            formatter: ({ data }) => data?.BUDGET_LABEL
          },
          itemStyle: {
            color: "#BCBCBC",
          },
          data: data?.map((row) => {
            return {
              ...row,
              value: row?.BUDGET
            }
          }),
          emphasis: {
            "disabled": true,
          },
        },
        {
          name: "Expense",
          type: "bar",
          stack: "overlap",
          barMaxWidth: 20,
          barGap: "-75%",
          itemStyle: {
            color: "#7C2F3E",
          },
          data: data.map(({ ACTUAL_SPEND }) => ACTUAL_SPEND),
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
        {
          name: "Obligation",
          type: "bar",
          barMaxWidth: 20,
          barGap: "-75%",
          stack: "overlap",
          itemStyle: {
            color: "#B9814D",
          },
          data: data.map(({ ENCUMBRANCE }) => ENCUMBRANCE),
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
       
      {
        name: "CNT 20",
        type: "bar",
        barWidth: "35%",
        stack: "overlap",
        itemStyle: {
          color: "#B9814D",
        },
        data: [150, 55, 120, 45],
        label: {
          show: false,
          position: "outside",
          color: "#000",
          fontSize: 12,
          align: "left",
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
