import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import { FaHome, FaChevronRight } from "react-icons/fa";
import LoaderContainer from "../components/LoaderContainer/index";
import SingleBarChart from "../components/charts/singlebarchart";
import VertialSingalbarChart from "../components/charts/vertialsingalbarchart";
import "./../css/style.css";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { fetchget_overall_category_info, fetchget_category_list_info, fetchcategory_overlay_details, fetchcategory_table_details } from "../redux/slices/categories";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/selector";
import Horizontalsinglebar2 from "./charts/horizontalbarsinglechart2";
import CategoryPopup from "./popup/categorypopup";
import ChartWrapper from "./chartwrappershipping";
import InfoTooltip from "./InfoTooltip";
import Horizontalsinglebar6 from "./charts/horizontalbarsinglechart6";
import BarLoader from "./BarLoader";

const Categories = () => {
  const [selectedDept, setSelectedDept] = useState({ "OPERATING_UNIT": "Clerk of the Circuit Court" });
  const [selectedSpend, setSelectedSpend] = useState({ name: "SPEND AMOUNT", code: "SPEND AMOUNT", dataField: "actualexpense", sort: -1 });
  const [selectedYear, setSelectedYear] = useState({ "FISCAL_YEAR": 2025 });
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(4);
  const [catePopup, setCatePopup] = useState(false);

  const labels = ["List View", "Tile View"];

  //Dropdowns data
  const get_agency_list_with_fiscal_yearloading = useSelector((state) => state.global.get_agency_list_with_fiscal_yearloading)
  const AGENCY_LIST = useSelector((state) => getData(state.global, "AGENCY_LIST"))
  const FISCAL_YEAR_LIST = useSelector((state) => getData(state.global, "FISCAL_YEAR_LIST"))

  const get_overall_category_infoloading = useSelector((state) => state.categories.get_overall_category_infoloading)
  const get_category_list_infoloading = useSelector((state) => state.categories.get_category_list_infoloading)

  // const OPERATING_ACTUALS_CHART = useSelector((state) => getData(state.categories, "OPERATING_ACTUALS_CHART"))
  // const OPERATING_ACTUALS_VARIANCE = useSelector((state) => getData(state.categories, "OPERATING_ACTUALS_VARIANCE"))
  // const PERSONAL_SERVICES = useSelector((state) => getData(state.categories, "PERSONAL_SERVICES"))
  // const TOP_CATEGORIES = useSelector((state) => getData(state.categories, "TOP_CATEGORIES"))

  const operationsData =  useSelector((state) => state.categories);
  const OPERATING_ACTUALS_CHART = operationsData?.["0"]?.OUTPUT?.OPERATING_ACTUALS_CHART || [];
  const sortedOperatingActuals = [...OPERATING_ACTUALS_CHART].sort(
    (a, b) => b.FISCAL_YEAR - a.FISCAL_YEAR
  );
  // const data2= getDataFormRedux(operationsData, 'OPERATING_ACTUALS_VARIANCE');
  const _TOP_CATEGORIES = operationsData?.["0"]?.OUTPUT?.TOP_CATEGORIES || [];
  const [PERSONAL_SERVICES] = operationsData?.["0"]?.OUTPUT?.PERSONAL_SERVICES || [];
  const OPERATING_ACTUALS_VARIANCE = operationsData?.["0"]?.OUTPUT?.OPERATING_ACTUALS_VARIANCE || [];

  const MAIN_CATEGORY_LIST = useSelector((state) => getData(state.categories, "MAIN_CATEGORY_LIST"))
  const _CATEGORY_LIST = useSelector((state) => getData(state.categories, "CATEGORY_LIST"))
  const CATEGORY_LIST = useMemo(() => {
    return Object.groupBy(_CATEGORY_LIST, ({ACCOUNT_ROLLUP_NAME}) => ACCOUNT_ROLLUP_NAME)
  }, [_CATEGORY_LIST])

  const TOP_CATEGORIES = [..._TOP_CATEGORIES]?.sort((a, b) => b?.expense - a?.expense)?.reverse();

  const rangeMap = ['A-H', 'I-P', 'Q-T', 'U-Z', 'ALL'];

  const getFilteredCategories = () => {
    const selectedRange = rangeMap[activeIndex1];

    if (selectedRange === 'ALL') return MAIN_CATEGORY_LIST;

    const [start, end] = selectedRange.split('-');
    const regex = new RegExp(`^[${start}-${end}]`, 'i');

    return MAIN_CATEGORY_LIST.filter((dept) =>
      dept.ACCOUNT_ROLLUP_NAME?.match(regex)
    );
  };

  const getFilteredCategories2 = () => {
    const selectedRange = rangeMap[activeIndex1];

    if (selectedRange === 'ALL') return _CATEGORY_LIST;

    const [start, end] = selectedRange.split('-');
    const regex = new RegExp(`^[${start}-${end}]`, 'i');

    return _CATEGORY_LIST.filter((dept) =>
      dept.cat_name?.match(regex)
    );
  };

  const dispatch = useDispatch();

  const [selectedCatname, setselectedCatname] = useState(null);
  const [selectedAccountRollup, setselectedAccountRollup] = useState(null);

  const popupDataAPI = useCallback(() => {
    dispatch(fetchcategory_overlay_details({
      elasticQueryName: "",
      filters: [],
      dynamicColumns: [
        {
          columnName: "{#org}",
          columnValue: [selectedDept?.OPERATING_UNIT],
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
          columnName: "{#department_year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#major_catname}",
          columnValue: [selectedCatname],
        },
        {
          columnName: "{#major_account_rollup}",
          columnValue: [selectedAccountRollup],
        },
      ],
    }));
    dispatch(fetchcategory_table_details({
      elasticQueryName: "",
      filters: [],
      dynamicColumns: [
        {
          columnName: "{#org}",
          columnValue: [selectedDept?.OPERATING_UNIT],
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
          columnName: "{#department_year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#major_catname}",
          columnValue: [selectedCatname],
        },
        {
          columnName: "{#major_account_rollup}",
          columnValue: [selectedAccountRollup],
        },
      ],
    }));
  }, [selectedCatname, selectedAccountRollup])

  useEffect(() => {
      dispatch(fetchget_overall_category_info({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
           {
            columnName: "{#org}",
            columnValue: [selectedDept.OPERATING_UNIT],
          },
           {
            columnName: "{#fiscal_year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
        ],
      }));
      dispatch(fetchget_category_list_info({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
           {
            columnName: "{#org}",
            columnValue: [selectedDept.OPERATING_UNIT],
          },
           {
            columnName: "{#fiscal_year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
        ],
      }));
    }, [selectedDept, selectedYear])

  const spendamount = [
    { name: "SPEND AMOUNT", code: "SPEND AMOUNT", dataField: "actualexpense", sort: -1 }, // 1 = ascending, -1 = descending
    { name: "NAME", code: "NAME", dataField: "ACCOUNT_ROLLUP_NAME", sort: 1 },
  ];

  useEffect(() => {
    // When spendamount is loaded, set default
    if (spendamount.length > 0 && !selectedSpend) {
      setSelectedSpend(spendamount[0]);
    }
  }, [spendamount]);

   useEffect(() => {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }, []);

  const departments = [
    "Clerk of the Circuit Court and Comptroller",
    "Board of County Commissioners",
  ];
  const years = ["2025", "2024", "2023", "2022", "2021", "2020"];

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

  const [globalFilter, setGlobalFilter] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);
  const [innerFilters, setInnerFilters] = useState({});

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable
          value={CATEGORY_LIST[data.ACCOUNT_ROLLUP_NAME ?? null] ?? []}
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
        <Column
          expander
          style={{ width: "3em", display: 'none' }}
          className="expand_icon"
        />
        <Column
          field="ACCOUNT_ROLLUP_NAME"
          header="Main Category"
          sortable
          filter
          filterPlaceholder="Search"
          className="depart_name"
          style={{ maxWidth: "15rem", cursor: 'pointer' }}
        />
        <Column
          field="cat_name"
          header="Category Name"
          sortable
          filter
          filterPlaceholder="Search"
          style={{ maxWidth: "12rem" }}
        />
        <Column
          field="associatedvendors"
          header="Associated Vendors"
          sortable
          filter
          filterPlaceholder="Search"
          style={{ maxWidth: "15rem" }}
          dataType="numeric"
        />
        <Column
          field="associateddepartments"
          header="Departments"
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="expense_label"
          header="Current Year (CY) Spend "
          // body={(rowData) =>
          //   CurrencyTemplate(rowData, "cySpend")
          // }
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="encumbrance_label"
          header="Obligation"
          // body={(rowData) =>
          //   CurrencyTemplate(rowData, "obligation")
          // }
          sortable
          filter
          filterPlaceholder="Search"
        />
        <Column
          field="lastyearspend_label"
          header="Last Year Spend"
          // body={(rowData) =>
          //   CurrencyTemplate(rowData, "lySpend")
          // }
          sortable
          filter
          filterPlaceholder="Search"
        />
      </DataTable>
    );
  };

  const handlePinePopup = (e) => {
    setselectedCatname(e.data?.cat_name ?? null);
    setselectedAccountRollup(e.data?.ACCOUNT_ROLLUP_NAME ?? null);
    setCatePopup(true);
  }

  // const financeTiles = Array.from({ length: 25 }, (_, i) => ({
  //   division: `Division ${i + 1}`,
  //   icon: "/images/Categories_Icon.png",
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

  const filteredCategories = getFilteredCategories2();

  const financeTiles = filteredCategories.map(row => ({
    division: row.cat_name ?? "-",
    icon: "/images/tile_viewIcon.png",
    expense: row.expense_label ?? "-",
    budget: row.encumbrance_label ?? "-",
    chartData: row
  }));

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  const chunkedData = chunkArray(financeTiles, 20);

  const budgetData = [
    {
      mainCate: "Personnel Services",
      cateName: "",
      assocVendors: 2,
      department: 22,
      cySpend: 160992.51,
      obligation: 8416882.0,
      lySpend: 7584338.62,
    },
    {
      mainCate: "Operating Expenses",
      cateName: "",
      assocVendors: 125,
      department: 22,
      cySpend: 3977783.7,
      obligation: 8416882.0,
      lySpend: 7584338.62,
    },
    {
      mainCate: "Reserves",
      cateName: "",
      assocVendors: 0,
      department: 2,
      cySpend: 2817180.34,
      obligation: 8416882.0,
      lySpend: 7584338.62,
    },
    // ... add more rows as needed
  ];

  const CurrencyTemplate = (rowData, field) => {
    return rowData[field]?.toLocaleString("en-US", {
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
    mainCate: { value: null, matchMode: "contains" },
    cateName: { value: null, matchMode: "contains" },
    assocVendors: { value: null, matchMode: "contains" },
    department: { value: null, matchMode: "contains" },
    cySpend: { value: null, matchMode: "contains" },
    obligation: { value: null, matchMode: "contains" },
    lySpend: { value: null, matchMode: "contains" },
  });

  const onFilter = (e) => {
    setFilters(e.filters);
  };

  return (
    <>
      <Layout pageTitle="Pinellas Home">
        <div className="payrollexpenses_bg w-full h-[95vh]">
          <div className="container relative top-[4.5rem]">
             <LoaderContainer loading={loading}></LoaderContainer>
            <div className="flex gap-2 items-center content-center">
              <FaHome size={24} color="#7c2f3e" />
              <FaChevronRight size={12} color="#7c2f3e" />
              <div className="text-[#000] text-[14px] font-light">
                CATEGORIES
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
                  <div className="text-[#7c2f3e] text-[14px] font-bold mb-[10px] ">
                    Pinellas County Categories
                  </div>
                  <div className="text-[#000] text-[14px] leading-[20px]">
                    This section provides spending details by category for the
                    current year to date and the previous five fiscal years
                    (October 1st through September 30th) for the Board of County
                    Commissioners and the Clerk of the Circuit Court and
                    Comptroller with additional views of spending.
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
                      // options={departments}
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
                    FISCAL YEAR
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      loading={get_agency_list_with_fiscal_yearloading}
                      value={selectedYear}
                      // options={years}
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

            <div className="mt-[15px] bg-[rgba(251,251,251,0.74)] !important p-[15px] rounded-[10px] h-[325px]">
              {/* <div className="grid grid-cols-12 gap-5"> */}
              <div className="grid grid-cols-3 md:col-span-12 lg:col-span-12">
                {/* <div className="col-span-4"> */}
                <div className="cols-span-4">
                  <div className="flex gap-3 items-center">
                    <img src="/images/menupay.png" className="w-8" />
                    <a
                    
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      TOP CATEGORIES
                    </a>
                  </div>
                  <div className="gap-[10%]">
                    <div className="flex gap-5 ">
                      <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          <div className="col-span-2 w-full h-[250px]">
                           <BarLoader loading={get_overall_category_infoloading}>
                            <SingleBarChart
                              grid={{
                                left: "10px",
                                right: "100px",
                                top: "50px",
                                bottom: "0px",
                                containLabel: true,
                              }}
                              yAxisData={TOP_CATEGORIES.map(item => item?.category)}
                              seriesData={TOP_CATEGORIES.map(item => ({
                                value: item.expense,
                                name: item.category,
                                color: "#7C2F3E",
                                label: item.expense_label.trim(), 
                              }))}
                            />
                           </BarLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cols-span-4">
                  <div className="flex gap-3 items-center">
                    <img src="/images/servicesicon.png" className="w-8" />
                    <a
                     
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      PERSONNEL SERVICES
                    </a>
                  </div>
                 <BarLoader loading={get_overall_category_infoloading}>
                  <div className="gap-[10%] p-5">
                    <div className="flex gap-32">
                      <div className="text-center">
                        <div className="text-[18px] mb-3 text-[#000000d9] font-normal leading-6">
                          EXPENSE
                        </div>
                        <div className="text-[18px] text-[#7c2f3e] font-bold leading-4">
                          {PERSONAL_SERVICES?.expense_label}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[18px] mb-3 text-[#000000d9] font-normal leading-4">
                          BUDGET
                        </div>
                        <div className="text-[18px] text-[#7c2f3e] font-bold leading-6">
                          {PERSONAL_SERVICES?.budget_label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="chart-container" className="h-[150px]">
                    <Horizontalsinglebar2
                      data={PERSONAL_SERVICES}
                      yAxisLabel={{
                        show: true,
                        color: "#000",
                        fontSize: 10,
                        formatter: function (value) {
                          return value.length > 0
                            ? value.substring(0, 15) + "..."
                            : value;
                        },
                      }}
                      legend={{
                        show: true,
                        bottom: 2,
                        orient: "horizontal",
                        padding: [0, 0, 0, 10],
                        left: 50,
                        itemGap: 30,
                        itemWidth: 8,
                        itemHeight: 8,
                        textStyle: {
                          color: "#000",
                          fontSize: 12,
                        },
                        // data: legendState
                        data: ["Budget", "Expense", "Obligation"],
                      }}
                      grid={{
                        top: "0%",
                        left: "0%",
                        right: "20%",
                        bottom: "25%",
                        containLabel: true,
                      }}
                      seriesLabel={{
                        show: true,
                        position: "insideRight",
                        color: "#fff",
                        fontSize: 10,
                        align: "right",
                        formatter: function (params) {
                          return params.value >= 1000
                            ? (params.value / 1000).toFixed(0) + "k"
                            : params.value;
                        },
                      }}
                    />
                  </div>
                 </BarLoader>
                </div>

                <div className="cols-span-4">
                 <BarLoader loading={get_overall_category_infoloading}>
                  <div className="flex gap-3 items-center">
                    <img src="/images/operatingicon.png" className="w-8" />
                    <a
                     
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      OPERATING EXPENSE
                    </a>
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold ml-[10px]"
                    >
                      {OPERATING_ACTUALS_VARIANCE?.[0]?.expense_label ?? "-"}
                    </a>
                  </div>
                  <div className="gap-[10%]">
                    <div className="flex gap-5 ">
                      <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6">
                          <div className="col-span-2 w-full h-[220px]">
                            <VertialSingalbarChart
                              xAxis={{
                                data: sortedOperatingActuals.map(item => item?.FISCAL_YEAR),
                              }}
                              yAxis={{ show: false }}
                              grid={{
                                left: "0px",
                                right: "50px",
                                top: "30px",
                                bottom: "10px",
                                containLabel: true,
                              }}
                              seriesData={sortedOperatingActuals.map(item => ({
                                value: item?.EXPENSE,
                                name: item?.FISCAL_YEAR?.toString(),
                                itemStyle: {
                                  color: "#7C2F3E",
                                  borderRadius: [4, 4, 0, 0],
                                },
                                label: item?.expense_label,
                              }))}
                              tooltipLabel={"Expense"} 
                            />
                            <div className="text-[14px] font-medium text-left">
                              <a>Last Year Variation:</a> {`${OPERATING_ACTUALS_VARIANCE?.[0]?.variance}%`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 </BarLoader>
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>

            <div className="bann_cont mt-[50px] w-full bg-white !important p-[15px] rounded-[6px] flex gap-32 items-center"
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
                    CATEGORY
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
                  CATEGORY NAME
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
                    A-H
                  </div>
                  <div
                    onClick={() => setActiveIndex1(1)}
                    className={`${
                      activeIndex1 === 1
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    I-P
                  </div>
                  <div
                    onClick={() => setActiveIndex1(2)}
                    className={`${
                      activeIndex1 === 2
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    Q-T
                  </div>
                  <div
                    onClick={() => setActiveIndex1(3)}
                    className={`${
                      activeIndex1 === 3
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    U-Z
                  </div>
                  {/* <div
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
                  </div> */}
                  <div
                    onClick={() => setActiveIndex1(4)}
                    className={`${
                      activeIndex1 === 4
                        ? "bg-[#7A2E3A] text-[#F5F6F7] rounded-3xl font-bold"
                        : "bg-[#fff] text-[#000]"
                    } text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold py-[5px] xl:py-[5px] 3xl:py-[0.417vw] px-[14px] xl:px-[14px] 3xl:px-[0.833vw] cursor-pointer`}
                  >
                    ALL
                  </div>
                </div>
              </div>
            </div>

            <div className={`bann_cont mt-[15px] w-full p-[15px] rounded-[8px] flex gap-32 ${
                activeIndex === 0 ? "bg-white" : "bg-transparent"
              }`}>
              <div className="depart_cont w-full">
                {activeIndex === 0 && (
                  <div>
                    <p className="text-[#7c2f3e] text-[15px] font-semibold mt-[5px] mb-[15px]">
                      {/* LIST OF CATEGORIES - [Count: 4] */}
                    </p>
                    <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={`LIST OF CATEGORIES - [Count: ${getFilteredCategories()?.length}]`}
                      infoTooltipTitle="LIST OF CATEGORIES"
                      infoTooltipDescription="A sortable and searchable roster of Categories presented in two levels ( Main Category and Category) associated with the selected operating unit or agency for a given fiscal year presented along with some key fiscal metrics like number of associated departments, associated vendors, and fiscal year spending metrics"
                      formatDownloadedData=""
                      header={`LIST OF CATEGORIES - [Count: ${getFilteredCategories()?.length}]`}
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
                        "ACCOUNT_ROLLUP_NAME": "Main Category",
                        "cat_name": "Category Name",
                        "associatedvendors": "Associated Vendors",
                        "associateddepartments": "Departments",
                        "actualexpense": "Current Year (CY) Spend",
                        "encumbered_amount": "Obligation",
                        "lastyearspend": "Last Year Spend",
                      }}
                      apidata={[...getFilteredCategories(), ...[...getFilteredCategories2()].reverse()]}
                      data={
                        <div className="pt-3">
                          <BarLoader loading={get_category_list_infoloading} style={{ height: "15rem"}}>
                          <DataTable
                            value={getFilteredCategories()}
                            globalFilter={globalFilter}
                            paginator
                            rows={10}
                            stripedRows
                            className="depart_tbl no_firstcolumn"
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}
                            rowClassName="testing"
                            filters={filters}
                            onFilter={onFilter}
                            filterDisplay="row"
                            key={selectedSpend.dataField + selectedSpend.sort} // trigger table re-render on selectedSpend.dataField changes
                            sortField={selectedSpend.dataField}
                            sortOrder={selectedSpend.sort}
                          >
                            <Column
                              expander={(data) => (CATEGORY_LIST[data.ACCOUNT_ROLLUP_NAME ?? null] ?? []).length}
                              style={{ width: "3em" }}
                              className="expand_icon"
                            />
                            <Column
                              field="ACCOUNT_ROLLUP_NAME"
                              header="Main Category"
                              sortable
                              filter
                              filterPlaceholder="Search"
                              className="depart_name"
                              style={{ maxWidth: "15rem" }}
                            />
                            <Column
                              field="cateName"
                              header="Category Name"
                              sortable
                              filter
                              filterPlaceholder="Search"
                              style={{ maxWidth: "12rem" }}
                            />
                            <Column
                              field="associatedvendors"
                              header="Associated Vendors"
                              sortable
                              filter
                              filterPlaceholder="Search"
                              style={{ maxWidth: "15rem" }}
                              dataType="numeric"
                            />
                            <Column
                              field="associateddepartments"
                              header="Departments"
                              sortable
                              filter
                              filterPlaceholder="Search"
                            />
                            <Column
                              field="actualexpense"
                              header="Current Year (CY) Spend "
                              body={(rowData) =>
                                CurrencyTemplate(rowData, "actualexpense")
                              }
                              sortable
                              filter
                              filterPlaceholder="Search"
                            />
                            <Column
                              field="encumbrance_label"
                              header="Obligation"
                              // body={(rowData) =>
                              //   CurrencyTemplate(rowData, "obligation")
                              // }
                              sortable
                              filter
                              filterPlaceholder="Search"
                            />
                            <Column
                              field="lastyearspend_label"
                              header="Last Year Spend"
                              // body={(rowData) =>
                              //   CurrencyTemplate(rowData, "lySpend")
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
                )}
                {activeIndex === 1 && (
                  <div className="relative w-full overflow-visible">
                    <BarLoader loading={get_category_list_infoloading} style={{ height: "15rem"}}>
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
                              const chartData = tile.chartData || {};
                              const data = {
                                ...chartData,
                                ACTUAL: chartData.actualexpense,
                                ENCUMERED: chartData.encumbered_amount,
                                ACTUAL_LABEL: chartData.expense_label,
                                ENCUMERED_LABEL: chartData.encumbrance_label,
                                // BUDGET_PERCENTAGE: chartData.BUDGETPERCENTAGE,
                                SPENDPERCENTAGE: chartData.spend_percentage,
                                ENCUMBEREDPERCENTAGE: chartData.encumberpercentage,
                              }
                              return <div
                                key={index}
                                className="bg-white rounded-[5px] p-[5px] shadow h-full cursor-pointer"
                                onClick={handlePinePopup}
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
                                      Obligation
                                    </div>
                                    <div className="text-[15px] text-[#000000d9] font-semibold">
                                      {tile.budget}
                                    </div>
                                  </div>
                                </div>
                                <div className="h-[150px] mb-5">
                                  <Horizontalsinglebar6
                                    data={data}
                                    yAxisLabel={{
                                      show: true,
                                      color: "#000",
                                      fontSize: 10,
                                      // formatter: (value) =>
                                      //   value.length > 0
                                      //     ? value.substring(0, 15) + "..."
                                      //     : value,
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
                                      data: ["Expense", "Obligation"],
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
                                    //         "k"
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
            {catePopup && 
              <CategoryPopup catePopup={catePopup} setCatePopup={setCatePopup} dataAPI={popupDataAPI} agencyname={selectedDept.OPERATING_UNIT} activeyear={selectedYear.FISCAL_YEAR} selectedCategory={selectedCatname} selectedroll={selectedAccountRollup}/>
            }
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Categories;
