/*
 * @Author: your name
 * @Date: 2021-04-25 23:11:00
 * @LastEditTime: 2021-04-26 21:57:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/service/user.ts
 */
import { Service } from "egg";

interface IUser {
  user_id?: string;
  user_name?: string;
  user_img?: string;
  user_email?: string;
}

export default class UserService extends Service {
  /* 查找是否存在某个用户 */
  public async findUser(params: IUser) {
    const userData = await this.app.mysql.get("User", params);
    return userData;
  }

  /* 插入用户数据 */
  public async insertUser(params: IUser) {
    const userData = await this.app.mysql.insert("User", params);
    return userData;
  }
}
