import React from "react";
import ReactECharts from "echarts-for-react";
import { toMillionWithNoDollarM } from "../utlis";

const HorizontalBarStacked = ({ data, displayCommodities }) => {
  const reversedData = [...data];

  // Get all unique commodities and countries
  const commodities = [...new Set(reversedData.map(item => item.COMMODITY))].reverse();
  const countries = [...new Set(reversedData.map(item => item.COUNTRY))].reverse();

  // Create a mapping from COMMODITY to each country's weight
  const dataMap = {};
  commodities.forEach(commodity => {
    dataMap[commodity] = {};
    countries.forEach(country => {
      const entry = reversedData.find(item => item.COMMODITY === commodity && item.COUNTRY === country);
      dataMap[commodity][country] = entry ? Number(entry.TOTAL_WEIGHT) : 0;
    });
  });

  // Create series for each country
  const series = countries.map(country => ({
    name: country,
    type: "bar",
    stack: "total",
    barWidth: displayCommodities ? '80%' : '70%',
    label: {
      show: true,
      position: "outside",
      formatter: ({ value }) => (toMillionWithNoDollarM(value) <= `0.02MT` || toMillionWithNoDollarM(value) == `0MT` ? '' : toMillionWithNoDollarM(value)),
      fontSize: displayCommodities ? 14 : 9,
      color: "#000",
    },
    itemStyle: {
      borderRadius: displayCommodities ? [0, 4, 4, 0] : [0, 3, 3, 0],
    },
    data: commodities.map(commodity => dataMap[commodity][country]),
  }));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: function (params) {
        // console.log(params,'params')
        const filtered = params.filter(item => item.value > 0);
        if (filtered.length === 0) return ''; // No tooltip if all values are 0 or less

        let tooltip = `${filtered[0].axisValue}<br/>`;
        filtered.forEach(item => {
          tooltip += `${item.marker}  ${item.seriesName}:  ${item.value.toLocaleString()}<br/>`;
        });
        return tooltip;
      },
    },

    legend: {
      show: true,
      itemWidth: displayCommodities ? 15 : 8,
      itemHeight: displayCommodities ? 15 : 8,
      type: 'scroll',
      textStyle: {
        fontSize: displayCommodities ? 15 : 9,
        color: '#000',
      },
      bottom: displayCommodities ? 10 : 38,
      left: 20
    },

    grid: {
      left: "0%",
      right: displayCommodities ? "10%" : "20%",
      bottom: displayCommodities ? "8%" : "20%",
      top: displayCommodities ? "10%" : "15%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      show: false,
    },
    yAxis: {
      type: "category",
      data: commodities,
      axisLabel: {
        show: true,
        color: '#000',
        fontSize: displayCommodities ? 14 : 9,
        fontWeight: displayCommodities ? 'bold' : 'normal',
        formatter: function (value) {
          return displayCommodities ? value : value?.length > 20 ? value?.substring(0, 10) + "..." : value;
        },
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    series,
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: displayCommodities ? "100%" : "180px",
        width: "100%",
      }}
    />
  );
};

export default HorizontalBarStacked;
