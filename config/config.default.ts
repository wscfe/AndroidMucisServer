/*
 * @Author: wangshicheng
 * @Date: 2021-04-25 20:50:10
 * @LastEditTime: 2021-04-26 00:15:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/config/config.default.ts
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1619355003331_459";

  config.mysql = {
    client: {
      host: "121.5.149.163",
      port: "3306",
      user: "endl",
      password: "Cheng*8714",
      database: "musicdb",
    },
  };

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
