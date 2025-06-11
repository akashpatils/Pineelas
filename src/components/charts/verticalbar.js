import React from "react";
import ReactEcharts from "echarts-for-react";
import { color } from "echarts";

export default function Verticalbar({
  data,
  tooltip,
  series1data,
  series2data,
  tabFilter,
  yAxisLabel,
  xAxisdata,
  grid,
  seriesLabel,
  displayMaximise,
  legend,
}) {
  const filterValue = tabFilter?.[0]?.columnValue;
  const metricFilter =
    filterValue === "EXPORT"
      ? "Export"
      : filterValue === "IMPORT"
      ? "Import"
      : "overall";

  const filteredData =
    data?.filter((item) => item?.METRIC_NAME === metricFilter) || [];

  const countries =
    [...new Set(filteredData?.map((item) => item?.POL_COUNTRY))]?.reverse() ||
    [];

  // const legendState = ["CNT_20", "CNT_40"];

  // const seriesData = legendState.map((type) => ({
  //   name: type === 'CNT_40' ? 'CNT 40' : 'CNT 20',
  //   type: "bar",
  //   stack: "total",
  //   barWidth: '90%',
  //   label:
  //   !displayMaximise
  //     ? seriesLabel
  //     :
  //     {
  //       show: true,
  //       position: type === "CNT_40" ? "right" : "left",
  //       color: "#000",

  //       formatter: (params) =>
  //         type === "CNT_40" ? `{a|${params.value?.toLocaleString()}}  ` : `  {a|${params.value?.toLocaleString()}}`,
  //       rich: {
  //         a: {
  //           padding: type === "CNT_40" ? [0, 6, 6, 0] : [0, 6, 0, 6],
  //           fontSize: 14,
  //         },
  //       },
  //     },

  //   itemStyle: {
  //     color: type === "CNT_40" ? "#D3686D" : "#73292C",
  //     barBorderRadius: [0, 4, 4, 0],
  //   },
  //   data: countries.map((country) => {
  //     return filteredData
  //       ?.filter((d) => d?.POL_COUNTRY === country)
  //       ?.reduce(
  //         (sum, d) =>
  //           sum + (type === "CNT_20" ? d?.CNT_20 || 0 : d?.CNT_40 || 0),
  //         0
  //       );
  //   }),
  // }));

  const option = {
    tooltip: tooltip,
    legend: legend,
    grid: grid,
    xAxis: {
      type: "category",
      data: xAxisdata,
      axisLabel: {
        ...yAxisLabel,
        margin: displayMaximise ? 43 : 10,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
        color: "#000",
      },
    },
    series: [
      {
        name: "Regular Pay",
        type: "bar",
        stack: "overlap",
        barWidth: "50%",
        // barGap: "-75%",
        itemStyle: {
          color: "#7C2F3E",
        },
        data: series1data,
        label: {
          show: false,
        },
      },
      {
        name: "Overtime Pay",
        type: "bar",
        stack: "overlap",
        barWidth: "50%",
        label: {
          show: false,
          position: "top",
          color: "#000",
          fontSize: 12,
          align: "center",
        },
        itemStyle: {
          color: "#9ED867",
        },
        data: series2data,
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
