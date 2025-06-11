import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from 'primereact/multiselect';
import Filterpopup from "./filterspopup";
import FilterpopupNoncontainer from "./filterspopupNoncontainer";
import { useDispatch, useSelector } from "react-redux";
import { formatString, pivotFilterArray, StringSorterCode } from "../utlis";
import { aggregateFiltersForQuery, changeFilters } from "../../redux/slices/filterSlice";
import { setState } from "../../redux/slices/globaleState";
import { Sidebar } from 'primereact/sidebar';
import SavedFilters from './SavedFilters'
import LoaderContainer from '../../components/LoaderContainer/index';
// import Image from 'next/image';
import { InputText } from 'primereact/inputtext';
import { fetchDashboard_Get_Save_Filter, fetchDashboard_Insert_Save_Filter } from "../../redux/slices/saveFilter";
export default function ShippingDashboardFilter(props) {
  const { views = false } = props;
  const dispatch = useDispatch();
  const { selectedYears, selectedFrequency, selectedCompany, selectedShippingLine, selectedCustomer, selectedCargo, selectedCommodity, selectedContainerType, selectedPOLCountry, selectedPODCountry } = useSelector((state) => state.filters.allFilters)
  const { appliedFilters, allFilters, filterTrigger, Filters, selectedYear, selectedFrequencies } = useSelector((state) => state.filters);
  const [showFilterpopup, setShowFilterpopup] = useState(false)
  // const [selectedView, setSelectedView] = useState({ label: 'Geo Spatial View', value: 'GeoSpatialView' });
  const [selectedView, setSelectedView] = useState('GeoSpatialView');
  const [selectedGeography, setSelectedGeography] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showAppliedFilters, setShowAppliedFilters] = useState(false);
  const [autoApply, setAutoApply] = useState(false);

  // const DarkMode = useSelector((state) => state.global.DarkMode);
  const [SaveyourFilter, setSaveyourFilter] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [openSavedFilterDrawer, setOpenSavedFilterDrawer] = useState(false);
  const [FilterhasSuccessfully, setFilterhasSuccessfully] = useState(false);
  const savedFilters = useSelector(state => state.saveFilter.Dashboard_Get_Save_Filter);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const Drilldown1 = useSelector((state) => state.global.Dimension1)
  const Drilldown2 = useSelector((state) => state.global.Dimension2)
  const Drilldown3 = useSelector((state) => state.global.Dimension3)
  const Drilldown4 = useSelector((state) => state.global.Dimension4)

  const applied = sessionStorage.getItem('isApplied') ;
  const data = sessionStorage.getItem('DimensionName');

  

  //local state management
  const [localPopupFilters, setLocalPopupFilters] = useState({
    Year: selectedYears || null,
    Frequency: selectedFrequency || null,
    Company: selectedCompany || null,
    POLCountry: selectedPOLCountry || null,
  })

  const [dropdownYear, setDropdownYear] = useState([{ name: 2024, code: 2024 }])

  const [localOptions, setLocalOptions] = useState({
    yearOptions: [],
    frequencyOptions: [],
    companyOptions: [],
    poLCountryOptions: [],
  })

  useEffect(() => {
    setLocalPopupFilters((prev) => ({
      ...prev,
      Year: selectedYears || null,
      Frequency: selectedFrequency || null,
      Company: selectedCompany || null,
      POLCountry: selectedPOLCountry || null,
    }))
  }, [selectedYears, selectedFrequency, selectedCompany, selectedPOLCountry])

  // frequency options
  const frequencyOptions = useCallback((year) => {
    return [
      { name: 'All', code: 'and 1=1' },
      {
        name: 'Month to Today', code: `and month_number=(select max(month_number) from "Al-sharif".sh_manifest_summary where cl_year= '${year?.code}') AND DAY_NUMBER<=(select extract(day from CURRENT_DATE))`
      },
      { name: 'Current Month', code: `and month_number=(select max(month_number) from "Al-sharif".sh_manifest_summary where cl_year= '${year?.code}')` },
      { name: 'Last Month', code: `and month_number=(select max(month_number)-1 from "Al-sharif".sh_manifest_summary where cl_year='${year?.code}')` },
      {
        name: 'Year To Date', code: `and month_number<=(select max(month_number) from "Al-sharif".sh_manifest_summary where cl_year='${year?.code}') AND DAY_NUMBER<=(select extract(day from CURRENT_DATE))`
      },
    ];
  }, [localPopupFilters?.Year])

  const yearsAndFrequency = [
    views ? ({
      columnName: 'Year',
      columnValue: dropdownYear?.map((item) => `${item?.code}`)
    }) : {
      columnName: 'Year',
      columnValue: localPopupFilters?.Year?.name
    },
    // {
    //   columnName: 'Frequency',
    //   columnValue: localPopupFilters?.Frequency?.name
    // }
  ]
  const allAppliedFilters = [...yearsAndFrequency, ...appliedFilters];
  useEffect(() => {
    setLocalOptions((prev) => ({
      ...prev,
      yearOptions: pivotFilterArray(Filters, 'CL_YEAR'),
      companyOptions: pivotFilterArray(Filters, 'COMPANY'),
      poLCountryOptions: pivotFilterArray(Filters, 'POL_COUNTRY'),
    }));

  }, [Filters])
  // const [selectedYear, setSelectedYear] = useState(null);
  const view = [
    { label: 'Geo Spatial View', value: 'GeoSpatialView' },
    { label: 'Trend Details', value: 'TrendDetails' },
  ];

  // const router = useRouter();
  const options = [
    { label: 'Order', value: 'order', route: '/business/order' },
    { label: 'Margin', value: 'margin', route: '/business/margin' },
    { label: 'Credit', value: 'credit', route: '/business/credit' },
    // Add more options as needed
  ];
  const [selectedOptions, setSelectedOptions] = useState(['order']);

  // const handleChange = (e) => {
  //   setSelectedOptions(e.value);
  //   if(e.value=='order'){
  //     props.setOrderModule(true);
  //     props.setMarginModule(false);
  //     props.setCreditModule(false);
  //   }
  //   else if(e.value=='margin'){
  //     props.setMarginModule(true);
  //       props.setOrderModule(false);
  //       props.setCreditModule(false);
  //   }
  //   else if(e.value=='credit'){
  //     props.setCreditModule(true);
  //       props.setOrderModule(false);
  //       props.setMarginModule(false);
  //   }

  // };

  // const handleDropdownChange = (e) => {
  //   // Call the onSectionChange function passed via props
  //   props.onSectionChange(e.value);
  //   setSelectedView(e.value)
  // };


  const Levels = [
    { id: 1, name: "BL Type", code: "BL_TYPE" },
    { id: 2, name: "Country", code: "COUNTRY" },
    // { id: 2, name: "POL Country", code: "POL_COUNTRY" },
    // { id: 3, name: "POL port", code: "POL" },
    { id: 3, name: "Lines", code: "LINE_NAME" },
    { id: 4, name: "Port", code: "PORT" },
    // { id: 4, name: "POL Port", code: "POL" },
    // { id: 5, name: "POD Country", code: "POD_COUNTRY" },
    // { id: 6, name: "POD Port", code: "POD" },
    { id: 5, name: "Cargo Type", code: "CARGO_TYPE" },
    { id: 6, name: "Customer Name", code: "CUSTOMER_NAME" },
    { id: 7, name: "Container Type", code: "CONTAINER_TYPE" },
    { id: 8, name: "Year", code: "CL_YEAR" },
  ]

  const pivotSavedFilterArray = (data, filterColumn) => {
    let filterArray = [];

    if (data?.[filterColumn] == '') {
      return filterArray;
    } else {
      const codeMap = Levels.reduce((acc, level) => {
        acc[level.code.toUpperCase()] = { id: level.id, name: level.name }; // map code to { id, name }
        return acc;
      }, {});

      data?.[filterColumn]?.split(',').map(item => {
        const normalizedItem = item.toUpperCase();
        let levelData = codeMap[normalizedItem] || {};

        let filterObj = {
          id: levelData.id || null,           // get id if available, else null
          name: levelData.name || item,        // get name if available, else original item
          code: normalizedItem
        };
        filterArray.push(filterObj);
      });

      return filterArray.filter((set => f => !set.has(f.name) && set.add(f.name))(new Set()));
    }
  }


  const ApplySavedFilter = (savedData) => {
    // console.log(savedData,'savedData123')
    console.log(pivotSavedFilterArray(savedData, 'DIMENSION1'), 'DIMENSION1')
    console.log(pivotSavedFilterArray(savedData, 'DIMENSION2'), 'DIMENSION2')

    dispatch(setState({ Dimension1: pivotSavedFilterArray(savedData, 'DIMENSION1') }))
    dispatch(setState({ Dimension2: pivotSavedFilterArray(savedData, 'DIMENSION2') }))
    dispatch(setState({ Dimension3: pivotSavedFilterArray(savedData, 'DIMENSION3') }))
    dispatch(setState({ Dimension4: pivotSavedFilterArray(savedData, 'DIMENSION4') }))
    setTimeout(() => {
      setAutoApply(!autoApply)
    }, 1000)
  }

  const setSavedFilters = (event) => {
    event.preventDefault();
    setSaveyourFilter(true)
    dispatch(setState({
      // DashboardSavedFilters: [
      //   { columnName: "#{PartnerName}", columnValue: [] },
      //   { columnName: "#{Metrics}", columnValue: [] },
      //   { columnName: "#{Dimension2}", columnValue: [] },

      //   { columnName: "#{Financialyear}", columnValue: selectedYear.map((item) => item.code) },
      //   { columnName: "#{Month}", columnValue: [] },
      //   { columnName: "#{Quarter}", columnValue: [] },
      //   { columnName: "#{SBU}", columnValue: selectedSBU.map((item) => item.code) },
      //   { columnName: "#{BU}", columnValue: selectedBU.map((item) => item.code) },
      //   { columnName: "#{Geodraphy}", columnValue: selectedGeography.map((item) => item.code) },
      //   { columnName: "#{Region}", columnValue: selectedRegion.map((item) => item.code) },
      //   { columnName: "#{Country}", columnValue: selectedCountry.map((item) => item.code) },
      //   { columnName: "#{GTM}", columnValue: selectedGTM.map((item) => item.code) },
      //   { columnName: "#{SubGTM}", columnValue: selectedSubGTM.map((item) => item.code) },
      //   { columnName: "#{Brand}", columnValue: selectedBrand.map((item) => item.code) },
      //   { columnName: "#{Product}", columnValue: selectedProduct.map((item) => item.code) },
      //   { columnName: "#{PartnerClassification}", columnValue: selectedClassification.map((item) => item.code) },
      //   { columnName: "#{Demo}", columnValue: selectedDemo.map((item) => item.code) },
      //   { columnName: "#{Exclude}", columnValue: selectedExclude.map((item) => item.code) },
      //   { columnName: "#{Stock}", columnValue: selectedStock.map((item) => item.code) },

      // ]
    }))
  }

  const applyFilters = () => {
    const localData = {
      selectedYears: localPopupFilters.Year,
      selectedFrequency: localPopupFilters.Frequency,
      selectedCompany: localPopupFilters.Company,
      selectedPOLCountry: localPopupFilters.POLCountry,

    }
    const queryData = {
      selectedCompany: { value: localPopupFilters.Company, column: 'COMPANY' },
      selectedPOLCountry: { value: localPopupFilters.POLCountry, column: 'POL_COUNTRY' },
    }
    dispatch(changeFilters(localData));

    if (views) {
      dispatch(setState({ drilldownYears: dropdownYear?.map((item) => item?.code) }))
    }
    dispatch(aggregateFiltersForQuery(queryData));
    dispatch(setState({ selectedYear: localPopupFilters.Year?.code }))
    dispatch(setState({ selectedFrequencies: localPopupFilters.Frequency?.code }))
    dispatch(setState({ filterTrigger: !filterTrigger }));
  }

  const clearFilters = () => {
    const localData = {
      selectedYears: { name: 2024, code: 2024 },
      selectedFrequency: null,
      selectedCompany: [],
      selectedPOLCountry: [],
    }
    setDropdownYear([{ name: 2024, code: 2024 }])
    dispatch(changeFilters(localData));
    dispatch(aggregateFiltersForQuery({}));
    dispatch(setState({ selectedYear: 2024 }))
    dispatch(setState({ drilldownYears: [2024] }))
    dispatch(setState({ selectedFrequencies: null }))
    dispatch(setState({ filterTrigger: !filterTrigger }));
  }

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const saveFilter = () => {
    setFilterhasSuccessfully(true)
    let filterId = randomNumberInRange(1, 10000000)
    let insert_array = [
      { columnName: "#{dimensionid}", columnValue: `${filterId}` },
      { columnName: "#{dimensionname}", columnValue: `${filterName}` },
      { columnName: "#{dimension1}", columnValue: `${Drilldown1?.[0]?.code}` },
      { columnName: "#{dimension2}", columnValue: `${Drilldown2?.[0]?.code}` },
      { columnName: "#{dimension3}", columnValue: `${Drilldown3?.[0]?.code}` },
      { columnName: "#{dimension4}", columnValue: `${Drilldown4?.[0]?.code}` },
    ]


    dispatch(fetchDashboard_Insert_Save_Filter(
      {
        "elasticQueryName": "",
        "filters": [],
        "dynamicColumns": insert_array,
        "pivotConfig": [],
      }
    ));

    setFilterName('')
  }


  const viewSavedFilters = () => {
    // const userEmailId = sessionStorage.getItem("userEmailId")
    dispatch(fetchDashboard_Get_Save_Filter(
      {
        "elasticQueryName": "",
        "filters": [],
        "dynamicColumns": [],
        "pivotConfig": [],
        // "userEmail": userEmailId
      }
    ));
  }

  return (
    <div className="sticky top-[68px] z-[3] 3xl:mt-[3.125vw] mb-[0px] 3xl:mb-[1.25vw] topFilter">
      <div className=" xl:top-[3.92vw] xl:mt-[-2.8vw] z-[2]">
        <div className="flex justify-between items-center">
          {props?.viewShow && (
            <div className="flex shadow rounded-r-[6px]">
              <a
                className={`${selectedView === "GeoSpatialView"
                  ? "bg-[#4F6484] text-[#fff] "
                  : "bg-[#F5F6F8] text-[#2C363F] "
                  } rounded-l-[6px] text-[14px] leading-[16px] px-4 py-3 cursor-pointer `}
                onClick={() => {
                  setSelectedView("GeoSpatialView");
                  props.onSectionChange("GeoSpatialView");
                }}
              >
                GeoSpatial View
              </a>
              <a
                className={`${selectedView === "TrendDetails"
                  ? "bg-[#4F6484] text-[#fff] "
                  : "bg-[#F5F6F8] text-[#2C363F] "
                  } rounded-r-[6px] text-[14px] leading-[16px] px-4 py-3 cursor-pointer `}
                onClick={() => {
                  setSelectedView("TrendDetails");
                  props.onSectionChange("TrendDetails");
                }}
              >
                Trend Details
              </a>
            </div>
          )}
          <div
            className={`w-[74.5%] min-h-[40px] bg-[#FFF] flex justify-between rounded-lg dark:bg-[#FFF] pl-3 xl:pr-0 pr-0 shadow-md ${props?.viewShow ? "w-[75%]" : "!w-full"
              }`}
          >
            <div className="flex flex-wrap justify-start items-center gap-1 py-2.5">
              <div className=" lg:w-auto w-full">
                <div className="flex flex-wrap gap-[4px] items-center">
                  {props?.viewShow && (
                    <>
                      {/* <div className="rounded py-[4px] xl:py-[4px] 3xl:py-[0.26vw] px-[12px] 3xl:px-[0.625vw] space-y-0 cursor-pointer overflow-hidden bg-[#FCF4F4] dark:bg-[#24262D]">
                        <span className="text-[#828A91] dark:text-[#B3B9C6] text-[10px] font-normal">
                          View
                        </span>
                        <div className="custDrop">
                          <Dropdown
                            value={selectedView}
                            // onChange={(e) => setSelectedView(e.value)}
                            onChange={handleDropdownChange}
                            options={view}
                            optionLabel="label"
                            placeholder="Geo Spatial View"
                            className="min-w-[150px]"
                            panelClassName="customdrop"
                          />
                        </div>
                      </div>

                      <div>
                        <Image src={"/images/icon.svg"} alt="icon" width={20} height={20} className="w-[20px] xl:w-[20px] 2xl:w-[22px] 3xl:w-[1.146vw] h-[20px] xl:h-[20px] 2xl:h-[22px] 3xl:h-[1.146vw] " />
                      </div> */}
                    </>
                  )}

                  {!views && (
                    <div className="custedit flex gap-2 items-center rounded py-[7px] xl:py-[7px] 3xl:py-[0.26vw] px-[10px] 3xl:px-[0.625vw] space-y-0 cursor-pointer max-w-[85px] hover:max-w-[105px] ease-in duration-300 overflow-hidden bg-[#F5F6F8] dark:bg-[#24262D]">
                      <span className="font-medium text-[#19212A] dark:text-[#B3B9C6] text-[12px]">
                        Year
                      </span>
                      <div className="custDrop leading-[14px]">
                        <Dropdown
                          value={localPopupFilters?.Year}
                          onChange={(e) => {
                            setLocalPopupFilters((prev) => ({
                              ...prev,
                              Year: e.value,
                            }));
                          }}
                          options={StringSorterCode(localOptions?.yearOptions)}
                          optionLabel="name"
                          placeholder="All"
                          className="min-w-[60px]"
                          panelClassName="customdrop"
                        />
                      </div>
                    </div>
                  )}
                  {views && (
                    <div className="custedit flex gap-2 items-center rounded py-[7px] xl:py-[7px] 3xl:py-[0.26vw] px-[10px] 3xl:px-[0.625vw] space-y-0 cursor-pointer max-w-[85px] hover:max-w-[105px] ease-in duration-300 overflow-hidden bg-[#F5F6F8] dark:bg-[#24262D]">
                      <span className="font-medium text-[#19212A] dark:text-[#B3B9C6] text-[12px]">
                        Years
                      </span>
                      <div className="custDrop leading-[14px]">
                        <MultiSelect
                          value={dropdownYear}
                          onChange={(e) => setDropdownYear(e.target.value)}
                          options={StringSorterCode(localOptions?.yearOptions)}
                          optionLabel="name"
                          placeholder="All"
                          filter
                          filterPlaceholder="Search"
                          className="min-w-[60px]"
                          panelClassName="customdrop"
                        />
                      </div>

                    </div>

                  )}
                  <div className={`${props?.viewShowFilter ? "hidden" : "!block"} font-bold text-[12px] text-[#19212A] bg-[#F5F6F8] custedit flex gap-2 items-center rounded py-[7px] xl:py-[7px] 3xl:py-[0.26vw] px-[10px]`}>
                    
                      <span className="ml-2">{applied ? data : "Country Analysis"}</span>
                    
                  </div>



                  {/* <div className={`${ props?.viewShowFilter ? 'block' : '!hidden'} custedit flex gap-2 items-center rounded py-[7px] xl:py-[7px] 3xl:py-[0.26vw] px-[10px] 3xl:px-[0.625vw] space-y-0 cursor-pointer max-w-[140px] hover:max-w-[165px] ease-in duration-300 overflow-hidden bg-[#F5F6F8] dark:bg-[#24262D]`}>
                    <span className="text-[#19212A] dark:text-[#B3B9C6] text-[12px] font-medium">
                      Frequency
                    </span>
                    <div className="custDrop leading-[14px]">
                      <Dropdown
                        value={localPopupFilters?.Frequency}
                        onChange={(e) => { setLocalPopupFilters((prev) => ({ ...prev, Frequency: e.value })) }}
                        options={frequencyOptions(localPopupFilters?.Year)}
                        optionLabel="name"
                        placeholder="All"
                        className="min-w-[85px]"
                        panelClassName="customdrop"
                      />
                    </div>
                  </div> */}
                  <div
                    className={`${props?.viewShowFilter ? "block" : "!hidden"
                      } custedit flex gap-2 items-center rounded py-[7px] xl:py-[7px] 3xl:py-[0.26vw] px-[10px] 3xl:px-[0.625vw] space-y-0 cursor-pointer max-w-[138px] hover:max-w-[165px] ease-in duration-300 overflow-hidden bg-[#F5F6F8] dark:bg-[#24262D]`}
                  >
                    <span className="text-[#19212A] dark:text-[#B3B9C6] text-[12px] font-medium ">
                      Company
                    </span>
                    <div className="custDrop leading-[14px]">
                      <MultiSelect
                        value={localPopupFilters?.Company}
                        onChange={(e) => {
                          setLocalPopupFilters((prev) => ({
                            ...prev,
                            Company: e.value,
                          }));
                        }}
                        options={localOptions?.companyOptions}
                        optionLabel="name"
                        filter
                        filterPlaceholder="Search"
                        placeholder="All"
                        className="min-w-[85px] custInput"
                        panelClassName="max-w-[250px] custom-multiselect-panel-new"
                      />
                    </div>
                  </div>
                  <div
                    className={`${props?.viewShowFilter ? "block" : "!hidden"
                      } custedit flex gap-2 items-center rounded py-[7px] xl:py-[7px] 3xl:py-[0.26vw] px-[10px] 3xl:px-[0.625vw] space-y-0 cursor-pointer max-w-[155px] hover:max-w-[180px] ease-in duration-300 overflow-hidden bg-[#F5F6F8] dark:bg-[#24262D]`}
                  >
                    <span className="text-[#19212A] dark:text-[#B3B9C6] text-[12px] font-medium whitespace-nowrap ">
                      POL Country
                    </span>
                    <div className="custDrop leading-[14px]">
                      <MultiSelect
                        value={localPopupFilters?.POLCountry}
                        onChange={(e) => {
                          setLocalPopupFilters((prev) => ({
                            ...prev,
                            POLCountry: e.value,
                          }));
                        }}
                        options={localOptions?.poLCountryOptions}
                        optionLabel="name"
                        filter
                        filterPlaceholder="Search"
                        placeholder="All"
                        className="min-w-[85px] custInput"
                        panelClassName="max-w-[250px] custom-multiselect-panel-new"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="text-[#828A91] text-[14px] font-normal px-[12px] ">
              <div >No filter applied yet</div>
            </div>
            <Link
              href=""
              className="text-[#19212A] text-[12px] font-medium border border-[#ECEFF3] rounded-[8px] xl:rounded-[0.417vw] px-2 py-1.5 flex items-center"
              title="Add"
            >
              Add <i className="al-add ml-1"></i>
            </Link> */}
            </div>
            <div className="flex xl:justify-end gap-2 xl:py-0  xl:w-auto">
              {/* <Link
                href=""
                className="p-2 xl:text-end text-center self-center xl:w-auto w-1/2 group"
                title="Applied Filters"
              > */}
              {/* <div className="flex justify-end">
                  <Image
                    src="/images/arrowright.png"
                    alt="Left Arrow"
                    width={14}
                    height={14}
                  />
                </div> */}
              {/* <div className="text-[#828A91] dark:text-[#B3B9C6]  text-[12px] font-normal leading-tight dark:text-[#B3B9C6]">
                  <div >
                    Applied <br /> Filters
                  </div>
                </div> */}
              <div className="items-center flex flex-row p-2 gap-1 ml-2">
                <div
                  onClick={setSavedFilters}
                  className={`text-[12px] bg-[#73292a] text-white px-2 py-1 rounded-full cursor-pointer ${props?.viewShow ? "hidden" : "!block"
                    }`}
                >
                  Save Filters
                </div>
                <div
                  onClick={() => { setOpenSavedFilterDrawer(true); viewSavedFilters() }}
                  className={`text-[12px] bg-gray-600 text-white px-2 py-1 rounded-full cursor-pointer ${props?.viewShow ? "hidden" : "!block"
                    }`}
                >
                  View Saved Filters
                </div>

                <div
                  onClick={() => applyFilters()}
                  className="text-[12px] bg-[#73292a] text-white px-2 py-1 rounded-full cursor-pointer"
                >
                  Apply Filters
                </div>
                <div
                  onClick={() => clearFilters()}
                  className="text-[12px] bg-gray-600 text-white px-2 py-1 rounded-full cursor-pointer"
                >
                  Clear Filters
                </div>
              </div>
              <div className="flex">
                <div
                  className={`bg-[#73292A] font-medium cursor-pointer select-none text-[12px] text-[#fff] px-2 pt-[8px] ${props?.viewShow ? "rounded-none" : "!rounded-r-lg"
                    }`}
                  onClick={() => setShowAppliedFilters((prev) => !prev)}
                >
                  <span className="text-[12px] w-full text-right text-[#fff]">
                    {showAppliedFilters ? "Hide" : "Show"}{" "}
                  </span>
                  <br />
                  Applied Filters
                </div>
                {/* </Link> */}
                <div
                  onClick={() => setShowFilterpopup(true)}
                  className={`xl:rounded-r-lg flex items-center  justify-center gap-2 px-[16px] bg-[#4F6484] xl:w-auto w-1/2 cursor-pointer ${props?.viewShow ? "block" : "!hidden"
                    }`}
                >
                  <img
                    src="/images/filter-search.png"
                    alt="Filter Search"
                    width={24}
                    height={24}
                  />
                  <span className="text-[#FFF] text-[12px] font-normal leading-tight">
                    <div>
                      All <br /> Filters
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAppliedFilters && (
          <div className="  w-full flex select-none">
            {props?.viewShow && <div className="w-1/4"></div>}
            <div className={`w-3/4 ${props?.viewShow ? "px-2" : "px-0"}  py-2`}>
              <div className=" flex gap-3">
                {allAppliedFilters?.map((item, index) => {
                  const { columnName, columnValue } = item;
                  return (
                    <div
                      key={index}
                      className="w-fit px-4 py-1 shadow-md bg-[#FFF] rounded-lg relative"
                    >
                      <div className=" text-[12px] font-semibold">
                        {formatString(columnName)}
                      </div>
                      <div className="font-normal text-[16px] allApplied">
                        {Array.isArray(columnValue) &&
                          columnValue?.length > 0 ? (
                          <div>
                            {[new Set(...columnValue)]
                              ?.map((value) => columnValue)
                              .join(",  ")}
                          </div>
                        ) : (
                          <div>{columnValue}</div>
                        )}
                      </div>
                      {/* <div className="absolute -top-1 -right-1  text-slate-700 cursor-pointer"><i className="pi pi-times-circle"></i></div> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {props?.noncontainer ? (
        <FilterpopupNoncontainer
          visible={showFilterpopup}
          onHide={() => setShowFilterpopup(false)}
        />
      ) : (
        <Filterpopup
          visible={showFilterpopup}
          onHide={() => setShowFilterpopup(false)}
        />
      )}

      <Sidebar
        visible={SaveyourFilter}
        position="right"
        onHide={() => setSaveyourFilter(false)}
        className="dashboard-sidebar p-0 m-0"
        style={{ padding: "0", width: "35vw", paddingLeft: "0", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
      >
        <div className=" flex flex-col justify-center items-center xl:px-[1.250vw] px-5">
          <div>
            {/* <Image src="/assets/images/successfully_saved.svg" alt="" width={661} height={495} /> */}
            {/* <img src="/images/successfully_saved.svg" alt="External" /> */}
          </div>
          <div className="text-[#101828] font-semibold text-2xl xl:text-[1.563vw] -tracking-[0.45px] mt-10 sidebar-text">
            Save your filter !!!
          </div>
          <div className="grow w-full mt-5 xl:mt-[2.083vw]">
            <div className="text-[#344054] text-sm font-medium mb-2 sidebar-text ">
              Enter name for your filter
            </div>
            <div className="">
              <InputText
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Type Here"
                className="w-full inputStyle"
              />
            </div>
          </div>

          <div className="grow w-full mt-6 xl:mt-[2.083vw]">
            <div className="flex items-center justify-center gap-3">
              <div
                className="text-[#344054] font-medium xl:text-[0.833vw] text-sm bg-[#FFFFFF] border border-[#C6CBD2] boxshadow1 rounded-lg py-2 xl:py-[0.521vw] px-3 xl:px-[0.938vw] cursor-pointer"
                onClick={() => setSaveyourFilter(false)}
              >
                Cancel
              </div>
              <div className="text-[#FFFFFF] font-medium xl:text-[0.833vw] text-sm bg-[#01813F] border border-[#01813F] boxshadow1 rounded-lg py-2 xl:py-[0.521vw] px-3 xl:px-[0.938vw] cursor-pointer" onClick={() => { saveFilter() }}>Save</div>

            </div>
          </div>
        </div>
      </Sidebar>

      <Sidebar visible={openSavedFilterDrawer} position="right" onHide={() => { setOpenSavedFilterDrawer(false); setFilterhasSuccessfully(false); setSaveyourFilter(false); }} className="dashboard-sidebar p-0 m-0" style={{ padding: 0, width: "35vw", paddingLeft: 0, borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>
        <div className="xl:py-[1.979vw] py-8 xl:px-[1.667vw] px-5 dash-header-bg absolute top-0 w-full rounded-tl-[10px] z-[999]">
          <div className="flex justify-between items-center">
            <div><h2 className="text-xl xl:text-[1.250vw] font-semibold text-white">Saved Filter</h2></div>
            <div>
              <Link href={''} className="text-[#344054] bg-[#FFFFFF] border border-[#C6CBD2] xl:py-[0.521vw] py-1 xl:px-[0.938vw] px-3 rounded-lg flex items-center space-x-2" onClick={() => { setOpenSavedFilterDrawer(false); setFilterhasSuccessfully(false); setSaveyourFilter(false); }}>
                <i className="pi pi-times-circle" />
                <span>Close</span>
              </Link>
            </div>
          </div>
        </div>
        <div className=" xl:p-[1.250vw] p-5 ">
          <div className="bg-[#F9FAFB] border border-[#E4E7EC] rounded xl:p-[1.042vw] p-4 savedFilter-container">
            <div className="text-[#101828] font-semibold text-sm xl:text-[0.833vw] -tracking-[0.32px] sidebar-text">
              Recent Saved Search
            </div>
            <div className="sidebar-content h-full py-2">
              {/* <Card
                className="custom-card"
                style={{
                  padding: 0,
                  background: "#F9FAFB",
                }}
              > */}
              <LoaderContainer loading={""}>
                <div className="flex flex-col w-full space-y-4">
                  {savedFilters?.length == 0 ? <div className='min-h-[100px] no-data-text' style={{ marginTop: "20%", marginLeft: "50%" }}>No Data</div>


                    : savedFilters?.map((item, index) => {
                      return (<SavedFilters index={index} data={item}
                        ApplySavedFilter={ApplySavedFilter}
                      />);
                    })}


                </div>

              </LoaderContainer>
              {/* </Card> */}
            </div>
          </div>
        </div>
      </Sidebar>

      <Sidebar visible={FilterhasSuccessfully} position="right" onHide={() => setFilterhasSuccessfully(false)} className="dashboard-sidebar p-0 m-0" style={{ padding: 0, width: "35vw", paddingLeft: 0, borderRadius: "10px" }}>

        <div className="flex flex-col justify-center items-center xl:px-[1.250vw] px-5">
          <div>
            {/* <img src="/assets/images/successfully_saved.svg" alt="" width={661} height={495} /> */}
          </div>
          <div className="text-[#101828] font-semibold text-2xl xl:text-[1.563vw] -tracking-[0.45px] mt-10 sidebar-text">Your filter has successfully saved !!!</div>
          <div className="grow w-full mt-6 xl:mt-[2.083vw]">
            <div className="flex items-center justify-center gap-3">
              <div className="text-[#344054] font-medium xl:text-[0.833vw] text-sm text-center bg-[#FFFFFF] border border-[#029046] boxshadow1 rounded-lg py-2 xl:py-[0.521vw] px-3 xl:px-[0.938vw] cursor-pointer w-full" onClick={() => { viewSavedFilters(); setOpenSavedFilterDrawer(true) }}>View Saved Filters</div>
              <div className="text-[#FFFFFF] font-medium xl:text-[0.833vw] text-sm text-center bg-[#01813F] border border-[#01813F] boxshadow1 rounded-lg py-2 xl:py-[0.521vw] px-3 xl:px-[0.938vw] cursor-pointer w-full" onClick={() => { setFilterhasSuccessfully(false); setSaveyourFilter(false); }}>Close</div>
            </div>
          </div>

        </div>
      </Sidebar>
    </div>
  );
}
