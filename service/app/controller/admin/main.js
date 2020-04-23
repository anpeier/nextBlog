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

  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert("article", tmpArticle);
    const insertSuccess = result.affectedRows == 1;
    const insertId = result.insertId;
    this.ctx.body = {
      insertSuccess,
      insertId,
    };
  }

  async updateArticle() {
    let tmpArticle = this.ctx.request.body;
    console.log(tmpArticle);
    const result = await this.app.mysql.update("article", tmpArticle);
    const updateSuccess = result.affectedRows == 1;
    this.ctx.body = {
      updateSuccess,
    };
  }

  async getArticleList() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "DATE_FORMAT(article.updateTime,'%Y-%m-%d %H:%i:%s') as updateTime," +
      "type.typeName as typeName," +
      "category.category_name as category," +
      "article.view_count as view_count " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "LEFT JOIN category ON article.category_id = category.id " +
      "ORDER BY article.id DESC";
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = MainController;
