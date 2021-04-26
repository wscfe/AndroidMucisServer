/*
 * @Author: wangshicheng
 * @Date: 2021-04-25 23:04:24
 * @LastEditTime: 2021-04-26 22:04:09
 * @LastEditors: Please set LastEditors
 * @Description: 用户基本信息
 * @FilePath: /musicServer/app/controller/user.ts
 */
import { Controller } from "egg";

export default class UserController extends Controller {
  /* 插入用户数据 */
  public async insertUser() {
    const { photo, email, name, id } = this.ctx.request.body;
    const findUsersRes = await this.ctx.service.user.findUser({ user_id: id });
    if (findUsersRes) {
      this.ctx.body = {
        msg: "success",
        res: findUsersRes,
      };
      return;
    }

    const insertUserRes = await this.ctx.service.user.insertUser({
      user_id: id,
      user_name: name,
      user_img: photo,
      user_email: email,
    });
    this.ctx.body = {
      msg: "success",
      data: insertUserRes,
    };
  }
}
