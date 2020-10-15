"use strict";
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const checkToken = app.middleware.checkToken2();

  // 是否同步数据库结构
  const isSync = true;

  app.beforeStart(async () => {
    if (isSync) {
      // 自动同步models到数据库
      await app.model.sync({
        alter: true,
        // force:true
      });
    }
  });

  // 角色模块
  router.post("/api/roles/add", checkToken, controller.roles.add);
  router.get("/api/roles/get", checkToken, controller.roles.get);
  router.put("/api/roles/update", checkToken, controller.roles.update);
  router.delete("/api/roles/del", checkToken, controller.roles.del);

  // 管理者模块
  router.post("/api/admins/add", checkToken, controller.admins.add);
  router.get("/api/admins/get", checkToken, controller.admins.get);
  router.put("/api/admins/update", checkToken, controller.admins.update);
  router.delete("/api/admins/del", checkToken, controller.admins.del);
  router.post(
    "/api/admins/check-account",
    checkToken,
    controller.admins.checkAccount
  );
  router.post(
    "/api/admins/check-email",
    checkToken,
    controller.admins.checkEmail
  );
  router.post("/api/admins/login", controller.admins.login);
  router.post(
    "/api/admins/login-token",
    checkToken,
    controller.admins.loginToken
  );

  // 用户模块
  router.post("/api/users/add", controller.users.add);
  router.get("/api/users/get", checkToken, controller.users.get);
  router.put("/api/users/update", checkToken, controller.users.update);
  router.put("/api/users/change-pass", controller.users.changePass);
  router.delete("/api/users/del", checkToken, controller.users.del);
  router.post("/api/users/check-nickname", controller.users.checkNickname);
  router.post("/api/users/check-email", controller.users.checkEmail);
  router.post("/api/users/login", controller.users.login);

  //验证码
  router.get("/api/verify", controller.base.verify);
  router.get("/api/verify_code", controller.base.verify_code);
  router.get("/api/forget-verify", controller.base.forgetVerify);
  router.get("/api/forget-verify-confirm", controller.base.forgetVerifyConfirm);

  // 单词书模块
  router.post("/api/books/add", checkToken, controller.books.add);
  router.post(
    "/api/books/distribute-words",
    checkToken,
    controller.books.distributeWords
  );
  router.get("/api/books/get", checkToken, controller.books.get);
  router.get("/api/books/get-words", checkToken, controller.books.getWords);
  router.put("/api/books/update", checkToken, controller.books.update);
  router.delete("/api/books/del", checkToken, controller.books.del);

  // 词性模块
  router.post("/api/types/add", checkToken, controller.types.add);
  router.get("/api/types/get", checkToken, controller.types.get);
  router.put("/api/types/update", checkToken, controller.types.update);
  router.delete("/api/types/del", checkToken, controller.types.del);

  // 单词模块
  router.post("/api/words/add", checkToken, controller.words.add);
  router.post("/api/words/img", checkToken, controller.words.img);
  router.get("/api/words/get", checkToken, controller.words.get);
  router.put("/api/words/update", checkToken, controller.words.update);
  router.delete("/api/words/del", checkToken, controller.words.del);
  // 上传图片
  router.post("/api/words/upload-img", checkToken, controller.words.uploadImg);

  // 捕获不匹配
  router.post("/*", controller.notFound.notFound);
  router.get("/*", controller.notFound.notFound);
  router.put("/*", controller.notFound.notFound);
  router.delete("/*", controller.notFound.notFound);
};
