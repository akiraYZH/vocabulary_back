
/**
 * a-z, A_Z, number, _
 * @param {*} target 
 */
const regNormal = (target) => {
    return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(target);
}

/**
 * Check text
 * @param {*} target 
 */
const regText = (target) => {
    return /^[\u4E00-\u9FA5A-Za-z0-9_，,、.。-；：;:!\s]+$/.test(target);
}

/**
 * Phone number
 * @param {*} target 
 */
const regPhone = (target) => {
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(target);
}

/**
 * E-mail
 * @param {*} target 
 */
const regEmail = (target) => {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(target);
}

/**
 * Number
 * @param {*} target 
 */
const regNumber = (target) => {
    return /^\d+&/.test(target);
}

module.exports = { regNormal, regPhone, regEmail, regNumber, regText};