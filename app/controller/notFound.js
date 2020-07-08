'use strict';

const Controller = require('egg').Controller;

class NotFoundController extends Controller {
  async notFound() {
    const { ctx } = this;
    ctx.status=404;
    ctx.body = new ctx.helper._notFound();
  }
}

module.exports = NotFoundController;
