/*
 * @Author: your name
 * @Date: 2021-04-26 10:26:58
 * @LastEditTime: 2021-04-27 22:14:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/controller/collection.ts
 */
import { Controller } from "egg";

export default class CollectionController extends Controller {
  /* 创建歌集 */
  public async createCollection() {
    const {
      user_id,
      collection_name,
      collection_cover,
    } = this.ctx.request.body;
    const insertCollection = await this.service.collection.createCollection({
      collection_name: collection_name,
      collection_cover: collection_cover,
      user_id: user_id,
    });
    this.ctx.body = {
      msg: "success",
      data: insertCollection,
    };
  }

  /* 修改歌集名称 */
  public async modifyCollection() {
    const { collection_id, collection_name } = this.ctx.request.body;
    const modifyRes = await this.service.collection.modifyCollection({
      collection_id: collection_id,
      collection_name: collection_name,
    });
    this.ctx.body = {
      msg: "success",
      data: modifyRes,
    };
  }

  /* 根据创建者ID获取歌集信息 */
  public async findCollection() {
    const { user_id } = this.ctx.request.body;
    const findCollectionRes = await this.service.collection.findCollectionByUser(
      {
        user_id: user_id,
      }
    );
    this.ctx.body = {
      msg: "success",
      data: findCollectionRes,
    };
  }

  /* 根据用户信息获取其喜欢的歌集 */
  // public async getFavCollectionByUser() {
  //   const favCollections = await this.service.collection.getFavCollectionByUser(
  //     {
  //       user_id: "1",
  //     }
  //   );
  //   this.ctx.body = {
  //     msg: "success",
  //     data: favCollections,
  //   };
  // }

  /* 插入用户喜欢的歌集记录 */
  // public async insertFavCollection() {
  //   const insertRes = await this.service.collection.insertFavCollection({
  //     collection_id: 3779629,
  //     user_id: "2",
  //   });
  //   this.ctx.body = {
  //     msg: "success",
  //     data: insertRes,
  //   };
  // }

  /* 删除用户创建的歌集记录 */
  public async deleteCollection() {
    const { collection_id, user_id } = this.ctx.request.body;
    const deleteRes = await this.service.collection.deleteCollection({
      collection_id: collection_id,
      user_id: user_id,
    });
    this.ctx.body = {
      msg: "success",
      data: deleteRes,
    };
  }

  /* 更新歌集的喜欢次数 */
  public async updateCollectionLikeCount() {
    const updateRes = await this.service.collection.updateCollectionLikeCount({
      collection_id: 2147483647,
      collection_like_count: 1,
    });
    this.ctx.body = {
      msg: "success",
      data: updateRes,
    };
  }
}
