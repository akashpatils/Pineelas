import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PopupChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);

            const categories = [...new Set(data.map(item => item.category))];
            const years = [...new Set(data.map(item => item.year))];

            const colorMapping = {
                "ePayables BoA Liability Clearing": '#7c2f3e',
                "Vouchers Payable-P-Card": '#a95030',
                "Operating Supplies Exp": '#b9814d',
                "Others": '#b09b68',
                "Prepaid Expenses": '#526861',
                "Office Supplies Exp": '#c9a268',
                "Professional Services": '#a95030',
                "Repair&Maintenance Svcs": '#3a5d6a',
                "Oper. Supplies-Lab": '#717d5c',
                "Training and Education Costs": '#7c2f3e',
            };

            const series = categories.map(category => ({
                name: category,
                type: 'bar',
                stack: 'total',
                barWidth: '10%',
                data: data
                    .filter(item => item.category === category)
                    .map(item => item.expenses),
                itemStyle: { color: colorMapping[category] || '#000' }
            }));

            const option = {
                tooltip: { trigger: 'axis' },
                grid: {
                    containLabel: true,
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    data: years,
                    splitLine: { show: false },
                    axisLabel: { color: '#000' }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { show: false },
                    name: 'Amount in $',
                    axisLine: { show: true },
                    nameLocation: 'middle',
                    nameGap: 60,
                    nameTextStyle: { color: '#000' },
                    axisLabel: {
                        color: '#000',
                        formatter: (value) => {
                            if (value >= 1_000_000) {
                                return `$${(value / 1_000_000).toFixed(0)}M`; 
                            } else if (value >= 1_000) {
                                return `$${(value / 1_000).toFixed(0)}K`; 
                            }
                            return `$${value}`; 
                        }
                    }
                },
                series,
                legend: {
                    data: categories,
                    orient: 'horizontal',
                    bottom: '5%',
                    icon: 'rect',
                    selectedMode: 'multiple'
                }
            };

            chartInstance.setOption(option);

            return () => {
                chartInstance.dispose();
            };
        }
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default PopupChart;
