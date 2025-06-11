import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

export default function PieChart({ legend, data, name, label, color, tooltip  }) {
  const options = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        return `${params.name}: ${params.value.toLocaleString()} (${Math.round(
          params?.data?.percentage
        )}%)`;
      },
      backgroundColor: "rgba(251, 251, 251, 0.9)",
      borderColor: "#7C2F3E",
      borderWidth: 2,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
      ...tooltip,
    },
    legend: legend,
    grid: {
      left: "0%",
    },
    series: [
      {
        name: name,
        type: "pie",
        center: ["40%", "40%"],
        radius: ["0%", "70%"],
        color: color,
        data: data,
        label: {
          ...{
            show: true,
            color: "#fff",
            position: "inside",
            formatter: (params) => `${Math.round(params?.data?.percentage)}%`,
            fontSize: 12,
            fontWeight: 500,
          },
          ...label,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
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
