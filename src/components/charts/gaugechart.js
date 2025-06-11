
import React from 'react';
import ReactEcharts from "echarts-for-react";

export default function Gaugechart({ startAngle,endAngle,radius,min,max,splitNumber,axisLine,pointer,axisTick,splitLine,axisLabel,detail,data,center=['50%', '75%'] }) {

  const gaugechart = {

    series: [
      {
        type: 'gauge',
        center: center,
        startAngle: startAngle,
        endAngle: endAngle,
        radius: radius,
        min: min,
        max: max,
        splitNumber: splitNumber,
        axisLine: axisLine,
        pointer: pointer,
        axisTick: axisTick,
        splitLine: splitLine,
        axisLabel: axisLabel,
        detail: detail,
        data: data
      }
    ]
  };

  return (
      <ReactEcharts
        option={gaugechart}
        opts={{renderer:'canvas'}}
        style={{ width: "100%", height: "100%" }}
      />
  )
}