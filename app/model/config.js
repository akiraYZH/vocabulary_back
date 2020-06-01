// 是否同步数据库结构
let isSync = true;

module.exports = async (app) => {
  app.beforeStart(async () => {
    if (isSync) {
      // 自动同步models到数据库
      await app.model.sync({ 
        alter: true
        // force:true
      });
    }
  });
};
