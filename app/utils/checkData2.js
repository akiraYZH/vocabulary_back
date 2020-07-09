//是否是全部参数
//missing necessary:1
//wrong format:2
const {
  regNormal,
  regPhone,
  regEmail,
  regText,
  regNumber,
} = require("../utils/regModule");

const extraCheck = (targetName, targetVal) => {
  if (Array.isArray(targetVal)) {
    //如果传进来的是数组
    if(checkArrContentType(targetVal)){
      let aErrors = checkArr(targetVal);
    return aErrors.length ? { is_pass: false, errors: aErrors } : true;
    }else{
      return false;
    }
    
  } else {
    switch (targetName) {
      case "phone":
      case "tel":
        return regPhone(targetVal);
      case "description":
        return regText(targetVal);
      case "mail":
      case "email":
        return regEmail(targetVal);
      case "real_name":
      case "anwser":
      case "content":
        return regText(targetVal);
      case "blog_id":
        return regNumber(targetVal);
      // case "title":
      // case "content":
      // case "path":
      // case "url":
      // case "avatar_url":
      // case "url":
      // case "imgUrl":
      // case "main_img":
      // case "token":
      // case "spelling":
      // case "phonetic":
      // case "sentences":
      // case "type":
      // case "explainations":
      // case "explaination_cn":
      // case "sentence_fr":
      // case "sentence_cn":
      //   return true;
      default:
        // return regNormal(targetVal);
      return true;
    }
  }
};

const checkArr = function (arr) {
  let aErrors = [];
  arr.forEach((item, index) => {
    console.log(item);

    if (typeof item == "object") {
      for (key in item) {
        if (!extraCheck(key, item[key])) {
          aErrors.push(index);
        }
      }
    } else {
      if (!regNormal(item)) {
        //有错
        aErrors.push(index);
      }
    }
  });
  return aErrors;
};

function checkArrContentType(arr) {
  let isConsistent = true;
  let type = arr.length ? Object.prototype.toString.call(arr[0]) : "";
  for (val of arr) {
    if (Object.prototype.toString.call(val) != type) {
      isConsistent = false;
      break;
    }
  }
  return isConsistent;
}

//全部参数需要进行简单检测(必须填)
//指定某些参数需要进行特定检测(必须填)
const checkData = (ctx, ...targetArr) => {
  let dataObj = {};

  if (ctx.method === "POST"||ctx.method === "PUT") {
    dataObj = ctx.request.body;
  } else if (ctx.method === "GET"||ctx.method === "DELETE") {
    dataObj = ctx.query;
  }

  for (k of targetArr) {
    if (dataObj[k] == undefined || null) {
      // console.log(dataObj);
      return { is_pass: false, msg: `缺少必填参数${k}` };
    }
  }
  
  
  for (k in dataObj) {
    // console.log(k);
    let res = extraCheck(k, dataObj[k]);
    if (!res || res.is_pass == false) {
     
      
      if (typeof res == "boolean") {
        return { is_pass: false, msg: k };
      } else {
        return { is_pass: false, msg: `参数${k}-下标:${res.errors}格式错误` };
      }
    }
  }

  return { is_pass: true, msg: `格式正确` };
};

module.exports = checkData;
