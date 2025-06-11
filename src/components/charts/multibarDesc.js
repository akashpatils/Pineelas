import React, { useEffect } from "react";
import * as echarts from "echarts";
import { toMillionWithNoDollarM } from "../utlis";

const BarChart = ({ TrendData, selectedDimension,filterValue,name}) => {
    useEffect(() => {
        const chartDom = document.getElementById("main");
        const myChart = echarts.init(chartDom);
        const monthOrder = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];

        // Filter only the months present in the data
        const sortedMonths = monthOrder.filter((month) =>
            TrendData.some((item) => item.MONTH_NAME === month)
        );

        // Extract unique categories based on selectedDimension
        const uniqueLines = [...new Set(TrendData.map((item) => item[selectedDimension.toUpperCase()]))];

    
        const colors = [
            '#2f4b7c',
            '#c55756',
            '#84c0d2',
            '#a05195',
          
            '#003f5c',
          
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
        // Generate series data
        const seriesData = uniqueLines.map((line, index) => {
            return {
                name: line,
                type: "bar",
                stack: "total",
                data: sortedMonths.map((month) => {
                    const entry = TrendData.find(
                        (item) => item?.[selectedDimension?.toUpperCase()] === line && item?.MONTH_NAME === month
                    );
                    return entry ? entry.TOTAL_SHIPPING || entry.TOTAL_FDA : 0;
                }),
                itemStyle: {
                    borderRadius: [3, 3, 2, 2],
                    color: colors[index % colors.length],
                },
                barWidth: "45%", // Increased bar width
                label: {
                    show: true,
                    position: "inside",
                    color: "#fff",
                    fontSize: 10,
                    formatter: (params) => (params.value > 0 ? name ? toMillionWithNoDollarM(params.value) : params.value : ""),
                },
            };
        });

        // Chart configuration
        const option = {
            tooltip: {
                trigger: "axis",
                axisPointer: { type: "shadow" },
                backgroundColor: "#000",
                textStyle: { color: "#FFF", fontSize: 12 },
                formatter: function (params) {
                    // Filter out series with zero values
                    let filteredParams = params.filter((param) => param.value !== 0);

                    if (filteredParams.length === 0) return ""; // Hide tooltip if all values are zero

                    let tooltipText = `${filteredParams[0].axisValue}<br/>`;

                    filteredParams.forEach((param) => {
                        tooltipText += `<span style="display:inline-block;width:10px;height:10px;background-color:${param.color};margin-right:5px;"></span>
                  ${param.seriesName}: ${param.value}<br/>`;
                    });

                    return tooltipText;
                },
            },

            legend: {
                show: true,
                type: "scroll",
                bottom: "-1%",
                itemWidth: 12,
                left: "left",
                itemHeight: 12,
                textStyle: { color: "#000", fontSize: 12 },
            },
            grid: {
                top: "10%",
                left: "5%",
                right: "5%",
                bottom: "18%",
                containLabel: true,
            },
            xAxis: {
                type: "category",
                name: "Month",
                nameLocation: "middle",
                nameGap: 30,
                nameTextStyle: { color: "#000", fontSize: 12 },
                data: sortedMonths,
                axisPointer: { type: "shadow" },
                axisLabel: {
                    color: "#000",
                    fontSize: 12,
                    interval: 0,
                },
                axisLine: { show: true, lineStyle: { color: "#F1EFEF" } },
                axisTick: { show: false },
                splitLine: { show: false },
            },
            yAxis: {
                type: "value",
                name: filterValue == 'EXPORT' ? 'Export' : filterValue == 'IMPORT' ? 'Import' : name ? 'Total Weight' : "TEUs(Import + Export)",
                nameLocation: "middle",
                nameRotate: 90,
                nameGap: 80,
                nameTextStyle: { color: "#000", fontSize: 12 },
                axisLabel: { color: "#000", fontSize: 12 },
                axisTick: { show: false },
                splitLine: { lineStyle: { color: "#F1EFEF", type: "dashed" } },
            },
            series: seriesData,
            barGap: "15%", // Adjusted for spacing between months
            barCategoryGap: "25%", // Adjusted for spacing between categories
        };

        // Set the updated chart options
        myChart.setOption(option);

        // Cleanup
        return () => {
            myChart.dispose();
        };
    }, [TrendData, selectedDimension]);

    return <div id="main" style={{ width: "100%", height: "100%" }}></div>;
};

export default BarChart;
