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
        super(data, msg, 200);
    }
}

class _error extends checkDataModel {
    constructor(data, msg = "操作错误") {
        super(data, msg, 500);
    }
}

class _notFound extends checkDataModel {
    constructor(data, msg = "请求方式不对或者接口地址不正确") {
        super(data, msg, 404);
    }
}

class _existed extends checkDataModel {
    constructor(data, msg = "此记录已经存在") {
        super(data, msg, 400);
    }
}

class _lack extends checkDataModel {
    constructor(data, msg) {
        data = data ? `参数${data}格式不对或者缺失` : "缺少必填参数";
        super(data, msg, 400);
    }
}

class _notLogin extends checkDataModel {
    constructor(data, msg = "请登录后再进行操作") {
        super(data, msg, 401);
    }
}

class _notPermitted extends checkDataModel {
    constructor(data, msg = "没有权限") {
        super(data, msg, 403);
    }
}

module.exports = { _success, _error, _notFound, _lack, _existed,_notLogin, _notPermitted};