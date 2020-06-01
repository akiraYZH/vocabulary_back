
/**
 * 匹配日常参数,只包含大小写字母,数字,"_"
 * @param {*} target 
 */
const regNormal = (target) => {
    return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(target);
}

/**
 * 匹配日常参数,只包含大小写字母,数字,"_"
 * @param {*} target 
 */
const regText = (target) => {
    return /^[\u4E00-\u9FA5A-Za-z0-9_，,、.。-；：;:!\s]+$/.test(target);
}

/**
 * 匹配手机号码
 * @param {*} target 
 */
const regPhone = (target) => {
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(target);
}

/**
 * 匹配邮箱
 * @param {*} target 
 */
const regEmail = (target) => {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(target);
}

/**
 * 匹配数值类型
 * @param {*} target 
 */
const regNumber = (target) => {
    return /^\d+&/.test(target);
}

module.exports = { regNormal, regPhone, regEmail, regNumber, regText};