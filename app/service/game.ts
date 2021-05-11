/*
 * @Author: your name
 * @Date: 2021-05-10 23:13:41
 * @LastEditTime: 2021-05-11 18:05:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/service/game.ts
 */
import { Service } from "egg";
import { v4 as uuidv4 } from "uuid";
const ImgPlaceholder = require("random-image-placeholder");

interface IUser {
  user_name?: string;
  user_password?: string;
  user_img?: string;
  user_id?: number;
}

interface IRank {
  user_name?: string;
  user_id?: number;
  user_img?: string;
  use_time: number;
  start_time?: number;
  shade_degree?: any;
  degree?: number;
}

interface IGameRecord {
  user_id?: number;
  start_time?: number;
  record_time?: number;
  use_time?: number;
  show_time?: string;
  shade_degree?: any;
  degree?: number;
}

export default class GameService extends Service {
  /* 用户登陆 */
  public async login(params) {
    const { user_name, user_password } = params;
    const loginRes = await this.app.mysql.query(
      "SELECT * FROM GameUsers where user_name = ? and user_password = ?",
      [user_name, user_password]
    );
    return loginRes;
  }

  /* 用户注册 */
  public async register(params: IUser) {
    const { user_name, user_password } = params;

    // 新注册的用户的用命名不能重复
    const findUser = await this.app.mysql.query(
      "SELECT * FROM GameUsers where user_name = ?",
      [user_name]
    );
    if (findUser.length) {
      return findUser;
    }

    // 随机生成头像服务
    const imgGenerator = new ImgPlaceholder({
      width: 200,
    });
    const url = imgGenerator.generate();
    await this.app.mysql.insert("GameUsers", {
      user_id: uuidv4(),
      user_name: user_name,
      user_password: user_password,
      user_img: url,
    });
    const registerRes = await this.app.mysql.query(
      "SELECT * FROM GameUsers where user_name = ? and user_password = ?",
      [user_name, user_password]
    );
    return registerRes;
  }

  /* 用户更改密码接口 */
  public async resetPassword(params: IUser) {
    const { user_name, user_password } = params;
    const resetRes = await this.app.mysql.query(
      "UPDATE GameUsers SET user_password = ? where GameUsers.user_name = ?",
      [user_password, user_name]
    );
    return resetRes;
  }

  /* 获取用户游戏排名列表 */
  public async gameRank() {
    const rankRes: IRank[] = await this.app.mysql.query(
      "SELECT * FROM GameUsers, GameRanks where GameRanks.user_id = GameUsers.user_id order by use_time ASC",
      []
    );
    return rankRes;
  }

  /* 插入用户游戏记录数据 */
  public async insertGameRecord(params: IGameRecord) {
    const insertRes = await this.app.mysql.insert("GameRecords", params);
    return insertRes;
  }

  /* 插入用户游戏记录数据 */
  public async insertRankData(params: IRank) {
    const { user_id, use_time, start_time, shade_degree, degree } = params;

    /* 如果需要处理数据， 看看是插入操作还是更新操作*/
    const hasRanked = await this.app.mysql.query(
      "SELECT * FROM GameRanks where user_id = ?",
      [user_id]
    );
    console.log("hasRanked", hasRanked);
    let insertRes;
    if (hasRanked && hasRanked.length) {
      // 判断是不是超出个人游戏记录，是则更新，不是不更新
      if (hasRanked[0].use_time < use_time) {
        return [];
      }
      insertRes = await this.app.mysql.query(
        "UPDATE GameRanks SET use_time = ?, start_time = ?, shade_degree = ? where GameRanks.user_id = ? and GameRanks.degree = ?",
        [use_time, start_time, shade_degree, user_id, degree]
      );
    } else {
      insertRes = await this.app.mysql.insert("GameRanks", params);
    }
    return insertRes;
  }
}
