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
    constructor(data, msg = "Success") {
        super(data, msg, 1);
    }
}

class _error extends checkDataModel {
    constructor(data, msg = "Error") {
        super(data, msg, 0);
    }
}

class _notFound extends checkDataModel {
    constructor(data, msg = "Wrong method or wrong api") {
        super(data, msg, 0);
    }
}

class _existed extends checkDataModel {
    constructor(data, msg = "Record exists already") {
        super(data, msg, 3);
    }
}

class _lack extends checkDataModel {
    constructor(data, msg) {
        data = data ? `param ${data} is wrong format or missing` : "missing necessary params.";
        super(data, msg, 2);
    }
}

class _notLogin extends checkDataModel {
    constructor(data, msg = "Please login") {
        super(data, msg, -1);
    }
}

class _notPermitted extends checkDataModel {
    constructor(data, msg = "No permission") {
        super(data, msg, -2);
    }
}

module.exports = { _success, _error, _notFound, _lack, _existed,_notLogin, _notPermitted};