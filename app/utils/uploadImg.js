var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
// var mkdir = require("./mkdir");
// var fs = require("fs");
// var formidable = require("formidable");
/*
* Upload img module
* req,request obj
* picName, upload name
* cb:callback
* return：
*   cb({
        status:1,//1、empty file  2 successful 3 wrong format
        params:params  //content
        newName: name of img。
        msg: discription
    })*/

function uploadImg(req, folder) {
  var form = new formidable.IncomingForm(); // Create upload form
  var uploadPath = path.join(__dirname, "../", "/public", "/" + folder);

  var loadPath =
    process.env.NODE_ENV == "development"
      ? "http://127.0.0.1:7001/public/" + folder
      : "http://francais-api.akirayu.space/public/" + folder;


  form.encoding = "utf-8"; //charset
  form.uploadDir = uploadPath; //upload path
  form.keepExtensions = true; //keep extension
  form.maxFieldsSize = 5 * 1024 * 1024; //img size

  //检测是否存在目录,不存在就创建
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  return new Promise((resolve, reject) => {
    form.parse(req, (err, params, file) => {
      if (file["file"].size <= 0) {
        fs.unlinkSync(file["file"].path);
        resolve({
          status: 0, //上传的是一个空文件
          params: params,
          msg: "请选择上传的图片",
        });
      } else {
        var num = file["file"].path.lastIndexOf(".");
        var extension = file["file"].path.substr(num).toLowerCase();
        // support types 
        var imgType = ".jpg.jpeg.png.gif";
        // Check if the file type is image format
        if (imgType.includes(extension)) {
          var newName = new Date().getTime() + extension;
          // rename
          fs.renameSync(file["file"].path, form.uploadDir + "/" + newName);
          resolve({
            status: 1, //upload success
            params: params,
            path: loadPath + "/" + newName,
            newName: newName,
            msg: "上传成功",
          });
        } else {
          fs.unlinkSync(file["file"].path);
          resolve({
            status: 0, //wrong format
            params: params,
            msg: `请上传${imgType}格式的图片`,
          });
        }
      }
    });
  });
}

function delImg(url, folder) {
  
  var delPath = path.join(__dirname, "../", "/public", "/" + folder);
  var filename = url.slice(url.lastIndexOf("/"));
  try{
    fs.unlinkSync(delPath + "/" + filename);
    return { code: 1, msg: "成功删除" };
  } catch(e) {
    return;
  }
}
module.exports = { uploadImg, delImg };
