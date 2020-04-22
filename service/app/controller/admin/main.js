"use strict";

const Controller = require("egg").Controller;
const utility = require("utility");

class MainController extends Controller {
  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = utility.md5(this.ctx.request.body.password);
    const sql =
      "SELECT userName FROM admin_user WHERE userName='" +
      userName +
      "' AND password='" +
      password +
      "'";
    const res = await this.app.mysql.query(sql);
    if (res.length) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId: openId };
      this.ctx.body = { data: "登陆成功", openId: openId };
    } else {
      this.ctx.body = { data: "登录失败" };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select("type");
    const resCategory = await this.app.mysql.select("category");
    this.ctx.body = {
      data: {
        resType,
        resCategory,
      },
    };
  }
}

module.exports = MainController;
