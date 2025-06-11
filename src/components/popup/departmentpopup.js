import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactEcharts from "echarts-for-react";
import { Dialog } from "primereact/dialog";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Horizontalsinglebar3 from "../charts/horizontalbarsinglechart3";
import { Link } from "react-router-dom";
import { getData } from "../../redux/selector";
import { fetchdepartment_overlay_details } from "../../redux/slices/department";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ChartWrapper from "../chartwrappershipping";
import InfoTooltip from "../InfoTooltip";
import BarLoader from "../BarLoader";

export default function DepartmentPopup(props) {
  const { departPopup, setDepartPopup } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [vendorYearTab, setVendorYearTab] = useState(0);
  const [cateYearTab, setCateYearTab] = useState(0);
  // const handleTabClick = (index) => {
  //   setActiveTab(index);
  // };

  /* selector */
  //UI Components data
  const department_overlay_detailsloading = useSelector((state) => state.department.department_overlay_detailsloading)
  const DEPT_CURRENT_YEAR_TOP_CATEGORIES = useSelector((state) => getData(state.department, "DEPT_CURRENT_YEAR_TOP_CATEGORIES"))
  const DEPT_CURRENT_YEAR_VENDORS = useSelector((state) => getData(state.department, "DEPT_CURRENT_YEAR_VENDORS"))
  const [DEPT_HEADER_INFO] = useSelector((state) => getData(state.department, "DEPT_HEADER_INFO"))
  const DEPT_PO_DETAILS = useSelector((state) => getData(state.department, "DEPT_PO_DETAILS"))
  const DEPT_PREVIOUS_YEAR_TOP_CATEGORIES = useSelector((state) => getData(state.department, "DEPT_PREVIOUS_YEAR_TOP_CATEGORIES"))
  const DEPT_PREVIOUS_YEAR_VENDORS = useSelector((state) => getData(state.department, "DEPT_PREVIOUS_YEAR_VENDORS"))
  const DEPT_TIME_TRENDING = useSelector((state) => getData(state.department, "DEPT_TIME_TRENDING"))

  /* */
  /* dispatch */
  /* */

  const moreDetailsprop = useMemo(() => {
    const { DEPARTMENT_CODE, DEPT_NAME } = DEPT_HEADER_INFO ?? {}
    const VENDOR_COUNT = Math.max(...DEPT_CURRENT_YEAR_VENDORS.map(({ VENDOR_COUNT }) => VENDOR_COUNT))
    return {
      agencyname: props.agencyname,
      activeyear: props.activeyear,
      DEPARTMENT_CODE, DEPT_NAME,
      VENDOR_COUNT, VENDOR_NAME_LIST: [...new Set(DEPT_CURRENT_YEAR_VENDORS.map(({ VENDOR_NAME_LIST }) => VENDOR_NAME_LIST).flat())]
    }
  }, [props, DEPT_HEADER_INFO, DEPT_CURRENT_YEAR_VENDORS])

  const filteredData = [
    {
      FISCAL_YEAR: "2025",
      BUDGET: "8.42",
    },
    {
      METRIC_NAME: "2024",
      POL_COUNTRY: "7.58",
    },
    {
      METRIC_NAME: "2023",
      POL_COUNTRY: "7.19",
    },
  ];

  const CurrencyTemplate = (rowData, field) => {
    return rowData[field]?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const budgetData = [
    {
      cate_name: "Salries",
      cy_spend: 2.95,
      py_spend: 4.79,
    },
    {
      cate_name: "Office Supplies",
      cy_spend: 8.75,
      py_spend: 41.29,
    },
    {
      cate_name: "Benefits Exp",
      cy_spend: 12.35,
      py_spend: 89.32,
    },
    // ... add more rows as needed
  ];
  const poData = [
    {
      po_num: "303456",
      vendor_name: "Public Trust Advisors LLC",
      po_amt: 75.00,
      amt_invoice: 37.50,
      balance: 37.50,
    },
    {
      po_num: "303452",
      vendor_name: "Laflin Andrew DBA Aclarian LLC",
      po_amt: 2.95,
      amt_invoice: 4.79,
      balance: 4.79,
    },
    {
      po_num: "3034544",
      vendor_name: "Vertosoft LLC",
      po_amt: 2.95,
      amt_invoice: 4.79,
      balance: 4.79,
    },
    // ... add more rows as needed
  ];

  const deptVendorChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        const dataIndex = params[0].dataIndex;
        const vendor = DEPT_CURRENT_YEAR_VENDORS[dataIndex];

        const name = vendor?.VENDOR_NAME || '';
        const amount = vendor?.TOTALEXPENSE_LABEL || '$0.00K';
        const percentage = vendor?.PERCENTAGE?.toFixed(2) || '0.00';

        return `${name}'s Expense Spend:<br/>${amount} / ${percentage}%`;
      }
    },
    legend: {
      show: true,
      bottom: 0,
      orient: "horizontal",
      padding: [0, 0, 0, 10],
      left: 250,
      itemGap: 20,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
    },
    grid: {
      left: '20%',
      right: '10%',
      bottom: '15%',
      top: '10%',
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: false,
        formatter: '${value}K',
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: DEPT_CURRENT_YEAR_VENDORS.map(item => item?.VENDOR_NAME),
      axisLabel: {
        color: '#333',
        fontSize: '14',
        interval: 0,
        formatter: value => value.length > 22 ? value.slice(0, 22) + '...' : value
      },
      axisLine: {
        show: true
      },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'Expense Spend',
        type: 'bar',
        barMaxWidth: 40,
        data: DEPT_CURRENT_YEAR_VENDORS.map(item => item?.TOTALEXPENSE),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return DEPT_CURRENT_YEAR_VENDORS[params.dataIndex]?.TOTALEXPENSE_LABEL || '';
          },
          color: '#444',
          fontSize: '14'
        },
        itemStyle: {
          color: '#752e3c',
          borderRadius: [5, 5, 5, 5],
        },
      },
    ],
  }

  const deptVendorChart2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        const dataIndex = params[0].dataIndex;
        const vendor = DEPT_PREVIOUS_YEAR_VENDORS[dataIndex];

        const name = vendor?.VENDOR_NAME || '';
        const amount = vendor?.TOTALEXPENSE_LABEL || '$0.00K';
        const percentage = vendor?.PERCENTAGE?.toFixed(2) || '0.00';

        return `${name}'s Expense Spend:<br/>${amount} / ${percentage}%`;
      }
    },
    legend: {
      show: true,
      bottom: 0,
      orient: "horizontal",
      padding: [0, 0, 0, 10],
      left: 250,
      itemGap: 20,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: "#000",
        fontSize: 12,
      },
    },
    grid: {
      left: '20%',
      right: '10%',
      bottom: '15%',
      top: '10%',
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: false,
        formatter: '${value}K',
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: DEPT_PREVIOUS_YEAR_VENDORS.map(item => item?.VENDOR_NAME),
      axisLabel: {
        color: '#333',
        fontSize: '14',
        interval: 0,
        formatter: value => value.length > 22 ? value.slice(0, 22) + '...' : value
      },
      axisLine: {
        show: true
      },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'Expense Spend',
        type: 'bar',
        barWidth: '25%',
        data: DEPT_PREVIOUS_YEAR_VENDORS.map(item => item?.TOTALEXPENSE),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return DEPT_PREVIOUS_YEAR_VENDORS[params.dataIndex]?.TOTALEXPENSE_LABEL || '';
          },
          color: '#444',
          fontSize: '14'
        },
        itemStyle: {
          color: '#752e3c',
          borderRadius: [5, 5, 5, 5],
        },
      },
    ],
  }

  const deptTrendsStackedChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'none' },
      formatter: params => {
        return params.map(p => `${p.seriesName}: $${p.value.toFixed(2)}M`).join('<br/>');
      }
    },
    legend: {
      bottom: 0,
      data: ['Budget', 'Expense', 'Obligation'],
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#000",
        fontSize: 12,
        fontWeight: 400
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}M',
        color: '#000',
        fontSize: 12
      },
      interval: 1,
      axisLine: {
        show: true
      },
      axisTick: {show: true},
      splitLine: {
        show: true,
        lineStyle: {
            type: "dashed",
            color: '#eee'
        },
      }
    },
    yAxis: {
      type: 'category',
      data: ['2025', '2024', '2023', '2022', '2021', '2020'],
      axisLabel: {
        color: '#000',
        fontSize: 12
      },
      axisLine: {
        show: true
      },
      axisTick: {show: false},
      splitLine: {show: false}
    },
    series: [
      {
        name: 'Budget',
        type: 'bar',
        barMinWidth: 30,
        barMaxWidth: 40,
        // stack: 'total',
        label: {
          show: true,
          position: 'right',
          color: '#333',
          fontWeight: 400,
          formatter: params => `$${params.value.toFixed(2)}M`
        },
        itemStyle: {
          color: '#d9d9d9'
        },
        data: [8.42, 7.58, 7.19, 7.01, 6.72, 5.23]
      },
      {
        name: 'Expense',
        type: 'bar',
        stack: "overlap",
        barMaxWidth: 20,
        barWidth: '35%',
        barGap: "-15%",
        itemStyle: {
          color: '#752e3c'
        },
        data: [4.95, 5.58, 5.19, 3.01, 5.62, 3.23]
      },
      {
        name: 'Obligation',
        type: 'bar',
        stack: "overlap",
        barMaxWidth: 20,
        barGap: "-75%",
        itemStyle: {
          color: '#c49a6c'
        },
        data: [0.15, 0.2, 1.2, 0.6, 0.1, 0]
      }
    ]
  }

  return (
    <>
      <Dialog
        visible={departPopup}
        className="departpopup"
        style={{ width: "90vw" }}
        onShow={props.dataAPI ?? null}
        onHide={() => setDepartPopup(false)}
      >
        <div>
          <div className="grid grid-cols-12 p-[20px] bg-[#d6d8da]">
            <BarLoader loading={department_overlay_detailsloading} style={{width: "70rem"}}>
            <div className="col-span-7">
              <div className="flex">
                <div className="px-[15px]">
                  <img src="/images/Civil.png" className="w-[80px]" />
                </div>
                <div className="px-[15px]">
                  <div className="text-[18px] font-[700] text-[#222] mb-2">
                    {DEPT_HEADER_INFO?.DEPT_NAME}
                  </div>
                  <div className="text-[14px] font-[700] text-[#222] mb-2">
                    Cost Center :{" "}
                    <span className="font-[400]">{DEPT_HEADER_INFO?.DEPT_NAME}</span>
                  </div>
                  <div className="text-[14px] font-[700] text-[#222] mb-2">
                    Number of Employees : <span className="font-[400]">{DEPT_HEADER_INFO?.NUMBEROFEMPLOYEE}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-between items-center w-[150px] mb-[15px]">
              <div className="text-[16px] font-[600] text-[#222]">
                {DEPT_HEADER_INFO?.DEPT_NAME}
              </div>
              <div className="relative">
                <Link to="/department_details" state={{moreDetailsprop}}>
                  <button className="absolute top-4 left-72 text-[14px] text-[#fff] bg-[#7c2f3e] rounded-[15px] w-[150px] py-1 text-center">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
          </BarLoader>
          </div>
          <div className="grid grid-cols-12 bg-[#fff] p-[20px] depart_tabs">
            <div className="col-span-3">
              <Tabs selectedIndex={activeTab} onSelect={(index) => {setActiveTab(index)}}>
                <div>
                  <TabList>
                    <Tab>
                      <div
                        className={`${
                          activeTab === 0
                            ? "bg-[#7c2f3e] text-[#fff]"
                            : "bg-[#fff]"
                        } rounded-[20px] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 0 ? (
                          <img src="/images/TrendsSelected.png" />
                        ) : (
                          <img src="/images/Trends.png" />
                        )}
                        TRENDS
                      </div>
                    </Tab>
                    <Tab>
                      <div
                        className={`${
                          activeTab === 1
                            ? "bg-[#7c2f3e] text-[#fff]"
                            : "bg-[#fff]"
                        } rounded-[20px] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 1 ? (
                          <img src="/images/IconVendorsSelected.png" />
                        ) : (
                          <img src="/images/IconVendors.png" />
                        )}
                        VENDORS
                      </div>
                    </Tab>
                    <Tab>
                      <div
                        className={`${
                          activeTab === 2
                            ? "bg-[#7c2f3e] text-[#fff]"
                            : "bg-[#fff]"
                        } rounded-[20px] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 2 ? (
                          <img src="/images/IconSpendingComparisonActive.png" />
                        ) : (
                          <img src="/images/IconSpendingComparison.png" />
                        )}
                        CATEGORIES
                      </div>
                    </Tab>
                    <Tab>
                      <div
                        className={`${
                          activeTab === 3
                            ? "bg-[#7c2f3e] text-[#fff]"
                            : "bg-[#fff]"
                        } rounded-[20px] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 3 ? (
                          <img src="/images/poIconSelected.png" />
                        ) : (
                          <img src="/images/poIconUnselected.png" />
                        )}
                        PO DETAILS
                      </div>
                    </Tab>
                  </TabList>
                </div>
              </Tabs>
            </div>
            <div className="col-span-9 pb-[30px]">
              <Tabs
                selectedIndex={activeTab}
                onSelect={(index) => {setActiveTab(index)}}
                style={{ width: "100%" }}
              >
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[30px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Time Trending Charts
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-5">
                      Agency Name:
                      <span className="font-[400]">
                        {" "}
                        {props.agencyname ?? ""}
                      </span>
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-3">
                      Selected Year:
                      <span className="font-[400]">{props.activeyear ?? ""}</span>
                    </div>
                  </div>
                  <ChartWrapper
                    ExportIcon={true}
                    PrintIcon={true}
                    MaxiIcon={false}
                    infoIcon={true}
                    title={""}
                    infoTooltipTitle="Time Trending Chart"
                    infoTooltipDescription="Visual representation of longitudinal representation of key spending metrics for the selected Cost center in horizontal bullet chart"
                    formatDownloadedData=""
                    header="Time Trending Chart"
                    dialogHeaderStyle={{
                      color: "#7C2F3E",
                      fontSize: "16px",
                    }}
                    formatFileName={""}
                    titleclassname="font-[600]"
                    infoTooltipComponent={InfoTooltip}
                    exportColumns={{
                      "BUDGET": "BUDGET",
                      "BUDGETPERCENTAGE": "BUDGETPERCENTAGE",
                      "BUDGET_LABEL": "BUDGET_LABEL",
                      "DEPARTMENT_CODE": "DEPARTMENT_CODE",
                      "EXPENSE": "EXPENSE",
                      "EXPENSE_LABEL": "EXPENSE_LABEL",
                      "EXPENSE_PERCENTAGE": "EXPENSE_PERCENTAGE",
                      "FISCAL_YEAR": "FISCAL_YEAR",
                      "OBLIGATION": "OBLIGATION",
                      "OBLIGATION_LABEL": "OBLIGATION_LABEL",
                      "OBLIGATION_PERCENTAGE": "OBLIGATION_PERCENTAGE",
                    }}
                    apidata={DEPT_TIME_TRENDING}
                    data={
                      <div id="chart-container" className="h-[150px]">
                        <BarLoader loading={department_overlay_detailsloading}>
                        <Horizontalsinglebar3
                          data={DEPT_TIME_TRENDING}
                          series1data={DEPT_TIME_TRENDING?.map(item => {
                            return {
                            ...item,
                            value: item?.BUDGET
                            }
                            })}
                          series2data={DEPT_TIME_TRENDING?.map(item => item?.EXPENSE)}
                          series3data={DEPT_TIME_TRENDING?.map(item => item?.OBLIGATION)}
                          yaxisdata={DEPT_TIME_TRENDING?.map(item => item?.FISCAL_YEAR)}
                          tooltip={{
                            formatter: (params) => {
                              const [param] = params;
                              const { data: item } = param ?? {};
                              return `
                                <b>Fiscal year : ${item?.FISCAL_YEAR}</b><br/>
                                Budget : ${item?.BUDGET_LABEL || "-"} / ${item?.BUDGETPERCENTAGE || 0}%<br/>
                                Expense: ${item?.EXPENSE_LABEL || "-"} / ${item?.EXPENSE_PERCENTAGE?.toFixed(2) || 0}%<br/>
                                Obligation: ${item?.OBLIGATION_LABEL || "-"} / ${item?.OBLIGATION_PERCENTAGE?.toFixed(2) || 0}%
                              `;
                            }
                          }}
                          yAxisLabel={{
                            show: true,
                            color: "#000",
                            fontSize: 12,
                            align: "center",
                            verticalAlign: "top",
                            padding: [0, 30, 0, 0],
                          }}
                          legend={{
                            show: true,
                            bottom: 2,
                            orient: "horizontal",
                            padding: [0, 0, 0, 10],
                            left: 50,
                            itemGap: 20,
                            itemWidth: 8,
                            itemHeight: 8,
                            textStyle: {
                              color: "#000",
                              fontSize: 10,
                            },
                            // data: legendState
                            data: ["Budget", "Expense", "Obligation"],
                          }}
                          grid={{
                            top: "10%",
                            left: "15%",
                            right: "20%",
                            bottom: "15%",
                            containLabel: true,
                          }}
                          seriesLabel={{
                            show: true,
                            position: "insideRight",
                            color: "#fff",
                            fontSize: 10,
                            align: "right",
                          }}
                        />
                      </BarLoader>
                      </div>
                    }
                    />
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[20px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Major Vendors-Top 5
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-5">
                      Agency Name:
                      <span className="font-[400]">
                        {" "}
                        {props.agencyname ?? ""}
                      </span>
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-3">
                      Selected Year:
                      <span className="font-[400]">{props.activeyear ?? ""}</span>
                    </div>
                  </div>
                  <div className="flex justify-end pr-[30px] mb-[30px]">
                    <Tabs selectedIndex={vendorYearTab} onSelect={(index) => {setVendorYearTab(index)}} className="yearTabs">
                        <div className="">
                          <TabList className="flex rounded-[10px] border border-[#7c2f3e] overflow-hidden">
                            <Tab>
                              <div
                                className={`${
                                  vendorYearTab === 0
                                    ? "bg-[#7c2f3e] text-[#fff]"
                                    : "bg-[#fff]"
                                } text-[14px] text-[#222] px-[30px] py-1 font-bold cursor-pointer`}
                              >2025
                              </div>
                            </Tab>
                            <Tab>
                              <div
                                className={`${
                                  vendorYearTab === 1
                                    ? "bg-[#7c2f3e] text-[#fff]"
                                    : "bg-[#fff]"
                                } text-[14px] text-[#222] px-[30px] py-1 font-bold cursor-pointer`}
                              >2024
                              </div>
                            </Tab>
                          </TabList>
                        </div>
                    </Tabs>
                  </div>
                  <Tabs
                      selectedIndex={vendorYearTab}
                      onSelect={(index) => {setVendorYearTab(index)}}
                      style={{ width: "100%" }}
                    >
                      <TabPanel>
                      <ChartWrapper
                        ExportIcon={true}
                        PrintIcon={true}
                        MaxiIcon={false}
                        infoIcon={true}
                        title={""}
                        infoTooltipTitle="Major Vendors-Top 5"
                        infoTooltipDescription="Top 5 Vendors based on the Actual spend against that Cost center for a rolling two fiscal years based on the initial selection"
                        formatDownloadedData=""
                        header="Major Vendors-Top 5"
                        dialogWidth="75vw"
                        dialogHeight="85vh"
                        dialogHeaderStyle={{
                          color: "#7C2F3E",
                          fontSize: "16px",
                        }}
                        dialogStyle={{ backgroundColor: "#ffffff" }}
                        formatFileName={""}
                        titleclassname="font-[600]"
                        infoTooltipComponent={InfoTooltip}
                        exportColumns={{
                          "PERCENTAGE": "PERCENTAGE",
                          "TOTALEXPENSE": "TOTALEXPENSE",
                          "TOTALEXPENSE_LABEL": "TOTALEXPENSE_LABEL",
                          "VENDOR_COUNT": "VENDOR_COUNT",
                          "VENDOR_NAME": "VENDOR_NAME",
                          "VENDOR_NAME_LIST": "VENDOR_NAME_LIST",
                        }}
                        apidata={DEPT_CURRENT_YEAR_VENDORS}
                        data={
                          <div className="h-[250px]">
                            <ReactEcharts option={deptVendorChart} style={{ width: '100%', height: '100%' }} />
                          </div>
                        }
                      />
                      </TabPanel>
                      <TabPanel>
                        <ChartWrapper
                          ExportIcon={true}
                          PrintIcon={true}
                          MaxiIcon={false}
                          infoIcon={true}
                          title={""}
                          infoTooltipTitle="Major Vendors-Top 5"
                          infoTooltipDescription="Top 5 Vendors based on the Actual spend against that Cost center for a rolling two fiscal years based on the initial selection"
                          formatDownloadedData=""
                          header="Major Vendors-Top 5"
                          dialogWidth="75vw"
                          dialogHeight="85vh"
                          dialogHeaderStyle={{
                            color: "#7C2F3E",
                            fontSize: "16px",
                          }}
                          dialogStyle={{ backgroundColor: "#ffffff" }}
                          formatFileName={""}
                          titleclassname="font-[600]"
                          infoTooltipComponent={InfoTooltip}
                          exportColumns={{
                          "PERCENTAGE": "PERCENTAGE",
                          "TOTALEXPENSE": "TOTALEXPENSE",
                          "TOTALEXPENSE_LABEL": "TOTALEXPENSE_LABEL",
                          "VENDOR_COUNT": "VENDOR_COUNT",
                          "VENDOR_NAME": "VENDOR_NAME",
                          "VENDOR_NAME_LIST": "VENDOR_NAME_LIST",
                        }}
                        apidata={DEPT_PREVIOUS_YEAR_VENDORS}
                          data={
                          <div className="h-[250px]">
                            <ReactEcharts option={deptVendorChart2} style={{ width: '100%', height: '100%' }} />
                          </div>
                          }
                          />
                      </TabPanel>
                  </Tabs>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[20px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Major Categories-Top 5
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-5">
                      Agency Name:
                      <span className="font-[400]">
                        {" "}
                        {props.agencyname ?? ""}
                      </span>
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-3">
                      Selected Year:
                      <span className="font-[400]">{props.activeyear ?? ""}</span>
                    </div>
                  </div>
                  <div className="flex justify-end pr-[30px] mb-[30px]">
                    <Tabs selectedIndex={cateYearTab} onSelect={(index) => {setCateYearTab(index)}} className="yearTabs">
                        <div className="">
                          <TabList className="flex rounded-[10px] border border-[#7c2f3e] overflow-hidden">
                            <Tab>
                              <div
                                className={`${
                                  cateYearTab === 0
                                    ? "bg-[#7c2f3e] text-[#fff]"
                                    : "bg-[#fff]"
                                } text-[14px] text-[#222] px-[30px] py-1 font-bold cursor-pointer`}
                              >2025
                              </div>
                            </Tab>
                            <Tab>
                              <div
                                className={`${
                                  cateYearTab === 1
                                    ? "bg-[#7c2f3e] text-[#fff]"
                                    : "bg-[#fff]"
                                } text-[14px] text-[#222] px-[30px] py-1 font-bold cursor-pointer`}
                              >2024
                              </div>
                            </Tab>
                          </TabList>
                        </div>
                    </Tabs>
                  </div>
                  <Tabs
                      selectedIndex={cateYearTab}
                      onSelect={(index) => {setCateYearTab(index)}}
                      style={{ width: "100%" }}
                    >
                      <TabPanel>
                        <ChartWrapper
                          ExportIcon={true}
                          PrintIcon={true}
                          MaxiIcon={false}
                          infoIcon={true}
                          title={""}
                          infoTooltipTitle="Major Categories-Top 5"
                          infoTooltipDescription="Top 5 Spending Categories contributing to the total spend in the selected Cost center for a rolling two fiscal years based on the initial selection"
                          formatDownloadedData=""
                          header="Major Categories-Top 5"
                          dialogWidth="75vw"
                          dialogHeight="85vh"
                          dialogHeaderStyle={{
                            color: "#7C2F3E",
                            fontSize: "16px",
                          }}
                          dialogStyle={{ backgroundColor: "#ffffff" }}
                          formatFileName={""}
                          titleclassname="font-[600]"
                          infoTooltipComponent={InfoTooltip}
                          exportColumns={{
                            "PURCHASING_CATEGORY": "Category Name",
                            "EXPENSE": "Current Year Spend",
                            "LASTYEAREXPENSES": "Previous Year Spend",
                          }}
                          apidata={DEPT_CURRENT_YEAR_TOP_CATEGORIES}
                          data={
                            <div className="pt-2">
                              <DataTable
                                value={DEPT_CURRENT_YEAR_TOP_CATEGORIES}
                                paginator
                                rows={10}
                                stripedRows
                                className="depart_tbl"
                              >
                                <Column
                                  field="PURCHASING_CATEGORY"
                                  header="Category Name"
                                  sortable
                                  className="depart_name"
                                  style={{ minWidth: "25rem" }}
                                />
                                <Column
                                  field="EXPENSE_LABEL"
                                  header="Current Year Spend"
                                  // body={(rowData) =>
                                  //   CurrencyTemplate(rowData, "cy_spend")
                                  // }
                                  sortable
                                  style={{ minWidth: "20rem" }}
                                />
                                <Column
                                  field="LASTYEAREXPENSES_LABEL"
                                  header="Previous Year Spend"
                                  // body={(rowData) =>
                                  //   CurrencyTemplate(rowData, "py_spend")
                                  // }
                                  sortable
                                  style={{ minWidth: "20rem" }}
                                />
                              </DataTable>
                            </div>
                          }
                          />
                      </TabPanel>
                      <TabPanel>
                        <ChartWrapper
                          ExportIcon={true}
                          PrintIcon={true}
                          MaxiIcon={false}
                          infoIcon={true}
                          title={""}
                          infoTooltipTitle="Major Categories-Top 5"
                          infoTooltipDescription="Top 5 Spending Categories contributing to the total spend in the selected Cost center for a rolling two fiscal years based on the initial selection"
                          formatDownloadedData=""
                          header="Major Categories-Top 5"
                          dialogWidth="75vw"
                          dialogHeight="85vh"
                          dialogHeaderStyle={{
                            color: "#7C2F3E",
                            fontSize: "16px",
                          }}
                          dialogStyle={{ backgroundColor: "#ffffff" }}
                          formatFileName={""}
                          titleclassname="font-[600]"
                          infoTooltipComponent={InfoTooltip}
                          exportColumns={{
                            "PURCHASING_CATEGORY": "Category Name",
                            "EXPENSE": "Current Year Spend",
                            "LASTYEAREXPENSES": "Previous Year Spend",
                          }}
                          apidata={DEPT_PREVIOUS_YEAR_TOP_CATEGORIES}
                          data={
                            <div className="pt-2">
                              <DataTable
                                value={DEPT_PREVIOUS_YEAR_TOP_CATEGORIES}
                                paginator
                                rows={10}
                                stripedRows
                                className="depart_tbl"
                              >
                                <Column
                                  field="PURCHASING_CATEGORY"
                                  header="Category Name"
                                  sortable
                                  className="depart_name"
                                  style={{ minWidth: "25rem" }}
                                />
                                <Column
                                  field="EXPENSE_LABEL"
                                  header="Current Year Spend"
                                  // body={(rowData) =>
                                  //   CurrencyTemplate(rowData, "cy_spend")
                                  // }
                                  sortable
                                  style={{ minWidth: "20rem" }}
                                />
                                <Column
                                  field="LASTYEAREXPENSES_LABEL"
                                  header="Previous Year Spend"
                                  // body={(rowData) =>
                                  //   CurrencyTemplate(rowData, "py_spend")
                                  // }
                                  sortable
                                  style={{ minWidth: "20rem" }}
                                />
                              </DataTable>
                            </div>
                          }
                          />
                      </TabPanel>
                    </Tabs>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[30px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      PO Details-Top 5
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-5">
                      Agency Name:
                      <span className="font-[400]">
                        {" "}
                        {props.agencyname ?? ""}
                      </span>
                    </div>
                    <div className="text-[14px] font-[700] text-[#444] col-span-3">
                      Selected Year:
                      <span className="font-[400]">{props.activeyear ?? ""}</span>
                    </div>
                  </div>
                  <ChartWrapper
                    ExportIcon={true}
                    PrintIcon={true}
                    MaxiIcon={false}
                    infoIcon={true}
                    title={""}
                    infoTooltipTitle="PO Details-Top 5"
                    infoTooltipDescription="Top 5 Purchase Orders contributing to the total spend in the selected Cost center for a rolling two fiscal years based on the initial selection."
                    formatDownloadedData=""
                    header="PO Details-Top 5"
                    dialogWidth="75vw"
                    dialogHeight="85vh"
                    dialogHeaderStyle={{
                      color: "#7C2F3E",
                      fontSize: "16px",
                    }}
                    dialogStyle={{ backgroundColor: "#ffffff" }}
                    formatFileName={""}
                    titleclassname="font-[600]"
                    infoTooltipComponent={InfoTooltip}
                    exportColumns={{
                      "PO_NAME": "PO Name",
                      "VENDOR_NAME": "Vendor Name",
                      "PO_AMT": "Total PO Amount",
                      "INVOICE_AMT": "Amount Invoiced",
                      "BALANCE": "Balance",
                    }}
                    apidata={DEPT_PO_DETAILS}
                    data={
                      <div className="pt-2">
                        <DataTable
                          value={DEPT_PO_DETAILS}
                          paginator
                          rows={10}
                          stripedRows
                          className="depart_tbl"
                        >
                          <Column
                            field="PO_NAME"
                            header="PO Number"
                            sortable
                            className="depart_name"
                            style={{ minWidth: "10rem" }}
                          />
                          <Column
                            field="VENDOR_NAME"
                            header="Vendor Name"
                            sortable
                            className="depart_name"
                            style={{ minWidth: "15rem" }}
                          />
                          <Column
                            field="PO_AMT_LABEL"
                            header="Total PO Amount"
                            // body={(rowData) =>
                            //   CurrencyTemplate(rowData, "po_amt")
                            // }
                            sortable
                            style={{ minWidth: "20rem" }}
                          />
                          <Column
                            field="INVOICE_AMT_LABEL"
                            header="Amount Invoiced"
                            // body={(rowData) =>
                            //   CurrencyTemplate(rowData, "amt_invoice")
                            // }
                            sortable
                            style={{ minWidth: "12rem" }}
                          />
                          <Column
                            field="BALANCE_LABEL"
                            header="Balance"
                            // body={(rowData) =>
                            //   CurrencyTemplate(rowData, "balance")
                            // }
                            sortable
                            style={{ minWidth: "10rem" }}
                          />
                        </DataTable>
                      </div>
                    }
                  />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
