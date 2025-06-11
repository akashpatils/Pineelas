import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default function TreeMap({}) {
  function getLevelOption(mode) {
    return [
      {
        color: ['#794F0B', '#8A6934', '#756048', '#9F8E61', '#000'],
        itemStyle: { borderWidth: 0,borderRadius:[12] }
      },
    ];
  }
  const option = {
    series: [
      {
        type: 'treemap',
        breadcrumb: { show: false },
         roam: false, // Disable zooming and panning
        width: '100%',
        height: '100%',
        itemStyle: {
          gapWidth: 1,
          borderColor:'#000',borderRadius:[12]
        },
        label: {
          position: 'insideLeft',
          verticalAlign:'top',
          align:'left',
          formatter: function (params) {
            let arr = [
              '{value|' + (params.value) + '} '+'Mn',
              '{name|' + params.name + '}',
            ];
            return arr.join('\n');
          },
          rich: {
            name: {
              fontSize: 11,
              fontWeight:400,
              color: '#fff',
              lineHeight: 25,
            },
            value: {
              fontSize: 14,
              fontWeight:600,
              color: '#fff'
            },
          }
        },
        roam:'false',
        nodeClick:'false',
        levels: getLevelOption(0),
        data: [
          {
            name: 'nodeA',
            value: 10,
            children: [
              {
                name: 'Customer I',
                value: 0.52,
                itemStyle: { color:'#bbb590',borderRadius:[0,0,12,0] },
              },
              {
                name: 'Customer G',
                value: 0.86,
                itemStyle: { borderRadius:[0,12,0,0] },
              }
            ]
          },
          {
            name: 'nodeB',
            value: 20,
            children: [
              {
                name: 'Customer F',
                value: 0.86,
                itemStyle: { borderRadius:[0,0,0,0] },
              }
            ]
          },
          {
            name: 'nodeC',
            value: 20,
            children: [
              {
                name: 'Customer B',
                value: 0.98,
                itemStyle: { borderRadius:[0,0,0,12] },
              }
            ]
          },
          {
            name: 'nodeD',
            value: 20,
            children: [
              {
                color: ['#c23531'],
                name: 'Customer A',
                value: 1.04,
                itemStyle: { borderRadius:[12,0,0,0] },
              }
            ]
          },
        ]
      }
    ]
  };

  return (
    <ReactEcharts
      option={option} 
      opts={{renderer:'svg'}}
      style={{ width: '100%', height: '100%' }}
    />
  )
};