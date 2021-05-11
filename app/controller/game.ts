/*
 * @Author: your name
 * @Date: 2021-05-10 23:11:42
 * @LastEditTime: 2021-05-11 17:05:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/controller/game.ts
 */
import { Controller } from "egg";

export default class GameController extends Controller {
  /* 用户登陆接口 */
  public async login() {
    const { user_name, user_password } = this.ctx.request.body;
    const loginRes = await this.service.game.login({
      user_name: user_name,
      user_password: user_password,
    });
    this.ctx.body = {
      msg: "success",
      data: loginRes,
    };
  }

  /* 用户注册接口 */
  public async register() {
    const { user_name, user_password } = this.ctx.request.body;
    if (!user_name || !user_password) {
      this.ctx.body = {
        msg: "用户名或者密码不能为空",
        data: [],
      };
    }
    const registerRes = await this.service.game.register({
      user_name: user_name,
      user_password: user_password,
    });
    this.ctx.body = {
      msg: "success",
      data: registerRes,
    };
  }

  /* 用户更改密码接口 */
  public async resetPassword() {
    const { user_name, user_password } = this.ctx.request.body;
    if (!user_name || !user_password) {
      this.ctx.body = {
        msg: "用户名或者密码不能为空",
        data: [],
      };
    }
    const resetRes = await this.service.game.resetPassword({
      user_name: user_name,
      user_password: user_password,
    });
    this.ctx.body = {
      msg: "success",
      data: resetRes,
    };
  }

  /* 获取用户游戏排名列表 */
  public async gameRank() {
    const rankRes = await this.service.game.gameRank();
    this.ctx.body = {
      msg: "success",
      data: rankRes,
    };
  }

  /* 插入用户游戏记录数据 */
  public async insertGameRecord() {
    const {
      startTime,
      recordTime,
      timeUse,
      showTime,
      shadeDegree,
      formatDegree,
      userId,
    } = this.ctx.request.body;
    const insertRes = await this.service.game.insertGameRecord({
      start_time: startTime,
      record_time: recordTime,
      use_time: timeUse,
      show_time: showTime,
      user_id: userId,
      shade_degree: shadeDegree,
      degree: formatDegree,
    });
    this.ctx.body = {
      msg: "success",
      data: insertRes,
    };
  }

  /* 插入用户游戏记录数据 */
  public async insertRankData() {
    const { userId, startTime, timeUse, shadeDegree, formatDegree } =
      this.ctx.request.body;
    const insertRes = await this.service.game.insertRankData({
      user_id: userId,
      use_time: timeUse,
      start_time: startTime,
      shade_degree: shadeDegree,
      degree: formatDegree,
    });
    this.ctx.body = {
      msg: "success",
      data: insertRes,
    };
  }
}
