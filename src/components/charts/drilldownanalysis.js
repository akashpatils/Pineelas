import React from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "next-themes";
import * as echarts from 'echarts';
import { useDispatch } from "react-redux";


export const DrillDownChart = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const dispatch = useDispatch();

  const backgroundImageUrl1 =
    '/images/drilldownchart/drilldown_bgimage1.png'

  const backgroundImageUrl2 =
    '/images/drilldownchart/drilldown_bgimage2.png'

  const backgroundImageUrl3 =
    '/images/drilldownchart/drilldown_bgimage3.png'

  const backgroundImageUrl4 =
    '/images/drilldownchart/drilldown_bg4.png'

  const backgroundImageUrl5 =
    '/images/drilldownchart/drilldown_bg5.png'

  const backgroundImageUrl6 =
    '/images/drilldownchart/drilldown_bg6.png'

  const backgroundImageUrl7 =
    '/images/drilldownchart/drilldown_bg7.png'


  const drillDownCharts = {
    series: [
      {
        type: "tree",
        symbol: "rect",
        emphasis: false,
        data: [
          {
            name: (() => {
              return "Revenue\nBD 2.13 Mn ";
            })(),

            label: {
              show: true,
              position: [-40, 0],
              padding: 20,
              color: "#FFF",
              fontSize: "12",
              align: "left",
              fontWeight: "500",
              lineHeight: 20,
              emphasis: false,
              backgroundColor: {
                image: backgroundImageUrl4,
              },
              width: 60,
              height: 60,
              verticalAlign: "middle",
              borderRadius: 8,
            },
            itemStyle: {
              color: "#309DC1",
              borderColor: "#256D85",
              emphasis: false,
              borderRadius: 3,
            },
            children: [
              {

                lineStyle: {
                  width: 50,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#0695644f' },
                    { offset: 1, color: '#73292C' },
                  ])
                },
                label: {
                  show: true,
                  position: [0, -25],
                  fontSize: "12",
                  fontWeight: "500",
                  lineHeight: 14,
                  align: "left",
                  color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                  backgroundColor: {
                    image: backgroundImageUrl5,
                  },
                  width: 90,
                  height: 30,
                  borderRadius: 8,
                  padding: 20,
                },
                itemStyle: {
                  color: "#F7F7FB",
                  borderColor: "#E0E0EF",
                },
                name: "ASG\nBD 0.25 Mn",
                children: [
                  {
                    name: (() => {
                      return "Other Income\nBD 0.05 Mn";
                    })(),
                    lineStyle: {
                      width: 40,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#0695644f' },
                        { offset: 1, color: '#73292C' },
                      ])
                    },
                    label: {
                      show: true,
                      position: [-10, -30],
                      fontSize: "12",
                      fontWeight: "500",
                      lineHeight: 14,
                      align: "left",
                      color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                      backgroundColor: {
                        image: backgroundImageUrl5,
                      },
                      width: 90,
                      height: 30,
                      borderRadius: 8,
                      padding: 20,
                    },
                    itemStyle: {
                      color: "#F7F7FB",
                      borderColor: "#E0E0EF",
                    },
                  },
                  {
                    name: (() => {
                      return "IT Turnover\nBD 0.10 Mn";
                    })(),
                    lineStyle: {
                      width: 40,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                        { offset: 0, color: '#0695644f' },
                        { offset: 1, color: '#73292C' },
                      ])
                    },
                    label: {
                      show: true,
                      position: [-10, -30],
                      fontSize: "12",
                      fontWeight: "500",
                      lineHeight: 14,
                      align: "left",
                      color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                      backgroundColor: {
                        image: backgroundImageUrl5,
                      },
                      width: 90,
                      height: 20,
                      borderRadius: 8,
                      padding: 20,
                    },
                    itemStyle: {
                      color: "#F7F7FB",
                      borderColor: "#E0E0EF",
                    },
                  },
                  {
                    lineStyle: {
                      width: 30,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                        { offset: 0, color: '#f2980ead' },
                        { offset: 1, color: '#73292C' },
                      ])
                    },
                    label: {
                      show: true,
                      position: [-10, -30],
                      fontSize: "12",
                      fontWeight: "500",
                      lineHeight: 14,
                      align: "left",
                      color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                      backgroundColor: {
                        image: backgroundImageUrl6,
                      },
                      width: 90,
                      height: 30,
                      borderRadius: 8,
                      padding: 20,
                    },
                    itemStyle: {
                      color: "#F7F7FB",
                      borderColor: "#E0E0EF",
                    },
                    name: "Revenue Turnover\nBD 0.10 Mn",
                    children: [
                      {
                        name: (() => {
                          return "Shipping Turnover\nBD 0.06 Mn";
                        })(),
                        lineStyle: {
                          width: 20,
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#f2980ead' },
                            { offset: 1, color: '#73292C' },
                          ])
                        },
                        label: {
                          show: true,
                          position: [-10, -30],
                          fontSize: "12",
                          fontWeight: "500",
                          lineHeight: 14,
                          align: "left",
                          color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                          backgroundColor: {
                            image: backgroundImageUrl6,
                          },
                          width: 90,
                          height: 30,
                          borderRadius: 8,
                          padding: 20,
                        },
                        itemStyle: {
                          color: "#F7F7FB",
                          borderColor: "#E0E0EF",
                        },
                        children: [
                          {
                            name: (() => {
                              return "41000\nBD 0.04 Mn";
                            })(),
                            lineStyle: {
                              width: 20,
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#0695644f' },
                                { offset: 1, color: '#73292C' },
                              ])
                            },
                            label: {
                              show: true,
                              position: [-10, -30],
                              fontSize: "12",
                              fontWeight: "500",
                              lineHeight: 14,
                              align: "left",
                              color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                              backgroundColor: {
                                image: backgroundImageUrl5,
                              },
                              width: 80,
                              height: 20,
                              borderRadius: 8,
                              padding: 20,
                            },
                            itemStyle: {
                              color: "#F7F7FB",
                              borderColor: "#E0E0EF",
                            },
                          },
                          {
                            name: (() => {
                              return "PDA41000\nBD 0.01 Mn";
                            })(),
                            lineStyle: {
                              width: 20,
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
                                { offset: 0, color: '#0695644f' },
                                { offset: 1, color: '#73292C' },
                              ])
                            },
                            label: {
                              show: true,
                              position: [-10, -30],
                              fontSize: "12",
                              fontWeight: "500",
                              lineHeight: 14,
                              align: "left",
                              color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                              backgroundColor: {
                                image: backgroundImageUrl5,
                              },
                              width: 80,
                              height: 20,
                              borderRadius: 8,
                              padding: 20,
                            },
                            itemStyle: {
                              color: "#F7F7FB",
                              borderColor: "#E0E0EF",
                            },
                          },
                          {
                            name: (() => {
                              return "R254664\nBD 0.01 Mn";
                            })(),
                            lineStyle: {
                              width: 20,
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(115, 41, 44, 0.5)' },
                                { offset: 1, color: '#73292C' }
                              ])
                            },
                            label: {
                              show: true,
                              position: [-10, -30],
                              fontSize: "12",
                              fontWeight: "500",
                              lineHeight: 14,
                              align: "left",
                              color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                              backgroundColor: {
                                image: backgroundImageUrl7,
                              },
                              width: 80,
                              height: 20,
                              borderRadius: 8,
                              padding: 20,
                            },
                            itemStyle: {
                              color: "#F7F7FB",
                              borderColor: "#E0E0EF",
                            },
                          },
                        ],
                      },
                      {
                        name: (() => {
                          return "FF Turnover\nBD 0.02 Mn";
                        })(),
                        lineStyle: {
                          width: 20,
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#f2980ead' },
                            { offset: 1, color: '#73292C' },
                          ])
                        },
                        label: {
                          show: true,
                          position: [-10, -30],
                          fontSize: "12",
                          fontWeight: "500",
                          lineHeight: 14,
                          align: "left",
                          color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                          backgroundColor: {
                            image: backgroundImageUrl6,
                          },
                          width: 90,
                          height: 20,
                          borderRadius: 8,
                          padding: 20,
                        },
                        itemStyle: {
                          color: "#F7F7FB",
                          borderColor: "#E0E0EF",
                        },
                      },
                      {
                        name: (() => {
                          return "Ship Chandling\n Turnover\nBD 0.01 Mn";
                        })(),
                        lineStyle: {
                          width: 20,
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(115, 41, 44, 0.5)' },
                            { offset: 1, color: '#73292C' }
                          ])
                        },
                        label: {
                          show: true,
                          position: [-10, -30],
                          fontSize: "12",
                          fontWeight: "500",
                          lineHeight: 14,
                          align: "left",
                          color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                          backgroundColor: {
                            image: backgroundImageUrl7,
                          },
                          width: 90,
                          height: 30,
                          borderRadius: 8,
                          padding: 16,
                        },
                        itemStyle: {
                          color: "#F7F7FB",
                          borderColor: "#E0E0EF",
                        },
                      },
                      {
                        name: (() => {
                          return "Property Div\nBD 0.01 Mn";
                        })(),
                        lineStyle: {
                          width: 20,
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(115, 41, 44, 0.5)' },
                            { offset: 1, color: '#73292C' }
                          ])
                        },
                        label: {
                          show: true,
                          position: [-10, -30],
                          fontSize: "12",
                          fontWeight: "500",
                          lineHeight: 14,
                          align: "left",
                          color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                          backgroundColor: {
                            image: backgroundImageUrl7,
                          },
                          width: 90,
                          height: 20,
                          borderRadius: 8,
                          padding: 20,
                        },
                        itemStyle: {
                          color: "#F7F7FB",
                          borderColor: "#E0E0EF",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: (() => {
                  return "NSA\nBD 0.10 Mn";
                })(),
                lineStyle: {
                  width: 50,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#0695644f' },
                    { offset: 1, color: '#73292C' },
                  ])
                },
                label: {
                  show: true,
                  position: [0, -25],
                  fontSize: "12",
                  fontWeight: "500",
                  lineHeight: 14,
                  align: "left",
                  color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                  backgroundColor: {
                    image: backgroundImageUrl5,
                  },
                  width: 90,
                  height: 20,
                  borderRadius: 8,
                  padding: 20,
                },
                itemStyle: {
                  color: "#F7F7FB",
                  borderColor: "#E0E0EF",
                },
              },
              {
                lineStyle: {
                  width: 40,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#f2980ead' },
                    { offset: 1, color: '#73292C' },
                  ])
                },
                label: {
                  show: true,
                  position: [0, -30],
                  fontSize: "12",
                  fontWeight: "500",
                  lineHeight: 14,
                  align: 'left',
                  color: "#2C363F",
                  backgroundColor: {
                    image: backgroundImageUrl6,
                  },
                  width: 90,
                  height: 20,
                  borderRadius: 8,
                  padding: 20,
                },
                itemStyle: {
                  color: "#4E456D",
                  borderColor: "#312C49",
                  borderRadius: 8,
                },
                name: "DSA\nBD 0.14 Mn",
              },
              {
                name: (() => {
                  return "SHS\nBD 0.30 Mn";
                })(),
                lineStyle: {
                  width: 40,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#f2980ead' },
                    { offset: 1, color: '#73292C' },
                  ])
                },
                label: {
                  show: true,
                  position: [0, -25],
                  fontSize: "12",
                  fontWeight: "500",
                  lineHeight: 14,
                  align: "left",
                  color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                  backgroundColor: {
                    image: backgroundImageUrl6,
                  },
                  width: 90,
                  height: 20,
                  borderRadius: 8,
                  padding: 20,
                },
                itemStyle: {
                  color: "#F7F7FB",
                  borderColor: "#E0E0EF",
                },
              },
              {
                name: (() => {
                  return "FSL\nBD 0.45 Mn";
                })(),
                lineStyle: {
                  width: 30,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(115, 41, 44, 0.5)' },
                    { offset: 1, color: '#73292C' }
                  ])
                },
                label: {
                  show: true,
                  position: [0, -25],
                  fontSize: "12",
                  fontWeight: "500",
                  lineHeight: 14,
                  align: "left",
                  color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                  backgroundColor: {
                    image: backgroundImageUrl7,
                  },
                  width: 90,
                  height: 20,
                  borderRadius: 8,
                  padding: 20,
                },
                itemStyle: {
                  color: "#F7F7FB",
                  borderColor: "#E0E0EF",
                },
              },
              {
                name: (() => {
                  return "ASA\nBD 0.30 Mn";
                })(),
                lineStyle: {
                  width: 30,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(115, 41, 44, 0.5)' },
                    { offset: 1, color: '#73292C' }
                  ])
                },
                label: {
                  show: true,
                  position: [0, -25],
                  fontSize: "12",
                  fontWeight: "500",
                  lineHeight: 14,
                  align: "left",
                  color: currentTheme == "dark" ? "#FFF" : "#2C363F",
                  backgroundColor: {
                    image: backgroundImageUrl7,
                  },
                  width: 90,
                  height: 20,
                  borderRadius: 8,
                  padding: 20,
                },
                itemStyle: {
                  color: "#F7F7FB",
                  borderColor: "#E0E0EF",
                },
              },
            ],
          },
        ],
        itemStyle: {
          emphasis: {
            emphasis: false,
          },
        },
        label: {
          position: "right",
          color: "#fff",
          lineHeight: 15,
          color: "#363A44",
        },
        lineStyle: {
          width: 20,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(115, 41, 44, 0.5)' },
            { offset: 1, color: '#73292C' }
          ])
        },

        height: "100%",
        top: "10",
        left: "60",
        bottom: "0",

        on: {
          click: function (params) {
            var node = params.data;
            if (node.symbolSize === 0) {
              node.symbolSize = 70;
              if (node.children) {
                node.children.forEach(function (child) {
                  child.symbolSize = 50;
                });
              }
            } else {
              node.symbolSize = 0;
              if (node.children) {
                node.children.forEach(function (child) {
                  child.symbolSize = 0;
                });
              }
            }
            myChart.setOption(option);
          },
        },

        width: "80%",
        height: "100%",
        left: '7%',
        right: "0",
        top: "5%",
        bottom: "10%",
      },

    ],
  };

  return (
    <>
      <div>
        <ReactEcharts
          option={drillDownCharts}
          style={{ width: "100%", height: "clamp(700px, 90vw, 90vh)" }}
        />
      </div>
    </>
  );
};
