/*
 * @Author: your name
 * @Date: 2021-04-25 20:50:10
 * @LastEditTime: 2021-04-26 14:34:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/typings/index.d.ts
 */
import "egg";

declare module "egg" {
  interface mysql {
    get(tableName: String, find: {}): Promise<Any>;

    query(sql: String, values: Any[]): Promise<Any>;

    update(tableName: string, params: {}): Promise<Any>;

    insert(tableName, params: {}): Promise<Any>;

    select(tableName, params: {}): Promise<Any>;

    delete(tableName, params: {}): Promise<Any>;
  }
  interface Application {
    mysql: mysql;
  }
}
