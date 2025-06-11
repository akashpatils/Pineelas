import React from "react";
import ReactECharts from "echarts-for-react";

const BubbleChart = ({reportTableData = []}) => {

  const ranges = [
    { label: "<20", min: 0, max: 20 },
    { label: "21-40", min: 21, max: 40 },
    { label: "41-60", min: 41, max: 60 },
    { label: "61-80", min: 61, max: 80 },
    { label: "81-100", min: 81, max: 100 },
    { label: "101-120", min: 101, max: 120 },
    { label: "121-140", min: 121, max: 140 },
    { label: ">140", min: 141, max: Infinity },
  ];

  const groupedData = {};

  ranges?.forEach((range) => {
    groupedData[range.label] = [];
  });

  reportTableData?.forEach((item) => {
    const { NO_OF_EMPLOYEES } = item;
    const matchedRange = ranges?.find(
      (range) => NO_OF_EMPLOYEES >= range.min && NO_OF_EMPLOYEES <= range.max
    );

    if (matchedRange) {
      groupedData[matchedRange.label].push(item);
    }
  });

  const colors = {
    '<20' : '#0B83A5',
    '21-40': '#7B303E',
    '41-60': '#FFA153',
    '61-80': '#DD5032',
    '81-100': '#DD5032',
    '101-120': '#DD5032',
    '121-140': '#DD5032',
    '>140': '#DD5032',
  }

  const bubbleOption ={
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "none",
      },
      backgroundColor: "rgba(251, 251, 251, 0.9)",
      borderColor: "#7C2F3E",
      borderWidth: 2,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
      appendToBody: true,
      formatter: function (params) {
        return (
          params.value[3] +"<br>"+
          "Average Salary: " +
          params.value[4] +
          "<br>Regular Pay: " +
          params.value[5] +
          "<br>Number of Employees: " +
          params.value[0] 
        );
      },
    },
    grid: {
      left: 10,
      right: 30,
      top: 55,
      bottom: 55,
      containLabel: true,
    },
    legend: {
      type: "scroll",
      bottom: 0,
      textStyle: {
        color: "#000",
      },
    },
    xAxis: {
      name: "No. of Employees",
      nameLocation: "middle",
      nameTextStyle: {
        color: "#000",
        fontSize: 10,
        fontWeight: "bold",
        fontFamily: "Arial",
      },
      nameGap: 25,
      axisTick: { show: false },
      axisLine: { show: true },
      splitLine: {
        show: false,
      },
      axisLabel: { color: "#000" },
    },
    yAxis: {
      name: "Salary in $",
      nameLocation: "middle",
      nameTextStyle: {
        color: "#000",
        fontSize: 10,
        fontWeight: "bold",
        fontFamily: "Arial",
      },
      nameGap: 60,
      axisTick: { show: false },
      axisLine: { show: true },
      axisLabel: { color: "#000" },
    },
    dataZoom: [
      {
        type: "slider",
        yAxisIndex: 0,
        start: 0,
        end: 100,
        width: 12,
        right: 4,
        handleSize: 16,
        handleIcon: 'path://M8,0 a8,8 0 1,0 0,16 a8,8 0 1,0 0,-16 M6,3 L6,13 M10,3 L10,13',
        handleStyle: {
          color: "white",
          borderColor: "grey",
          stroke: "#FFFFFF",
          lineWidth: 2,
        },
        fillerColor: "#ededed",
        backgroundColor: "#ededed",
        borderColor: "#ededed",
        showDetail: false,
        showDataShadow: false,
      },
      {
        type: "slider",
        xAxisIndex: 0,
        start: 0,
        end: 100,
        height: 12,
        top: 10,
        handleSize: 16,
        handleIcon: 'path://M8,0 a8,8 0 1,0 0,16 a8,8 0 1,0 0,-16 M6,3 L6,13 M10,3 L10,13',
        handleStyle: {
          color: "white",
          borderColor: "grey",
          stroke: "#FFFFFF",
          lineWidth: 2,
        },
        fillerColor: "#ededed",
        backgroundColor: "#ededed",
        borderColor: "#ededed",
        showDetail: false,
        showDataShadow: false,
      }
    ],
    // series: [
    //   {
    //     name: "<20",
    //     type: "scatter",
    //     data: [
    //       [5, 90000, 100],
    //       [10, 80000, 150],
    //       [12, 95000, 120],
    //     ],
    //     symbolSize: (data) => Math.sqrt(data[2]) * 2,
    //     itemStyle: {
    //       color: "#0B84A5",
    //       opacity: 1,
    //     },
    //   },
    //   {
    //     name: "21-40",
    //     type: "scatter",
    //     data: [
    //       [25, 60000, 180],
    //       [30, 65000, 200],
    //       [35, 58000, 230],
    //     ],
    //     symbolSize: (data) => Math.sqrt(data[2]) * 2,
    //     itemStyle: {
    //       color: "#7C2F3E",
    //       opacity: 1,
    //     },
    //   },
    //   {
    //     name: "41-60",
    //     type: "scatter",
    //     data: [
    //       [45, 70000, 450],
    //       [50, 72000, 280],
    //     ],
    //     symbolSize: (data) => Math.sqrt(data[2]) * 2,
    //     itemStyle: {
    //       color: "#FFA056",
    //       opacity: 1,
    //     },
    //   },
    //   {
    //     name: "61-80",
    //     type: "scatter",
    //     data: [
    //       [62, 82000, 500],
    //       [75, 85000, 620],
    //     ],
    //     symbolSize: (data) => Math.sqrt(data[2]) * 2,
    //     itemStyle: {
    //       color: "#DE4E33",
    //       opacity: 1,
    //     },
    //   },
    // ],
    series:  Object.entries(groupedData || {}).map(([key,value], index)=> {
    return {
        name: key,
        type: "scatter",
        data: value?.map((itr,_i)=> {
            const { NO_OF_EMPLOYEES, PAY_VALUE, AVERAGE, DEPARTMENT, AVERAGE_LABEL, PAY_VALUE_LABEL } = itr;
            return [ NO_OF_EMPLOYEES, PAY_VALUE, AVERAGE, DEPARTMENT, AVERAGE_LABEL, PAY_VALUE_LABEL]
        }),
        symbolSize: (data)=>  data[0],
        itemStyle: {
          color: colors[key],
          opacity: 1,
        },
    }
})
  };
  return (
    <ReactECharts
      notMerge
      option={bubbleOption}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default BubbleChart;
