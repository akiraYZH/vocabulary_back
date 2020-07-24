const jwt = require('jsonwebtoken');
const secret = 'yzh_secret';  //密钥，不能丢

 function addToken(data){ //创建token并导出
  const token = jwt.sign(data, secret, {expiresIn: '1h'});
  return token;
};

function decodeToken(tokens){
    if (tokens){
        let token = tokens.split(' ')[1];
        // 解析
        let decoded = jwt.decode(token, secret);
        
        return decoded;
      }
}

function updateToken(tokens){
    console.log(tokens);
    
    let data=decodeToken(tokens);
    console.log(data);
    
    delete data.iat;
    delete data.exp;
    let newToken=addToken(data);
    return newToken;
}

function setToken(res, token){
  // ctx.append('token',token);
  res.setHeader('authentication',token);
}

module.exports ={addToken, decodeToken, updateToken, setToken};