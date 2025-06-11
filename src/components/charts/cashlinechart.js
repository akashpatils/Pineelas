import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function LineChart({ grid, data, lineStyle, areaStyle }) {

    const option = {
        grid: {
            left: '-60',   // Space from the left side
            right: '-24',  // Space from the right side (optional)
            top: '0',    // Space from the top (optional)
            bottom: '10', // Space from the bottom (optional)
            containLabel: true,  // Ensure labels fit within the grid area
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
          ,
          axisTick: {
            show: false, // Hides the x-axis ticks
          },
          axisLabel: {
            fontSize: 10, // Reduces the size of the y-axis labels
            color: '#fff', // Optional: Set the label color
          },
          axisLine: {
            show: true, // Ensures the x-axis line is visible
            lineStyle: {
                color: '#fff', // Sets the x-axis line color to white
                width: 1, // Optionally adjust line thickness
            }
        },
        },

        yAxis: {
          show: false, // Hides the y-axis

        },
        series: [
          {
            data: [344, 760, 532, 891, 614, 867, 1466],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              borderColor: '#FFFFFF',
              borderWidth: 0.8
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(211, 104, 109, 0.5)' }, // Start color
                  { offset: 1, color: 'rgba(211, 104, 109, 0.19)' }  // End color
                ]
              }
            },
            lineStyle: {
              color: '#D3686D', // Line color matching the gradient
              width: 1, // Set line width (reduce this value as needed)
            }
          }
        ]
      };



    return (
        <ReactEcharts
            echarts={echarts}
            opts={{renderer:'svg'}}
            option={option}
            style={{ width: '100%', height: '100%' }}
        />
    )
};