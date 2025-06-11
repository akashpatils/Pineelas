import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import Layout from "./layouts/Layout";
import { FaHome, FaChevronRight } from "react-icons/fa";
import ChartWrapper from "./chartwrappershipping";
import Verticalbar from "./charts/verticalbar";
import "./../css/style.css";
import Horizontalsinglebar from "./charts/horizontalbarsinglechart";
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
import { fetchget_vendors_list, fetchget_vendor_tile_details, fetchget_vendor_table_details } from "../redux/slices/vendor";
import InfoTooltip from "./InfoTooltip";
import { useLocation, useNavigate } from "react-router-dom";
import PopupChart from "./charts/Popupchart";
import BarLoader from "./BarLoader";

const VendorsDetail = () => {

  /* Carry State */
  const location = useLocation();
  const navigate = useNavigate();
  const { moreDetailsprop } = location.state || {};

  useLayoutEffect(() => {
    if (!moreDetailsprop) navigate("/vendors")
  }, [location.state])
  /*  */

  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const labels = ["List View", "Tile View"];
  const department_details_labels = ["Time Trend View", "Category View"];
  const [selectedCostCenter, setSelectedCostCenter] = useState({
    "vendor_name": moreDetailsprop.vendor_name,
    "vendor_id": moreDetailsprop.VENDOR_ID,
    "fiscal_year": moreDetailsprop.activeyear
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

  const get_vendors_listloading = useSelector(
    (state) => state.vendor.get_vendors_listloading
  );

  const get_vendor_tile_detailsloading = useSelector(
    (state) => state.vendor.get_vendor_tile_detailsloading
  );

  const get_vendor_table_details = useSelector(
    (state) => state.vendor.get_vendor_table_details
  );

  const FISCAL_YEAR_LIST = useSelector((state) =>
    getData(state.global, "FISCAL_YEAR_LIST")
  );

  const VENDOR_LIST = useSelector((state) =>
    getData(state.vendor, "VENDOR_LIST")
  );

  const [TOTAL_EXPENSES] = useSelector((state) =>
    getData(state.vendor, "TOTAL_EXPENSES")
  );
  const TIME_TRENDING_VIEW = useSelector((state) =>
    getData(state.vendor, "TIME_TRENDING_VIEW")
  );
  const VENDOR_ASSOCIATION = useSelector((state) =>
    getData(state.vendor, "VENDOR_ASSOCIATION")
  );
  const [VENDOR_HEADER_INFO] = useSelector((state) =>
    getData(state.vendor, "VENDOR_HEADER_INFO")
  );
  const mainTableConfig = useSelector((state) =>
    getData(state.vendor, "mainTableConfig")
  );


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
      fetchget_vendors_list({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#vendor_id}",
            columnValue: [selectedCostCenter.vendor_id],
          },
          {
            columnName: "{#year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#vendor_name}",
            columnValue: [selectedCostCenter.vendor_name],
          },
          {
            columnName: "{#org}",
            columnValue: [moreDetailsprop.agencyname],
          },
        ],
      })
    );
    dispatch(
      fetchget_vendor_tile_details({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#vendor_id}",
            columnValue: [selectedCostCenter.vendor_id],
          },
          {
            columnName: "{#year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#vendor_name}",
            columnValue: [selectedCostCenter.vendor_name],
          },
          {
            columnName: "{#org}",
            columnValue: [moreDetailsprop.agencyname],
          },
        ],
      })
    );
    dispatch(
      fetchget_vendor_table_details({
        elasticQueryName: "",
        filters: [],
        dynamicColumns: [
          {
            columnName: "{#vendor_id}",
            columnValue: [selectedCostCenter.vendor_id],
          },
          {
            columnName: "{#year}",
            columnValue: [selectedYear.FISCAL_YEAR],
          },
          {
            columnName: "{#vendor_name}",
            columnValue: [selectedCostCenter.vendor_name],
          },
          {
            columnName: "{#org}",
            columnValue: [moreDetailsprop.agencyname],
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
          <DataTable value={mainTableConfig?.PAYMENT_LIST} paginator rows={5}>
            <Column field="PAYMENT_MODE" header="Payment Mode" />
            <Column field="PAY_AMOUNT" header="Pay Amount" body={(rowData) => CurrencyTemplate(rowData, "PAY_AMOUNT")}/>
            <Column field="CHEQUE_NUMBER" header="Payment Number" />
            <Column field="CHEQUE_DATE" header="Payment Date" />
            <Column field="ACCOUNTING_DATE" header="Accounting Date" />
          </DataTable>
        )}
      </div>
    );
  };

  const dt = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    invoiceAmount: { value: "", matchMode: "contains" },
  });

  const onFilterInputChange = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      invoiceAmount: { value, matchMode: "contains" },
    });
  };

  const resetFilter = () => {
    setFilters({
      ...filters,
      invoiceAmount: { value: "", matchMode: "contains" },
    });
  };

  const invoiceAmountFilterTemplate = () => {
    return (
      <div className="p-2">
        <InputText
          value={filters.invoiceAmount.value}
          onChange={onFilterInputChange}
          placeholder="Search Invoice Amount"
        />
        <div className="mt-2 flex gap-2">
          <Button
            label="Search"
            icon="pi pi-search"
            onClick={() => dt.current.filter()}
            className="p-button-sm"
          />
          <Button
            label="Reset"
            icon="pi pi-times"
            onClick={resetFilter}
            className="p-button-secondary p-button-sm"
          />
        </div>
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
                VENDORS
              </div>
              <FaChevronRight size={12} color="#7c2f3e" />
              <div className="text-[#000] text-[14px] font-light">
                {VENDOR_HEADER_INFO?.vendor_name?.toUpperCase()}
              </div>
            </div>

            <div className="bann_cont mt-[10px] w-full bg-gradient-to-r from-[rgba(255,255,255,0.74)] to-[rgba(255,255,255,0.1)] bg-transparent !important p-[15px] rounded-[10px] ">
             <BarLoader loading={get_vendor_tile_detailsloading}>
              <div className="flex gap-3">
                <img
                  src="/images/Vendors_Icon.png"
                  className="w-[66px]"
                />
                <div>
                  {" "}
                  <div className="text-[#7c2f3e] text-[18px] font-bold">
                   {VENDOR_HEADER_INFO?.vendor_name}
                  </div>
                  <div className="text-[#444444] text-[13.5px] leading-[20px] mt-1 gap-5">
                  <i className="fa-solid fa-location-dot text-[#444444]-600 text-lg" />
                   <a className="font-normal"> {VENDOR_HEADER_INFO?.vendor_name}</a>
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
                    VENDORS
                  </div>
                  <div
                    style={{ display: "inline-block", position: "relative" }}
                  >
                    <Dropdown
                      value={selectedCostCenter}
                      optionLabel="vendor_name"
                      options={VENDOR_LIST}
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
                    <img src="/images/TOTAL_EXPENSES_icon.png" className="w-8" />
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                      TOTAL EXPENSES
                    </a>
                  </div>
                  <div className="gap-[10%]">
                    <BarLoader loading={get_vendor_tile_detailsloading} style={{ height: "15rem" }}>
                    <div className="text-center p-[4rem] ml-[6rem]">
                     
                      <div className="text-[24px] w-[60%] bg-white p-5 rounded-xl shadow-md border-l-8 border-l-[#A95030] text-[#5C4744] font-bold leading-6">
                        {TOTAL_EXPENSES?.expenses_label}
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
              

                <div className="cols-span-6 ml-[1rem]">
                  <div className="flex gap-3 items-center">
                    {/* <img src="/images/menupay.png" className="w-6" /> */}
                    <a
                      href=""
                      className="text-[18px] text-[#000000d9] font-bold"
                    >
                     TIME TRENDING CHART
                    </a>
                  </div>
                  <div id="chart-container" className="h-[280px] mt-[5px] relative">
                    <BarLoader loading={get_vendor_tile_detailsloading}>
                      {TIME_TRENDING_VIEW?.length == 0 ?
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                          No Data!
                        </div>
                        :
                        <PopupChart data={TIME_TRENDING_VIEW} />
                      }
                    </BarLoader>
                  </div>
                </div>
                {/* </div> */}
              </div>
              {/* </div> */}
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
                      infoTooltipTitle="Contract Details"
                      infoTooltipDescription="A nested report breaking down the key spending metrics in the selected Vendor starting at the Contract Number contributing to the spend and tracing them back through the associated purchase order all the way down to the payments associated with all the invoices tied to the Purchase orders"
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
                        "INVOICE_INVOICE_AMT": "Invoice Amount",
                        "INVOICE_INVOICE_NUMBER": "Invoice Number",
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
                          <BarLoader loading={get_vendor_tile_detailsloading}>
                          <DataTable
                            ref={dt}
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
                              field="INVOICE_INVOICE_NUMBER"
                              header="Invoice Number"
                              sortable
                              className="depart_name"
                              style={{ maxWidth: "15rem" }}
                              />
                            {/* <Column
                              field="vendorName"
                              header="Vendor Name"
                              sortable
                              style={{ maxWidth: "12rem" }}
                              /> */}
                            <Column
                              field="INVOICE_INVOICE_AMT"
                              header="Invoice Amount"
                              body={(rowData) =>
                                CurrencyTemplate(rowData, "INVOICE_INVOICE_AMT")
                              }
                              sortable
                              // filter
                              // filterElement={invoiceAmountFilterTemplate}
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

export default VendorsDetail;
