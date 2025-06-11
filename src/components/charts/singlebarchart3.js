import React from "react";
import ReactEcharts from "echarts-for-react";

export default function SingleBarChart3({
  yAxisData = [],
  seriesData = [],
  grid,
  ...props
}) {
  const percentages = seriesData.map(item => item.percentage);
  const rawMin = Math.min(...percentages);
  const rawMax = Math.max(...percentages);

  // Round down min to nearest 10 and up max to nearest 10
  const xAxisMin = Math.floor(rawMin / 10) * 10;
  const xAxisMax = Math.ceil(rawMax / 10) * 10;

  const barColor = seriesData[0]?.color || "#7C2F3E";

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "#fff",
      borderColor: "#7C2F3E",
      borderWidth: 1,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
      formatter: (params) => {
        const [param] = params;
        return `
          ${param.name}<br/>
          Actual Spend: ${param.data.label} / ${param.data.percentage.toFixed(2)}%
        `;
      },
      ...props.tooltip,
    },
    legend: {
      data: ["Actual Spend"],
      bottom: 0,
      left: 'center',
      icon: "rect", 
      itemWidth: 10, 
      itemHeight: 10,
      textStyle: {
        color: "#000",
        fontWeight: "bold",
      },
    },
    xAxis: {
      type: "value",
      // min: xAxisMin,
      max: xAxisMax,
      axisLabel: {
        formatter: (value) => `${value}%`,
        color: "#000",
        fontWeight: "bold",
      },
      name: "Amount in million $",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontWeight: "bold",
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      type: "category",
      data: yAxisData,
      axisTick: { show: false },
      axisLabel: {
        color: "#000",
        formatter: value => value.length > 25 ? value.slice(0, 25) + '...' : value
      },
    },
    grid: grid,
    series: [
      {
        name: "Actual Spend",
        type: "bar",
        barWidth: 30,
        color: barColor,
        data: seriesData.map((item) => ({
          value: item.percentage, 
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
          color: "#fff",
          fontWeight: "bold",
          position: "inside",
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

