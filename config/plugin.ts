/*
 * @Author: wangshicheng
 * @Date: 2021-04-25 20:50:10
 * @LastEditTime: 2021-04-25 23:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/config/plugin.ts
 */
import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
};

export default plugin;
