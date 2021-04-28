/*
 * @Author: your name
 * @Date: 2021-04-26 10:29:58
 * @LastEditTime: 2021-04-28 10:43:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/service/collection.ts
 */
import { Service } from "egg";
import { v4 as uuidv4 } from "uuid";

interface ICollection {
  collection_id?: number;
  collection_name?: string;
  user_id?: string;
  collection_cover?: string;
  collection_like_count?: number;
}

// interface IFavCollections {
//   id?: number;
//   collection_id?: number;
//   user_id?: string;
// }

export default class CollectionService extends Service {
  /* 创建歌集 */
  public async createCollection(params: ICollection) {
    const insertRes = await this.app.mysql.insert("Collection", {
      collection_id: uuidv4(),
      collection_name: params.collection_name,
      collection_cover: params.collection_cover,
      collection_like_count: 0,
      user_id: params.user_id,
    });
    return insertRes;
  }

  /* 修改歌集名称 */
  public async modifyCollection(params: ICollection) {
    const modifyRes = await this.app.mysql.query(
      "UPDATE Collection SET collection_name = ? where collection_id = ?",
      [params.collection_name, params.collection_id]
    );
    return modifyRes;
  }

  /* 根据创建者ID获取歌集 */
  public async findCollectionByUser(params: ICollection) {
    const findCollections = await this.app.mysql.query(
      "SELECT * FROM Collection, User WHERE Collection.user_id = ? AND User.user_id = Collection.user_id",
      [params.user_id]
    );
    if (!findCollections.length) {
      await this.createCollection({
        collection_name: "Default",
        collection_cover:
          "http://p3.music.126.net/FM_0Ewfb-9Fp0Hm9TeMZAA==/18806046882899500.jpg?param=200y200",
        user_id: params.user_id,
      });
      const res = await this.app.mysql.query(
        "SELECT * FROM Collection, User WHERE Collection.user_id = ? AND User.user_id = Collection.user_id",
        [params.user_id]
      );
      return res;
    }
    return findCollections;
  }

  /* 根据用户信息获取喜欢的歌集 */
  // public async getFavCollectionByUser(params: IFavCollections) {
  //   const favCollections = await this.app.mysql.query(
  //     "SELECT * FROM `FavCollections` WHERE `user_id` = ?",
  //     [params.user_id]
  //   );
  //   return favCollections;
  // }

  /* 插入用户喜欢的歌集记录 */
  // public async insertFavCollection(params: IFavCollections) {
  //   const insertRes = await this.app.mysql.insert("FavCollections", {
  //     collection_id: params.collection_id,
  //     user_id: params.user_id,
  //   });
  //   return insertRes;
  // }

  /* 删除用户创建的歌集记录 */
  public async deleteCollection(params: ICollection) {
    const deleteRes = await this.app.mysql.delete("Collection", {
      collection_id: params.collection_id,
      user_id: params.user_id,
    });
    await this.app.mysql.delete("SongCollection", {
      collection_id: params.collection_id,
    });
    return deleteRes;
  }

  /* 更新歌集的喜欢次数 */
  public async updateCollectionLikeCount(params: ICollection) {
    const updateRes = await this.app.mysql.update("Collection", {
      collection_id: params.collection_id,
      collection_like_count: params.collection_like_count || 0,
    });
    return updateRes;
  }
}
