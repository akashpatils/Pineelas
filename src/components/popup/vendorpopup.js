import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactEcharts from "echarts-for-react";
import { Dialog } from "primereact/dialog";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Horizontalsinglebar4 from "../charts/horizontalbarsinglechart4";
import { Link } from "react-router-dom";
import { getData } from "../../redux/selector";
import { fetchdepartment_overlay_details } from "../../redux/slices/department";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ChartWrapper from "../chartwrappershipping";
import InfoTooltip from "../InfoTooltip";
import Verticalstackedbarchart from "../charts/verticalstackedbarchart";
import { fetchvendor_overlay_details } from "../../redux/slices/vendor";
import PopupChart from "../charts/Popupchart";
import BarLoader from "../BarLoader";

export default function VendorPopup(props) {
  const { vendorPopup, setVendorPopup } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [vendorYearTab, setVendorYearTab] = useState(0);
  const [cateYearTab, setCateYearTab] = useState(0);
  // const handleTabClick = (index) => {
  //   setActiveTab(index);
  // };

  const vendor_overlay_detailsloading = useSelector((state) => state.vendor.vendor_overlay_detailsloading)

  /* selector */
  //UI Components data
  // const department_overlay_detailsloading = useSelector((state) => state.department.department_overlay_detailsloading)
  // const DEPT_CURRENT_YEAR_TOP_CATEGORIES = useSelector((state) => getData(state.department, "DEPT_CURRENT_YEAR_TOP_CATEGORIES"))
  // const DEPT_CURRENT_YEAR_VENDORS = useSelector((state) => getData(state.department, "DEPT_CURRENT_YEAR_VENDORS"))
  // const DEPT_HEADER_INFO = useSelector((state) => getData(state.department, "DEPT_HEADER_INFO"))
  // const DEPT_PO_DETAILS = useSelector((state) => getData(state.department, "DEPT_PO_DETAILS"))
  // const DEPT_PREVIOUS_YEAR_TOP_CATEGORIES = useSelector((state) => getData(state.department, "DEPT_PREVIOUS_YEAR_TOP_CATEGORIES"))
  // const DEPT_PREVIOUS_YEAR_VENDORS = useSelector((state) => getData(state.department, "DEPT_PREVIOUS_YEAR_VENDORS"))
  // const DEPT_TIME_TRENDING = useSelector((state) => getData(state.department, "DEPT_TIME_TRENDING"))

  const VENDOR_TIME_TRENDING = useSelector((state) => getData(state.vendor, "VENDOR_TIME_TRENDING"))
  const [VENDOR_HEADER_INFO] = useSelector((state) => getData(state.vendor, "VENDOR_HEADER_INFO"))
  const VENDOR_CURRENT_YEAR_CONTRACT_DETAILS = useSelector((state) => getData(state.vendor, "VENDOR_CURRENT_YEAR_CONTRACT_DETAILS"))
  const VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS = useSelector((state) => getData(state.vendor, "VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS"))
  const VENDOR_CURRENT_YEAR_PO_DETAILS = useSelector((state) => getData(state.vendor, "VENDOR_CURRENT_YEAR_PO_DETAILS"))
  const VENDOR_PREVIOUS_YEAR_PO_DETAILS = useSelector((state) => getData(state.vendor, "VENDOR_PREVIOUS_YEAR_PO_DETAILS"))

  /* */


  /* */

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

  const vendorTrendChart = {
    
  }

  const vendorpoStackedChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'none' },
      formatter: params => {
        const po = params.find(p => p.seriesName === 'PO Amount');
        const spent = params.find(p => p.seriesName === 'Spent');
        return `
        PO Number: ${params[0].name}<br/>
        PO Amount: $${(po?.value || 0).toFixed(2)}K / 100%<br/>
        Spent: $${(spent?.value || 0).toFixed(2)}K / 100%
      `;
      }
    },
    legend: {
      bottom: 0,
      left: 80,
      data: ['PO Amount', 'Spent'],
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#000",
        fontSize: 12
      }
    },
    grid: {
      left: '5%',
      right: '10%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}K',
        color: '#000',
        fontSize: 12
      },
      interval: 20,
      axisLine: { show: true },
      axisTick: { show: true },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: '#eee'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: VENDOR_CURRENT_YEAR_PO_DETAILS?.map(item => item?.category),
      axisLabel: {
        color: '#000',
        fontSize: 12
      },
      axisLine: { show: true },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        name: 'PO Amount',
        type: 'bar',
        // barMinWidth: 30,
        // barMaxWidth: 40,
        barWidth: '40%',
        label: {
          show: true,
          position: 'right',
          color: '#333',
          fontWeight: 400,
          formatter: params => `$${params.value.toFixed(2)}K`
        },
        itemStyle: {
          color: '#d9d9d9'
        },
        data: VENDOR_CURRENT_YEAR_PO_DETAILS?.map(item => (item?.budget || 0) / 1000),
        z: 1
      },
      {
        name: 'Spent',
        type: 'bar',
        barWidth: '20%', // Make narrower than PO bar
        barGap: '-75%',
        itemStyle: {
          color: '#752e3c'
        },
        data: VENDOR_CURRENT_YEAR_PO_DETAILS?.map(item => (item?.spend_amount || 0) / 1000),
        z: 2
      }
    ]
  };

  const vendorpoStackedChart2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'none' },
      formatter: params => {
        const po = params.find(p => p.seriesName === 'PO Amount');
        const spent = params.find(p => p.seriesName === 'Spent');
        return `
        PO Number: ${params[0].name}<br/>
        PO Amount: $${(po?.value || 0).toFixed(2)}K / 100%<br/>
        Spent: $${(spent?.value || 0).toFixed(2)}K / 100%
      `;
      }
    },
    legend: {
      bottom: 0,
      left: 80,
      data: ['PO Amount', 'Spent'],
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#000",
        fontSize: 12
      }
    },
    grid: {
      left: '5%',
      right: '10%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}K',
        color: '#000',
        fontSize: 12
      },
      interval: 20,
      axisLine: { show: true },
      axisTick: { show: true },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: '#eee'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: VENDOR_PREVIOUS_YEAR_PO_DETAILS?.map(item => item?.category),
      axisLabel: {
        color: '#000',
        fontSize: 12
      },
      axisLine: { show: true },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        name: 'PO Amount',
        type: 'bar',
        // barMinWidth: 30,
        // barMaxWidth: 40,
        barWidth: '40%',
        label: {
          show: true,
          position: 'right',
          color: '#333',
          fontWeight: 400,
          formatter: params => `$${params.value.toFixed(2)}K`
        },
        itemStyle: {
          color: '#d9d9d9'
        },
        data: VENDOR_PREVIOUS_YEAR_PO_DETAILS?.map(item => (item?.budget || 0) / 1000),
        z: 1
      },
      {
        name: 'Spent',
        type: 'bar',
        barWidth: '20%', // Make narrower than PO bar
        barGap: '-75%',
        itemStyle: {
          color: '#752e3c'
        },
        data: VENDOR_PREVIOUS_YEAR_PO_DETAILS?.map(item => (item?.spend_amount || 0) / 1000),
        z: 2
      }
    ]
  };


  const moreDetailsprop = useMemo(() => {
    const { vendor_name, VENDOR_ID } = VENDOR_HEADER_INFO ?? {}
    return {
      agencyname: props.agencyname,
      activeyear: props.activeyear,
      vendor_name, VENDOR_ID
    }
  }, [props, VENDOR_HEADER_INFO])

  return (
    <>
      <Dialog
        visible={vendorPopup}
        className="departpopup"
        style={{ width: "90vw" }}
        onShow={props.dataAPI ?? null}
        onHide={() => setVendorPopup(false)}
      >
        <div>
          <div className="grid grid-cols-12 p-[20px] bg-[#d6d8da]">
            <BarLoader loading={vendor_overlay_detailsloading} style={{width: "70rem"}}>
            <div className="col-span-7">
              <div className="flex">
                <div className="px-[15px]">
                  <img src="/images/vendorOverviewHeader.png" className="w-[80px]" />
                </div>
                <div className="px-[15px]">
                  <div className="text-[18px] font-[700] text-[#222] mb-2">
                    {VENDOR_HEADER_INFO?.vendor_name}
                  </div>
                  <div className="text-[14px] font-[700] text-[#222] mb-2">
                    Vendor Head :
                    <span className="font-[400]"> {VENDOR_HEADER_INFO?.vendor_name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-between items-center w-[150px] mb-[15px]">
              <div className="text-[16px] font-[600] text-[#222]">
              </div>
              <div className="relative">
                <Link to="/vendors_details" state={{moreDetailsprop}}>
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
                        } rounded-[20px] text-[14px] fonr-[500] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
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
                        } rounded-[20px] text-[14px] fonr-[500] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 1 ? (
                          <img src="/images/poIconSelected.png" />
                        ) : (
                          <img src="/images/poIconUnselected.png" />
                        )}
                        PO DETAILS
                      </div>
                    </Tab>
                    <Tab>
                      <div
                        className={`${
                          activeTab === 2
                            ? "bg-[#7c2f3e] text-[#fff]"
                            : "bg-[#fff]"
                        } rounded-[20px] text-[14px] fonr-[500] text-[#b9814d] cursor-pointer flex items-center gap-[10px] w-[200px] h-[50px] justify-center`}
                      >
                        {activeTab === 2 ? (
                          <img src="/images/Contract_details_White.png" />
                        ) : (
                          <img src="/images/Contract_details.png" />
                        )}
                        CONTRACT DETAILS
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
                    {/* <ReactEcharts option={vendorTrendChart} style={{ width: '100%', height: '100%' }} /> 
                    */}
                    <ChartWrapper
                      ExportIcon={true}
                      PrintIcon={true}
                      MaxiIcon={false}
                      infoIcon={true}
                      title={""}
                      infoTooltipTitle="Time Trending Chart"
                      infoTooltipDescription="Visual representation of longitudinal trends tracking spend broken up by categories for the selected Vendor in in vertical stacked bar graph"
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
                      "vendor_name": "vendor_name",
                      "year": "year",
                      "category": "category",
                      "expenses": "expenses",
                      "expenses_label": "expenses_label",
                      }}
                      apidata={VENDOR_TIME_TRENDING}
                      data={
                        <div id="chart-container" className="h-[250px] relative">
                          <BarLoader loading={vendor_overlay_detailsloading}>
                            {VENDOR_TIME_TRENDING?.length == 0 ?
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No Data!
                              </div>
                              :
                              <PopupChart data={VENDOR_TIME_TRENDING} />
                            }
                          </BarLoader>
                        </div>
                    }
                    />
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[20px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Major Purchase Orders
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
                          infoTooltipTitle="Major Purchase Orders"
                          infoTooltipDescription="Major Purchase Orders contributing to the total spend along with associated budget for the selected Vendor for a rolling two fiscal years based on the initial selection"
                          formatDownloadedData=""
                          header="Major Purchase Orders"
                          dialogHeaderStyle={{
                            color: "#7C2F3E",
                            fontSize: "16px",
                          }}
                          formatFileName={""}
                          titleclassname="font-[600]"
                          infoTooltipComponent={InfoTooltip}
                          exportColumns={{
                            "budget_label": "budget_label",
                            "budgetpercentage": "budgetpercentage",
                            "category": "category",
                            "spend_amount_label": "spend_amount_label",
                            "spentpercentage": "spentpercentage",
                            "vendor_name": "vendor_name",
                            "vendor_number": "vendor_number",
                            "year": "year",
                          }}
                          apidata={VENDOR_CURRENT_YEAR_PO_DETAILS}
                          data={
                            <div className="h-[250px] relative">
                            {VENDOR_CURRENT_YEAR_PO_DETAILS?.length === 0 ? (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No data!
                              </div>
                            ) : (
                              <ReactEcharts
                                option={vendorpoStackedChart}
                                style={{ width: '100%', height: '100%' }}
                              />
                            )}
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
                          infoTooltipTitle="Major Purchase Orders"
                          infoTooltipDescription="Major Purchase Orders contributing to the total spend along with associated budget for the selected Vendor for a rolling two fiscal years based on the initial selection"
                          formatDownloadedData=""
                          header="Major Purchase Orders"
                          dialogHeaderStyle={{
                            color: "#7C2F3E",
                            fontSize: "16px",
                          }}
                          formatFileName={""}
                          titleclassname="font-[600]"
                          infoTooltipComponent={InfoTooltip}
                          exportColumns={{
                            "budget_label": "budget_label",
                            "budgetpercentage": "budgetpercentage",
                            "category": "category",
                            "spend_amount_label": "spend_amount_label",
                            "spentpercentage": "spentpercentage",
                            "vendor_name": "vendor_name",
                            "vendor_number": "vendor_number",
                            "year": "year",
                          }}
                          apidata={VENDOR_PREVIOUS_YEAR_PO_DETAILS}
                        data={
                          <div className="h-[250px] relative">
                            {VENDOR_PREVIOUS_YEAR_PO_DETAILS?.length === 0 ? (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No data!
                              </div>
                            ) : (
                              <ReactEcharts
                                option={vendorpoStackedChart2}
                                style={{ width: '100%', height: '100%' }}
                              />
                            )}
                          </div>
                        }
                      />
                      </TabPanel>
                  </Tabs>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-12 p-[15px] bg-[#00000008] rounded-[10px] mb-[20px]">
                    <div className="text-[15px] font-[700] text-[#444] col-span-4">
                      Major Contract Details
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
                        infoTooltipTitle="Major Contract Details"
                        infoTooltipDescription="Major Contracts based on the largest Business volume and the associated speding metrics presented in a bullet chart as a contrast to the total contract amount"
                        formatDownloadedData=""
                        header="Major Contract Details"
                        dialogHeaderStyle={{
                          color: "#7C2F3E",
                          fontSize: "16px",
                        }}
                        formatFileName={""}
                        titleclassname="font-[600]"
                        infoTooltipComponent={InfoTooltip}
                        exportColumns={{
                          "AMOUNT_BILLED": "AMOUNT_BILLED",
                          "AMOUNT_BILLED_LABEL": "AMOUNT_BILLED_LABEL",
                          "AMOUNT_BILLED_PERCENTAGE": "AMOUNT_BILLED_PERCENTAGE",
                          "CONTRACTPERCENTAGE": "CONTRACTPERCENTAGE",
                          "CONTRACT_AMOUNT": "CONTRACT_AMOUNT",
                          "CONTRACT_AMOUNT_LABEL": "CONTRACT_AMOUNT_LABEL",
                          "CONTRACT_NUMBER": "CONTRACT_NUMBER",
                          "ENCUMBERED_AMOUNT": "ENCUMBERED_AMOUNT",
                          "ENCUMBERED_LABEL": "ENCUMBERED_LABEL",
                          "ENCUMBERED_PERCENTAGE": "ENCUMBERED_PERCENTAGE",
                          "FISCAL_YEAR": "FISCAL_YEAR",
                          "vendor_id": "vendor_id",
                          "vendor_name": "vendor_name",
                        }}
                        apidata={VENDOR_CURRENT_YEAR_CONTRACT_DETAILS}
                        data={
                          <div id="chart-container" className="h-[150px] relative">
                            {VENDOR_CURRENT_YEAR_CONTRACT_DETAILS?.length === 0 ? (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No data!
                              </div>
                            ) : (
                              <Horizontalsinglebar4
                                data={VENDOR_CURRENT_YEAR_CONTRACT_DETAILS}
                                series1data={VENDOR_CURRENT_YEAR_CONTRACT_DETAILS.map(item => ({
                                  ...item,
                                  value: item?.CONTRACT_AMOUNT
                                }))}
                                series2data={VENDOR_CURRENT_YEAR_CONTRACT_DETAILS.map(item => item?.AMOUNT_BILLED)}
                                series3data={VENDOR_CURRENT_YEAR_CONTRACT_DETAILS.map(item => item?.ENCUMBERED_AMOUNT)}
                                yaxisdata={VENDOR_CURRENT_YEAR_CONTRACT_DETAILS.map(item => item?.CONTRACT_NUMBER)}
                                tooltip={{
                                  formatter: (params) => {
                                    const [param] = params;
                                    const { data: item } = param ?? {};
                                    return `
                                      Contract Amt : ${item?.CONTRACT_AMOUNT_LABEL || "-"} / ${item?.CONTRACTPERCENTAGE || 0}%<br/>
                                      Expense: ${item?.AMOUNT_BILLED_LABEL || "-"} / ${item?.AMOUNT_BILLED_PERCENTAGE?.toFixed(2) || 0}%<br/>
                                      Obligation: ${item?.ENCUMBERED_LABEL || "-"} / ${item?.ENCUMBERED_PERCENTAGE?.toFixed(2) || 0}%
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
                                  data: ["Contract Amt", "Actuals", "Obligation"],
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
                            )}
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
                        infoTooltipTitle="Major Contract Details"
                        infoTooltipDescription="Major Contracts based on the largest Business volume and the associated speding metrics presented in a bullet chart as a contrast to the total contract amount"
                        formatDownloadedData=""
                        header="Major Contract Details"
                        dialogHeaderStyle={{
                          color: "#7C2F3E",
                          fontSize: "16px",
                        }}
                        formatFileName={""}
                        titleclassname="font-[600]"
                        infoTooltipComponent={InfoTooltip}
                        exportColumns={{
                          "AMOUNT_BILLED": "AMOUNT_BILLED",
                          "AMOUNT_BILLED_LABEL": "AMOUNT_BILLED_LABEL",
                          "AMOUNT_BILLED_PERCENTAGE": "AMOUNT_BILLED_PERCENTAGE",
                          "CONTRACTPERCENTAGE": "CONTRACTPERCENTAGE",
                          "CONTRACT_AMOUNT": "CONTRACT_AMOUNT",
                          "CONTRACT_AMOUNT_LABEL": "CONTRACT_AMOUNT_LABEL",
                          "CONTRACT_NUMBER": "CONTRACT_NUMBER",
                          "ENCUMBERED_AMOUNT": "ENCUMBERED_AMOUNT",
                          "ENCUMBERED_LABEL": "ENCUMBERED_LABEL",
                          "ENCUMBERED_PERCENTAGE": "ENCUMBERED_PERCENTAGE",
                          "FISCAL_YEAR": "FISCAL_YEAR",
                          "vendor_id": "vendor_id",
                          "vendor_name": "vendor_name",
                        }}
                        apidata={VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS}
                        data={
                          <div id="chart-container" className="h-[150px] relative">
                            {VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS?.length === 0 ? (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                                No data!
                              </div>
                            ) : (
                              <Horizontalsinglebar4
                                data={VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS}
                                series1data={VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS.map(item => ({
                                  ...item,
                                  value: item?.CONTRACT_AMOUNT
                                }))}
                                series2data={VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS.map(item => item?.AMOUNT_BILLED)}
                                series3data={VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS.map(item => item?.ENCUMBERED_AMOUNT)}
                                yaxisdata={VENDOR_PREVIOUS_YEAR_CONTRACT_DETAILS.map(item => item?.CONTRACT_NUMBER)}
                                tooltip={{
                                  formatter: (params) => {
                                    const [param] = params;
                                    const { data: item } = param ?? {};
                                    return `
                                      Contract Amt : ${item?.CONTRACT_AMOUNT_LABEL || "-"} / ${item?.CONTRACTPERCENTAGE || 0}%<br/>
                                      Expense: ${item?.AMOUNT_BILLED_LABEL || "-"} / ${item?.AMOUNT_BILLED_PERCENTAGE?.toFixed(2) || 0}%<br/>
                                      Obligation: ${item?.ENCUMBERED_LABEL || "-"} / ${item?.ENCUMBERED_PERCENTAGE?.toFixed(2) || 0}%
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
                                  data: ["Contract Amt", "Actuals", "Obligation"],
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
                            )}
                          </div>
                        }
                      />
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
