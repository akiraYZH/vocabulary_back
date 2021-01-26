// check if the parameters are properly passed
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
    //Array
    if (targetVal.length === 0) {
      return true;
    }
    if (checkArrContentType(targetVal)) {
      let aErrors = checkArr(targetVal);
      return aErrors.length ? { is_pass: false, errors: aErrors } : true;
    } else {
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
        //Error
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

//All params needs to be tested(Must)
//Test certain params(Must)
const checkData = (ctx, ...targetArr) => {
  let dataObj = {};

  if (ctx.method === "POST" || ctx.method === "PUT") {
    dataObj = ctx.request.body;
  } else if (ctx.method === "GET" || ctx.method === "DELETE") {
    dataObj = ctx.query;
  }

  for (k of targetArr) {
    if (dataObj[k] == undefined || null) {
      return { is_pass: false, msg: `Missing param ${k}` };
    }
  }

  for (k in dataObj) {
    let res = extraCheck(k, dataObj[k]);

    if (!res || res.is_pass === false) {
      if (typeof res == "boolean") {
        return { is_pass: false, msg: k };
      } else {
        return { is_pass: false, msg: `Param ${k}-index:${res.errors} wrong format` };
      }
    }
  }

  return { is_pass: true, msg: `Right format` };
};

module.exports = checkData;
