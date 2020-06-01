'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  let prefix = '/api';
  router.post(prefix+'/admin/login', controller.admin.login);
  router.post(prefix+'/admin/getUserInfo', controller.admin.getUserInfo);
  router.get(prefix+'/admin/getList', controller.admin.getList);
  router.post(prefix+'/admin/add', controller.admin.add);
  router.post(prefix+'/admin/update', controller.admin.update);
  router.post(prefix+'/admin/del', controller.admin.del);
  router.get(prefix+'/admin/checkAccount', controller.admin.checkAccount);


  router.post(prefix+'/user/register', controller.user.register);
  router.post(prefix+'/user/login', controller.user.login);
  router.get(prefix+'/user/getUserInfo', controller.user.getUserInfo);
  router.get(prefix+'/user/getList', controller.user.getList);
  router.get(prefix+'/user/checkAccount', controller.user.checkAccount);
  router.post(prefix+'/user/updatePassword', controller.user.updatePassword);
  router.post(prefix+'/user/del', controller.user.del);

  router.post(prefix+'/vocabulary/add', controller.vocabulary.add);

  router.get('/*', controller.notFound.notFound);
  router.post('/*', controller.notFound.notFound);
};
