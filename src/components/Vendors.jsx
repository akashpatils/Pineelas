import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import { FaHome, FaChevronRight } from "react-icons/fa";
import LoaderContainer from "../components/LoaderContainer/index";
import "./../css/style.css";
import SingleBarChart from "../components/charts/singlebarchart";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Or your preferred theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button } from 'primereact/button';
import { TabView, TabPanel } from "primereact/tabview";
import { useDispatch, useSelector } from "react-redux";
import { fetchget_overall_vendors_chart, fetchget_vendors_tile_info, fetchvendor_overlay_details } from "../redux/slices/vendor";
import { getData } from "../redux/selector";
import VendorPopup from "./popup/vendorpopup";
import ChartWrapper from "./chartwrappershipping";
import InfoTooltip from "./InfoTooltip";
import Horizontalsinglebar5 from "./charts/horizontalbarsinglechart5";
import BarLoader from "./BarLoader";

const Vendors = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(7);
  const [loading, setLoading] = useState(true);
  const [selectedSpend, setSelectedSpend] = useState({ name: "SPEND AMOUNT", code: "SPEND AMOUNT", dataField: "spend_amount", sort: -1 });
  const [selectedDept, setSelectedDept] = useState({ "OPERATING_UNIT": "Clerk of the Circuit Court" });
  const [selectedYear, setSelectedYear] = useState({ "FISCAL_YEAR": 2025 });
  const labels = ["List View", "Tile View"];
  const [vendorPopup, setVendorPopup] = useState(false);

  /* selector */
  //Dropdowns data
  const get_agency_list_with_fiscal_yearloading = useSelector((state) => state.global.get_agency_list_with_fiscal_yearloading)
  const AGENCY_LIST = useSelector((state) => getData(state.global, "AGENCY_LIST"))
  const FISCAL_YEAR_LIST = useSelector((state) => getData(state.global, "FISCAL_YEAR_LIST"))

  const get_overall_vendors_chartloading = useSelector((state) => state.vendor.get_overall_vendors_chartloading)
  const get_vendors_tile_infoloading = useSelector((state) => state.vendor.get_vendors_tile_infoloading)
  const SMALL_BUSINESS_LIST = useSelector((state) => getData(state.vendor, "SMALL_BUSINESS_LIST"))
  const TOTAL_VENDORS_BY_LOCATION = useSelector((state) => getData(state.vendor, "TOTAL_VENDORS_BY_LOCATION"))
  const [TOTAL_VENDORS_COUNT] = useSelector((state) => getData(state.vendor, "TOTAL_VENDORS_COUNT"))
  const VENDORS_LIST = useSelector((state) => getData(state.vendor, "VENDORS_LIST"))
  /* */

  const rangeMap = ['A-D', 'E-H', 'I-L', 'M-P', 'Q-T', 'U-W', 'X-Z', 'ALL'];

  const getFilteredVendors = () => {
    const selectedRange = rangeMap[activeIndex1];

    if (selectedRange === 'ALL') return VENDORS_LIST;

    const [start, end] = selectedRange.split('-');
    const regex = new RegExp(`^[${start}-${end}]`, 'i');

    return VENDORS_LIST.filter((dept) =>
      dept.vendor_name?.match(regex)
    );
  };

  const getFilteredVendors2 = () => {
    const selectedRange = rangeMap[activeIndex1];

    if (selectedRange === 'ALL') return VENDORS_LIST;

    const [start, end] = selectedRange.split('-');
    const regex = new RegExp(`^[${start}-${end}]`, 'i');

    return VENDORS_LIST.filter((dept) =>
      dept.vendor_name?.match(regex)
    );
  };

  /* Handle PopUp */
  const [selectedVendorID, setselectedVendorID] = useState(null);
  const popupDataAPI = useCallback(() => {
    dispatch(fetchvendor_overlay_details({
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
          columnName: "{#contractDetails_year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#poDetails_year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#year}",
          columnValue: [selectedYear?.FISCAL_YEAR],
        },
        {
          columnName: "{#vendor_id}",
          columnValue: [selectedVendorID],
        },
      ],
    }))
  }, [selectedVendorID])
  /*  */
  
    /* dispatch */
     const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(fetchget_overall_vendors_chart({
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
      dispatch(fetchget_vendors_tile_info({
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
    { name: "SPEND AMOUNT", code: "SPEND AMOUNT", dataField: "spend_amount", sort: -1 }, // 1 = ascending, -1 = descending
    { name: "NAME", code: "NAME", dataField: "vendor_name", sort: 1 },
  ];


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

  // const Top5_Lines_Toptile_Trend = [
  //   {
  //     LINE_NAME: "SYROS WARRIOR",
  //     LINE_TOTAL_SHIPPING: 21812,
  //     LINE_AVG_PER_MONTH: 5430,
  //   },
  //   {
  //     LINE_NAME: "MV TRADERSHIP",
  //     LINE_TOTAL_SHIPPING: 19012,
  //     LINE_AVG_PER_MONTH: 4900,
  //   },
  // ];
  const [globalFilter, setGlobalFilter] = useState('');
  const [expandedRows, setExpandedRows] = useState(null);
  const [innerFilters, setInnerFilters] = useState({});

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

  const filteredVendors = getFilteredVendors2();

  const financeTiles = filteredVendors.map(row => ({
    division: row.vendor_name ?? "-",
    icon: "/images/tile_viewIcon.png",
    expense: row.spend_amount_label ?? "-",
    budget: row.encumber_label ?? "-",
    association: row.year_of_association ?? "-",
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

  const Top5_Lines_Toptile_Trend = [
    {
      LINE_NAME: "SYROS WARRIOR",
      LINE_TOTAL_SHIPPING: 21812,
      LINE_AVG_PER_MONTH: 5430,
    },
    {
      LINE_NAME: "MV TRADERSHIP",
      LINE_TOTAL_SHIPPING: 19012,
      LINE_AVG_PER_MONTH: 4900,
    },
  ];

  const handlePinePopup = (e) => {
    setselectedVendorID(e.data?.vendor_id ?? null);
    setVendorPopup(true);
  }

  const budgetData = [
    { vendorName: 'Tyler Technologies Inc', yearsAssoc: '14', assocDept: 2, opCategories: 'Repair&Maintenance Svcs,Professional Services', cySpend: 8416882.00, obligAmt: 7584338.62 },
    { vendorName: 'Bank of America', yearsAssoc: '14', assocDept: 1, opCategories: 'ePayables BoA Liability Clearing,Vouchers Payable-P-Card,Prepaid Expenses', cySpend: 18041027.00, obligAmt: 6409557.37 },
    { vendorName: 'USPS - Hasler', yearsAssoc: '14', assocDept: 1, opCategories: 'DTOG Clerk-Circuit Court,Freight,Postage,DTOG-Clerk Accounting', cySpend: 5301878.00, obligAmt: 4814940.64 },
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
    vendor_name: { value: null, matchMode: 'contains' },
    year_of_association: { value: null, matchMode: 'contains' },
    associatedDepartments: { value: null, matchMode: 'contains' },
    operatingcategories: { value: null, matchMode: 'contains' },
    spend_amount_label: { value: null, matchMode: 'contains' },
    encumber_label: { value: null, matchMode: 'contains' }
  });

  const onFilter = (e) => {
    setFilters(e.filters);
  };

  return (
    <>
      <Layout pageTitle="Pinellas Home">
        <div className="vendor_bg w-full h-[90vh]">
          <div className="container relative top-[4.5rem]">
             <LoaderContainer loading={loading}></LoaderContainer>
            <div className="flex gap-2 items-center content-center">
              <FaHome size={24} color="#7c2f3e" />
              <FaChevronRight size={12} color="#7c2f3e" />
              <div className="text-[#000] text-[14px] font-light">VENDORS</div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
              <div className="flex gap-2">
                <img src="/images/IC.png" className="w-[66px]" />
                <div>
                  {" "}
                  <div className="text-[#7c2f3e] text-[14px] font-bold mb-[10px] ">
                    Pinellas County Vendors
                  </div>
                  <div className="text-[#000] text-[14px] leading-[20px]">
                    This section provides spending details by vendor for the
                    current year to date and the previous five fiscal years
                    (October 1st through September 30th) for the Board of County
                    Commissioners and the Clerk of the Circuit Court and
                    Comptroller. Expand this section to view additional vendor
                    details.
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

            <div className="mt-[20px] bg-[rgba(251,251,251,0.74)] !important p-[15px] rounded-[10px] h-[300px]">
              {/* <div className="grid grid-cols-12 gap-5"> */}
              <div className="grid grid-cols-2 md:col-span-12 lg:col-span-12">
                {/* <div className="col-span-4"> */}
                <div className="cols-span-6">
                  <div className="flex gap-3 items-center">
                    <img src="/images/depart_icon.png" className="w-8" />
                    <a
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      VENDORS
                    </a>
                  </div>
                  <div className="gap-[10%] mt-[15px]">
                    <div className="flex gap-5 ">
                      <div className="text-center p-[4rem]">
                       <BarLoader loading={get_overall_vendors_chartloading}>
                        <div className="text-[16px] mb-3 text-[#000000d9] font-medium leading-6">
                          Total Vendor
                        </div>
                        <div className="text-[30px]  text-[#7c2f3e] font-bold leading-6">
                          {TOTAL_VENDORS_COUNT?.count ?? '-'}
                        </div>
                       </BarLoader>
                      </div>
                      <div className="text-center p-[4rem]">
                       <BarLoader loading={get_overall_vendors_chartloading}>
                        <div className="text-[16px] mb-3 text-[#000000d9] font-medium leading-6">
                          Total Vendor Expense Spend
                        </div>
                        <div className="text-[30px]  text-[#7c2f3e] font-bold leading-6">
                          {TOTAL_VENDORS_COUNT?.totalexpenses_label ?? '-'}
                        </div>
                        </BarLoader>
                      </div>
                    </div>
                  </div>
                  <div className="gap-[10%]">
                    <div className="flex gap-5 ">
                      <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cols-span-6">
                  <div className="flex gap-3 items-center">
                    {/* <img src="/images/depart_icon.png" className="w-8" /> */}
                    <a
                      className="text-[16px] text-[#000000d9] font-bold"
                    >
                      Expense Spend - Vendors
                    </a>
                  </div>
                  <div id="chart-container" className="h-[200px]">
                    <BarLoader loading={get_overall_vendors_chartloading}>
                    <SingleBarChart
                      grid={{
                        left: "10px",
                        right: "100px",
                        top: "50px",
                        bottom: "20px",
                        containLabel: true,
                      }}
                      yAxisData={[TOTAL_VENDORS_COUNT?.label2, TOTAL_VENDORS_COUNT?.label1]}
                      seriesData={[
                        {
                          value: TOTAL_VENDORS_COUNT?.newvendorexpense,
                          name: "New Vendor",
                          color: "#B9814D",
                          label: TOTAL_VENDORS_COUNT?.newvendorexpense_label,
                        },
                        {
                          value: TOTAL_VENDORS_COUNT?.totalexpenses,
                          name: "Total Vendor",
                          color: "#7C2F3E",
                          label: TOTAL_VENDORS_COUNT?.totalexpenses_label,
                        },
                      ]}
                    />
                    </BarLoader>
                  </div>
                  <div className="gap-[10%]">
                    <div className="flex gap-5 ">
                      <div className="text-center w-full">
                        <div className="text-[14px] mb-3 text-[#000000d9] font-medium leading-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
            </div>

            <div className="bann_cont mt-[50px] w-full bg-white !important p-[15px] rounded-[6px] flex gap-32 items-center"
             style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)" }}>
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
                    VENDOR
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
                  VENDOR NAME
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

            <div className={`bann_cont pt-[1.5rem] mt-[15px] w-full p-[15px] rounded-[8px] flex gap-32 ${
                activeIndex === 0 ? "bg-white" : "bg-transparent"
              }`}>
              <div className="depart_cont w-full">
                {activeIndex === 0 && (
                  <div>
                    <p className="text-[#7c2f3e] text-[15px] font-semibold mt-[5px] mb-[15px]">
                      {/* LIST OF COUNTY VENDORS - BY CATEGORY - [Count: 154] */}
                    </p>
                    <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={true}
                      infoIcon={true}
                      title={`LIST OF COUNTY VENDORS - BY CATEGORY - [Count: ${getFilteredVendors()?.length}]`}
                      infoTooltipTitle="LIST OF COUNTY VENDORS"
                      infoTooltipDescription="A sortable and searchable roster of vendors associated with the selected operating unit or agency for a given fiscal year presented along with some key fiscal metrics like number of associated departments, total business volume and fiscal year spend"
                      formatDownloadedData=""
                      header={`LIST OF COUNTY VENDORS - BY CATEGORY - [Count: ${getFilteredVendors()?.length}]`}
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
                        "vendor_name": "Vendor Name",
                        "year_of_association": "Years of Association",
                        "associatedDepartments": "Associated Departments",
                        "operatingcategories": "Operating Categories",
                        "spend_amount": "Current Year (CY) Spend",
                        "encumber": "Obligation Amount",
                      }}
                      apidata={getFilteredVendors()}
                      data={
                        <div className="pt-3">
                         <BarLoader loading={get_vendors_tile_infoloading} style={{ height: "30rem"}}>
                          <DataTable 
                              value={getFilteredVendors()} 
                              globalFilter={globalFilter}
                              paginator rows={10}
                              stripedRows 
                              className="depart_tbl vendor_tbl"
                              // expandedRows={expandedRows} 
                              // onRowToggle={(e) => setExpandedRows(e.data)}
                              filters={filters}
                              onFilter={onFilter}
                              filterDisplay="row"
                              key={selectedSpend.dataField + selectedSpend.sort} // trigger table re-render on selectedSpend.dataField changes
                              sortField={selectedSpend.dataField}
                              sortOrder={selectedSpend.sort}
                              onRowClick={handlePinePopup}
                          >
                              <Column expander style={{ width: '3em', display: 'none' }} className="expand_icon" />
                              <Column field="vendor_name" 
                                header="Vendor Name" 
                                sortable filter 
                                filterPlaceholder="Search"
                                className="depart_name" 
                                style={{ maxWidth: '15rem', cursor: 'pointer' }}  />
                              <Column field="year_of_association" 
                                header="Years of Association" 
                                // body={(rowData) => CurrencyTemplate(rowData, 'yearsAssoc')} 
                                sortable filter
                                filterPlaceholder="Search"
                                style={{ maxWidth: '12rem' }} 
                                dataType="numeric"  />
                              <Column field="associatedDepartments" 
                                header="Associated Departments" 
                                sortable filter 
                                filterPlaceholder="Search"
                                style={{ maxWidth: '15rem' }} 
                                dataType="numeric" />
                              <Column field="operatingcategories" 
                                header="Operating Categories" sortable filter 
                                filterPlaceholder="Search"
                                style={{ maxWidth: '15rem' }} />
                              <Column field="spend_amount" 
                                header="Current Year (CY) Spend" 
                                body={(rowData) => CurrencyTemplate(rowData, 'spend_amount')} sortable filter 
                                filterPlaceholder="Search"
                                // filterElement={currencyFilterTemplate} 
                                />
                              <Column field="encumber" 
                                header="Obligation Amount" 
                                body={(rowData) => CurrencyTemplate(rowData, 'encumber')} sortable filter 
                                filterPlaceholder="Search"
                                // filterElement={currencyFilterTemplate} 
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
                    <BarLoader loading={get_vendors_tile_infoloading} style={{ height: "30rem"}}>
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
                                ACTUAL: chartData.spend_amount,
                                ENCUMERED: chartData.encumber,
                                ACTUAL_LABEL: chartData.spend_amount_label,
                                ENCUMERED_LABEL: chartData.encumber_label,
                                // BUDGET_PERCENTAGE: chartData.BUDGETPERCENTAGE,
                                SPENDPERCENTAGE: chartData.spend_percentage,
                                ENCUMBEREDPERCENTAGE: chartData.encumbrance_percentage,
                              }
                              return <div
                                key={index}
                                className="bg-white rounded-[5px] p-[5px] shadow h-full cursor-pointer"
                                onClick={handlePinePopup}
                              >
                                <div className="flex justify-start mb-2 p-2 bg-[#F7F7F7] gap-6">
                                  <div className="w-12">
                                    <img src={tile.icon} alt="division icon" />
                                  </div>
                                  <div className="text-[14px] text-[#444444]">
                                    {tile.division}
                                  </div>
                                </div>
                                <div className="flex justify-between py-3">
                                  <div className="text-[16px] font-[600] text-[#222] text-center w-[70%]">Years of Association</div>
                                  <div className="text-[16px] font-[600] text-[#7C2F3E] text-center w-[30%]">{tile.association}</div>
                                </div>
                                <div className="flex gap-14 justify-center mt-2 mb-2">
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
                                      Obligation Amount
                                    </div>
                                    <div className="text-[15px] text-[#000000d9] font-semibold">
                                      ${tile.budget}
                                    </div>
                                  </div>
                                </div>
                                <div className="h-[150px] mb-5">
                                  <Horizontalsinglebar5
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
            <div className="text-[#7c2f3e] font-normal text-[11px] mt-3 leading-5">
              Disclaimer: If you are a person with a disability who needs an
              accommodation to access records on this site, Please contact the
              Pinellas County office of Human Rights by calling (727) 464-4880
              or by email to accommodations@pinellascounty.org. More information
              can be found on the Clerk’s ADA & Website Policies webpage.
              Copyright 2020 Pinellas County Clerk of the Circuit Court and
              Comptroller.
            </div>
            {vendorPopup && 
              <VendorPopup vendorPopup={vendorPopup} setVendorPopup={setVendorPopup} dataAPI={popupDataAPI} agencyname={selectedDept.OPERATING_UNIT} activeyear={selectedYear.FISCAL_YEAR} />
            }
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Vendors;
