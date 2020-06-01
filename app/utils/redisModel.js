const redis = require('redis');

const redisClient = redis.createClient('6379', '127.0.0.1');

const _setRedis = (key, value) => {
    redisClient.set(key, JSON.stringify(value), (err) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
}

const _getRedis = (key) => {
    return new Promise((resolve) => {
        redisClient.get(key, (err, data) => {
            if (data) {
                resolve(JSON.parse(data));
            } else {
                resolve(false);
            }
        })
    })
}

module.exports = { _setRedis, _getRedis };