import React from 'react';
import ReactECharts from 'echarts-for-react';

const StackedBarChart2 = ({ displayMaximiseLines ,queryData, legend, grid, xaxisLabel, xaxisTick, xaxisLine, xAxisdata, min, max, interval, yaxisLabel, ysplitLine, yaxisLine, name, label1, itemStyle1, data1, label2, itemStyle2, data2, label3, itemStyle3, data3, label4, itemStyle4, data4, label5, label6, label7, label8, itemStyle5, itemStyle6, itemStyle7, itemStyle8, data5, data6, data7, data8, min2, max2, yaxisLine2, ysplitLine2, yaxisLabel2, interval2, emphasis, barWidth, yaxisshow = false }) => {
  const years = [...new Set(queryData?.map(item => item?.CL_YEAR))];
  const customerGroups = [...new Set(queryData?.map(item => item?.CUSTOMER_GROUP))];
  // const colors = [
  //   '#4D0E0F', // Maroon 1 (Deepest)
  //   '#621E21', // Maroon 2
  //   '#752527', // Maroon 3
  //   '#87262A', // Maroon 4
  //   '#9F2E33', // Maroon 5
  //   '#B2373D', // Maroon 6
  //   '#C65257', // Maroon 7
  //   '#D66C71', // Maroon 8
  //   // '#E6858A', // Maroon 9
  //   // '#F5A3A6', // Maroon 10 

  //   '#003366', // Dark Blue 1
  //   '#002F5A', // Dark Blue 2
  //   '#00284D', // Dark Blue 3
  //   '#002041', // Dark Blue 4
  //   '#001935', // Dark Blue 5
  //   '#001229', // Dark Blue 6
  //   '#000B1D', // Dark Blue 7
  //   '#000611', // Dark Blue 8
  //   '#00030A', // Dark Blue 9
  //   '#001F3F', // Dark Blue 10
  // ];

  const colors = [
    '#1f78b4',
    '#c55756',
    '#859ef4',
    '#003f5c',
    '#a05195',
    '#4fabaf',
    '#665191',
    '#d49464',
    '#00876c',
    '#84c0d2',
    '#c51b45',
    '#ad5c9a',
    '#8c6d31',
    '#f95d6a',
    '#fdcce5',
    '#6a1777',
    '#b1740f',
    '#e05f99',
    '#d9f0a3',
    '#ffa600',
    '#f4e3b7',
    '#ff7c43',
    '#003366',
    '#F5A3A6'

  ]





  const seriesData = customerGroups?.map((group, index) => ({
    name: group,
    type: "bar",
    stack: "total",
    barWidth: "60%",
    label: {
      show: true,
      position: "inside",
      color: "#fff",
      fontSize: displayMaximiseLines ? 14 : 11,
      formatter: function (params) {
        return params.value?.toFixed(0) >= 7 ? params.value?.toFixed(0) + '%' : '';
      }
    },
    color: colors[index],
    data: years.map(year =>
      queryData.filter(d => d?.CL_YEAR == year && d?.CUSTOMER_GROUP == group)
        // .reduce((sum, d) => sum + d?.CUSTOMER_TOTAL_SHIPPING, 0)
        .reduce((sum, d) => sum + d?.PERCENTAGE, 0)
    )
  }));

  const option = {
    tooltip: {
      show: true,
      // trigger: 'axis',
      textStyle: {
        fontSize: 15,
      },
      formatter: function (params) {
        // console.log(params, 'paramsparams')
        const percentage = params?.value
        const matchingData = queryData?.find(qd => qd?.CL_YEAR == params?.name && qd.CUSTOMER_GROUP === params.seriesName);
        const value = matchingData ? matchingData.CUSTOMER_TOTAL_SHIPPING : 0;
        return `${params?.name} <br> ${params?.seriesName}: ${value?.toLocaleString(undefined,{minimumFractionDigits : 0 , maximumFractionDigits : 0 })} (${percentage?.toFixed(2)}%)`;
      },
    },
    legend: {
      show: true,
      type: 'scroll',
      textStyle: displayMaximiseLines ? { color: "#000", fontSize: 14 ,  fontWeight: "bold" } : { color: "#000", fontSize: 11 },
      bottom: displayMaximiseLines ? -8 : -5,
      itemWidth: displayMaximiseLines ? 12 : 10,
      itemHeight: displayMaximiseLines ? 12 : 10,
      data: customerGroups
    },
    grid: {
      top: displayMaximiseLines ? '10%' : "5%",
      left: '0%',
      right: '5%',
      bottom: displayMaximiseLines ? '10%' : '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLabel: xaxisLabel,
      axisTick: xaxisTick,
      axisLine: xaxisLine,
      data: years
    },
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
        // interval: interval || 10,  // Reduce interval to ensure better spacing
        axisLabel: {
          show: true,
          formatter: (value) => {
            // console.log("Y-Axis Value:", value);
            return `${value}%`;
          },
          textStyle: displayMaximiseLines ? { color: "#000", fontSize: 14 ,fontWeight: "bold"} : { color: "#000", fontSize: 11 },
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],

    // series: [
    //   {
    //     name: name[0],
    //     stack: 'a',
    //     type: 'bar',
    //     emphasis: emphasis,
    //     label: label1,
    //     itemStyle: itemStyle1,
    //     data: data1
    //   },
    //   {
    //     name: name[1],
    //     stack: 'a',
    //     type: 'bar',
    //     emphasis: emphasis,
    //     label: label2,
    //     itemStyle: itemStyle2,
    //     data: data2
    //   },
    //   {
    //     name: name[2],
    //     stack: 'a',
    //     type: 'bar',
    //     barWidth: barWidth,
    //     emphasis: emphasis,
    //     label: label3,
    //     itemStyle: itemStyle3,
    //     data: data3
    //   },
    // ],
    series: seriesData
  };

  return (
    <ReactECharts
      option={option}
      lazyUpdate notMerge
      style={{ width: '100%', height: '100%' }}
    />
  )
};

export default StackedBarChart2;
