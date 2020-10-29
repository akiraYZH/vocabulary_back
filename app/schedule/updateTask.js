module.exports = {
  schedule: {
    cron: "0 0 0 * * *",
    type: "all",
  },
  async task(ctx) {
    ctx.service.users.updateTask();
  },
};
