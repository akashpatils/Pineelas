import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "./layouts/Layout";
import { FaHome, FaChevronRight } from "react-icons/fa";
import DataDountChart from "../components/charts/datadonutchart";
import "./../css/style.css";
import SingleBarChart from "./charts/singlebarchart";
import Horizontalsinglebar from "./charts/horizontalbarsinglechart";
import Horizontalbar from "./charts/horizontalbar";
import Verticalbar from "../components/charts/verticalbar";
import ChartWrapper from "../components/chartwrappershipping";
import PieChart from "../components/charts/piechart";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LoaderContainer from "./LoaderContainer/index";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchget_overall_departments_info_updated } from "../redux/slices/department";
import { getData } from "../redux/selector";
import { fetchget_fiscal_year } from "../redux/slices/global";
import { fetchget_category_list, fetchget_category_tile_details, fetchget_category_table_details } from "../redux/slices/categories";
import InfoTooltip from "./InfoTooltip";
import TopLinesHorizontalBar from "./charts/TopHorizontalChart";
import SingleBarChart3 from "./charts/singlebarchart3";
import { useLocation, useNavigate } from "react-router-dom";
import ReactECharts from 'echarts-for-react';
import BarLoader from "./BarLoader";

const CategoriesDetail = () => {
  /* Carry State */
  const location = useLocation();
  const navigate = useNavigate();
  const { moreDetailsprop } = location.state || {};

  useLayoutEffect(() => {
    if (!moreDetailsprop) navigate("/categories")
  }, [location.state])
  /*  */
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const labels = ["List View", "Tile View"];
  const department_details_labels = ["Time Trend View", "Category View"];
  const [selectedCostCenter, setSelectedCostCenter] = useState({
    "category_name": moreDetailsprop.selectedCategory
});
  const [selectedSpend, setSelectedSpend] = useState("SPEND AMOUNT");
  const [selectedYear, setSelectedYear] = useState({FISCAL_YEAR: moreDetailsprop.activeyear});

  /* selector */
  const get_overall_departments_info_updatedloading = useSelector(
    (state) => state.department.get_overall_departments_info_updatedloading
  );

  const get_fiscal_yearloading = useSelector(
    (state) => state.global.get_fiscal_yearloading
  );

  const get_category_listloading = useSelector(
    (state) => state.categories.get_category_listloading
  );

  const get_category_tile_detailsloading = useSelector(
    (state) => state.categories.get_category_tile_detailsloading
  );

  const get_category_table_detailsloading = useSelector(
    (state) => state.categories.get_category_table_detailsloading
  );

  const FISCAL_YEAR_LIST = useSelector((state) =>
      getData(state.global, "FISCAL_YEAR_LIST")
    );
  
    const CATEGORY_LIST = useSelector((state) =>
      getData(state.categories, "CATEGORY_LIST")
    );

  const TIME_TRENDING_VIEW = useSelector((state) => getData(state.categories, "TIME_TRENDING_VIEW"))
  const TOTAL_SPEND = useSelector((state) => getData(state.categories, "TOTAL_SPEND"))
  const TOTAL_SPEND_DONUT_CHART = useSelector((state) => getData(state.categories, "TOTAL_SPEND_DONUT_CHART"))
  const CATEGORY_MAJOR_VENDORS = useSelector((state) => getData(state.categories, "CATEGORY_MAJOR_VENDORS"))
  const CATEGORY_MAJOR_DEPARTMENTS = useSelector((state) => getData(state.categories, "CATEGORY_MAJOR_DEPARTMENTS"))
  const mainTableConfig = useSelector((state) => getData(state.categories, "mainTableConfig"))
  
  const flatData = TOTAL_SPEND_DONUT_CHART[0];

  const spendPercentage = flatData?.find(item => item.NAMES === "SPEND_PERCENTAGE")?.VALUE ?? 0;
  const obligationPercentage = flatData?.find(item => item.NAMES === "ENCUMBERED_PERCENTAGE")?.VALUE ?? 0;
  const variancePercentage = flatData?.find(item => item.NAMES === "VARIANCEPERCENTAGE")?.VALUE ?? 0;

  const donutChartOption = {
    title: {
      text: `Spend to date\n${spendPercentage}%\nVariance\n${variancePercentage}%`,
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 24,
        rich: {
          line2: {
            fontSize: 12,
            color: '#000',
            padding: [5, 0, 0, 0]
          }
        }
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    legend: {
      bottom: 0,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      icon: 'rect',
      data: ['Spend Percentage', 'Obligated Percentage'],
    },
    series: [
      {
        name: 'Spend Overview',
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: spendPercentage, name: 'Spend Percentage', itemStyle: { color: '#6E1C24' } },
          { value: obligationPercentage, name: 'Obligated Percentage', itemStyle: { color: '#B6824C' } },
        ]
      }
    ]
  };


  // const [TOTAL_DEPARTMENTS] = useSelector((state) =>
  //   getData(state.department, "TOTAL_DEPARTMENTS")
  // );
  // const TOTAL_DEPARTMENTS_DONUT_CHART = useSelector((state) =>
  //   getData(state.department, "TOTAL_DEPARTMENTS_DONUT_CHART")
  // );
  // const [COMBINED_EXPENSES] = useSelector((state) =>
  //   getData(state.department, "COMBINED_EXPENSES")
  // );
  // const TOP_DEPARTMENTS = useSelector((state) =>
  //   getData(state.department, "TOP_DEPARTMENTS")
  // );
  // const DEPARTMENT_MAIN_LIST = useSelector((state) =>
  //   getData(state.department, "DEPARTMENT_MAIN_LIST")
  // );
  // const DEPARTMENT_LIST = useSelector((state) =>
  //   getData(state.department, "DEPARTMENT_LIST")
  // );

  //  const [TOP_PAYROLL] = useSelector((state) => getData(state.payrollExpense, "TOP_PAYROLL"))

  const TOP_PAYROLL = {
    TOTAL_EXPENSE_LABEL: "100%",
    BCC_PERCENTAGE: 100,
    CCC_PERCENTAGE: 0,
    BCC_EXPENSE_LABEL: "$600,000",
    CCC_EXPENSE_LABEL: "$0",
    BCC_EXPENSE: 600000,
    CCC_EXPENSE: 400000,
  };

  /* */

  /* dispatch */
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     fetchget_overall_departments_info_updated({
  //       elasticQueryName: "",
  //       filters: [],
  //       dynamicColumns: [
  //         {
  //           columnName: "{#org}",
  //           columnValue: "Clerk of the Circuit Court",
  //         },
  //         {
  //           columnName: "{#fiscal_year}",
  //           columnValue: 2025,
  //         },
  //       ],
  //     })
  //   );
  // }, []);
  useEffect(() => {
    dispatch(
      fetchget_fiscal_year({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [],
      })
    );
    dispatch(
      fetchget_category_list({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#major_catname}",
            columnValue: [selectedCostCenter.category_name],
          },
          {
            columnName: "{#fiscal_year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#org}",
            columnValue: [moreDetailsprop.agencyname],
          },
          {
            columnName: "{#major_ACCOUNT_ROLLUP_NAME}",
            columnValue: [moreDetailsprop.selectedroll],
          },
        ],
      })
    );
    dispatch(
      fetchget_category_tile_details({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#major_catname}",
            columnValue: [selectedCostCenter.category_name],
          },
          {
            columnName: "{#fiscal_year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#org}",
            columnValue: [moreDetailsprop.agencyname],
          },
          {
            columnName: "{#major_ACCOUNT_ROLLUP_NAME}",
            columnValue: [moreDetailsprop.selectedroll],
          },
        ],
      })
    );
    dispatch(
      fetchget_category_table_details({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#major_catname}",
            columnValue: [selectedCostCenter.category_name],
          },
          {
            columnName: "{#fiscal_year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#org}",
            columnValue: [moreDetailsprop.agencyname],
          },
          {
            columnName: "{#major_ACCOUNT_ROLLUP_NAME}",
            columnValue: [moreDetailsprop.selectedroll],
          },
        ],
      })
    );
  }, [selectedYear, selectedCostCenter]);
  /* */

  // const CustomTabView = () => {
  //   const [activeIndex, setActiveIndex] = useState(0);

  //   return (
  //     <div>
  //       <div className="custom-tabview-container">
  //         <div className="custom-tabview">
  //           {labels.map((label, index) => (
  //             <button
  //               key={index}
  //               className={`custom-tab-header ${
  //                 activeIndex === index ? "active" : ""
  //               }`}
  //               onClick={() => setActiveIndex(index)}
  //             >
  //               {label}
  //             </button>
  //           ))}
  //         </div>
  //       </div>

  //       <div className="custom-tab-content">
  //         {activeIndex === 0 && <p>List View content goes here...</p>}
  //         {activeIndex === 1 && <p>Tile View content goes here...</p>}
  //       </div>
  //     </div>
  //   );
  // };

  const spendamount = [
    { label: "SPEND AMOUNT", value: "SPEND AMOUNT" },
    { label: "NAME", value: "NAME" },
  ];

  const filteredData = [
    {
      METRIC_NAME: "Export",
      POL_COUNTRY: "India",
    },
    {
      METRIC_NAME: "Export",
      POL_COUNTRY: "China",
    },
    {
      METRIC_NAME: "Export",
      POL_COUNTRY: "Germany",
    },
    {
      METRIC_NAME: "Export",
      POL_COUNTRY: "US",
    },
    {
      METRIC_NAME: "Import",
      POL_COUNTRY: "India",
    },
    {
      METRIC_NAME: "Import",
      POL_COUNTRY: "China",
    },
    {
      METRIC_NAME: "Import",
      POL_COUNTRY: "Germany",
    },
    {
      METRIC_NAME: "Import",
      POL_COUNTRY: "US",
    },
    {
      METRIC_NAME: "overall",
      POL_COUNTRY: "India",
    },
    {
      METRIC_NAME: "overall",
      POL_COUNTRY: "China",
    },
    {
      METRIC_NAME: "overall",
      POL_COUNTRY: "Germany",
    },
    {
      METRIC_NAME: "overall",
      POL_COUNTRY: "US",
    },
  ];

  const filteredCombineData = [
    {
      METRIC_NAME: "Export",
      POL_COUNTRY: "India",
    },
    {
      METRIC_NAME: "Import",
      POL_COUNTRY: "India",
    },
    {
      METRIC_NAME: "overall",
      POL_COUNTRY: "India",
    },
  ];

  const financeTiles = Array.from({ length: 25 }, (_, i) => ({
    division: `Division ${i + 1}`,
    icon: "/images/tile_viewIcon.png",
    expense: (Math.random() * 5000000 + 1000000).toFixed(2),
    budget: (Math.random() * 5000000 + 6000000).toFixed(2),
    chartData: [
      {
        METRIC_NAME: "overall",
        POL_COUNTRY: `Country ${i + 1}`,
        CNT_20: Math.floor(Math.random() * 500),
        CNT_40: Math.floor(Math.random() * 500),
      },
    ],
  }));

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  const chunkedData = chunkArray(financeTiles, 20);

  useEffect(() => {
    // When spendamount is loaded, set default
    if (spendamount.length > 0 && !selectedSpend) {
      setSelectedSpend(spendamount[0]);
    }
  }, [spendamount]);

  const departments = [
    "Finance Division",
    "Field Services",
    "Fieldstone Vill@Woodfiel",
    "Film Commission",
    "Feather Snd Comm  Svcs Dist",
  ];

  const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);

  const CurrencyTemplate = (rowData, field) => {
    return rowData[field]?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const invoicesData = [
    {
      invoiceNumber: '045494179',
      vendorName: 'Trust foundation',
      invoiceAmount: '$3,556.85',
      invoiceDate: '2024-12-01',
      fund: 'CCC-Operating-Board',
      category: 'Repair&Maintenance Svcs',
      ponumber: '303475',
      payments: [
        {
          paymentMode: 'Cheque',
          paymentNumber: '12345678',
          payAmount: '$3,556.85',
          paymentDate: '2024-12-02',
          accountingDate: '2024-12-02',
        },
      ],
    },
    {
      invoiceNumber: '020156234',
      vendorName: 'Trust foundation',
      invoiceAmount: '$87,873.78',
      invoiceDate: '2024-09-01',
      fund: 'CCC-Public Records Modern',
      category: 'Repair&Maintenance Svcs',
      poNumber: '303505',
      payments: [],
    },
  ];
  
  const header = (
    <div className="p-d-flex p-jc-between">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search Invoice Number"
        />
      </span>
      <Button label="Reset" icon="pi pi-times" onClick={() => setGlobalFilter('')} className="p-button-secondary" />
    </div>
  );

  const paymentDetailsTemplate = (mainTableConfig) => {
    return (
      <div className="p-3" style={{boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)'}}>
        <h5 className="text-[#7c2f3e] text-[15px] mb-3 font-[600]">Payment Details</h5>
        {mainTableConfig?.PAYMENT_LIST?.length === 0 ? (
          <p>No Payment Info</p>
        ) : (
          <DataTable value={mainTableConfig.PAYMENT_LIST}>
            <Column field="PAYMENT_MODE" header="Payment Mode" />
            <Column field="CHEQUE_NUMBER" header="Payment Number" />
            <Column field="PAY_AMOUNT" header="Pay Amount" />
            <Column field="CHEQUE_DATE" header="Payment Date" />
            <Column field="ACCOUNTING_DATE" header="Accounting Date" />
          </DataTable>
        )}
      </div>
    );
  };

  return (
    <>
      <Layout pageTitle="Pinellas Home">
        <div className="department_bg w-full h-[100vh]">
          <div className="container relative top-[4.5rem]">
            <LoaderContainer loading={loading}></LoaderContainer>
            <div className="flex gap-2 items-center content-center">
              <FaHome size={24} color="#7c2f3e" />
              <FaChevronRight size={12} color="#7c2f3e" />
              <div className="text-[#7c2f3e] text-[14px] font-medium">
                CATEGORIES
              </div>
              <FaChevronRight size={12} color="#7c2f3e" />
              <div className="text-[#000] text-[14px] font-light">
                {selectedCostCenter.category_name?.toUpperCase()}
              </div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
              <BarLoader loading={get_category_tile_detailsloading}>
              <div className="flex gap-3">
                <img src="/images/Vendors_Icon.png" className="w-[66px]" />
                <div>
                  <div className="text-[#7c2f3e] text-[18px] font-bold">
                    {selectedCostCenter.category_name}
                  </div>
                  <div className="text-[#444444] text-[13.5px] leading-[20px] mt-1 gap-5">
                    {/* <a className="font-normal"> ACCOUNTING </a> */}
                  </div>
                </div>
              </div>
              </BarLoader>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
              <div className="flex gap-3">
                <div className="inline-block">
                  <div className="text-[#7c2f3e] text-[15px] font-bold mb-[5px] ">
                    FISCAL YEAR
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      value={selectedYear}
                      // options={years}
                      optionLabel="FISCAL_YEAR"
                      options={FISCAL_YEAR_LIST}
                      onChange={(e) => setSelectedYear(e.value)}
                      placeholder="Select Year"
                      className="w-[320px]"
                      panelClassName="bg-white-100 text-black text-sm rounded-md shadow-md"
                      pt={{
                        root: {
                          className:
                            "h-[40px] border border-gray-500 rounded-lg text-[13px] font-medium text-black bg-transparent shadow-sm focus:ring-0 focus:outline-none",
                        },
                        input: {
                          className:
                            "pt-[10px] text-[13px] font-medium text-black bg-transparent",
                        },
                        trigger: {
                          className: "text-black",
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="inline-block">
                  <div className="text-[#7c2f3e] text-[15px] font-bold mb-[5px] ">
                    CATEGORY NAME
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      value={selectedCostCenter}
                      // options={departments}
                      optionLabel="category_name"
                      options={CATEGORY_LIST}
                      onChange={(e) => setSelectedCostCenter(e.value)}
                      placeholder="Select Cost Center"
                      className="w-[320px]"
                      panelClassName="bg-white-100 text-black text-sm rounded-md shadow-md"
                      pt={{
                        root: {
                          className:
                            "h-[40px] min-h-[40px] border border-gray-500 rounded-lg text-[13px] font-medium text-black bg-transparent shadow-sm focus:ring-0 focus:outline-none",
                        },
                        input: {
                          className:
                            "pt-[10px] text-[13px] font-medium text-black bg-transparent",
                        },
                        trigger: {
                          className: "text-black",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[10px] bg-[rgba(251,251,251,0.74)] !important p-[15px] rounded-[10px]">
              {/* <div className="grid grid-cols-12 gap-5"> */}
              <div className="grid grid-cols-2 md:col-span-12 lg:col-span-12">
                {/* <div className="col-span-4"> */}
                <div className="cols-span-6 border-r-2 border-white">
                  <div className="flex gap-3 items-center">
                    <img src="/images/clock.png" className="w-8" />
                    <a className="text-[18px] text-[#000000d9] font-bold">
                      TIME TRENDING CHART
                    </a>
                  </div>
                  <div className="col-span-2 w-full h-[250px] relative">
                    <BarLoader loading={get_category_tile_detailsloading}>
                      {TIME_TRENDING_VIEW.length == 0 ?
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
                          Fiscal Year : ${deptName}<br/>
                          Expense : ${formatValue(expense?.value || 0)} / ${formatPercent(expense?.value || 0)}<br/>
                          Obligation : ${formatValue(obligation?.value || 0)} / ${formatPercent(obligation?.value || 0)}
                        `;
                            }
                          }}
                          grid={{
                            top: '5%',
                            left: '4%',
                            right: '10%',
                            bottom: '15%',
                            containLabel: true,
                          }}
                          XaxisData={{
                            type: 'value',
                            axisLabel: {
                              formatter: function (val) {
                                if (val >= 1_000_000) return (val / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M';
                                if (val >= 1_000) return (val / 1_000).toFixed(2).replace(/\.00$/, '') + 'K';
                                return val;
                              },
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
                            data: TIME_TRENDING_VIEW.map(item => item?.fiscal_year),
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
                              stack: 'total',
                              barWidth: '12%',
                              label: { show: false },
                              emphasis: { focus: 'series' },
                              itemStyle: { color: '#7f3b49' },
                              data: TIME_TRENDING_VIEW.map(item => item?.spend_to_date), // convert to actual values
                            },
                            {
                              name: 'Obligation',
                              type: 'bar',
                              stack: 'total',
                              barWidth: '12%',
                              label: { show: false },
                              emphasis: { focus: 'series' },
                              itemStyle: { color: '#d4a373' },
                              data: TIME_TRENDING_VIEW.map(item => item?.obligation),
                            },
                          ]}
                        />
                      }
                    </BarLoader>
                  </div>
                </div>

                <div className="cols-span-6 ml-[1rem]">
                  <div className="flex gap-3 items-center">
                    {/* <img src="/images/menupay.png" className="w-6" /> */}
                    <a className="text-[18px] text-[#000000d9] font-bold">
                      TOTAL SPEND
                    </a>
                  </div>
                  <div className="flex justify-evenly mt-2">
                   <BarLoader loading={get_category_tile_detailsloading}>
                    <div className="flex gap-5">
                      <img src="/images/Budget_Icon.png" className="w-[52px]" />
                      <div>
                        <div className="text-[#444444] text-[16px] font-medium">
                          Obligation
                          <a className="font-bold text-[20px] ml-2">{TOTAL_SPEND?.[0]?.encumbered_label}</a>
                        </div>
                        <div className="text-[#444444] text-[13.5px] leading-[20px] mt-1 gap-5">
                          {/* <a className="font-normal"> ACCOUNTING </a> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <img
                        src="/images/Spent_date_Icon.png"
                        className="w-[35px] h-[50px]"
                      />
                      <div>
                        <div className="text-[#444444] text-[16px] font-medium">
                          Expenses
                          <a className="font-bold text-[20px] ml-2">{TOTAL_SPEND?.[0]?.expense_label}</a>
                        </div>
                        <div className="text-[#444444] text-[13.5px] leading-[20px] mt-1 gap-5">
                          {/* <a className="font-normal"> ACCOUNTING </a> */}
                        </div>
                      </div>
                    </div>
                   </BarLoader>
                  </div>

                  <div className="col-span-2 w-full h-[200px] ml-[1rem]">
                    <BarLoader loading={get_category_tile_detailsloading}>
                    <ReactECharts option={donutChartOption} style={{ height: '100%', width: '100%' }} />
                    </BarLoader>
                  </div>
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>

            <div className="mt-[20px] grid grid-cols-12 gap-3 pb-[30px]">
              <div className="col-span-6 bg-white bann_cont mt-[10px]   !important p-[15px] rounded-[6px]">
                <div className="text-[#7C2F3E] text-[15px] font-bold">
                  Major Vendors
                </div>
                <ChartWrapper
                  ExportIcon={true}
                  PrintIcon={true}
                  MaxiIcon={true}
                  infoIcon={true}
                  title={""}
                  infoTooltipTitle="Major Vendors"
                  infoTooltipDescription="Major Vendors based on the Actual spend against that specific category for a rolling two fiscal years based on the initial selection"
                  formatDownloadedData=""
                  header="Major Vendors"
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
                  apidata={CATEGORY_MAJOR_VENDORS}
                  data={
                    <div id="chart-container" className="h-[280px] mt-[5px] relative">
                      <BarLoader loading={get_category_tile_detailsloading}>
                        {CATEGORY_MAJOR_VENDORS?.length == 0 ?
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                            No Data!
                          </div>
                          :
                          <SingleBarChart3
                            grid={{
                              left: "10px",
                              right: "50px",
                              top: "30px",
                              bottom: "50px",
                              containLabel: true,
                            }}
                            yAxisData={CATEGORY_MAJOR_VENDORS?.map(item => item?.vendor_name)}
                            seriesData={CATEGORY_MAJOR_VENDORS.map(item => ({
                              value: item.total_expense,
                              name: item.vendor_name,
                              color: "#7C2F3E",
                              label: item.total_expense_label,
                              percentage: item.expense_percentage
                            }))}
                            tooltip={{
                              formatter: (params) => {
                                const [param] = params;
                                return `
                              <div>
                              <strong>${param.data?.name}</strong><br/>
                              Actual Spend: ${param.data?.label} / ${param.data?.percentage?.toFixed(2)}%
                              </div>
                            `;
                              }
                            }}
                          />
                        }
                      </BarLoader>
                    </div>
                  }
                  />
              </div>

              <div className="col-span-6 bg-white bann_cont mt-[10px] !important p-[15px] rounded-[6px]">
                <div className="text-[#7C2F3E] text-[15px] font-bold">
                  Major Departments
                </div>
                <ChartWrapper
                  ExportIcon={true}
                  PrintIcon={true}
                  MaxiIcon={true}
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
                    "fiscal_year": "FISCAL YEAR",
                    "department_name": "DEPARTMENT NAME",
                    "total_budget": "BUDGET",
                    "budget_label": "BUDGET LABEL",
                    "budgetpercentage": "BUDGET PERCENTAGE",
                    "spend_to_date": "EXPENSE",
                    "expense_label": "EXPENSE LABEL",
                    "spend_percentage": "EXPENSE PERCENTAGE",
                    "encumbrance": "ENCUMBRANCE",
                    "encumbrance_label": "ENCUMBRANCE LABEL",
                    "encumbrance_percentage": "ENCUMBRANCE PERCENTAGE",
                  }}
                  apidata={CATEGORY_MAJOR_DEPARTMENTS}
                  data={
                    <div className="gap-[10%]">
                      <div className="flex gap-5 ">
                        <div className="text-center w-full">
                          <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                            <div id="chart-container" className="h-[280px] mt-[5px] relative">
                              <BarLoader loading={get_category_tile_detailsloading}>
                                {CATEGORY_MAJOR_DEPARTMENTS?.length == 0 ?
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
                                        formatter: function (val) {
                                          if (val >= 1_000_000) return (val / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M';
                                          if (val >= 1_000) return (val / 1_000).toFixed(2).replace(/\.00$/, '') + 'K';
                                          return val;
                                        },
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
                                      data: CATEGORY_MAJOR_DEPARTMENTS.map(item => item?.department_name),
                                      axisLabel: {
                                        color: '#000',
                                        formatter: value => value.length > 22 ? value.slice(0, 22) + '...' : value
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
                                        data: CATEGORY_MAJOR_DEPARTMENTS.map(item => item?.spend_to_date),
                                      },
                                      {
                                        name: 'Obligation',
                                        type: 'bar',
                                        barWidth: '30%',
                                        stack: 'total',
                                        label: { show: false },
                                        emphasis: { focus: 'series' },
                                        itemStyle: { color: '#d4a373' },
                                        data: CATEGORY_MAJOR_DEPARTMENTS.map(item => item?.encumbrance),
                                      },
                                    ]}
                                  />
                                }
                              </BarLoader>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>

            <div
              className={`bann_cont mt-[15px] w-full p-[15px] rounded-[8px] ${
                activeIndex === 0 ? "bg-white" : "bg-transparent"
              }`}
            >
              <div className="depart_cont w-full">
                {activeIndex === 0 && (
                  <div className="">
                    <p className="text-[#7c2f3e] text-[15px] font-semibold mt-[5px] mb-[15px]">
                      {/* Invoice Details */}
                    </p>
                    <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={"Invoice Details"}
                      infoTooltipTitle="PO Details"
                      infoTooltipDescription="A nested report breaking down the key spending metrics in the selected Category starting at the associated purchase orders and tracing all the way down to the payments associated with all the invoices tied to the Purchase orders"
                      formatDownloadedData=""
                      header="Invoice Details"
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
                        "INVOICE_DATE": "Invoice Date",
                        "INV_INVOICE_AMOUNT": "Invoice Amount",
                        "INV_INVOICE_NUMBER": "Invoice Number",
                        "VENDOR_NAME": "Vendor Name",
                        "PO_NUMBER": "PO Number",
                        "PAYMENT_MODE": "Payment Mode",
                        "PAY_AMOUNT": "Pay Amount",
                        "ACCOUNTING_DATE": "Accounting Date",
                        "CHEQUE_DATE": "Payment Date",
                        "CHEQUE_NUMBER": "Payment Number",
                      }}
                      apidata={mainTableConfig}
                      data={
                      <div className="pt-3">
                       <BarLoader loading={get_category_table_detailsloading}>
                        <DataTable
                          value={mainTableConfig}
                          // header={header}
                          paginator
                          rows={10}
                          globalFilter={globalFilter}
                          expandedRows={expandedRows}
                          onRowToggle={(e) => setExpandedRows(e.data)}
                          rowExpansionTemplate={paymentDetailsTemplate}
                          dataKey="invoiceNumber"
                          stripedRows
                          className="depart_tbl deptDetail_tbl no_firstcolumn"
                        >
                          <Column
                            expander
                            style={{ width: "3em" }}
                            className="expand_icon"
                          />
                          <Column
                            field="INV_INVOICE_NUMBER"
                            header="Invoice Number"
                            sortable
                            className="depart_name"
                            style={{ maxWidth: "15rem" }}
                          />
                          <Column
                            field="VENDOR_NAME"
                            header="Vendor Name"
                            sortable
                            style={{ maxWidth: "12rem" }}
                          />
                          <Column
                            field="INV_INVOICE_AMOUNT"
                            header="Invoice Amount"
                            body={(rowData) =>
                              CurrencyTemplate(rowData, "INV_INVOICE_AMOUNT")
                            }
                            sortable
                            style={{ maxWidth: "15rem" }}
                          />
                          <Column
                            field="INVOICE_DATE"
                            header="Invoice Date"
                            sortable
                          />
                          <Column
                            field="FUND"
                            header="Fund"
                            sortable
                          />
                          <Column
                            field="CATEGORY"
                            header="Category"
                            sortable
                          />
                          <Column
                            field="PO_NUMBER"
                            header="PO Number"
                            sortable
                          />
                        </DataTable>
                       </BarLoader>
                      </div>
                      }
                      />
                  </div>
                )}
                {activeIndex === 1 && (
                  <div className="relative w-full overflow-visible">
                    <div className="custom-prev">
                      <i className="pi pi-chevron-left"></i>
                    </div>
                    <div className="custom-next">
                      <i className="pi pi-chevron-right"></i>
                    </div>
                    <Swiper
                      navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                      }}
                      modules={[Navigation]}
                      spaceBetween={30}
                      slidesPerView={1}
                      className="custom-swiper"
                    >
                      {chunkedData.map((group, groupIndex) => (
                        <SwiperSlide key={groupIndex}>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {group.map((tile, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-[5px] p-[5px] shadow h-full"
                              >
                                <div className="flex justify-start mb-3 p-2 bg-[#F7F7F7] gap-6">
                                  <div className="w-12">
                                    <img src={tile.icon} alt="division icon" />
                                  </div>
                                  <div className="text-[14px] text-[#444444]">
                                    {tile.division}
                                  </div>
                                </div>
                                <div className="flex gap-14 justify-center mt-8 mb-2">
                                  <div className="text-center">
                                    <div className="text-[15px] mb-1 text-[#000000d9] font-normal">
                                      Expense
                                    </div>
                                    <div className="text-[15px] text-[#7c2f3e] font-semibold">
                                      ${tile.expense}
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-[15px] mb-1 text-[#000000d9] font-normal">
                                      Budget
                                    </div>
                                    <div className="text-[15px] text-[#000000d9] font-semibold">
                                      ${tile.budget}
                                    </div>
                                  </div>
                                </div>
                                <div className="h-[150px] mb-5">
                                  <Horizontalsinglebar
                                    data={tile.chartData}
                                    yAxisLabel={{
                                      show: true,
                                      color: "#000",
                                      fontSize: 10,
                                      formatter: (value) =>
                                        value.length > 0
                                          ? value.substring(0, 15) + "..."
                                          : value,
                                    }}
                                    barWidth="36%"
                                    barGap="-100%"
                                    backgroundBarWidth="0%"
                                    legend={{
                                      show: true,
                                      bottom: 10,
                                      orient: "horizontal",
                                      padding: [0, 0, 0, 10],
                                      left: 30,
                                      itemGap: 15,
                                      itemWidth: 8,
                                      itemHeight: 8,
                                      textStyle: {
                                        color: "#000",
                                        fontSize: 12,
                                        fontWeight: 400,
                                      },
                                      data: ["Budget", "Expense", "Obligation"],
                                    }}
                                    grid={{
                                      top: "10%",
                                      left: "3%",
                                      right: "15%",
                                      bottom: "25%",
                                      containLabel: true,
                                    }}
                                    seriesLabel={{
                                      show: true,
                                      position: "insideRight",
                                      color: "#fff",
                                      fontSize: 10,
                                      align: "right",
                                      formatter: (params) =>
                                        params.value >= 1000
                                          ? (params.value / 1000).toFixed(0) +
                                            "k"
                                          : params.value,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[#7c2f3e] font-normal text-[11px] mt-4 leading-5">
              Disclaimer: If you are a person with a disability who needs an
              accommodation to access records on this site, Please contact the
              Pinellas County office of Human Rights by calling (727) 464-4880
              or by email to accommodations@pinellascounty.org. More information
              can be found on the Clerk’s ADA & Website Policies webpage.
              Copyright 2020 Pinellas County Clerk of the Circuit Court and
              Comptroller.
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CategoriesDetail;
