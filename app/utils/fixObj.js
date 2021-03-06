//Get rid off the "null", "undefined" properties in an object
//Entry
const fixObj = function (obj) {
  return fix(obj, obj);
};

//Check obj first layer
function fix(obj, originalObj) {
  //get rid off all "null", "undefined" props
  if (Object.keys(obj).length) {
    Object.keys(obj).forEach((attr) => {
      eleminate(obj, attr, originalObj);
    });
  }

  //Deal with the Symbols
  if (Object.getOwnPropertySymbols(obj).length) {
    let isSuccess = false;
    for (
      let i = 0;
      i < Object.getOwnPropertySymbols(obj).length;
      isSuccess ? i : i++
    ) {
      isSuccess = eleminate(
        obj,
        Object.getOwnPropertySymbols(obj)[i],
        originalObj
      );

      if (i == Object.getOwnPropertySymbols(obj).length) {
        fix(originalObj, originalObj);
      }
    }
  }
  return obj;
}

//Check props, delete when props are "null" or "undefined", if the prop is an obj, call fix()
function eleminate(obj, attr, originalObj) {
  if (obj[attr] instanceof Object) {
    if (obj[attr] instanceof Array) {
      if (!obj[attr].length) {
        delete obj[attr];
      } else {
        obj[attr].forEach((item) => {
          if (item instanceof Object && !(item instanceof Array)) {
            console.log("ok");
            fix(item, originalObj);
          }
        });
      }
    } else {
      if (attr != "model") {
        if (
          Object.keys(obj[attr]).length == 0 &&
          !Object.getOwnPropertySymbols(obj[attr]).length
        ) {
          delete obj[attr];
          fix(originalObj, originalObj);
        } else {
          fix(obj[attr], originalObj);
        }
      }
    }
  } else {
    if (obj[attr] == undefined || obj[attr] == null || obj[attr] == "") {
      delete obj[attr];
      return true;
    } else if (typeof obj[attr] == "string") {
      if (
        obj[attr].indexOf("undefined") != -1 ||
        obj[attr].indexOf("null") != -1
      ) {
        delete obj[attr];
        fix(originalObj, originalObj);
      }
    }
  }
  return false;
}
module.exports = fixObj;
