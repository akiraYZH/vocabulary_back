"use strict";
const Service = require("egg").Service;

class CommonService extends Service {
  async get(db, param) {
    return await this.app.mysql.get(db, param);
  }
  // 查询全部
  async select(db, param = "", columns = "") {
    const condition = {};
    param && (condition.where = param);
    columns && (condition.columns = columns);
    try {
      return await this.app.mysql.select(db, condition);
    } catch (e) {
      return [];
    }
  }

  // 再升级版, 此版本为leftJoin版本，模糊搜索和精准搜索能同时存在
  // 查询带分页功能
  // param为对象类型, 为sql语句WHERE的条件,不传填''
  // colums为数组类型, 为需要查询的字段,,不传填''
  // is_search为布尔类型, 是否开启模糊查询
  async selectPagination({
    db,
    param = null,
    columns = [],
    search = null,
    joins = [],
  }) {
    const conditionArr = [];
    let condition = "";
    const searchArr = [];
    let conditionSearch = "";
    let sql = "";
    let page_now = 1;
    let num_in_page = 10;
    // 分页
    if (param.page_now || param.page_now !== undefined) {
      page_now = param.page_now;
      delete param.page_now;
    } else {
      delete param.page_now;
    }
    if (param.num_in_page || param.num_in_page !== undefined) {
      num_in_page = param.num_in_page;
      delete param.num_in_page;
    } else {
      delete param.num_in_page;
    }

    // 联表处理
    if (!joins.length) {
      // 没有联表

      if (columns.length) {
        sql = `SELECT ${columns.join(", ")} FROM ${db}`;
      } else {
        sql = `SELECT * from ${db}`;
      }
    } else {
      // 联表
      if (columns.length) {
        sql = `SELECT ${columns.join(", ")} FROM ${db} ${joins.join(" ")}`;
      } else {
        sql = `SELECT * FROM ${db} ${joins.join(" ")}`;
      }
    }
    // 加上WHERE
    sql += " WHERE 1=1";

    if (param) {
      Object.keys(param).forEach((key) => {
        if (param[key] != null && param[key] !== undefined) {
          conditionArr.push(`${key} = '${param[key]}'`);
        }
      });
      if (conditionArr.length) {
        condition = conditionArr.join(" AND ");
        sql += ` AND ${condition}`;
      }
    }

    if (search) {
      Object.keys(search).forEach((key) => {
        if (search[key] != null && search[key] !== undefined) {
          searchArr.push(`${key} LIKE '%${search[key]}%'`);
        }
      });
      if (searchArr.length) {
        conditionSearch = searchArr.join(" OR ");
        sql += ` AND (${conditionSearch})`;
      }
    }

    // if (joins.length && ons.length) {
    //   // 加联表条件
    //   sql += " AND " + ons.join(" AND ");
    // }
    const sqlCount = sql;

    sql += ` LIMIT ${(page_now - 1) * num_in_page},${num_in_page}`;

    try {
      const result = await this.app.mysql.query(sql);
      const count = await this.app.mysql
        .query(sqlCount)
        .then((res) => res.length);

      const page_total = Math.ceil(count / num_in_page);

      return {
        is_success: true,
        page_total,
        page_now,
        num_in_page,
        list: result,
      };
    } catch (e) {
      return { is_success: false };
    }
  }

  async update(db, param = null, condition = null) {
    try {
      return await this.app.mysql.update(db, param, { where: condition });
    } catch (e) {
      console.log(e);

      return {
        affectedRows: 0,
        msg: "请检查参数与参数格式",
      };
    }
  }

  // 多次插入
  async multiInsert(db, list) {
    const conn = await this.app.mysql.beginTransaction();

    let hasError = false;
    for (let i = 0; i < list.length; i++) {
      try {
        const res = await conn.insert(db, list[i]);
      } catch (e) {

        hasError = true;
        await conn.rollback();
        break;
      }
    }

    if (!hasError) {
      // commit才会确定修改
      await conn.commit();
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  // insert
  async insert(db, param = null) {

    try {
      return await this.app.mysql.insert(db, param);
    } catch (e) {
      console.log(e);

      let msg = "";
      switch (e.code) {
        case "ER_DUP_ENTRY":
          msg = "记录已存在";
          break;
        default:
          msg = "请检查参数与参数格式";
      }

      return {
        affectedRows: 0,
        msg,
      };
    }
  }
}

module.exports = CommonService;
