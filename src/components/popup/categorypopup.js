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
import TopLinesHorizontalBar from "../charts/TopHorizontalChart";
import { fetchcategory_overlay_details, fetchcategory_table_details } from "../../redux/slices/categories";
import InfoTooltip from "../InfoTooltip";
import ChartWrapper from "../chartwrappershipping";
import BarLoader from "../BarLoader";

export default function CategoryPopup(props) {
  const { catePopup, setCatePopup } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [vendorYearTab, setVendorYearTab] = useState(0);
  const [cateYearTab, setCateYearTab] = useState(0);
  // const handleTabClick = (index) => {
  //   setActiveTab(index);
  // };

  const category_overlay_detailsloading = useSelector((state) => state.categories.category_overlay_detailsloading)
  const category_table_detailsloading = useSelector((state) => state.categories.category_table_detailsloading)
  /* selector */
  //UI Components data
  const department_overlay_detailsloading = useSelector((state) => state.categories.department_overlay_detailsloading)
  const CATEGORY_CURRENT_YEAR_MAJOR_DEPARTMENTS = useSelector((state) => getData(state.categories, "CATEGORY_CURRENT_YEAR_MAJOR_DEPARTMENTS"))
  const CATEGORY_CURRENT_YEAR_MAJOR_VENDORS = useSelector((state) => getData(state.categories, "CATEGORY_CURRENT_YEAR_MAJOR_VENDORS"))
  const [CATEGORY_HEADER_INFO] = useSelector((state) => getData(state.categories, "CATEGORY_HEADER_INFO"))
  // const DEPT_PO_DETAILS = useSelector((state) => getData(state.categories, "DEPT_PO_DETAILS"))
  const CATEGORY_PREVIOUS_YEAR_MAJOR_DEPARTMENTS = useSelector((state) => getData(state.categories, "CATEGORY_PREVIOUS_YEAR_MAJOR_DEPARTMENTS"))
  const CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS = useSelector((state) => getData(state.categories, "CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS"))
  const CATEGORY_TIME_TRENDING = useSelector((state) => getData(state.categories, "CATEGORY_TIME_TRENDING"))
  const CURRENT_LIST_ARRAY = useSelector((state) => getData(state.categories, "CURRENT_LIST_ARRAY"))
  const PREVIOUS_LIST_ARRAY = useSelector((state) => getData(state.categories, "PREVIOUS_LIST_ARRAY"))

  /* */
  const moreDetailsprop = useMemo(() => {
    return {
      agencyname: props.agencyname,
      activeyear: props.activeyear,
      selectedCategory: props.selectedCategory,
      selectedroll: props.selectedroll
    }
  }, [props])

  /* dispatch */
  //  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(fetchdepartment_overlay_details({
  //     elasticQueryName: "",
  //     filters: [],
  //     dynamicColumns: [
  //        {
  //         columnName: "{#org}",
  //         columnValue: ['Clerk of the Circuit Court'],
  //         // columnValue: ['Board of County Commissioners'],
  //       },
  //       {
  //         columnName: "{#fiscal_year}",
  //         columnValue: [2025],
  //       },
  //       {
  //         columnName: "{#vendor_year}",
  //         columnValue: [2025],
  //       },
  //       {
  //         columnName: "{#category_year}",
  //         columnValue: [2025],
  //       },
  //       {
  //         columnName: "{#year}",
  //         columnValue: [2025],
  //       },
  //       {
  //         columnName: "{#dept_id}",
  //         columnValue: ['950500'],
  //       },
  //     ],
  //   }));
  // }, [])
  /* */

  const deptVendorChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params) {
        const dataIndex = params[0].dataIndex;
        const vendor = CATEGORY_CURRENT_YEAR_MAJOR_VENDORS[dataIndex];

        const name = vendor?.vendor_name || '';
        const amount = vendor?.total_expense_label || '$0.00K';
        const percentage = vendor?.expense_percentage?.toFixed(2) || '0.00';

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
      data: CATEGORY_CURRENT_YEAR_MAJOR_VENDORS.map(item => item?.vendor_name),
      axisLabel: {
        color: '#333',
        fontSize: '14',
        interval: 0,
        formatter: value => value.length > 22 ? value.slice(0, 22) + '...' : value
      },
      axisLine: {
        show: false
      },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'Expense Spend',
        type: 'bar',
        barWidth: '25%',
        data: CATEGORY_CURRENT_YEAR_MAJOR_VENDORS.map(item => item?.total_expense),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return CATEGORY_CURRENT_YEAR_MAJOR_VENDORS[params.dataIndex]?.total_expense_label || '';
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
        const vendor = CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS[dataIndex];

        const name = vendor?.vendor_name || '';
        const amount = vendor?.total_expense_label || '$0.00K';
        const percentage = vendor?.expense_percentage?.toFixed(2) || '0.00';

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
      data: CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS.map(item => item?.vendor_name),
      axisLabel: {
        color: '#333',
        fontSize: '14',
        interval: 0,
        formatter: value => value.length > 22 ? value.slice(0, 22) + '...' : value
      },
      axisLine: {
        show: false
      },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'Expense Spend',
        type: 'bar',
        barWidth: '25%',
        data: CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS.map(item => item?.total_expense),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS[params.dataIndex]?.total_expense_label || '';
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
    return rowData[field].toLocaleString("en-US", {
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

  const cateDeptData = [
    { name: 'Criminal Case Initiation', expense: 1.51, obligation: 0 },
    { name: 'Court Assistance', expense: 1.51, obligation: 0 },
    { name: 'Circuit Civil Ct Records', expense: 1.47, obligation: 0 },
    { name: 'Finance Division', expense: 0.95, obligation: 0 },
    { name: 'Criminal Ct Customer Svc', expense: 0.89, obligation: 0 },
  ];

  return (
    <>
      <Dialog
        visible={catePopup}
        className="departpopup"
        style={{ width: "90vw" }}
        onShow={props.dataAPI ?? null}
        onHide={() => setCatePopup(false)}
      >
        <div>
          <div className="grid grid-cols-12 p-[20px] bg-[#d6d8da]">
            <BarLoader loading={category_overlay_detailsloading} style={{width: "70rem"}}>
            <div className="col-span-7">
              <div className="flex">
                <div className="px-[15px]">
                  <img src="/images/Categories_Icon.png" className="w-[80px]" />
                </div>
                <div className="px-[15px]">
                  <div className="text-[18px] font-[700] text-[#222] mb-2">
                    {CATEGORY_HEADER_INFO?.category_name}
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-between items-center w-[150px] mb-[15px]">
              <div className="text-[16px] font-[600] text-[#222]">
              </div>
              <div className="relative">
                <Link to="/categories_details" state={{moreDetailsprop}}>
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
                        } rounded-[20px] text-[14px] font-[500] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
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
                        } rounded-[20px] text-[14px] font-[500] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
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
                        } rounded-[20px] text-[14px] font-[500] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 2 ? (
                          <img src="/images/IconSpendingComparisonActive.png" />
                        ) : (
                          <img src="/images/IconSpendingComparison.png" />
                        )}
                        DEPARTMENTS
                      </div>
                    </Tab>
                    <Tab>
                      <div
                        className={`${
                          activeTab === 3
                            ? "bg-[#7c2f3e] text-[#fff]"
                            : "bg-[#fff]"
                        } rounded-[20px] text-[14px] font-[500] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 3 ? (
                          <img src="/images/IconSpendingComparisonActive.png" />
                        ) : (
                          <img src="/images/IconSpendingComparison.png" />
                        )}
                        DEPARTMENT LIST
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
                      Time Trending Chart
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
                    infoTooltipDescription="Visual representation of longitudinal trends tracking Expense and Obligation for the selected Category in a bullet chart"
                    formatDownloadedData=""
                    header="Time Trending Chart"
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
                      "category_name": "CATEGORY NAME",
                      "fiscal_year": "FISCAL YEAR",
                      "total_budget": "BUDGET",
                      "budget_label": "BUDGET LABEL",
                      "budget_percentage": "BUDGET PERCENTAGE",
                      "spend_to_date": "EXPENSE",
                      "expense_label": "EXPENSE LABEL",
                      "spend_percentage": "EXPENSE PERCENTAGE",
                      "obligation": "OBLIGATION",
                      "obligation_label": "OBLIGATION LABEL",
                      "obligation_percentage": "OBLIGATION PERCENTAGE",
                    }}
                    apidata={CATEGORY_TIME_TRENDING}
                    data={
                      <div className="h-[250px] relative">
                       <BarLoader loading={category_overlay_detailsloading}>
                        {CATEGORY_TIME_TRENDING?.length == 0 ?
                         <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                          No Data!
                          </div>
                         :
                        <TopLinesHorizontalBar
                          legend={{
                            show: true,
                            bottom: 0,
                            data: ['Expense', 'Obligation'],
                            itemGap: 20,
                            itemWidth: 10,
                            itemHeight: 10,
                            textStyle: {
                              color: "#000",
                              fontSize: 12,
                            }
                          }}
                          tooltip={{
                            trigger: 'axis',
                            axisPointer: {
                              type: 'shadow',
                            },
                            formatter: function (params) {
                              const deptName = params[0]?.name || '';

                              let total = 0;
                              params.forEach(p => total += p.value);

                              const formatValue = (val) => {
                                if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
                                if (val >= 1_000) return `$${(val / 1_000).toFixed(2)}K`;
                                return `$${val.toFixed(2)}`;
                              };

                              const formatPercent = (val) => total > 0 ? `${((val / total) * 100).toFixed(2)}%` : '0.00%';

                              const expense = params.find(p => p.seriesName === 'Expense');
                              const obligation = params.find(p => p.seriesName === 'Obligation');

                              return `
                                Fiscal Year: ${deptName}<br/>
                                Expense : ${formatValue(expense?.value || 0)} / ${formatPercent(expense?.value || 0)}<br/>
                                Obligation : ${formatValue(obligation?.value || 0)} / ${formatPercent(obligation?.value || 0)}
                              `;
                            }
                          }}
                          grid={{
                            top: '5%',
                            left: '3%',
                            right: '4%',
                            bottom: '15%',
                            containLabel: true,
                          }}
                          XaxisData={{
                            type: 'value',
                            axisLabel: {
                              formatter: (val) => `${val / 1000}k`,
                              color: '#222'
                            },
                            axisLine: { show: true },
                            splitLine: {
                              show: true,
                              lineStyle: {
                                type: "dashed",
                                color: '#eee'
                              }
                            },
                            axisTick: { show: true }
                          }}
                          yaxisData={{
                            type: 'category',
                            data: CATEGORY_TIME_TRENDING.map(item => item?.fiscal_year),
                            axisLabel: {
                              color: '#000'
                            },
                            axisLine: { show: true },
                            splitLine: { show: false },
                            axisTick: { show: false }
                          }}
                          series={[
                            {
                              name: 'Expense',
                              type: 'bar',
                              barWidth: '15%',
                              stack: 'total',
                              label: { show: false },
                              emphasis: { focus: 'series' },
                              itemStyle: { color: '#7f3b49' },
                              data: CATEGORY_TIME_TRENDING.map(item => item?.spend_to_date), 
                            },
                            {
                              name: 'Obligation',
                              type: 'bar',
                              barWidth: '15%',
                              stack: 'total',
                              label: { show: false },
                              emphasis: { focus: 'series' },
                              itemStyle: { color: '#d4a373' },
                              data: CATEGORY_TIME_TRENDING.map(item => item?.obligation),
                            },
                          ]}
                        />
                        }
                      </BarLoader>
                      </div>
                    }
                    />
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[20px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Major Vendors
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
                  <div className="flex justify-end pr-[30px]">
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
                      <div className="mt-8">
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
                          "category": "CATEGORY",
                          "fiscal_year": "FISCAL YEAR",
                          "vendor_name": "VENDOR NAME",
                          "total_expense": "EXPENSE",
                          "expense_percentage": "EXPENSE PERCENTAGE",
                          "total_expense_label": "EXPENSE LABEL",
                        }}
                        apidata={CATEGORY_CURRENT_YEAR_MAJOR_VENDORS}
                        data={
                          <div className="h-[250px] relative">
                            {CATEGORY_CURRENT_YEAR_MAJOR_VENDORS.length == 0 ?
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No Data!
                              </div>
                              :
                              <ReactEcharts option={deptVendorChart} style={{ width: '100%', height: '100%' }} />
                            }
                          </div>
                        }
                      />
                      </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-8">
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
                          "category": "CATEGORY",
                          "fiscal_year": "FISCAL YEAR",
                          "vendor_name": "VENDOR NAME",
                          "total_expense": "EXPENSE",
                          "expense_percentage": "EXPENSE PERCENTAGE",
                          "total_expense_label": "EXPENSE LABEL",
                        }}
                        apidata={CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS}
                        data={
                          <div className="h-[250px] relative">
                            {CATEGORY_PREVIOUS_YEAR_MAJOR_VENDORS.length == 0 ?
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No Data!
                              </div>
                              :
                              <ReactEcharts option={deptVendorChart2} style={{ width: '100%', height: '100%' }} />
                            }
                          </div>
                        }
                      />
                      </div>
                    </TabPanel>
                  </Tabs>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[20px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Major Departments
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
                          infoTooltipTitle="Major Departments"
                          infoTooltipDescription="Major Departments based on the Actual spend against that Category for a rolling two fiscal years based on the initial selection"
                          formatDownloadedData=""
                          header="Major Departments"
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
                            "category": "CATEGORY",
                            "department_name": "DEPARTMENT NAME",
                            "fiscal_year": "FISCAL YEAR",
                            "total_budget": "BUDGET",
                            "budget_label": "BUDGET LABEL",
                            "budget_percentage": "BUDGET PERCENTAGE",
                            "spend_to_date": "EXPENSE",
                            "expense_label": "EXPENSE LABEL",
                            "spend_percentage": "EXPENSE PERCENTAGE",
                            "obligation": "OBLIGATION",
                            "obligation_label": "OBLIGATION LABEL",
                            "obligation_percentage": "OBLIGATION PERCENTAGE",
                          }}
                          apidata={CATEGORY_CURRENT_YEAR_MAJOR_DEPARTMENTS}
                          data={
                            <div className="h-[250px] relative">
                              {CATEGORY_CURRENT_YEAR_MAJOR_DEPARTMENTS?.length == 0 ? 
                               <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No Data!
                               </div>
                              :
                              <TopLinesHorizontalBar
                                legend={{
                                  show: true,
                                  bottom: 0,
                                  data: ['Expense', 'Obligation'],
                                  itemGap: 20,
                                  itemWidth: 10,
                                  itemHeight: 10,
                                  textStyle: {
                                    color: "#000",
                                    fontSize: 12,
                                  }
                                }}
                                tooltip={{
                                  trigger: 'axis',
                                  axisPointer: {
                                    type: 'shadow',
                                  },
                                  formatter: function (params) {
                                    const deptName = params[0]?.name || '';

                                    let total = 0;
                                    params.forEach(p => total += p.value);

                                    const formatValue = (val) => {
                                      if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
                                      if (val >= 1_000) return `$${(val / 1_000).toFixed(2)}K`;
                                      return `$${val.toFixed(2)}`;
                                    };

                                    const formatPercent = (val) => total > 0 ? `${((val / total) * 100).toFixed(2)}%` : '0.00%';

                                    const expense = params.find(p => p.seriesName === 'Expense');
                                    const obligation = params.find(p => p.seriesName === 'Obligation');

                                    return `
                                      ${deptName}<br/>
                                      Expense : ${formatValue(expense?.value || 0)} / ${formatPercent(expense?.value || 0)}<br/>
                                      Obligation : ${formatValue(obligation?.value || 0)} / ${formatPercent(obligation?.value || 0)}
                                    `;
                                  }
                                }}
                                grid={{
                                  top: '5%',
                                  left: '3%',
                                  right: '4%',
                                  bottom: '15%',
                                  containLabel: true,
                                }}
                                XaxisData={{
                                  type: 'value',
                                  axisLabel: {
                                    formatter: (val) => `${val / 1000}k`,
                                    color: '#222'
                                  },
                                  axisLine: { show: true },
                                  splitLine: {
                                    show: true,
                                    lineStyle: {
                                      type: "dashed",
                                      color: '#eee'
                                    }
                                  },
                                  axisTick: { show: true }
                                }}
                                yaxisData={{
                                  type: 'category',
                                  data: CATEGORY_CURRENT_YEAR_MAJOR_DEPARTMENTS.map(item => item?.department_name),
                                  axisLabel: {
                                    color: '#000'
                                  },
                                  axisLine: { show: true },
                                  splitLine: { show: false },
                                  axisTick: { show: false }
                                }}
                                series={[
                                  {
                                    name: 'Expense',
                                    type: 'bar',
                                    barWidth: '30%',
                                    stack: 'total',
                                    label: { show: false },
                                    emphasis: { focus: 'series' },
                                    itemStyle: { color: '#7f3b49' },
                                    data: CATEGORY_CURRENT_YEAR_MAJOR_DEPARTMENTS.map(item => item?.spend_to_date), // convert to actual values
                                  },
                                  {
                                    name: 'Obligation',
                                    type: 'bar',
                                    barWidth: '30%',
                                    stack: 'total',
                                    label: { show: false },
                                    emphasis: { focus: 'series' },
                                    itemStyle: { color: '#d4a373' },
                                    data: CATEGORY_CURRENT_YEAR_MAJOR_DEPARTMENTS.map(item => item?.obligation),
                                  },
                                ]}
                              />
                              }
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
                          infoTooltipTitle="Major Departments"
                          infoTooltipDescription="Major Departments based on the Actual spend against that Category for a rolling two fiscal years based on the initial selection"
                          formatDownloadedData=""
                          header="Major Departments"
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
                            "category": "CATEGORY",
                            "department_name": "DEPARTMENT NAME",
                            "fiscal_year": "FISCAL YEAR",
                            "total_budget": "BUDGET",
                            "budget_label": "BUDGET LABEL",
                            "budget_percentage": "BUDGET PERCENTAGE",
                            "spend_to_date": "EXPENSE",
                            "expense_label": "EXPENSE LABEL",
                            "spend_percentage": "EXPENSE PERCENTAGE",
                            "obligation": "OBLIGATION",
                            "obligation_label": "OBLIGATION LABEL",
                            "obligation_percentage": "OBLIGATION PERCENTAGE",
                          }}
                          apidata={CATEGORY_PREVIOUS_YEAR_MAJOR_DEPARTMENTS}
                          data={
                            <div className="h-[250px] relative">
                              {CATEGORY_PREVIOUS_YEAR_MAJOR_DEPARTMENTS?.length == 0 ?
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                  No Data!
                                </div>
                                :
                                <TopLinesHorizontalBar
                                  legend={{
                                    show: true,
                                    bottom: 0,
                                    data: ['Expense', 'Obligation'],
                                    itemGap: 20,
                                    itemWidth: 10,
                                    itemHeight: 10,
                                    textStyle: {
                                      color: "#000",
                                      fontSize: 12,
                                    }
                                  }}
                                  tooltip={{
                                    trigger: 'axis',
                                    axisPointer: {
                                      type: 'shadow',
                                    },
                                    formatter: function (params) {
                                      const deptName = params[0]?.name || '';

                                      let total = 0;
                                      params.forEach(p => total += p.value);

                                      const formatValue = (val) => {
                                        if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
                                        if (val >= 1_000) return `$${(val / 1_000).toFixed(2)}K`;
                                        return `$${val.toFixed(2)}`;
                                      };

                                      const formatPercent = (val) => total > 0 ? `${((val / total) * 100).toFixed(2)}%` : '0.00%';

                                      const expense = params.find(p => p.seriesName === 'Expense');
                                      const obligation = params.find(p => p.seriesName === 'Obligation');

                                      return `
                                      ${deptName}<br/>
                                      Expense : ${formatValue(expense?.value || 0)} / ${formatPercent(expense?.value || 0)}<br/>
                                      Obligation : ${formatValue(obligation?.value || 0)} / ${formatPercent(obligation?.value || 0)}
                                    `;
                                    }
                                  }}
                                  grid={{
                                    top: '5%',
                                    left: '3%',
                                    right: '4%',
                                    bottom: '15%',
                                    containLabel: true,
                                  }}
                                  XaxisData={{
                                    type: 'value',
                                    axisLabel: {
                                      formatter: (val) => `${val / 1000}k`,
                                      color: '#222'
                                    },
                                    axisLine: { show: true },
                                    splitLine: {
                                      show: true,
                                      lineStyle: {
                                        type: "dashed",
                                        color: '#eee'
                                      }
                                    },
                                    axisTick: { show: true }
                                  }}
                                  yaxisData={{
                                    type: 'category',
                                    data: CATEGORY_PREVIOUS_YEAR_MAJOR_DEPARTMENTS.map(item => item?.department_name),
                                    axisLabel: {
                                      color: '#000'
                                    },
                                    axisLine: { show: true },
                                    splitLine: { show: false },
                                    axisTick: { show: false }
                                  }}
                                  series={[
                                    {
                                      name: 'Expense',
                                      type: 'bar',
                                      barWidth: '30%',
                                      stack: 'total',
                                      label: { show: false },
                                      emphasis: { focus: 'series' },
                                      itemStyle: { color: '#7f3b49' },
                                      data: CATEGORY_PREVIOUS_YEAR_MAJOR_DEPARTMENTS.map(item => item?.spend_to_date), // convert to actual values
                                    },
                                    {
                                      name: 'Obligation',
                                      type: 'bar',
                                      barWidth: '30%',
                                      stack: 'total',
                                      label: { show: false },
                                      emphasis: { focus: 'series' },
                                      itemStyle: { color: '#d4a373' },
                                      data: CATEGORY_PREVIOUS_YEAR_MAJOR_DEPARTMENTS.map(item => item?.obligation),
                                    },
                                  ]}
                                />
                              }
                            </div>
                          }
                          />
                      </TabPanel>
                    </Tabs>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[20px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Departments List
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
                      <div className="pt-2">
                        <DataTable
                          value={CURRENT_LIST_ARRAY}
                          paginator
                          rows={3}
                          stripedRows
                          className="depart_tbl"
                        >
                          <Column
                            field="DEPARTMENT_NAME"
                            header="Department Name"
                            sortable
                            className="depart_name"
                            style={{ minWidth: "10rem" }}
                          />
                        </DataTable>
                      </div>
                      </TabPanel>
                      <TabPanel>
                      <div className="pt-2">
                        <DataTable
                          value={PREVIOUS_LIST_ARRAY}
                          paginator
                          rows={3}
                          stripedRows
                          className="depart_tbl"
                        >
                          <Column
                            field="DEPARTMENT_NAME"
                            header="Department Name"
                            sortable
                            className="depart_name"
                            style={{ minWidth: "10rem" }}
                          />
                        </DataTable>
                      </div>
                      </TabPanel>
                    </Tabs>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
