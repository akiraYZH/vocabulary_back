var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
// var mkdir = require("./mkdir");
// var fs = require("fs");
// var formidable = require("formidable");
/*
* 上传图片的模块
* req,请求对象
* picName,上传name名字
* cb:回调函数
* 返回结果：
*   cb({
        status:1,//1、上传的是一个空文件  2上传成功啦 3 上传格式错误
        params:params  //表单当中，除了上传文件之外的内容 。
        newName:图片的名字。
        msg:结果的文字说明
    })*/

function uploadImg(req, folder) {
  var form = new formidable.IncomingForm(); //创建上传表单
  var uploadPath = path.join(__dirname, "../", "/public", "/" + folder);

  var loadPath =
    process.env.NODE_ENV == "development"
      ? "http://127.0.0.1:7001/public/" + folder
      : "http://francais-api.akirayu.cn/public/" + folder;

  console.log(process.env.NODE_ENV);

  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = uploadPath; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 5 * 1024 * 1024; //文件大小

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
        //支持图片上传的格式。
        var imgType = ".jpg.jpeg.png.gif";
        //验证上传图片的类型是不是图片格式
        if (imgType.includes(extension)) {
          var newName = new Date().getTime() + extension;
          //改变名字（重命名），异步
          fs.renameSync(file["file"].path, form.uploadDir + "/" + newName);
          resolve({
            status: 1, //上传成功啦
            params: params,
            path: loadPath + "/" + newName,
            newName: newName,
            msg: "上传成功",
          });
        } else {
          fs.unlinkSync(file["file"].path);
          resolve({
            status: 0, //上传格式错误
            params: params,
            msg: `请上传${imgType}格式的图片`,
          });
          // return ()
        }
      }
    });
  });
}

function delImg(url, folder) {
  var delPath = path.join(__dirname, "../", "/public", "/" + folder);
  var filename = url.slice(url.lastIndexOf("/"));
  //   console.log(delPath + "/" + filename, 123);
  fs.unlinkSync(delPath + "/" + filename);
  return { code: 1, msg: "成功删除" };
}
module.exports = { uploadImg, delImg };
