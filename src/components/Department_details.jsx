import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import Layout from "./layouts/Layout";
import { FaHome, FaChevronRight } from "react-icons/fa";
import DonutChart from "./charts/donutchart";
import ChartWrapper from "../components/chartwrappershipping";
import Verticalbar from "../components/charts/verticalbar";
import PieChart from "../components/charts/piechart";
import "./../css/style.css";
import Horizontalbar from "./charts/horizontalbar";
import SingleBarChart2 from "../components/charts/singlebarchart2";
import Horizontalsinglebar from "./charts/horizontalbarsinglechart";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Or your preferred theme
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
import { getData } from "../redux/selector";
import { fetchget_fiscal_year } from "../redux/slices/global";
import { fetchget_department_list, fetchget_department_table_details, fetchget_department_tile_details } from "../redux/slices/department";
import InfoTooltip from "./InfoTooltip";
import Horizontalsinglebar3 from "./charts/horizontalbarsinglechart3";
import Verticalstackedbarchart from "./charts/verticalstackedbarchart";
import { useLocation, useNavigate } from "react-router-dom";
import BarLoader from "./BarLoader";

const DepartmentDetail = () => {

  /* Carry State */
  const location = useLocation();
  const navigate = useNavigate();
  const { moreDetailsprop } = location.state || {};

  useLayoutEffect(() => {
    if (!moreDetailsprop) navigate("/department")
  }, [location.state])
  /*  */

  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(() => {
    if (moreDetailsprop.VENDOR_NAME_LIST?.length) return moreDetailsprop.VENDOR_NAME_LIST[0]
    else return 0
  });
  const [activeIndex2, setActiveIndex2] = useState(0);
  const labels = ["List View", "Tile View"];
  const department_details_labels = ["Time Trend View", "Category View"];
  const [selectedCostCenter, setSelectedCostCenter] = useState({
    "DEPT_ID": moreDetailsprop.DEPARTMENT_CODE,
    "DEPT_NAME": moreDetailsprop.DEPT_NAME,
    "VENDOR_COUNT": moreDetailsprop.VENDOR_COUNT,
    "VENDOR_NAME_LIST": moreDetailsprop.VENDOR_NAME_LIST ?? []
  });
  const [selectedSpend, setSelectedSpend] = useState("SPEND AMOUNT");
  const [selectedYear, setSelectedYear] = useState({FISCAL_YEAR: moreDetailsprop.activeyear});
  
  /* selector */

  const FISCAL_YEAR_LIST = useSelector((state) =>
    getData(state.global, "FISCAL_YEAR_LIST")
  );

  const DEPT_LIST = useSelector((state) =>
    getData(state.department, "DEPT_LIST")
  );

  const get_overall_departments_info_updatedloading = useSelector(
    (state) => state.department.get_overall_departments_info_updatedloading
  );

  const get_fiscal_yearloading = useSelector(
    (state) => state.global.get_fiscal_yearloading
  );

  const get_department_listloading = useSelector(
    (state) => state.department.get_department_listloading
  );

  const get_department_table_detailsloading = useSelector(
    (state) => state.department.get_department_table_detailsloading
  );

  const get_department_tile_detailsloading = useSelector(
    (state) => state.department.get_department_tile_detailsloading
  );

  const [EMPLOYEES] = useSelector((state) =>
    getData(state.department, "EMPLOYEES")
  );

  const [VENDORS] = useSelector((state) =>
    getData(state.department, "VENDORS")
  );

  const MAJOR_VENDORS = useSelector((state) =>
    getData(state.department, "MAJOR_VENDORS")
  );

  const [DEPARTMENT_HEADER_INFO] = useSelector((state) =>
    getData(state.department, "DEPARTMENT_HEADER_INFO")
  );

  const TIME_TREND_VIEW = useSelector((state) =>
    getData(state.department, "TIME_TREND_VIEW")
  );

  const CATEGORY_VIEW = useSelector((state) =>
    getData(state.department, "CATEGORY_VIEW")
  );

  const SPEND_BY_CATEGORY = useSelector((state) =>
    getData(state.department, "SPEND_BY_CATEGORY")
  );

  const mainTableConfig = useSelector((state) =>
    getData(state.department, "mainTableConfig")
  );

  const sortedMajorVendorData = [...MAJOR_VENDORS]?.sort((a, b) => b?.TOTALEXPENSE - a?.TOTALEXPENSE)?.reverse();

  /* Pie Chart Data Calculation */


  const COLORS_MAP = {
    "Salaries": "#b9814e",
    "Others": "#727e5d",
    "Freight and Postage": "#c9a269",
    "Benefits Exp": "#a95131",
    "Other Contractual Services": "#b09b69",
    "Office Supplies": "#7c2f3e",
  };

const totalSpend = SPEND_BY_CATEGORY.reduce((sum, item) => sum + item.ACTUAL_SPEND, 0);

const pieChartData = SPEND_BY_CATEGORY.map(item => {
  const percentage = ((item.ACTUAL_SPEND / totalSpend) * 100).toFixed(1);
  return {
    value: item.ACTUAL_SPEND,
    name: item.PURCHASING_CATEGORY,
    percentage: Number(percentage),
    labelValue: item.ACTUAL_SPEND_LABEL, 
    fiscalyear: item.FISCAL_YEAR,
    itemStyle: {
      color: COLORS_MAP[item.PURCHASING_CATEGORY] || "#ccc",
    },
  };
});


  /* */

  /* dispatch */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchget_fiscal_year({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#dept_id}",
            columnValue: [selectedCostCenter.DEPT_ID],
          },
          {
            columnName: "{#year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
        ],
      })
    );
    dispatch(
      fetchget_department_list({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#dept_id}",
            columnValue: [selectedCostCenter.DEPT_ID],
          },
          {
            columnName: "{#year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
        ],
      })
    );
    dispatch(
      fetchget_department_tile_details({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#dept_id}",
            columnValue: [selectedCostCenter.DEPT_ID],
          },
          {
            columnName: "{#year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#alphafilter}",
            columnValue: [activeIndex1],
          },
        ],
      })
    );
  }, [selectedYear, selectedCostCenter]);

  useEffect(() => {
    dispatch(
      fetchget_department_table_details({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#dept_id}",
            columnValue: [selectedCostCenter.DEPT_ID],
          },
          {
            columnName: "{#year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#alphafilter}",
            columnValue: [].concat(activeIndex1),
          },
        ],
      })
    );
  }, [selectedYear, selectedCostCenter, activeIndex1])
  
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
    indInvoiceAmount: '$3,556.85',
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
    indInvoiceAmount: '$87,873.78',
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
          <DataTable value={mainTableConfig.PAYMENT_LIST} paginator rows={5}>
            <Column field="PAYMENT_MODE" header="Payment Mode" />
            <Column field="CHEQUE_NUMBER" header="Payment Number" />
            <Column field="PAYMENT_AMT" header="Pay Amount" body={(rowData) =>
                                CurrencyTemplate(rowData, "PAYMENT_AMT")
                              }/>
            <Column field="CHEQUE_DATE" header="Payment Date" />
            <Column field="ACCOUNTING_DATE" header="Accounting Date" />
          </DataTable>
        )}
      </div>
    );
  };

  const CATEGORY_VIEW_Chart_Data = useMemo(() => {
    let labels = new Set();
    const agg = CATEGORY_VIEW.reduce((acc, item) => {
      const { PURCHASING_CATEGORY: Metric, FISCAL_YEAR: Dimension} = item;

      if (!acc[Metric]) acc[Metric] = { [Dimension]: {} };
      else if (!acc[Metric][Dimension]) acc[Metric][Dimension] = {};
      acc[Metric][Dimension] = item;
      labels.add(Dimension)
      return acc;
    }, {})

    labels = [...labels].sort().reverse();

    for (const Metric in agg) {
      agg[Metric] = labels.map(label => agg[Metric][label] ?? {});
    }

    return {
      seriesData: agg,
      labels: labels
    }
  }, [CATEGORY_VIEW])

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
                DEPARTMENTS
              </div>
              <FaChevronRight size={12} color="#7c2f3e" />
              <div className="text-[#000] text-[14px] font-light">
                {DEPARTMENT_HEADER_INFO?.DEPT_NAME?.toUpperCase()}
              </div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
             <BarLoader loading={get_department_tile_detailsloading}>
              <div className="flex">
                <img
                  src="/images/department-header-icon.png"
                  className="w-[66px]"
                />
                <div>
                  {" "}
                  <div className="text-[#7c2f3e] text-[18px] font-bold">
                    {DEPARTMENT_HEADER_INFO?.DEPT_NAME}
                  </div>
                  <div className="text-[#444444] text-[13.5px] leading-[20px] mt-1">
                    <a className="font-semibold">Keys of Operation:</a>
                    {DEPARTMENT_HEADER_INFO?.KEYAREAS}
                  </div>
                  <div className="text-[#444444] text-[13.5px] leading-[20px] mt-1">
                    <a className="font-semibold">Cost Center:</a> 
                    {DEPARTMENT_HEADER_INFO?.DEPT_NAME}
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
                    COST CENTER
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      value={selectedCostCenter}
                      // options={departments}
                      optionLabel="DEPT_NAME"
                      options={DEPT_LIST}
                      onChange={(e) => {
                        setSelectedCostCenter(e.value);
                        if (e.value.VENDOR_NAME_LIST?.length) setActiveIndex1(e.value.VENDOR_NAME_LIST[0]);
                        else setActiveIndex1(0);
                      }}
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
              <div className="grid grid-cols-3 md:col-span-12 lg:col-span-12">
                {/* <div className="col-span-4"> */}
                <div className="cols-span-4 border-r-2 border-white">
                  <div className="flex gap-3 items-center">
                    <img src="/images/depart_icon.png" className="w-8" />
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      EMPLOYEES
                    </a>
                  </div>
                  <div className="gap-[10%]">
                    <BarLoader loading={get_department_tile_detailsloading} style={{ height: "15rem" }}>
                      <div className="text-center p-[4rem]">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          Total Employees
                        </div>
                        <div className="text-[30px]  text-[#7c2f3e] font-bold leading-6">
                          {EMPLOYEES?.no_of_employees}
                        </div>
                        {/* <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          <div className="col-span-2 w-full h-[250px]">
                          adsasds
                          </div>
                        </div>
                      </div> */}
                      </div>
                    </BarLoader>
                  </div>
                </div>
                <div className="cols-span-4 border-r-2 border-white ml-[1rem]">
                  <div className="flex gap-3 items-center">
                    <img src="/images/Expenses_icon.png" className="w-8" />
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      VENDORS
                    </a>
                  </div>
                  <div className="gap-[10%]">
                  <BarLoader loading={get_department_tile_detailsloading} style={{ height: "15rem" }}>
                    <div className="text-center p-[4rem]">
                      <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                        TOTAL VENDORS
                      </div>
                      <div className="text-[30px]  text-[#7c2f3e] font-bold leading-6">
                        {VENDORS?.TOTAL_VENDORS}
                      </div>
                    </div>
                    {/* <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          <div className="col-span-2 w-full h-[250px]">
                          adsasds
                          </div>
                        </div>
                      </div> */}
                  </BarLoader>
                  </div>
                  {/* <div id="chart-container" className="h-[150px]">
                    <Horizontalsinglebar
                      data={COMBINED_EXPENSES}
                      yAxisLabel={{
                        show: true,
                        color: "#000",
                        fontSize: 12,
                        "align": "center",
                        "verticalAlign": "top",
                        padding: [0, 30, 0, 0]
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
                  </div> */}
                </div>

                <div className="cols-span-4 ml-[1rem]">
                  <div className="flex gap-3 items-center">
                    <img src="/images/menupay.png" className="w-6" />
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      MAJOR VENDORS - TOP 5
                    </a>
                  </div>
                  <div className="col-span-2 w-full h-[250px]">
                    <BarLoader loading={get_department_tile_detailsloading}>
                    <SingleBarChart2
                      grid={{
                        left: "15px",
                        right: "80px",
                        top: "50px",
                        bottom: "0px",
                        containLabel: true,
                      }}
                      yAxisData={sortedMajorVendorData?.map(item => item?.VENDOR_NAME)}
                      seriesData={sortedMajorVendorData.map(item => ({
                        value: item.TOTALEXPENSE,
                        name: item.VENDOR_NAME,
                        color: "#7C2F3E",
                        label: item.TOTALEXPENSE_LABEL,
                        percentage: item.PERCENTAGE
                      }))}
                      tooltip={{
                        formatter: params => {
                          const [param] = params;
                          return `${param.marker}&nbsp;${param.axisValueLabel}: &nbsp;${param.data?.label} / ${param.data?.percentage}%`
                        }
                      }}
                    />
                    </BarLoader>
                  </div>
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>

            <div className="mt-[60px] grid grid-cols-12 gap-3 pb-[10px]">
              <div className="col-span-6 bg-white bann_cont mt-[10px]   !important p-[15px] rounded-[6px]">
                <div className="custom-tabview-container-detailview">
                  <div className="custom-tabdetailview">
                    {department_details_labels.map((label, index) => (
                      <button
                        key={index}
                        className={`custom-tab-header-detailview ${
                          activeIndex2 === index ? "active" : ""
                        } ${index === 0 ? "first-tab" : ""}`}
                        onClick={() => setActiveIndex2(index)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="depart_cont w-full mt-[-12px]">
                  {activeIndex2 === 0 && (
                     <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={""}
                      infoTooltipTitle="Time Trend View"
                      infoTooltipDescription="Visual representation of longitudinal representation of key spending metrics for the selected Cost center in horizontal bullet chart"
                      formatDownloadedData=""
                      header="Time Trend View"
                      dialogHeaderStyle={{
                        color: "#7C2F3E",
                        fontSize: "16px",
                      }}
                      dialogStyle={{ backgroundColor: "#ffffff" }}
                      formatFileName={""}
                      titleclassname="font-[600]"
                      infoTooltipComponent={InfoTooltip}
                      exportColumns={{
                        "BUDGET": "BUDGET",
                        "BUDGETPERCENTAGE": "BUDGETPERCENTAGE",
                        "BUDGET_LABEL": "BUDGET_LABEL",
                        "DEPARTMENT_CODE": "DEPARTMENT_CODE",
                        "ENCUMBRANCE": "ENCUMBRANCE",
                        "ENCUMBRANCE_LABEL": "ENCUMBRANCE_LABEL",
                        "ENCUMBRANCE_PERCENTAGE": "ENCUMBRANCE_PERCENTAGE",
                        "EXPENSE": "EXPENSE",
                        "EXPENSEPERCENTAGE": "EXPENSEPERCENTAGE",
                        "EXPENSE_LABEL": "EXPENSE_LABEL",
                        "FISCAL_YEAR": "FISCAL_YEAR",
                      }}
                      apidata={TIME_TREND_VIEW}
                      data={
                        <div id="chart-container" className="h-[280px] mt-[5px]">
                          <BarLoader loading={get_department_tile_detailsloading}>
                            <Horizontalsinglebar3
                              data={TIME_TREND_VIEW}
                              series1data={TIME_TREND_VIEW?.map(item => {
                                return {
                                  ...item,
                                  value: item?.BUDGET
                                }
                              })}
                              series2data={TIME_TREND_VIEW?.map(item => item?.EXPENSE)}
                              series3data={TIME_TREND_VIEW?.map(item => item?.ENCUMBRANCE)}
                              yaxisdata={TIME_TREND_VIEW?.map(item => item?.FISCAL_YEAR)}
                              tooltip={{
                                formatter: (params) => {
                                  const [param] = params;
                                  const { data: item } = param ?? {};
                                  return `
                                    <b>Fiscal year : ${item?.FISCAL_YEAR}</b><br/>
                                    Budget : ${item?.BUDGET_LABEL || "-"} / ${item?.BUDGETPERCENTAGE || 0}%<br/>
                                    Expense: ${item?.EXPENSE_LABEL || "-"} / ${item?.EXPENSE_PERCENTAGE?.toFixed(2) || 0}%<br/>
                                    Obligation: ${item?.ENCUMBRANCE_LABEL || "-"} / ${item?.ENCUMBRANCE_PERCENTAGE?.toFixed(2) || 0}%
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
                   
                  )}
                  {activeIndex2 === 1 && (
                     <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={""}
                      infoTooltipTitle="Category View"
                      infoTooltipDescription="Visual representation of longitudinal representation of key spending metrics for the selected Cost center by Top categories in a vertical stacked bar chart"
                      formatDownloadedData=""
                      header="Category View"
                      dialogHeaderStyle={{
                        color: "#7C2F3E",
                        fontSize: "16px",
                      }}
                      dialogStyle={{ backgroundColor: "#ffffff" }}
                      formatFileName={""}
                      titleclassname="font-[600]"
                      infoTooltipComponent={InfoTooltip}
                      exportColumns={{
                        "FISCAL_YEAR": "year",
                        "ACTUAL_SPEND": "Benefits Exp",
                        "ACTUAL_SPEND_LABEL": "expenseslabel",
                        "PURCHASING_CATEGORY": "categorylabel",
                      }}
                      apidata={CATEGORY_VIEW}
                      data={
                        <div id="chart-container" className="h-[280px] mt-[5px]">
                          <BarLoader loading={get_department_tile_detailsloading}>
                            <Verticalstackedbarchart {...CATEGORY_VIEW_Chart_Data} />
                          </BarLoader>
                        </div>
                      }/>
                  )}
                </div>
              </div>

              <div className="col-span-6 bg-white bann_cont mt-[10px] !important p-[15px] rounded-[6px]">
                <div className="text-[#7C2F3E] text-[15px] font-bold">
                  Spend By Category - 2025
                </div>
                <ChartWrapper
                  ExportIcon={true}
                  PrintIcon={true}
                  MaxiIcon={true}
                  infoIcon={true}
                  infoTooltipComponent={InfoTooltip}
                  infoTooltipTitle="Spend By Category - 2025"
                  infoTooltipDescription="A pie chart breaking down the actual spend at the Cost center for the selected fiscal year"
                  title={""}
                  formatDownloadedData=""
                  header="Spend By Category - 2025"
                  dialogHeaderStyle={{
                    color: "#7C2F3E",
                    fontSize: "16px",
                  }}
                  formatFileName={""}
                  exportColumns={{
                    "ACTUAL_SPEND": "ACTUAL_SPEND",
                    "ACTUAL_SPEND_LABEL": "ACTUAL_SPEND_LABEL",
                    "DEPARTMENT_CODE": "DEPARTMENT_CODE",
                    "FISCAL_YEAR": "FISCAL_YEAR",
                    "PURCHASING_CATEGORY": "PURCHASING_CATEGORY",
                  }}
                  apidata={SPEND_BY_CATEGORY}
                  titleclassname="font-[600]"
                  data={
                    <div className="gap-[10%]">
                      <div className="flex gap-5 ">
                        <div className="text-center w-full">
                          <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                            <div className="col-span-2 w-full h-[280px] pl-[2rem]">
                              <BarLoader loading={get_department_tile_detailsloading}>
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

                                data={pieChartData}
                                label={{
                                  show: false,
                                  color: "#fff",
                                  fontSize: 12,
                                  formatter: "{d}%",
                                }}
                                tooltip={{
                                  trigger: 'item',
                                  formatter: function (params) {
                                    const { name, data } = params;
                                    return `${name} of ${data.fiscalyear}: ${data.labelValue}`;
                                  },
                                }}
                                legend={{
                                  orient: "horizontal",
                                  show: true,
                                  bottom: 0,
                                  right: 120,

                                  itemWidth: 7,
                                  itemHeight: 7,
                                  data: SPEND_BY_CATEGORY.map(item => ({
                                    name: item.PURCHASING_CATEGORY,
                                    icon: "rect",
                                  })),
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
                  }
                />
              </div>
            </div>

            <div
              className={`bann_cont mt-[15px] w-full p-[15px] rounded-[8px] ${
                activeIndex === 0 ? "bg-white" : "bg-transparent"
              }`}
            >
              <div className="mt-2">
                <div className="text-[#7c2f3e] text-[15px] font-semibold mb-[10px] ">
                  VENDOR NAME
                </div>
                <div className="overflow-hidden inline-flex gap-5">
                  {selectedCostCenter.VENDOR_NAME_LIST.map((letter, index) => {
                    return <>
                      <div
                        onClick={() => setActiveIndex1(letter)}
                        className={`${(activeIndex1 === letter)
                            ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                            : "bg-[#fff] text-[#000]"
                          } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] 3xl:py-[0.417vw] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                      >
                        {letter}
                      </div>
                    </>
                  })}
                  {(selectedCostCenter.VENDOR_NAME_LIST?.length > 1) && <>
                      <div
                        onClick={() => setActiveIndex1(selectedCostCenter.VENDOR_NAME_LIST)}
                        className={`${Array.isArray(activeIndex1) && (activeIndex1.length === selectedCostCenter.VENDOR_NAME_LIST?.length)
                            ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                            : "bg-[#fff] text-[#000]"
                          } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] 3xl:py-[0.417vw] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                      >
                        All
                      </div>
                    </>
                  }
                  {/* <div
                    onClick={() => setActiveIndex1(0)}
                    className={`${
                      activeIndex1 === 0
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] 3xl:py-[0.417vw] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    A
                  </div>
                  <div
                    onClick={() => setActiveIndex1(1)}
                    className={`${
                      activeIndex1 === 1
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold  h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    B
                  </div>
                  <div
                    onClick={() => setActiveIndex1(2)}
                    className={`${
                      activeIndex1 === 2
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    C
                  </div>
                  <div
                    onClick={() => setActiveIndex1(3)}
                    className={`${
                      activeIndex1 === 3
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    D
                  </div>
                  <div
                    onClick={() => setActiveIndex1(4)}
                    className={`${
                      activeIndex1 === 4
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    E
                  </div>
                  <div
                    onClick={() => setActiveIndex1(5)}
                    className={`${
                      activeIndex1 === 5
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    F
                  </div>
                  <div
                    onClick={() => setActiveIndex1(6)}
                    className={`${
                      activeIndex1 === 6
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    G
                  </div>
                  <div
                    onClick={() => setActiveIndex1(7)}
                    className={`${
                      activeIndex1 === 7
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    H
                  </div>
                  <div
                    onClick={() => setActiveIndex1(8)}
                    className={`${
                      activeIndex1 === 8
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    I
                  </div>
                  <div
                    onClick={() => setActiveIndex1(9)}
                    className={`${
                      activeIndex1 === 9
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    J
                  </div>
                  <div
                    onClick={() => setActiveIndex1(10)}
                    className={`${
                      activeIndex1 === 10
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold h-[25px] py-[2px] xl:py-[2px] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    ALL
                  </div> */}
                </div>
              </div>

              <div className="depart_cont w-full mt-10">
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
                      infoTooltipTitle="Title"
                      infoTooltipDescription="A nested report breaking down the key spending metrics in the select cost center starting at the Vendors contributing to the spend and tracing them back through the associated purchase order all the way down to the payments associated with all the invoices tied to the Purchase orders"
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
                        "INDIVIDUAL_INVOICE_AMT": "Individual Invoice Amount",
                        "INVOICE_DATE": "Invoice Date",
                        "INVOICE_NUMBER": "Invoice Number",
                        "PO_NUMBER": "PO Number",
                        "VENDOR_NAME": "Vendor Name",
                        "ACCOUNTING_DATE": "Accounting Date",
                        "CHEQUE_DATE": "Payment Date",
                        "CHEQUE_NUMBER": "Payment Number",
                        "PAYMENT_AMT": "Pay Amount",
                        "PAYMENT_MODE": "Payment Mode",
                      }}
                      apidata={mainTableConfig}
                      data={
                        <div className="pt-3">
                          <BarLoader loading={get_department_table_detailsloading} style={{ height: "15rem" }}>
                          <DataTable
                            value={mainTableConfig}
                            // header={header}
                            paginator
                            rows={5}
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
                              field="INVOICE_NUMBER"
                              header="Invoice Number"
                              sortable
                              // filter
                              className="depart_name"
                              style={{ maxWidth: "15rem" }}
                            />
                            <Column
                              field="VENDOR_NAME"
                              header="Vendor Name"
                              sortable
                              // filter
                              style={{ maxWidth: "12rem" }}
                            />
                            <Column
                              field="INDIVIDUAL_INVOICE_AMT"
                              header="Individual Invoice Amount"
                              body={(rowData) =>
                                CurrencyTemplate(rowData, "INDIVIDUAL_INVOICE_AMT")
                              }
                              sortable
                              // filter
                              style={{ maxWidth: "15rem" }}
                            />
                            <Column
                              field="INVOICE_DATE"
                              header="Invoice Date"
                              sortable
                            />
                            <Column field="fund" header="Fund" sortable />
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

export default DepartmentDetail;
