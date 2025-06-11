import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "./layouts/Layout";
import { FaHome, FaChevronRight } from "react-icons/fa";
import DonutChart from "./charts/donutchart";
import "./../css/style.css";
import Horizontalbar from "../components/charts/horizontalbar";
import Horizontalsinglebar from "../components/charts/horizontalbarsinglechart";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Or your preferred theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LoaderContainer from "../components/LoaderContainer/index";
import ChartWrapper from "../components/chartwrappershipping";
import InfoTooltip from "../components/InfoTooltip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchdepartment_overlay_details, fetchget_overall_departments_info_updated } from "../redux/slices/department";
import { getData } from "../redux/selector";
import DepartmentPopup from "./popup/departmentpopup";
import BarLoader from './BarLoader';

const Department = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(7);
  const labels = ["List View", "Tile View"];
  const [selectedDept, setSelectedDept] = useState({ "OPERATING_UNIT": "Clerk of the Circuit Court" });
  const [selectedSpend, setSelectedSpend] = useState({ name: "SPEND AMOUNT", code: "SPEND AMOUNT", dataField: "EXPENSE", sort: -1 });
  const [selectedYear, setSelectedYear] = useState({ "FISCAL_YEAR": 2025 });

  const [departPopup, setDepartPopup] = useState(false);
  const [visible, setVisible] = useState(false);

  /* selector */
  //Dropdowns data
  const get_agency_list_with_fiscal_yearloading = useSelector((state) => state.global.get_agency_list_with_fiscal_yearloading)
  const AGENCY_LIST = useSelector((state) => getData(state.global, "AGENCY_LIST"))
  const FISCAL_YEAR_LIST = useSelector((state) => getData(state.global, "FISCAL_YEAR_LIST"))

  //UI Components data
  const get_overall_departments_info_updatedloading = useSelector((state) => state.department.get_overall_departments_info_updatedloading)
  const [TOTAL_DEPARTMENTS] = useSelector((state) => getData(state.department, "TOTAL_DEPARTMENTS"))
  const TOTAL_DEPARTMENTS_DONUT_CHART = useSelector((state) => getData(state.department, "TOTAL_DEPARTMENTS_DONUT_CHART"))
  const [COMBINED_EXPENSES] = useSelector((state) => getData(state.department, "COMBINED_EXPENSES"))
  const _TOP_DEPARTMENTS = useSelector((state) => getData(state.department, "TOP_DEPARTMENTS"))
  const DEPARTMENT_MAIN_LIST = useSelector((state) => getData(state.department, "DEPARTMENT_MAIN_LIST"))
  const _DEPARTMENT_LIST = useSelector((state) => getData(state.department, "DEPARTMENT_LIST"))
  const DEPARTMENT_LIST = useMemo(() => {
    return Object.groupBy(_DEPARTMENT_LIST, ({MAIN_DEPARTMENT_NAME}) => MAIN_DEPARTMENT_NAME)
  }, [_DEPARTMENT_LIST])
  /* */

  const TOP_DEPARTMENTS = [..._TOP_DEPARTMENTS].sort((a,b) => a?.BUDGET - b?.BUDGET)

  const totalSum = TOTAL_DEPARTMENTS_DONUT_CHART.reduce((acc, row) => acc + row.TOTAL, 0);

  const rangeMap = ['A-D', 'E-H', 'I-L', 'M-P', 'Q-T', 'U-W', 'X-Z', 'ALL'];

  const getFilteredDepartments = () => {
    const selectedRange = rangeMap[activeIndex1];

    if (selectedRange === 'ALL') return DEPARTMENT_MAIN_LIST;

    const [start, end] = selectedRange.split('-');
    const regex = new RegExp(`^[${start}-${end}]`, 'i');

    return DEPARTMENT_MAIN_LIST.filter((dept) =>
      dept.MAIN_DEPARTMENT_NAME?.match(regex)
    );
  };

  const getFilteredDepartments2 = () => {
    const selectedRange = rangeMap[activeIndex1];

    if (selectedRange === 'ALL') return _DEPARTMENT_LIST;

    const [start, end] = selectedRange.split('-');
    const regex = new RegExp(`^[${start}-${end}]`, 'i');

    return _DEPARTMENT_LIST.filter((dept) =>
      dept.MAIN_DEPARTMENT_NAME?.match(regex)
    );
  };

  /* dispatch */
   const dispatch = useDispatch();

   const [selectedDeptID, setselectedDeptID] = useState(null);

  const popupDataAPI = useCallback(() => {
    dispatch(fetchdepartment_overlay_details({
      elasticQueryName: "",
      filters: [],
      dynamicColumns: [
        {
          columnName: "{#org}",
          columnValue: [selectedDept?.OPERATING_UNIT],
          // columnValue: ['Board of County Commissioners'],
        },
        {
          columnName: "{#fiscal_year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#vendor_year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#category_year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#dept_id}",
          columnValue: [selectedDeptID],
        },
      ],
    }));
  }, [selectedDeptID])
  
  useEffect(() => {
    dispatch(fetchget_overall_departments_info_updated({
      elasticQueryName: "",
      filters: [],
      dynamicColumns: [
         {
          columnName: "{#org}",
          columnValue: selectedDept.OPERATING_UNIT,
        },
         {
          columnName: "{#fiscal_year}",
          columnValue: selectedYear.FISCAL_YEAR,
        },
      ],
    }));
  }, [selectedDept, selectedYear])
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
    { name: "SPEND AMOUNT", code: "SPEND AMOUNT", dataField: "EXPENSE", sort: -1 }, // 1 = ascending, -1 = descending
    { name: "NAME", code: "NAME", dataField: "MAIN_DEPARTMENT_NAME", sort: 1 },
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

  // const financeTiles = Array.from({ length: 25 }, (_, i) => ({
  //   division: `Division ${i + 1}`,
  //   icon: "/images/tile_viewIcon.png",
  //   expense: (Math.random() * 5000000 + 1000000).toFixed(2),
  //   budget: (Math.random() * 5000000 + 6000000).toFixed(2),
  //   chartData: [
  //     {
  //       METRIC_NAME: "overall",
  //       POL_COUNTRY: `Country ${i + 1}`,
  //       CNT_20: Math.floor(Math.random() * 500),
  //       CNT_40: Math.floor(Math.random() * 500),
  //     },
  //   ],
  // }));

  const filteredDepartments = getFilteredDepartments2();

  const financeTiles = filteredDepartments.map(row => ({
    division: row.DEPARTMENT_DESC ?? "-",
    icon: "/images/tile_viewIcon.png",
    expense: row.EXPENSE_LABEL ?? "-",
    budget: row.BUDGET_LABEL ?? "-",
    chartData: DEPARTMENT_LIST[row.MAIN_DEPARTMENT_NAME ?? null] ?? []
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
    "Clerk of the Circuit Court and Comptroller",
    "Board of County Commissioners",
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
  const [innerFilters, setInnerFilters] = useState({});

  const rowExpansionTemplate = (data) => {
      return (
          <DataTable
          value={DEPARTMENT_LIST[data.MAIN_DEPARTMENT_NAME ?? null] ?? []}
          // paginator rows={5}
          filters={innerFilters[data.department] || {}}
          onFilter={(e) =>
              setInnerFilters({
                  ...innerFilters,
                  [data.department]: e.filters
              })
          }
          filterDisplay="row"
          className="departinner_tbl"
          onRowClick={handlePinePopup}
      >
          <Column style={{ width: '3em' }} className="expand_icon" />
          <Column 
            field="MAIN_DEPARTMENT_NAME" 
            header="Main Department" 
            filterPlaceholder="Search"
            sortable filter className="depart_name" style={{ maxWidth: '15rem', cursor: 'pointer' }}
            />
          <Column
              field="DEPARTMENT_DESC"
              header="Cost Center"
              sortable
              filter
              filterPlaceholder="Search"
          />
          <Column
              field="EXPENSE_LABEL"
              header="Current Year (CY) Spend"
              body={(rowData) => CurrencyTemplate(rowData, 'EXPENSE_LABEL')}
              sortable
              filter
              filterPlaceholder="Search"
              dataType="numeric"
          />
          <Column
              field="ENCUMBERED_VALUE_LABEL"
              header="CY Obligation"
              body={(rowData) => CurrencyTemplate(rowData, 'ENCUMBERED_VALUE_LABEL')}
              sortable
              filter
              filterPlaceholder="Search"
              dataType="numeric"
          />
          <Column
              field="BUDGET_LABEL"
              header="CY Budget"
              body={(rowData) => CurrencyTemplate(rowData, 'BUDGET_LABEL')}
              sortable
              filter
              filterPlaceholder="Search"
              dataType="numeric"
          />
          <Column
              field="LASTYEAREXPENSES_LABEL"
              header="Last Year Spend"
              body={(rowData) => CurrencyTemplate(rowData, 'LASTYEAREXPENSES_LABEL')}
              sortable
              filter
              filterPlaceholder="Search"
              dataType="numeric"
          />
      </DataTable>
    );
  };

  const handlePinePopup = (e) => {
    setselectedDeptID(e.data?.DEPARTMENT_CODE ?? null);
    setDepartPopup(true);
  }

  const budgetData = [
    {
      department: "Finance Division",
      costCenter: "",
      cySpend: 4614839.39,
      cyObligation: 160992.51,
      cyBudget: 8416882.0,
      lastYearSpend: 7584338.62,
    },
    {
      department: "Technology-CT & OP Svcs",
      costCenter: "",
      cySpend: 3977783.7,
      cyObligation: 460093.52,
      cyBudget: 18041027.0,
      lastYearSpend: 6409557.37,
    },
    {
      department: "Criminal Case Initiation",
      costCenter: "",
      cySpend: 2817180.34,
      cyObligation: 81370.96,
      cyBudget: 5301878.0,
      lastYearSpend: 4814940.64,
    },
    // ... add more rows as needed
  ];

  const CurrencyTemplate = (rowData, field) => {
    return rowData[field].toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
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
    global: { value: null, matchMode: "contains" },
    MAIN_DEPARTMENT_NAME: { value: null, matchMode: "contains" },
    DEPARTMENT_DESC: { value: null, matchMode: "contains" },
    EXPENSE_LABEL: { value: null, matchMode: "contains" },
    ENCUMBERED_VALUE_LABEL: { value: null, matchMode: "contains" },
    BUDGET_LABEL: { value: null, matchMode: "contains" },
    LASTYEAREXPENSES_LABEL: { value: null, matchMode: "contains" },
  });

  const onFilter = (e) => {
    setFilters(e.filters);
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
              <div className="text-[#000] text-[14px] font-light">
                DEPARTMENTS
              </div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
              <div className="flex">
                <img
                  src="/images/department-header-icon.png"
                  className="w-[66px]"
                />
                <div>
                  {" "}
                  <div className=" ">Pinellas County Departments</div>
                  <div className="text-[#000] text-[14px] leading-[20px]">
                    This section provides details on department spending,
                    obligations, and budget for the current year to date and the
                    previous five fiscal years (October 1st through September
                    30th) for the Board of County Commissioners and the Clerk of
                    the Circuit Court and Comptroller with the ability to view
                    additional purchase order details by main department.
                  </div>
                </div>
              </div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
              <div className="flex gap-3">
                <div className="inline-block">
                  <div className="text-[#7c2f3e] text-[15px] font-bold mb-[5px] ">
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
                  <div className="text-[#7c2f3e] text-[15px] font-bold mb-[5px] ">
                    FISCAL YEAR
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
                    <img src="/images/depart_icon.png" className="w-8" />
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      TOTAL DEPARTMENTS
                    </a>
                  </div>
                  <div className="gap-[10%]">
                    <div className="flex gap-5 ">
                      <div className="text-center p-[4rem] h-full">
                      <BarLoader loading={get_overall_departments_info_updatedloading}>

                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          Total Count
                        </div>
                       
                          {/* <BarLoader /> */}
                       
                        <div className="text-[30px]  text-[#7c2f3e] font-bold leading-6">
                          {(TOTAL_DEPARTMENTS ?? {}).TOTAL ?? "-"}
                        </div>
                      </BarLoader>
                      </div>
                      <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          <div className="col-span-2 w-full h-[250px]">
                            <BarLoader loading={get_overall_departments_info_updatedloading}>
                            <DonutChart
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
                              color={["#7C2F3E", "#A14612"]}
                              data={TOTAL_DEPARTMENTS_DONUT_CHART.map((row) => {
                                return {
                                  name: row.Operating_Unit ?? "",
                                  value: row.TOTAL,
                                  percentage: ((row.TOTAL / totalSum) * 100).toFixed(0),
                                };
                              })}
                              legend={{
                                orient: "vertical",
                                show: true,
                                bottom: 10,
                                left: 0,
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
                                  fontSize: 10,
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
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      COMBINED EXPENSES
                    </a>
                  </div>
                  <BarLoader loading={get_overall_departments_info_updatedloading}>
                  <div className="gap-[10%] p-5">
                    <div className="flex gap-32">
                      <div className="text-center">
                        <div className="text-[18px] mb-3 text-[#000000d9] font-normal leading-6">
                          EXPENSE
                        </div>
                        <div className="text-[18px] text-[#7c2f3e] font-bold leading-4">
                          {COMBINED_EXPENSES?.ACTUAL_LABEL ?? "-"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[18px] mb-3 text-[#000000d9] font-normal leading-4">
                          BUDGET
                        </div>
                        <div className="text-[18px] text-[#7c2f3e] font-bold leading-6">
                          {COMBINED_EXPENSES?.BUDGET_LABEL ?? "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="chart-container" className="h-[150px]">
                    <Horizontalsinglebar
                      data={COMBINED_EXPENSES}
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
                  </div>
                  </BarLoader>
                </div>

                <div className="cols-span-4 ml-[1rem]">
                  <div className="flex gap-3 items-center">
                    <img src="/images/depart_icon.png" className="w-8" />
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      TOP DEPARTMENTS
                    </a>
                  </div>
                  <div id="chart-container" className="h-[235px] mt-[10px]">
                    <BarLoader loading={get_overall_departments_info_updatedloading}>
                    <Horizontalbar
                      data={TOP_DEPARTMENTS}
                      yAxisLabel={{
                        show: true,
                        color: "#000",
                        fontSize: 12,
                        // align: "center",
                        // verticalAlign: "top",
                        // padding: [0, 50, 0, 0],
                        // width: 70,
                        // overflow: "truncate",
                        formatter: value => value.length > 20 ? value.slice(0, 20) + '...' : value
                      }}
                      legend={{
                        show: true,
                        bottom: 2,
                        orient: "horizontal",
                        left: 65,
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
                        left: "5%",
                        right: "15%",
                        bottom: "15%",
                        containLabel: true,
                      }}
                      seriesLabel={{
                        show: true,
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
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>

            <div
              className="bann_cont mt-[60px] w-full bg-white !important p-[15px] rounded-[4px] flex gap-32 items-center"
              style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="flex gap-5">
                <div>
                  <div className="text-[#7c2f3e] text-[15px] font-semibold mb-[5px] ">
                    SORT BY
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      value={selectedSpend}
                      options={spendamount}
                      optionLabel="name"
                      onChange={(e) => setSelectedSpend(e.value)}
                      // placeholder="Select Sort"
                      className="w-[220px]"
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
                <div>
                  <div className="text-[#7c2f3e] text-[15px] font-semibold mb-[5px] ">
                    DEPARTMENT
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <div className="custom-tabview-container">
                      <div className="custom-tabview">
                        {labels.map((label, index) => (
                          <button
                            key={index}
                            className={`custom-tab-header ${
                              activeIndex === index ? "active" : ""
                            }`}
                            onClick={() => setActiveIndex(index)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[#7c2f3e] text-[15px] font-semibold mb-[5px] ">
                  DEPARTMENT NAME
                </div>
                <div className="overflow-hidden inline-flex gap-3">
                  <div
                    onClick={() => setActiveIndex1(0)}
                    className={`${
                      activeIndex1 === 0
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    A-D
                  </div>
                  <div
                    onClick={() => setActiveIndex1(1)}
                    className={`${
                      activeIndex1 === 1
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    E-H
                  </div>
                  <div
                    onClick={() => setActiveIndex1(2)}
                    className={`${
                      activeIndex1 === 2
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    I-L
                  </div>
                  <div
                    onClick={() => setActiveIndex1(3)}
                    className={`${
                      activeIndex1 === 3
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    M-P
                  </div>
                  <div
                    onClick={() => setActiveIndex1(4)}
                    className={`${
                      activeIndex1 === 4
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    Q-T
                  </div>
                  <div
                    onClick={() => setActiveIndex1(5)}
                    className={`${
                      activeIndex1 === 5
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    U-W
                  </div>
                  <div
                    onClick={() => setActiveIndex1(6)}
                    className={`${
                      activeIndex1 === 6
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    X-Z
                  </div>
                  <div
                    onClick={() => setActiveIndex1(7)}
                    className={`${
                      activeIndex1 === 7
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    ALL
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bann_cont mt-[15px] w-full p-[15px] rounded-[8px] flex gap-32 ${
                activeIndex === 0 ? "bg-white" : "bg-transparent"
              }`}
            >
              <div className="depart_cont w-full">
                {activeIndex === 0 && (
                  <div className="">
                    <p className="text-[#7c2f3e] text-[15px] font-semibold mt-[5px] mb-[15px]">
                      {/* LIST OF DEPARTMENTS AND OFFICES - [Count:{" "}
                      {DEPARTMENT_MAIN_LIST?.length}] */}
                    </p>
                    <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={`LIST OF DEPARTMENTS AND OFFICES - [Count: ${getFilteredDepartments()?.length}]`}
                      infoTooltipTitle="LIST OF DEPARTMENTS AND OFFICES"
                      infoTooltipDescription="Hierarchical List of Department names with a breakdown by Costcenters for key spending metrics"
                      formatDownloadedData=""
                      header="LIST OF DEPARTMENTS AND OFFICES"
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
                      exportColumns = {{
                       "MAIN_DEPARTMENT_NAME": "Main Department",
                       "DEPARTMENT_DESC": "Cost Center",
                       "EXPENSE_LABEL": "Current Year (CY) Spend",
                       "ENCUMBERED_VALUE_LABEL": "CY Obligation",
                       "BUDGET_LABEL": "CY Budget",
                       "LASTYEAREXPENSES_LABEL": "Last Year Spend"
                      }}
                      apidata = {[...getFilteredDepartments(), ...[...getFilteredDepartments2()].reverse()]}
                      data={
                        <div className="mt-4">
                          <BarLoader loading={get_overall_departments_info_updatedloading} style={{ height: "30rem"}}>
                          <DataTable
                            value={getFilteredDepartments()}
                            globalFilter={globalFilter}
                            paginator
                            rows={10}
                            stripedRows
                            className="depart_tbl no_firstcolumn"
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}
                            filters={filters}
                            onFilter={onFilter}
                            filterDisplay="row"
                            key={selectedSpend.dataField + selectedSpend.sort} // trigger table re-render on selectedSpend.dataField changes
                            sortField={selectedSpend.dataField}
                            sortOrder={selectedSpend.sort}
                          >
                            <Column
                              expander={(data) => (DEPARTMENT_LIST[data.MAIN_DEPARTMENT_NAME ?? null] ?? []).length}
                              style={{ width: "3em" }}
                              className="expand_icon"
                            />
                            <Column
                              field="MAIN_DEPARTMENT_NAME"
                              header="Main Department"
                              sortable
                              filter
                              filterPlaceholder="Search"
                              className="depart_name"
                              style={{ maxWidth: "15rem" }}
                            />
                            <Column
                              field="DEPARTMENT_DESC"
                              header="Cost Center"
                              // body={(rowData) =>
                              //   CurrencyTemplate(rowData, "DEPARTMENT_DESC")
                              // }
                              sortable
                              filter
                              style={{ maxWidth: "12rem" }}
                              dataType="numeric"
                              filterElement={currencyFilterTemplate}
                            />
                            <Column
                              field="EXPENSE"
                              header="Current Year (CY) Spend"
                              body={(rowData) =>
                                CurrencyTemplate(rowData, "EXPENSE_LABEL")
                              }
                              sortable
                              filter
                              filterPlaceholder="Search"
                              style={{ maxWidth: "15rem" }}
                              dataType="numeric"
                              // filterElement={currencyFilterTemplate}
                            />
                            <Column
                              field="ENCUMBERED_VALUE_LABEL"
                              header="CY Obligation"
                              body={(rowData) =>
                                CurrencyTemplate(rowData, "ENCUMBERED_VALUE_LABEL")
                              }
                              sortable
                              filter
                              filterPlaceholder="Search"
                            />
                            <Column
                              field="BUDGET_LABEL"
                              header="CY Budget"
                              body={(rowData) =>
                                CurrencyTemplate(rowData, "BUDGET_LABEL")
                              }
                              sortable
                              filter
                              filterPlaceholder="Search"
                            />
                            <Column
                              field="LASTYEAREXPENSES_LABEL"
                              header="Last Year Spend"
                              body={(rowData) =>
                                CurrencyTemplate(rowData, "LASTYEAREXPENSES_LABEL")
                              }
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
                )}
                {activeIndex === 1 && (
                  <div className="relative w-full overflow-visible">
                  <BarLoader loading={get_overall_departments_info_updatedloading} style={{ height: "30rem"}}>
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
                            {group.map((tile, index) => {
                              const [chartData={}] = tile.chartData;
                              const data = {
                                ...chartData,
                                ACTUAL: chartData.EXPENSE,
                                ENCUMERED: chartData.ENCUMBERED_VALUE,
                                ACTUAL_LABEL: chartData.EXPENSE_LABEL,
                                ENCUMERED_LABEL: chartData.ENCUMBERED_VALUE_LABEL,
                                BUDGET_PERCENTAGE: chartData.BUDGETPERCENTAGE,
                                SPENDPERCENTAGE: chartData.EXPENSESPERCENTAGE,
                                ENCUMBEREDPERCENTAGE: chartData.ENCUMBERANCEPERCENTAGE,
                              }
                              return <div
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
                                      {tile.expense}
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-[15px] mb-1 text-[#000000d9] font-normal">
                                      Budget
                                    </div>
                                    <div className="text-[15px] text-[#000000d9] font-semibold">
                                      {tile.budget}
                                    </div>
                                  </div>
                                </div>
                                <div className="h-[150px] mb-5">
                                  <Horizontalsinglebar
                                    data={data}
                                    yAxisLabel={{
                                      show: true,
                                      color: "#000",
                                      fontSize: 10,
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
                                      right: "20%",
                                      bottom: "25%",
                                      containLabel: true,
                                    }}
                                    // seriesLabel={{
                                    //   show: true,
                                    //   position: "insideRight",
                                    //   color: "#fff",
                                    //   fontSize: 10,
                                    //   align: "right",
                                    //   formatter: (params) =>
                                    //     params.value >= 1000
                                    //       ? (params.value / 1000).toFixed(0) +
                                    //       "k"
                                    //       : params.value,
                                    // }}
                                  />
                                </div>
                              </div>
                            })}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </BarLoader>
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
            {departPopup && (
              <DepartmentPopup
                departPopup={departPopup}
                setDepartPopup={setDepartPopup}
                dataAPI={popupDataAPI} 
                agencyname={selectedDept.OPERATING_UNIT} 
                activeyear={selectedYear.FISCAL_YEAR}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Department;
