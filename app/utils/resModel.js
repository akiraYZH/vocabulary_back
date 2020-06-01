class checkDataModel {
    constructor(data, msg, code) {
        if (typeof data === "string") {
            [data, msg] = [msg, data];
        }
        if (typeof data === "string" && typeof msg === "string") {
            data = undefined;
        }
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

class _success extends checkDataModel {
    constructor(data, msg = "成功操作") {
        super(data, msg, 1);
    }
}

class _error extends checkDataModel {
    constructor(data, msg = "操作错误") {
        super(data, msg, 0);
    }
}

class _notFound extends checkDataModel {
    constructor(data, msg = "请求方式不对或者接口地址不正确") {
        super(data, msg, -1);
    }
}

class _lack extends checkDataModel {
    constructor(data, msg) {
        data = data ? `参数${data}格式不对或者缺失` : "缺少必填参数";
        super(data, msg, -2);
    }
}

class _notLogin extends checkDataModel {
    constructor(data, msg = "请登录后再进行操作") {
        super(data, msg, -3);
    }
}

module.exports = { _success, _error, _notFound, _lack, _notLogin };