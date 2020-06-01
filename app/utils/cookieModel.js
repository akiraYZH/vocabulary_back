const _setCookie = (ctx, val, day = 1) => {
    ctx.res.setHeader('Set-Cookie', `${val};HttpOnly;path=/;Max-Age=${60 * 60 * 24 * day}`);
}

const _getCookie = (ctx, key) => {
    let cookieObj = {};
    if (Array.isArray(ctx.req.headers.cookie)) {
        ctx.req.headers.cookie.split(';').forEach(item => {
            const tempData = item.split('=');
            cookieObj[tempData[0].trim()] = tempData[1];
        });

        if (cookieObj[key]) {
            return cookieObj[key]
        } else {
            return false;
        }
    } else {
        return false;
    }
}
module.exports = { _setCookie, _getCookie };