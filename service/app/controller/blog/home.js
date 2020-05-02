"use strict";

const Controller = require("egg").Controller;
const { html2Escape, escape2Html } = require("./../../../utils/index");

class HomeController extends Controller {
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

  // 通过id获取文章
  async getArticleById() {
    let id = this.ctx.params.id;
    let addCountSql =
      "UPDATE article SET view_count = view_count+1 WHERE id=" + id;
    await this.app.mysql.query(addCountSql);
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as content," +
      "DATE_FORMAT(article.updateTime,'%Y-%m-%d %H:%i:%s') as updateTime," +
      "type.typeName as typeName," +
      "type.id as typeId," +
      "category.category_name as category," +
      "category.id as categoryId," +
      "article.view_count as view_count " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "LEFT JOIN category ON article.category_id = category.id " +
      "WHERE article.id=" +
      id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  async getTypeInfo() {
    // 获取分类
    const result = await this.app.mysql.select("type");
    this.ctx.body = { data: result };
  }

  // 根据类别ID获取文章列表
  async getListById() {
    let id = this.ctx.params.id;
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
      "WHERE article.type_id=" +
      id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async addComment() {
    let comment = this.ctx.request.body;
    comment.nickname = html2Escape(comment.nickname);
    comment.content = html2Escape(comment.content);
    let result = await this.app.mysql.insert("comment", comment);
    const insertSuccess = result.affectedRows == 1;
    this.ctx.body = {
      insertSuccess,
    };
  }

  async getComment() {
    let article_id = this.ctx.params.id;
    let sql =
      "SELECT * FROM comment WHERE article_id=" +
      article_id +
      " ORDER BY createTime ASC";
    let data = await this.app.mysql.query(sql);
    if (data.length) {
      for (const item of data) {
        item.nickname = escape2Html(item.nickname);
        item.content = escape2Html(item.content);
      }
    }
    this.ctx.body = {
      data
    }
  }
}

module.exports = HomeController;
