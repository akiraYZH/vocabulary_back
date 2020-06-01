const crypto = require('crypto');

const SECRET_KEY = 'Xk*"^Zld%/4x3#0:';

class baseModel {
    constructor() {
        this.md5 = crypto.createHash('md5');
    }
}

class getPassword extends baseModel {
    constructor(password) {
        super();
        this.password = this.md5.update(`password=${password}&key=${SECRET_KEY}`).digest('hex');
    }
}

module.exports = {
    _pwd: getPassword
}