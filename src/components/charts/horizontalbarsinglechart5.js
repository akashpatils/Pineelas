import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Horizontalsinglebar5({
    data,
    yAxisLabel,
    grid,
    legend,
}) {


    const option = {
        tooltip: {
            show: true,
            trigger: "axis",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#7C2F3E",
            borderWidth: 2,
            textStyle: {
                color: "#000",
                fontWeight: "normal",
                fontSize: 12,
            },
            axisPointer: {
                type: "shadow"
            },
            appendToBody: true,
            formatter: (params) => {
                const [param] = params;
                const { data: item } = param ?? {};
                return `
                    <b>Fiscal year : ${item?.fiscal_year}</b><br/>
                    Expense: ${item?.ACTUAL_LABEL || "-"} / ${item?.SPENDPERCENTAGE?.toFixed(2) || 0}%<br/>
                    Obligation: ${item?.ENCUMERED_LABEL || "-"} / ${item?.ENCUMBEREDPERCENTAGE?.toFixed(2) || 0}%
                `;
            }
        },
        legend: legend,
        grid: grid,
        xAxis: {
            type: "value",
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
        },
        yAxis: {
            type: "category",
            data: [data?.fiscal_year],
            axisLabel: yAxisLabel,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },

        series: [
            //   {
            //     name: "Budget",
            //     type: "bar",
            //     barMaxWidth: 40,
            //     label: {
            //       show: true,
            //       position: "outside",
            //       color: "#000",
            //       fontSize: 12,
            //       align: "left",
            //       formatter: ({ data }) => data?.BUDGET_LABEL
            //     },
            //     emphasis: {
            //       "disabled": true,
            //       focus: 'none'
            //     },
            //     itemStyle: {
            //       color: "#BCBCBC",
            //     },
            //     data: [{
            //       ...data,
            //       value: data?.BUDGET
            //     }],
            //   },
            {
                name: "Expense",
                type: "bar",
                barWidth: 20,
                stack: "total",
                emphasis: {
                    "disabled": true,
                },
                itemStyle: {
                    color: "#7C2F3E",
                },
                // data: [data?.ACTUAL],
                // label: {
                //   show: false,
                //   position: "outside",
                //   color: "#000",
                //   fontSize: 12,
                //   align: "left",
                // },
                label: {
                    show: true,
                    position: "outside",
                    color: "#000",
                    fontSize: 12,
                    align: "left",
                    formatter: ({ data }) => data?.ACTUAL_LABEL
                },
                data: [{
                    ...data,
                    value: data?.ACTUAL
                }],
                // tooltip: {
                //   show: false
                // }
            },
            {
                name: "Obligation",
                type: "bar",
                barWidth: 20,
                stack: "total",
                itemStyle: {
                    color: "#B9814D",
                },
                data: [data?.ENCUMERED],
                label: {
                    show: false,
                    position: "outside",
                    color: "#000",
                    fontSize: 12,
                    align: "left",
                },
                emphasis: {
                    "disabled": true,
                },
                // tooltip: {
                //   show: false
                // }
            },
        ]
    };
    return (
        <ReactEcharts
            option={option}
            opts={{ renderer: "svg" }}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
