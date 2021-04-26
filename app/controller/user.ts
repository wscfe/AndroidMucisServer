/*
 * @Author: your name
 * @Date: 2021-04-25 23:04:24
 * @LastEditTime: 2021-04-26 10:23:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/controller/user.ts
 */
import { Controller } from "egg";

export default class UserController extends Controller {
  /* 插入用户数据 */
  public async insertUser() {
    const { ctx } = this;
    const {
      id = 3,
      user_name = "system_test",
      user_img = "https://lh3.googleusercontent.com/a-/AOh14GjzZfcf9ZVAS4sWodWCKfNZB1sQE9rji_XbUruT=s96-c",
      user_email = "3137252538@qq.com",
    } = ctx.query;
    const findUsersRes = await ctx.service.user.findUser({ id: Number(id) });
    if (findUsersRes) {
      ctx.body = {
        msg: "success",
        res: findUsersRes,
      };
      return;
    }

    const insertUserRes = await ctx.service.user.insertUser({
      id: Number(id),
      user_name,
      user_img,
      user_email,
    });
    ctx.body = {
      msg: "success",
      data: insertUserRes,
    };
  }
}
