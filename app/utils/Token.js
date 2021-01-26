const jwt = require("jsonwebtoken");
const secret = "yzh_secret"; //secret

function addToken(data) {
  //create token and export
  const token = jwt.sign(data, secret, { expiresIn: "1h" });
  let _data = decodeToken("a " + token);
  console.log(_data);
  return token;
}

function decodeToken(tokens) {
  if (tokens) {
    let token = tokens.split(" ")[1];
    // 解析
    let decoded = jwt.decode(token, secret);

    return decoded;
  }
}

function updateToken(tokens) {
  let data = decodeToken(tokens);
  delete data.iat;
  delete data.exp;
  let newToken = addToken(data);
  return newToken;
}

function setToken(res, token) {
  res.setHeader("authentication", token);
}

module.exports = { addToken, decodeToken, updateToken, setToken };
