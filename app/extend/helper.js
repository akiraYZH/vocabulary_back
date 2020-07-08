const {
  _success,
  _error,
  _notFound,
  _lack,
  _existed,
  _notLogin,
  _notPermitted,
} = require("../utils/resModel");
const _checkData = require("../utils/checkData2");
const { _getRedis, _setRedis } = require("../utils/redisModel");
const {
  addToken,
  decodeToken,
  updateToken,
  setToken,
} = require("../utils/Token");
const selectWithPagging = require("../utils/selectWithPagging");

module.exports = {
  _success,
  _error,
  _notFound,
  _lack,
  _existed,
  _notLogin,
  _notPermitted,
  _checkData,
  _getRedis,
  _setRedis,
  addToken,
  decodeToken,
  updateToken,
  setToken,
  selectWithPagging
};
