import { useCallback, useMemo } from "react";
// import { capitalizeWords } from "./charts/doublelinechart2";

export function pivotFilterArray(data, filterColumn) {
    let filterArray = []
    Array.isArray(data) && data?.filter(res => res[filterColumn] != null)?.filter(res => res[filterColumn] != '').map(item => {
        let filterObj = {
            name: item[filterColumn],
            code: item[filterColumn],

        }
        filterArray.push(filterObj)
    });
    return filterArray.filter((set => f => !set.has(f.name) && set.add(f.name))(new Set))
}

export const pivotSavedFilterArray = (data, filterColumn) => {
  let filterArray = []
  if (data?.[filterColumn] == '') {
    return filterArray
  } else {
    data?.[filterColumn]?.split(',').map(item => {
      let filterObj = {
        name: item,
        code: item
      }
      filterArray.push(filterObj)

    });
    return filterArray.filter((set => f => !set.has(f.name) && set.add(f.name))(new Set))
  }
}

export function getCurrentDateTime() {
  const now = new Date();

  // Get current time
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Format time with AM or PM
  let amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  // Pad single digits with leading zeros
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Get current date
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  // Pad single digits with leading zeros
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  const currentDateTime = `${month}/${day}/${year}, ${hours}:${minutes} ${amOrPm}`;

  return currentDateTime;
}

export const StringSorter = (data) => {
  let result = data.sort((a, b) => {
    let nameA = a.name.toUpperCase(); // ignore upper and lowercase
    let nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return result
}

export const StringSorterCode = (data, order = "ascending") => {
    return data.sort((a, b) => {
      let nameA = a.code
      let nameB = b.code 
      if (order === "ascending") {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else if (order === "descending") {
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      }
    });
  }

  export const mergeData = (level1Data, level2Data,level3Data,level4Data) => {
 
    let data1 = JSON.parse(JSON.stringify(level1Data));
    let data2 = JSON.parse(JSON.stringify(level2Data));
    let data3 = JSON.parse(JSON.stringify(level3Data));
    let data4 = JSON.parse(JSON.stringify(level4Data));
    // let data5 = JSON.parse(JSON.stringify(level5Data));
    // let data6 = JSON.parse(JSON.stringify(level6Data));
    // let data7 = JSON.parse(JSON.stringify(level7Data));
   
    let mergedData = [];
   
    data1 && data1.map(item => { item.depth = 1; item["metricType"] = "number"; mergedData.push(item) })
    data2 && data2.map(item => { item.depth = 2; item["metricType"] = "number"; mergedData.push(item) })
    data3 && data3.map(item => { item.depth = 3; item["metricType"] = "number"; mergedData.push(item) })
    data4 && data4.map(item => { item.depth = 4; item["metricType"] = "number"; mergedData.push(item) })
    // data5 && data5.map(item => { item.depth = 5; item["metricType"] = "number"; mergedData.push(item) })
    // data6 && data6.map(item => { item.depth = 6; item["metricType"] = "number"; mergedData.push(item) })
    // data7 && data7.map(item => { item.depth = 7; item["metricType"] = "number"; mergedData.push(item) })
    return mergedData //? mergedData.filter(item =>  (this.state.selectedMetric.toUpperCase() === item.metric_name.toUpperCase()) && ((this.state.financialYear && this.state.financialYear.length === 0) ?  [2023].includes(item.Year):this.state.financialYear.includes(item.Year))) :[]
   
  }
   
   
   
  export const getSankeyData = (level1Data = [], level2Data = [],level3Data = [],level4Data = [], nestedFields = [], valueFields = [],shareFields=[]) => {
   
    // let { level1Data, level2Data, level3Data, level4Data, } = props;
    // debugger;
   
    let data1 = JSON.parse(JSON.stringify(level1Data));
    let data2 = JSON.parse(JSON.stringify(level2Data));
    let data3 = JSON.parse(JSON.stringify(level3Data));
    let data4 = JSON.parse(JSON.stringify(level4Data));
    // let data5 = JSON.parse(JSON.stringify(level5Data));
    // let data6 = JSON.parse(JSON.stringify(level6Data));
    // let data7 = JSON.parse(JSON.stringify(level7Data));
   
    const mergedData = mergeData(data1, data2,data3,data4)
    // console.log(mergedData,'mergedData')
   
    // var lastLevelData=level7Data||level6Data||level5Data||level4Data||level3Data||level2Data||level1Data||[]
    // if (data7.length > 0) {
    //   var lastLevelData = data7 || data6 || data5 || data4 || data3 || data2 || data1 || [];
    // } else if (data6.length > 0) {
    //   var lastLevelData = data6 || data5 || data4 || data3 || data2 || data1 || [];
    // } 
    // 
    //  if (data5.length > 0) {
    //   var lastLevelData = data5 || data4 || data3 || data2 || data1 || [];
    // } 
    
     if (data4.length > 0) {
      var lastLevelData = data4 || data3 || data2 || data1 || [];
    } else if (data3.length > 0) {
      var lastLevelData = data3 || data2 || data1 || [];
    } else if (data2.length > 0) {
      var lastLevelData =  data2 || data1 || [];
    } 
    else {
      var lastLevelData = data1 || [];
   
    }
    const getColor = (item) => {
      let color = "#F0AF0787"
      if (item["value"] > item["py_value"]) {
        color = "#03832F99"
      } else if (item["value"] < item["py_value"]) {
        color = "#F0074D87"
      }
      return color;
    }
   
    var finalObj = {}
    mergedData.map(item => {
      var depth = item.depth; var key = "", value = "", color = "", share = "";
      if (depth === 1) {
        key = item[nestedFields[depth - 1]];
        value = item["TOTAL_TEU"]
        share = item["ACTUALVALUE"]
      }
      else if (depth === 2) {
        key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]];
        value = item["TOTAL_TEU"]
        share = item["ACTUALVALUE"]
      } 
      else if (depth === 3) {
        key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]] + "_" + item[nestedFields[depth - 3]];
        value = item["TOTAL_TEU"]
        share = item["ACTUALVALUE"]
      }
      else if (depth === 4) {
        key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]] + "_" + item[nestedFields[depth - 3]] + "_" + item[nestedFields[depth - 4]];
        value = item["TOTAL_TEU"]
        share = item["TOTAL_TEU"]
      }
      // else if (depth === 5) {
      //   key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]] + "_" + item[nestedFields[depth - 3]] + "_" + item[nestedFields[depth - 4]] + "_" + item[nestedFields[depth - 5]];
      //   value = item["TOTAL_TEU"]
      //   share = item["TOTAL_TEU"]
      // }
      // else if (depth === 6) {
      //   key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]] + "_" + item[nestedFields[depth - 3]] + "_" + item[nestedFields[depth - 4]] + "_" + item[nestedFields[depth - 5]] + "_" + item[nestedFields[depth - 6]];
      //   value = item["VALUE"]
      //   share = item["TOTALVALUE"]
      // }
      // else if (depth === 7) {
      //   key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]] + "_" + item[nestedFields[depth - 3]] + "_" + item[nestedFields[depth - 4]] + "_" + item[nestedFields[depth - 5]] + "_" + item[nestedFields[depth - 6]] + "_" + item[nestedFields[depth - 7]];
      //   value = item["VALUE"]
      //   share = item["TOTALVALUE"]
      // }
      color = getColor(item)
      finalObj[key] = value
      finalObj[key + "_actual"] = share
      finalObj[key + "_color"] = color
    });
   
    // console.log(lastLevelData,'lastLevelData')

    lastLevelData.map(item => {
   
      item["metricType"] = "number"
      item["actual"] = finalObj[item[nestedFields[0]] + "_actual"]
      item[valueFields[0]] = finalObj[item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[0]]]) : 0
      item[valueFields[1]] = finalObj[item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
      item[valueFields[2]] = finalObj[item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
      item[valueFields[3]] = finalObj[item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
      // item[valueFields[4]] = finalObj[item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
      // item[valueFields[5]] = finalObj[item[nestedFields[5]] + "_" + item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[5]] + "_" + item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
      // item[valueFields[6]] = finalObj[item[nestedFields[6]] + "_" + item[nestedFields[5]] + "_" + item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[6]] + "_" + item[nestedFields[5]] + "_" + item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
   
      item["color_1"] = finalObj[item[nestedFields[0]] + "_color"]
      item["color_2"] = finalObj[item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
      item["color_3"] = finalObj[item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
      item["color_4"] = finalObj[item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
      // item["color_5"] = finalObj[item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
      // item["color_6"] = finalObj[item[nestedFields[5]] + "_" + item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
      // item["color_7"] = finalObj[item[nestedFields[6]] + "_" + item[nestedFields[5]] + "_" + item[nestedFields[4]] + "_" + item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
   
    });
   
    return lastLevelData;
   
  }

export const containerBreakupData = (data) => {
  const allContainerData = data?.reduce((acc, item) => {
    const { CONTAINER_TYPE } = item;
    if (!acc[CONTAINER_TYPE]) {
      acc[CONTAINER_TYPE] = [];
    }
    acc[CONTAINER_TYPE].push(item);
    return acc;
  }, {}) || {};
  return {
    cntr20: allContainerData?.CNTR_20 || [],
    cntr40: allContainerData?.CNTR_40 || []
  }
}

export const commodityDetails = (data, columnOne, columnTwo)=> {
  return data?.reduce((acc, item)=> {
    acc?.label?.push(item[columnOne]);
    acc?.values?.push(item[columnTwo]);
    return acc;
},{label:[], values:[]})
}

export const ImportVsExportData = (data, monthName, columnOne,columnTwo)=> {
  return data?.reduce((acc, item) => {
    acc?.month?.push(item?.[monthName])
    acc?.export?.push(item?.[columnOne] ?? 0)
    acc?.import?.push(item?.[columnTwo] ?? 0)
    return acc;
}, { month: [], export: [], import: [] })
}

export const lastSixData = (data, label, xAxis) => {
  return data?.reduce((acc, item) => {
    // acc?.label?.push(capitalizeWords(item?.[label]));
    acc?.label?.push(item?.[label]);
    acc?.xAxisData?.push(item?.[xAxis]);
    return acc
  }, { label: [], xAxisData: [] })
}

export const convertFormattedNumber = (value)=> {
  if(!isNaN(value)) return value?.toLocaleString({ undefined})
  else Number(value)
}

export function formatString(input) {
  return input
    ?.toLowerCase()
    ?.replace(/_/g, ' ')
    ?.replace(/\b\w/g, char => char.toUpperCase());
}

  
export function  toMillion(value)
{
    if(value<0){
        
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : "$"+-(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })+"M";
    }else{
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : "$"+(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })+"M";
    }
}  

export function  toMillionPay(value)
{
    if(value<0){
        
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+"("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })+")" + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+"("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })+")" + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+"("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })+")" + "M"
        : "$"+"("+(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })+")"+"M";
    }else{
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "M"
        : "$"+(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })+"M";
    }
}  

export function  toMillionRounded(value)
{
    if(value<0){
        
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+-(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + "M"
        : "$"+-(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 })+"M";
    }else{
        return Math.abs(Number(value)) >= 1.0e9
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + "M"
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? "$"+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + "M"
        : "$"+(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 0 })+"M";
    }
}  
export function  toMillionConversion(value)
    {
        return Math.abs(Number(value)) >= 1.0e9
        ? (Math.abs(Number(value)) / 1.0e9).toLocaleString('en-IN', { maximumFractionDigits: 2 })
        : // Six Zeroes for Millions
        Math.abs(Number(value)) >= 1.0e6
        ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
        : // Three Zeroes for Thousands
        Math.abs(Number(value)) >= 1.0e3
        ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
        : (Math.abs(Number(value))).toLocaleString('en-IN', { maximumFractionDigits: 2 });
    } 
    export function  toMillionWithNoDollar(value)
    {
        if(value<0){
          
            return Math.abs(Number(value)) >= 1.0e9
            ? "("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? "("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")"
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? "("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")"
                    :  "("+(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")";
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : (Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
        }
    }

    export function  toMillionWithNoDollarbracketremove(value)
    {
        if(value<0){
          
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) 
                    :  (Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) ;
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : (Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
        }
    }

    export function  toMillionWithNoDollarbracketremoveLedershiphuddle(value)
    {
        if(value<0){
          
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) 
                    :  (Math.abs(Number(value))/ 1.0e6).toFixed(2) ;
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2)
            : (Math.abs(Number(value))/ 1.0e6).toFixed(2)
        }
    }

    export function toMillionWithNoDollarbracketremovewithoutabs(value) {
        if (value < 0) {
            return Number(value) >= 1.0e9
                ? (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
                : // Six Zeroes for Millions
                Number(value) >= 1.0e6
                    ? (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
                    : // Three Zeroes for Thousands
                    Number(value) >= 1.0e3
                        ? (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) 
                        : (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 });
        } else {
            return Number(value) >= 1.0e9
                ? (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
                : // Six Zeroes for Millions
                Number(value) >= 1.0e6
                    ? (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
                    : // Three Zeroes for Thousands
                    Number(value) >= 1.0e3
                        ? (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
                        : (Number(value) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 });
        }
    }
    

    export function  toMillionWithNoDollarM(value)
    {
        if(value<0){
          
            return Math.abs(Number(value)) >= 1.0e9
            ? "("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")" + "MT"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? "("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")" + "MT"
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? "("+(Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")" + "MT"
                    :  "("+(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")" + "MT";
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "MT"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "MT"
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "MT"
            : (Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + "MT"
        }
    }

    export function  toMillionWithNoDollar1(value)
    {
        if(value<0){
          
            return Math.abs(Number(value)) >= 1.0e9
            ? "("+ (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
                ? "("+ (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")"
                : // Three Zeroes for Thousands
                Math.abs(Number(value)) >= 1.0e3
                    ? "("+ (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")"
                    :  "("+(Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ")";
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
            : (Math.abs(Number(value))/ 1.0e6).toLocaleString('en-IN', { maximumFractionDigits: 2 })
        }
    }
  export function toMillionWithNoDollarNumber(value) {
        if (value < 0) {

            return Math.abs(Number(value)) >= 1.0e9
                ? "(" + (Math.abs(Number(value)) / 1.0e6) + ")"
                : // Six Zeroes for Millions
                Math.abs(Number(value)) >= 1.0e6
                    ? "(" + (Math.abs(Number(value)) / 1.0e6) + ")"
                    : // Three Zeroes for Thousands
                    Math.abs(Number(value)) >= 1.0e3
                        ? "(" + (Math.abs(Number(value)) / 1.0e6) + ")"
                        : "(" + (Math.abs(Number(value)) / 1.0e6) + ")";
        } else {
            return Math.abs(Number(value)) >= 1.0e9
                ? (Math.abs(Number(value)) / 1.0e6)
                : // Six Zeroes for Millions
                Math.abs(Number(value)) >= 1.0e6
                    ? (Math.abs(Number(value)) / 1.0e6)
                    : // Three Zeroes for Thousands
                    Math.abs(Number(value)) >= 1.0e3
                        ? (Math.abs(Number(value)) / 1.0e6)
                        : (Math.abs(Number(value)) / 1.0e6)
        }
    }
export function toVariance(Current_value,Previous_value){
    let data = ((Current_value-Previous_value)/Previous_value)*100
    if(data != "Infinity" && !isNaN(data)){
        return data.toLocaleString('en-IN', { maximumFractionDigits: 2 }) + '%' 

    }else {
        return '-%'
    }
    
}

function renameJSONKeys_allcolumns(data, colmap) {
    return data.map(_data => {
        return Object.fromEntries(Object.entries(_data).map(([key, value]) => [colmap[key] ?? key, value]))
    })
}

function renameJSONKeys_specificcolumns(data, colmap) {
    return data.map(_data => {
        return Object.fromEntries(Object.entries(colmap).map(([key, sudoname]) => [sudoname, _data[key] ?? null]))
    })
}

export function renameJSONKeys(data, colmap, ignoreOtherColumns = true) {
  if (ignoreOtherColumns) {
    return renameJSONKeys_specificcolumns(data, colmap)
  }
  return renameJSONKeys_allcolumns(data, colmap)
}
