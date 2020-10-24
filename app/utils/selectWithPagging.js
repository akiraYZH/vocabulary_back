const selectWithPagging = async function (model, options) {
  let fixed = fixObj(options);
  fixed.distinct = true;

  let result = await model.findAndCountAll(fixed);
  let current = Number(options.offset) / Number(options.offset) + 1;

  let res = {
    pagging: {
      size: options.limit,
      current: current || 1,
      total: result.count,
    },
    data: result.rows,
  };
  return res;

  //总入口
  function fixObj(obj) {
    return fix(obj, obj);
  }

  //检查对象一层的属性
  function fix(obj, originalObj) {
    //去掉所有空的属性
    if (Object.keys(obj).length) {
      Object.keys(obj).forEach((attr) => {
        eleminate(obj, attr, originalObj);
      });
    }

    //处理Op的Symbol
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

  //检测属性，如果为空就删除属性，属性为对象就调用你fix()
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
};

module.exports = selectWithPagging;
