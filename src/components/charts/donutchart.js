import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

export default function DonutChart({ legend, data, name, color }) {
  const options = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        return `${params.name} <br/> 
        Count: ${params.value.toLocaleString()} / ${Math.round(
          params?.data?.percentage
        )}%`;
      },
      backgroundColor: "rgba(251, 251, 251, 0.9)",
      borderColor: "#7C2F3E",
      borderWidth: 2,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
    },
    legend: legend,
    grid: {
      left: "0%",
    },
    color: color,
    series: [
      {
        name: name,
        type: "pie",
        center: ["40%", "40%"],
        radius: ["30%", "70%"],
        data: data,
        label: {
          show: true,
          color: "white",
          position: "inner",
          formatter: (params) => `${Math.round(params?.data?.percentage)}%`,
          fontSize: 12,
          fontWeight: "normal",
        },
        emphasis: {
          scale: false,
          itemStyle: {
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <ReactEcharts
      echarts={echarts}
      option={options}
      opts={{ renderer: "svg" }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
