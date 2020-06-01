const { _success, _error, _notFound, _lack, _notLogin } = require('../utils/resModel');
const _checkData = require('../utils/checkData2');
const {_getRedis, _setRedis} = require('../utils/redisModel');
const {addToken, decodeToken, updateToken, setToken} =require('../utils/Token');

module.exports = {
    _success, _error, _notFound, _lack, _notLogin, _checkData, _getRedis, _setRedis,addToken, decodeToken, updateToken, setToken
}