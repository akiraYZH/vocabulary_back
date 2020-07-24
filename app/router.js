'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
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
  router.post('/api/roles/add', controller.roles.add);
  router.get('/api/roles/get', controller.roles.get);
  router.put('/api/roles/update', controller.roles.update);
  router.delete('/api/roles/del', controller.roles.del);

  // 管理者模块
  router.post('/api/admins/add', controller.admins.add);
  router.get('/api/admins/get', controller.admins.get);
  router.put('/api/admins/update', controller.admins.update);
  router.delete('/api/admins/del', controller.admins.del);
  router.post('/api/admins/check-account', controller.admins.checkAccount);
  router.post('/api/admins/check-email', controller.admins.checkEmail);
  router.post('/api/admins/login', controller.admins.login);
  router.post('/api/admins/login-token', checkToken,controller.admins.loginToken);

  // 用户模块
  router.post('/api/users/add', controller.users.add);
  router.get('/api/users/get', controller.users.get);
  router.put('/api/users/update', controller.users.update);
  router.delete('/api/users/del', controller.users.del);
  router.post('/api/users/check-account', controller.users.checkAccount);
  router.post('/api/users/check-email', controller.users.checkEmail);
  router.post('/api/users/login', controller.users.login);

  // 单词书模块
  router.post('/api/books/add', controller.books.add);
  router.post('/api/books/add-words', controller.books.addWords);
  router.post('/api/books/remove-words', controller.books.removeWords);
  router.get('/api/books/get', controller.books.get);
  router.get('/api/books/get-words', controller.books.getWords);
  router.put('/api/books/update', controller.books.update);
  router.delete('/api/books/del', controller.books.del);

  // 词性模块
  router.post('/api/types/add', controller.types.add);
  router.get('/api/types/get', controller.types.get);
  router.put('/api/types/update', controller.types.update);
  router.delete('/api/types/del', controller.types.del);

  // 单词模块
  router.post('/api/words/add', controller.words.add);
  router.get('/api/words/get', controller.words.get);
  router.put('/api/words/update', controller.words.update);
  router.delete('/api/words/del', controller.words.del);

  // 捕获不匹配
  router.post('/*', controller.notFound.notFound);
  router.get('/*', controller.notFound.notFound);
  router.put('/*', controller.notFound.notFound);
  router.delete('/*', controller.notFound.notFound);


};
