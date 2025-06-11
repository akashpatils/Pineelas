import React, { useState, useEffect, useMemo } from "react";
import Layout from "./layouts/Layout";
import { FaHome, FaChevronRight } from "react-icons/fa";
import PieChart from "../components/charts/piechart";
import DataDountChart from "../components/charts/datadonutchart";
import "./../css/style.css";
import LoaderContainer from "../components/LoaderContainer/index";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import VertialSingalbarChart from "../components/charts/vertialsingalbarchart";
import Verticalbar from "../components/charts/verticalbar";
import BubbleChart from "../components/charts/bubblechart";
import ChartWrapper from "../components/chartwrappershipping";
import InfoTooltip from "../components/InfoTooltip";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from "primereact/tabview";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/selector";
import { fetchget_payroll_tile_details } from "../redux/slices/payrollExpense";
import BarLoader from "./BarLoader";

const Payrollexpenses = () => {
  
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState({ "OPERATING_UNIT": "Clerk of the Circuit Court" });
  const [selectedYear, setSelectedYear] = useState({ "FISCAL_YEAR": 2025 });
  const departments = [
    "Clerk of the Circuit Court and Comptroller",
    "Board of County Commissioners",
  ];
  

  /* Selector */
  //Dropdowns data
  const get_agency_list_with_fiscal_yearloading = useSelector((state) => state.global.get_agency_list_with_fiscal_yearloading)
  const AGENCY_LIST = useSelector((state) => getData(state.global, "AGENCY_LIST"))
  const FISCAL_YEAR_LIST = useSelector((state) => getData(state.global, "FISCAL_YEAR_LIST"))

  const get_payroll_tile_detailsloading = useSelector((state) => state.payrollExpense.get_payroll_tile_detailsloading)
  const [MEAN_MEDIAN_SALARY] = useSelector((state) => getData(state.payrollExpense, "MEAN_MEDIAN_SALARY"))
  const PAY_CATEGORY_PIE_CHART = useSelector((state) => getData(state.payrollExpense, "PAY_CATEGORY_PIE_CHART"))
  const [TOP_PAYROLL] = useSelector((state) => getData(state.payrollExpense, "TOP_PAYROLL"))
  const EMPLOYEE_SALARY_BAND_VIEW = useSelector((state) => getData(state.payrollExpense, "EMPLOYEE_SALARY_BAND_VIEW"))
  const EMPLOYEE_SALARY_BY_DEPT_BUBBLE_CHART = useSelector((state) => getData(state.payrollExpense, "EMPLOYEE_SALARY_BY_DEPT_BUBBLE_CHART"))
  const EMPLOYEE_SALARY_BY_JOB_TYPE = useSelector((state) => getData(state.payrollExpense, "EMPLOYEE_SALARY_BY_JOB_TYPE"))
  const EMPLOYEE_SALARY_LIST_TABLE = useSelector((state) => getData(state.payrollExpense, "EMPLOYEE_SALARY_LIST_TABLE"))

  /* */
  const employeeSalaryBand = useMemo(()=>  [...EMPLOYEE_SALARY_BAND_VIEW]?.sort((a,b)=> a?.SORT_ORDER - b?.SORT_ORDER) , [EMPLOYEE_SALARY_BAND_VIEW])
// const employeeSalaryBand = 
  /* dispatch */
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(fetchget_payroll_tile_details({
      elasticQueryName: "",
      filters: [],
      dynamicColumns: [
        {
          columnName: "{#agency}",
          columnValue: [selectedDept.OPERATING_UNIT],
        },
        {
          columnName: "{#year}",
          columnValue: [selectedYear.FISCAL_YEAR],
        },
      ],
    }));
  }, [selectedDept,selectedYear])
    /* */

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
      METRIC_NAME: "Export",
      POL_COUNTRY: "Japan",
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
      METRIC_NAME: "Import",
      POL_COUNTRY: "Japan",
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
    {
      METRIC_NAME: "overall",
      POL_COUNTRY: "Japan",
    },
  ];

  const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

  const [globalFilter, setGlobalFilter] = useState('');
  const [expandedRows, setExpandedRows] = useState(null);
  const [innerFilters, setInnerFilters] = useState({});

  const budgetData = [
    { empName: 'Abner, Ms. Kathleen L', jobTitle: 'Clerk Cust Serv Spec', departName: 'CCC:St Petersburg Branch', annSalary: 160992.51, grossEarnings: 8416882.00 },
    { empName: 'Adams, Ms. Tammy Louise', jobTitle: 'Rec Spec Sr', departName: 'CCC:Criminal Court Records', annSalary: 160992.51, grossEarnings: 8416882.00 },
    { empName: 'Adas-Josefson, Ms. Deborah', jobTitle: 'Clk Supv', departName: 'CCC:Records Management', annSalary: 160992.51, grossEarnings: 8416882.00 },
    // ... add more rows as needed
  ];

  const CurrencyTemplate = (rowData, field) => {
      return rowData[field]?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const currencyFilterTemplate = (options) => {
    return (
        <InputText
            value={options.value}
            onChange={(e) => options.filterCallback(e.target.value, options.index)}
            placeholder="Search"
            type="number"
        />
    );
  };

  const [filters, setFilters] = useState({
    empName: { value: null, matchMode: 'contains' },
    jobTitle: { value: null, matchMode: 'contains' },
    departName: { value: null, matchMode: 'contains' },
    annSalary: { value: null, matchMode: 'contains' },
    grossEarnings: { value: null, matchMode: 'contains' },
  });
  let bubbleData = [...EMPLOYEE_SALARY_BY_DEPT_BUBBLE_CHART];
  const onFilter = (e) => {
    setFilters(e.filters);
  };

    useEffect(() => {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }, []);

    const Piecolor = ["#CBA365", "#4F6963", "#7B303E", "#B8814B"]

    const EmpSorteddata = [...EMPLOYEE_SALARY_BY_JOB_TYPE]?.sort((a,b) => b?.EFFECTIVE_YEAR - a?.EFFECTIVE_YEAR)
  return (
    <>
      <Layout pageTitle="Pinellas Home">
        <div className="payrollexpenses_bg w-full h-[100vh]">
          <div className="container relative top-[4.5rem]">
            <LoaderContainer loading={loading}></LoaderContainer>
            <div className="flex gap-2 items-center content-center">
              <FaHome size={24} color="#7c2f3e" />
              <FaChevronRight size={12} color="#7c2f3e" />
              <div className="text-[#000] text-[14px] font-light">
                PAYROLL EXPENSES
              </div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
              <div className="flex gap-2">
                <img src="/images/Payroll.png" className="w-[90px]" />
                <div>
                  {" "}
                  <div className="text-[#7c2f3e] text-[18px] font-bold mb-[10px] ">
                    Payroll Expenses
                  </div>
                  <div className="text-[#000] text-[14px] leading-[20px]">
                    This section provides details on employee salaries and gross
                    earnings (before deductions and taxes) by Job Title through
                    Calendar Year to date with five previous calendar years for
                    the Board of County Commissioners and the Clerk of the
                    Circuit Court and Comptroller.
                  </div>
                </div>
              </div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
              <div className="flex gap-3">
                <div className="inline-block">
                  <div className="text-[#7c2f3e] text-[15px] font-bold mb-[5px]">
                    AGENCY
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      loading={get_agency_list_with_fiscal_yearloading}
                      value={selectedDept}
                      options={AGENCY_LIST}
                      optionLabel="OPERATING_UNIT"
                      onChange={(e) => setSelectedDept(e.value)}
                      placeholder="Select Agency"
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
                <div className="inline-block">
                  <div className="text-[#7c2f3e] text-[15px] font-bold mb-[5px]">
                    CALENDAR YEAR
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      loading={get_agency_list_with_fiscal_yearloading}
                      value={selectedYear}
                      options={FISCAL_YEAR_LIST}
                      optionLabel="FISCAL_YEAR"
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
              </div>
            </div>

            <div className="mt-[10px] bg-[rgba(251,251,251,0.74)] !important p-[15px] rounded-[10px]">
              {/* <div className="grid grid-cols-12 gap-5"> */}
              <div className="grid grid-cols-3 md:col-span-12 lg:col-span-12">
                {/* <div className="col-span-4"> */}
                <div className="cols-span-4 border-r-2 border-white">
                  <div className="flex gap-3 items-center">
                    <img
                      src="/images/payrollbilliconblack.png"
                      className="w-8"
                    />
                    <a className="text-[18px] text-[#000000d9] font-bold">
                      TOTAL PAYROLL EXPENSES
                    </a>
                  </div>
                  <div className="gap-[10%]">
                    <div className="flex gap-5 ">
                      <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          <div className="col-span-2 w-full h-[250px]">
                            <BarLoader loading={get_payroll_tile_detailsloading}>
                            <DataDountChart
                              name="Pay Category"
                              total={TOP_PAYROLL?.TOTAL_EXPENSE_LABEL}
                              graphicStyle={{
                                labelLeft: "31%",
                                labelTop: "30%",
                                labelText: "Total Expense",
                                labelColor: "#000",
                                labelFontSize: 13,
                                labelFontWeight: "",
                                valueLeft: "32%",
                                valueTop: "40%",
                                valueColor: "#000",
                                valueFontSize: 15,
                                valueFontWeight: "",
                              }}
                              data={[
                                {
                                  total: TOP_PAYROLL?.TOTAL_EXPENSE_LABEL,
                                  percentage: TOP_PAYROLL?.BCC_PERCENTAGE,
                                  valueLabel: TOP_PAYROLL?.BCC_EXPENSE_LABEL,
                                  value: TOP_PAYROLL?.BCC_EXPENSE,
                                  name: "Board of County Commissioners",
                                  itemStyle: {
                                    color: "#7C2F3E",
                                  },
                                },
                                {
                                  total: TOP_PAYROLL?.TOTAL_EXPENSE_LABEL,
                                  percentage: TOP_PAYROLL?.CCC_PERCENTAGE,
                                  valueLabel: TOP_PAYROLL?.CCC_EXPENSE_LABEL,
                                  value: TOP_PAYROLL?.CCC_EXPENSE,
                                  name: "Clerk of the Circuit Court",
                                  itemStyle: {
                                    color: "#B9814D",
                                  },
                                },
                              ]}
                              legend={{
                                orient: "horizontal",
                                show: true,
                                bottom: 10,
                                left: 70,
                                itemWidth: 8,
                                itemHeight: 8,
                                data: [
                                  {
                                    name: "Board of County Commissioners",
                                    icon: "rect",
                                  },
                                  {
                                    name: "Clerk of the Circuit Court",
                                    icon: "rect",
                                  },
                                ],
                                itemHeight: 8,
                                textStyle: {
                                  color: "#000",
                                  fontSize: 12,
                                  fontWeight: 400,
                                },
                              }}
                            />
                            </BarLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cols-span-4 border-r-2 border-white ml-[1rem]">
                  <div className="flex gap-3 items-center">
                    <img src="/images/Expenses_icon.png" className="w-8" />
                    <a className="text-[18px] text-[#000000d9] font-bold">
                      AGENCY EXPENSES
                    </a>
                  </div>
                  <div className="gap-[10%] p-5">
                   <BarLoader loading={get_payroll_tile_detailsloading} style={{ height: "12rem" }}>
                    <div className="flex">
                      <div className="text-center flex gap-20">
                        <div className="text-[16px] mb-3 text-[#000000d9] font-normal leading-6">
                          Agency
                        </div>
                        <div className="text-[24px] w-[240px] text-[#7c2f3e] font-normal leading-6">
                          {MEAN_MEDIAN_SALARY?.OPERATING_UNIT ?? "-"}
                        </div>
                      </div>
                    </div>
                    <div className="text-center flex gap-28 mt-6">
                      <div className="text-[16px] mb-3 text-[#000000d9] font-normal leading-8">
                        Mean Salary
                      </div>
                      <div className="text-[24px] text-[#7c2f3e] font-bold leading-6">
                        {MEAN_MEDIAN_SALARY?.MEANSALARY_LABEL ?? "-"}
                      </div>
                    </div>
                    <div className="text-center flex gap-24 mt-6">
                      <div className="text-[16px] mb-3 text-[#000000d9] font-normal leading-8">
                        Median Salary
                      </div>
                      <div className="text-[24px] text-[#7c2f3e] font-bold leading-6">
                        {MEAN_MEDIAN_SALARY?.MEDIANSALARY_LABEL ?? "-"}
                      </div>
                    </div>
                   </BarLoader>
                  </div>
                </div>

                <div className="cols-span-4  ml-[1rem]">
                  <div className="flex gap-3 items-center">
                    <img
                      src="/images/payrollbilliconblack.png"
                      className="w-8"
                    />
                    <a className="text-[18px] text-[#000000d9] font-bold">
                      PAY CATEGORY
                    </a>
                  </div>
                  <div className="gap-[10%]">
                    <div className="flex gap-5 ">
                      <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          <div className="col-span-2 w-full h-[250px]">
                           <BarLoader loading={get_payroll_tile_detailsloading}>
                            <PieChart
                              name="Total Shipment"
                              // data={SummaryShipments?.map(item => {
                              //   let { STATUS, PERCENTAGE, VALUE_USD } = item
                              //   return {
                              //     value: VALUE_USD,
                              //     name: STATUS,
                              //     percentage: PERCENTAGE,
                              //     itemStyle: {
                              //       color: STATUS === "Completed" ? "#36833A" : "#9ED7A2",
                              //     },
                              //   }
                              // })}

                              // data={[
                              //   {
                              //     value: 54,
                              //     name: "Board of County Commissioners",
                              //     percentage: 71.05,
                              //     itemStyle: {
                              //       color: "#7C2F3E",
                              //     },
                              //   },
                              //   {
                              //     value: 22,
                              //     name: "Clerk of the Circuit Court and Comptroller",
                              //     percentage: 28.95,
                              //     itemStyle: {
                              //       color: "#A14612",
                              //     },
                              //   },
                              // ]}
                              data={PAY_CATEGORY_PIE_CHART.map((item, i) => {
                                return {
                                  value: item?.PAY_VALUE,
                                  name: item?.CATEGORY,
                                  payvaluelabel: item?.PAY_VALUE_LABEL, 
                                  totalexpenselabel: item?.TOTAL_EXPENSE_LABEL,
                                  percentage: item?.PERCENTAGE,
                                  itemStyle: { 
                                    color: Piecolor[i],
                                  },
                                }
                              })}
                              color={Piecolor}
                              tooltip={{ 
                                  trigger: 'item',
                                  formatter: params => {
                                    const { name, percent, data } = params; // Use params.data to access custom fields
                                    return `
                                    <div style="text-align: left;">
                                      <strong>${name}</strong><br/>
                                      Pay Value: ${data?.payvaluelabel || '-'}<br/>
                                      Total Expense: ${data?.totalexpenselabel || '-'}<br/>
                                      Percentage: ${percent}%
                                    </div>
                                    `;
                                  },
                              }}
                              legend={{
                                orient: "horizontal",
                                show: true,
                                bottom: 10,
                                left: 60,
                                itemWidth: 8,
                                itemHeight: 8,
                                data: PAY_CATEGORY_PIE_CHART?.map(item => ({
                                  name: item?.CATEGORY,
                                  icon: 'rect'
                                })),
                                itemHeight: 8,
                                textStyle: {
                                  color: "#000",
                                  fontSize: 12,
                                  fontWeight: 400,
                                },
                              }}
                            />
                           </BarLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>

            <div className="mt-[45px] grid grid-cols-12 gap-3 pb-[20px]">
              <div className="col-span-4 bg-white bann_cont mt-[10px]   !important p-[15px] rounded-[6px]">
                <div className="text-[#7C2F3E] text-[15px] font-bold">
                  Average Salary View
                </div>
                 <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={""}
                      infoTooltipTitle="Average Salary View"
                      infoTooltipDescription="Bubble chart broken by Department tracking the number of employees along with the total and average spend for salaries"
                      formatDownloadedData=""
                      header="Average Salary View"
                      dialogHeaderStyle={{
                        color: "#7C2F3E",
                        fontSize: "16px",
                      }}
                      dialogStyle={{ backgroundColor: "#ffffff" }}
                      formatFileName={""}
                      titleclassname="font-[600]"
                      infoTooltipComponent={InfoTooltip}
                      exportColumns={{
                        "NO_OF_EMPLOYEES": "No_of_EMPLOYEES",
                        "AVERAGE": "AVERAGE",
                        "PAY_VALUE": "PAY_VALUE",
                        "AVERAGE_LABEL": "AVERAGE_LABEL",
                        "PAY_VALUE_LABEL": "PAY_VALUE_LABEL",
                        "DEPARTMENT": "DEPARTMENT",
                      }}
                      apidata={EMPLOYEE_SALARY_BY_DEPT_BUBBLE_CHART}
                      data={
                        <div id="chart-container" className="h-[290px]">
                          <BarLoader loading={get_payroll_tile_detailsloading}>
                            <BubbleChart reportTableData={bubbleData} />
                          </BarLoader>
                        </div>
                      }
                    />
               
              </div>
              <div className="col-span-4 bg-white bann_cont mt-[10px]   !important p-[15px] rounded-[6px]">
                <div className="text-[#7C2F3E] text-[15px] font-bold">
                  Regular vs Overtime Pay
                </div>
                 <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={""}
                      infoTooltipTitle="Regular vs Overtime Pay"
                      infoTooltipDescription="A vertical stacked bar graph showing a logitudinal trend of a comparison between regular and overtime pay"
                      formatDownloadedData=""
                      header="Regular vs Overtime Pay"
                      dialogHeaderStyle={{
                        color: "#7C2F3E",
                        fontSize: "16px",
                      }}
                      dialogStyle={{ backgroundColor: "#ffffff" }}
                      formatFileName={""}
                      titleclassname="font-[600]"
                      infoTooltipComponent={InfoTooltip}
                      exportColumns={{
                        "AGENCY": "AGENCY",
                        "EFFECTIVE_YEAR": "EFFECTIVE_YEAR",
                        "OVERTIME_PAY": "OVERTIME_PAY",
                        "OVERTIME_PAY_LABEL": "OVERTIME_PAY_LABEL",
                        "PAY_VALUE": "PAY_VALUE",
                        "PAY_VALUE_LABEL": "PAY_VALUE_LABEL",
                        "REGULAR_PAY": "REGULAR_PAY",
                        "REGULAR_PAY_LABEL": "REGULAR_PAY_LABEL",
                      }}
                      apidata={EMPLOYEE_SALARY_BY_JOB_TYPE}
                      data={
                        <div id="chart-container" className="h-[280px] mt-[5px]">
                          <BarLoader loading={get_payroll_tile_detailsloading}>
                            <Verticalbar
                              data={filteredData}
                              series1data={EmpSorteddata?.map(item => {
                                return {
                                  ...item,
                                  value: item.REGULAR_PAY
                                }
                              })}
                              series2data={EmpSorteddata?.map(item => item.OVERTIME_PAY)}
                              yAxisLabel={{
                                show: true,
                                color: "#000",
                                fontSize: 10,
                                // formatter: function (value) {
                                //   return value.length > 0
                                //     ? value.substring(0, 15) + 
                                //     : value;
                                // },
                              }}
                              xAxisdata={EmpSorteddata?.map(item => item.EFFECTIVE_YEAR)}
                              tooltip={
                                {
                                  show: true,
                                  trigger: "axis",
                                  axisPointer: {
                                    type: "none",
                                  },
                                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                                  borderColor: "#7C2F3E",
                                  borderWidth: 2,
                                  textStyle: {
                                    color: "#000",
                                    fontWeight: "normal",
                                    fontSize: 12,
                                  },
                                  formatter: (params) => {
                                    let toottipText = ''
                                    params?.forEach((item, i) => {
                                      const { data } = item;
                                      if (!i) {
                                        toottipText += `
                                        <b>Fiscal Year: ${data?.EFFECTIVE_YEAR || '-'}</b><br/>
                                        Regular Pay: ${data?.REGULAR_PAY_LABEL || '-'}<br/>
                                        Overtime Pay: ${data?.OVERTIME_PAY_LABEL || '-'}
                                        `;
                                      }
                                    });
                                    return toottipText

                                  }
                                }}
                              legend={{
                                show: true,
                                bottom: 2,
                                orient: "horizontal",
                                padding: [0, 0, 0, 10],
                                left: 50,
                                itemGap: 80,
                                itemWidth: 8,
                                itemHeight: 8,
                                textStyle: {
                                  color: "#000",
                                  fontSize: 12,
                                },
                                // data: legendState
                                data: ["Regular Pay", "Overtime Pay"],
                              }}
                              grid={{
                                top: "10%",
                                left: "2%",
                                right: "5%",
                                bottom: "10%",
                                containLabel: true,
                              }}
                              seriesLabel={{
                                show: false,
                                position: "insideRight",
                                color: "#fff",
                                fontSize: 9,
                                align: "right",
                                formatter: function (params) {
                                  return params.value >= 1000
                                    ? (params.value / 1000).toFixed(0) + "k"
                                    : params.value;
                                },
                              }}
                            />
                          </BarLoader>
                        </div>
                      }/>
               
              </div>
              <div className="col-span-4 bg-white bann_cont mt-[10px] !important p-[15px] rounded-[6px]">
                <div className="text-[#7C2F3E] text-[15px] font-bold">
                  Salary Bands View
                </div>
                <ChartWrapper
                  ExportIcon={true}
                  PrintIcon={true}
                  MaxiIcon={true}
                  infoIcon={true}
                  title={""}
                  infoTooltipTitle="Salary Bands View"
                  infoTooltipDescription="A vertical bar graph depicting the split of employees in an agency across various salary bands for a given fiscal year"
                  formatDownloadedData=""
                  header="Salary Bands View"
                  dialogHeaderStyle={{
                    color: "#7C2F3E",
                    fontSize: "16px",
                  }}
                  formatFileName={""}
                  titleclassname="font-[600]"
                  infoTooltipComponent={InfoTooltip}
                  exportColumns={{
                    "NO_OF_EMPLOYEES": "NO_OF_EMPLOYEES",
                    "SALARY_RANGE": "SALARY_RANGE",
                    "SORT_ORDER": "SORT_ORDER",
                  }}
                  apidata={EMPLOYEE_SALARY_BAND_VIEW}
                  data={
                    <div className="gap-[10%]">
                      <div className="flex gap-5 ">
                        <div className="text-center w-full">
                          <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                            <div className="col-span-2 w-full h-[280px]">
                              <BarLoader loading={get_payroll_tile_detailsloading}>
                              <VertialSingalbarChart
                                xAxis={{
                                  data: employeeSalaryBand?.map(item => item.SALARY_RANGE),
                                  nameLocation: "middle",
                                  name: "Salary bands in thousand(k) $",
                                  nameTextStyle: {
                                    color: "#000",
                                    fontSize: 10,
                                    fontWeight: "bold",
                                    fontFamily: "Arial",
                                  },
                                  nameGap: 30,
                                  axisTick: { show: false },
                                  axisLine: { show: true },
                                  axisLabel: { color: "#000" },
                                }}
                                yAxis={{
                                  show: true,
                                  name: "No. of Employees",
                                  nameTextStyle: {
                                    color: "#000",
                                    fontSize: 10,
                                    fontWeight: "bold",
                                    fontFamily: "Arial",
                                  },
                                  nameLocation: "middle",
                                  nameGap: 35,
                                  nameRotate: 90,
                                  axisLabel: {
                                    show: true,
                                    color: "#000",
                                  },
                                  splitLine: { show: false },
                                  axisLine: {
                                    show: true,
                                  }
                                }}
                                grid={{
                                  left: "20px",
                                  right: "20px",
                                  top: "40px",
                                  bottom: "24px",
                                  containLabel: true,
                                }}
                                // seriesData={[
                                //   {
                                //     value: 65,
                                //     name: "Total Vendor",
                                //     itemStyle: {
                                //       color: "#7C2F3E",
                                //       borderRadius: [6],
                                //     },
                                //     label: "275",
                                //   },
                                //   {
                                //     value: 35,
                                //     name: "New Vendor",
                                //     itemStyle: {
                                //       color: "#7C2F3E",
                                //       borderRadius: [6],
                                //     },
                                //     label: "93",
                                //   },
                                //   {
                                //     value: 28,
                                //     name: "New Vendor",
                                //     itemStyle: {
                                //       color: "#7C2F3E",
                                //       borderRadius: [6],
                                //     },
                                //     label: "93",
                                //   },
                                //   {
                                //     value: 15,
                                //     name: "New Vendor",
                                //     itemStyle: {
                                //       color: "#7C2F3E",
                                //       borderRadius: [6],
                                //     },
                                //     label: "93",
                                //   },
                                //   {
                                //     value: 25,
                                //     name: "New Vendor",
                                //     itemStyle: {
                                //       color: "#7C2F3E",
                                //       borderRadius: [6],
                                //     },
                                //     label: "93",
                                //   },
                                // ]}
                                seriesData={ employeeSalaryBand?.map(item => ({
                                  value: item.NO_OF_EMPLOYEES,
                                  label: item.NO_OF_EMPLOYEES,
                                  name: item?.SALARY_RANGE,
                                  itemStyle: {
                                    color: "#7C2F3E",
                                      borderRadius: [6],
                                  }
                                }))}
                                tooltipLabel={"No of Employees"}
                                tooltipLabel1={"Salary Range"}
                              />
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

            <div className="bann_cont mt-[10px] w-full bg-white !important p-[15px] pt-[25px] rounded-[6px] flex gap-32">
              <div className="depart_cont w-full">
                <div>
                  <p className="text-[#7c2f3e] text-[15px] font-semibold mt-[5px] mb-[15px]">
                    {/* Employee Details */}
                  </p>

                  <ChartWrapper
                    ExportIcon={true}
                    PrintIcon={true}
                    MaxiIcon={true}
                    infoIcon={true}
                    title={"Employee Details"}
                    infoTooltipTitle="Employee Details"
                    infoTooltipDescription="The searchable and sortable listing of employees in a given agency for a selected fiscal year displayed the latest job title along with the associated deparment in which they are employed."
                    formatDownloadedData=""
                    header="Employee Details"
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
                      "EMPLOYEE_NAME": "Employee Name",
                      "POSITION": "Job Title",
                      "DEPARTMENT_NAME": "Department",
                      "PAY_VALUE": "Annual Base Salary",
                      "GROSS_PAY": "Gross Earnings Year to Date",
                    }}
                    apidata={EMPLOYEE_SALARY_LIST_TABLE}
                    data={
                      <div className="">
                        <BarLoader loading={get_payroll_tile_detailsloading} style={{ height: "30rem"}}>
                        <DataTable
                          value={EMPLOYEE_SALARY_LIST_TABLE}
                          globalFilter={globalFilter}
                          paginator
                          rows={10}
                          stripedRows
                          className="depart_tbl vendor_tbl mt-4"
                          filters={filters}
                          onFilter={onFilter}
                          filterDisplay="row"
                        >
                          <Column
                            expander
                            style={{ width: "3em", display: "none" }}
                            className="expand_icon"
                          />
                          <Column
                            field="EMPLOYEE_NAME"
                            header="Employee Name"
                            sortable
                            filter
                            filterPlaceholder="Search"
                            className=""
                            style={{ maxWidth: "15rem" }}
                          />
                          <Column
                            field="POSITION"
                            header="Job Title"
                            sortable
                            filter
                            filterPlaceholder="Search"
                            style={{ maxWidth: "12rem" }}
                          />
                          <Column
                            field="DEPARTMENT_NAME"
                            header="Department"
                            sortable
                            filter
                            filterPlaceholder="Search"
                            style={{ maxWidth: "15rem" }}
                          />
                          <Column
                            field="PAY_VALUE_LABEL"
                            header="Annual Base Salary"
                            // body={(rowData) =>
                            //   CurrencyTemplate(rowData, "annSalary")
                            // }
                            sortable
                            filter
                            filterPlaceholder="Search"
                          />
                          <Column
                            field="GROSS_PAY_LABEL"
                            header="Gross Earnings Year to Date"
                            // body={(rowData) =>
                            //   CurrencyTemplate(rowData, "grossEarnings")
                            // }
                            sortable
                            filter
                            filterPlaceholder="Search"
                          />
                        </DataTable>
                      </BarLoader>
                      </div>
                    }
                  />
                </div>
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

export default Payrollexpenses;
