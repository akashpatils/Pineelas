import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

export default function DataDountChart({
  legend,
  data,
  name,
  total,
  graphicStyle = {},
  center = ["40%", "40%"],
  radius = ["50%", "70%"],
  graphicTextExtra = [], // 👈 New prop
}) {
  const baseGraphic = [
    {
      type: "text",
      left: graphicStyle.labelLeft || "30%",
      top: graphicStyle.labelTop || "36%",
      style: {
        text: graphicStyle.labelText || "Total Expense",
        textAlign: "center",
        fill: graphicStyle.labelColor || "#000",
        fontSize: graphicStyle.labelFontSize || 15,
        fontWeight: graphicStyle.labelFontWeight || 500,
      },
    },
    {
      type: "text",
      left: graphicStyle.valueLeft || "35%",
      top: graphicStyle.valueTop || "46%",
      style: {
        text: total,
        textAlign: "center",
        fill: graphicStyle.valueColor || "#000",
        fontSize: graphicStyle.valueFontSize || 18,
        fontWeight: graphicStyle.valueFontWeight || "bold",
      },
    },
  ];

  const options = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const { data } = params;
        return `
        <div style="text-align: left;">
        ${params.name}<br/>
        Total Expense: &nbsp; ${data.total}<br/>
        Actual Expense: &nbsp; ${data.valueLabel}<br/>
        Percentage: &nbsp; ${data.percentage + "%"}<br/>
        </div>
        `;
      },
      backgroundColor: "rgba(251, 251, 251, 0.9)",
      borderColor: "#7C2F3E",
      borderWidth: 2,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
    },
    legend,
    grid: {
      left: "0%",
    },
    graphic: [...baseGraphic, ...graphicTextExtra], // 👈 Combined graphic texts
    series: [
      {
        type: "pie",
        center,
        radius,
        data,
        label: {
          show: false,
          color: "white",
          position: "inner",
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
