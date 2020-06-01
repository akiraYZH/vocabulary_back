const { regNormal, regPhone, regEmail, regNumber } = require('../utils/regModel');

const extraCheck = (targetVal, targetName) => {
    switch (targetName) {
        case "phone":
        case "tel":
            return regPhone(targetVal);
        case "mail":
        case "email":
            return regEmail(targetVal);
        default:
            return regNormal(targetVal);
    }
}

class _checkData {
    constructor(ctx, ...targetArr) {
        let dataObj = {}, is_pass = true;
        if (ctx.request.method === "POST") {
            dataObj = ctx.request.body;
        } else {
            dataObj = ctx.query;
        }
        targetArr = [].concat.apply([], targetArr);

        if (targetArr.length) {
            // 有指定检测的参数
            targetArr.forEach((val) => {
                if (!(dataObj[val] && extraCheck(dataObj[val], val))) {
                    is_pass = val;
                }
            })
        } else {
            // 没有指定参数,需要将全部参数进行检测
            for (let k in dataObj) {
                if ((!regNormal(dataObj[k]))) {
                    is_pass = k;
                }
            }
        }
        this.checkDataRes = typeof is_pass === "boolean" ? true : false;
        this.checkDataMsg = is_pass;
    }
}

module.exports = { _checkData };