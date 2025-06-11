import React from "react";
import ReactEcharts from "echarts-for-react";

export default function SingleBarChart({
  yAxisData = [],
  seriesData = [],
  grid,
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
      formatter: params => {
        const [param] = params;
        return `${param.marker}&nbsp;${param.axisValueLabel}: &nbsp;${param.data?.label}`
      }
    },
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: {
      type: "category",
      axisTick: { show: false },
      axisLabel: {
        color: "#000",
        formatter: value => value.length > 25 ? value.slice(0, 25) + '...' : value
      },
      data: yAxisData,
    },
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
