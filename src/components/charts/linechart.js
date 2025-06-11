import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default function Linechart({ grid, legend, lineStyle, areaStyle,color }) {
    const data = [["February", 116], ["2000-06-06", 129], ["2000-06-07", 135],
    ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], 
    ["2000-06-12", 68], ["March", 92], ["2000-06-14", 130], ["2000-06-15", 245], 
    ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309],
    ["2000-06-20", 206], ["April", 137], ["2000-06-22", 128], ["2000-06-23", 85],
    ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84],
    ["2000-06-28", 93], ["May", 85], ["2000-06-30", 73], ["2000-07-01", 83], 
    ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44],
    ["2000-07-06", 72], ["Jun", 106], ["2000-07-08", 107], ["2000-07-09", 66],
    ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107],
    ["2000-07-14", 131], ["Jul", 111], ["2000-07-16", 64], ["2000-07-17", 69],
    ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83],
   ["Aug", 55] ];
    const dateList = data.map(function (item) {
      return item[0];
    });
    const valueList = data.map(function (item) {
      return item[1];
    });

    const option = {
        // Make gradient line here
        grid:grid,
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
           show:false
          },
          {
            data: dateList,
            gridIndex: 1,
            axisLabel: {
              show: false,
                color: "#9CA1AB",
                fontSize: 12,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "rgba(255,255,255,0.14)"
                }
            },
            axisTick: { show: false },
            
            splitLine: {
              show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,0.14)',
                }
            },
           
          }
        ],
        yAxis: [
          {  show:false},
          {
            gridIndex: 1,
            axisLabel: {
              show: false,
                color: "#9CA1AB",
                fontSize: 12,
            },
            axisLine: {
              show: false,
                lineStyle: {
                    color: "rgba(255,255,255,0.14)"
                }
            },
            axisTick: { show: false },
                splitLine: {
                  show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.14)',
                    }
                }
          }
        ],
        grid: [
          { 
            top: '0%',
            bottom: '60%',
            left:'-10%',
            right:'-10%'
          },
          {
            // top: '60%'
          }
        ],
        series: [
          {
            type: 'line',
            color:color,
            lineStyle: {
              width: 1
            },
            showSymbol: false,
            data: valueList,
            xAxisIndex: 1,
            areaStyle: areaStyle,
            yAxisIndex: 1
          }
        ]
      };

    return (
        <ReactEcharts
            option={option}
            opts={{ renderer: 'svg' }}
            style={{ width: '100%', height: '100%' }}
        />
    )
};