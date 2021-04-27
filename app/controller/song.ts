/*
 * @Author: your name
 * @Date: 2021-04-26 11:04:27
 * @LastEditTime: 2021-04-27 19:08:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/controller/song.ts
 */
import { Controller } from "egg";

export default class SongController extends Controller {
  /* 根据歌集信息获取歌曲列表 */
  public async getSongByCollection() {
    const songs = await this.service.song.getSongByCollection({
      collection_id: this.ctx.request.body.collectionId,
    });

    this.ctx.body = {
      msg: "success",
      data: songs,
    };
  }

  /* 根据用户信息获取喜欢的歌曲 */
  public async getFavSongByUser() {
    const favSongs = await this.service.song.getFavSongsByUser({
      user_id: "1",
    });
    this.ctx.body = {
      msg: "success",
      data: favSongs,
    };
  }

  /* 插入用户喜欢的歌 */
  public async insertFavSong() {
    const insertRes = await this.service.song.insertFavSong({
      song_id: 1807537867,
      user_id: "2",
    });
    this.ctx.body = {
      msg: "success",
      data: insertRes,
    };
  }

  /* 删除用户喜欢的歌 */
  public async deleteFavSong() {
    const deleteRes = await this.service.song.deleteFavSong({
      user_id: "2",
      song_id: 1807537867,
    });
    this.ctx.body = {
      msg: "success",
      data: deleteRes,
    };
  }

  /* 更新歌曲播放次数 */
  public async updateSongPlayCount() {
    const updateRes = await this.service.song.updateSongPlayCount({
      song_id: 1811921555,
      song_play_count: 3,
    });
    this.ctx.body = {
      msg: "success",
      data: updateRes,
    };
  }

  /* 获取播放次数最多的几首歌 */
  public async getMostPlaySongs() {
    const songs = await this.service.song.getMostPlaySongs();
    this.ctx.body = {
      msg: "success",
      data: songs,
    };
  }

  /* 添加歌曲至指定歌集中 */
  public async addSongToCollection() {
    const res = await this.service.song.addSongToCollection({
      collection_id: 0,
      song_id: 1811459887,
    });
    this.ctx.body = {
      msg: "success",
      data: res,
    };
  }

  /* 删除歌曲在指定歌集中 */
  public async deleteSongFromCollection() {
    const res = await this.service.song.deleteSongFromCollection({
      collection_id: 0,
      song_id: 1811459887,
    });
    this.ctx.body = {
      msg: "success",
      data: res,
    };
  }

  /* 获取音乐数据 */
  public async addNewMusic() {
    // 19723756 --- 飙升榜
    // 3779629 ---- 新歌榜
    // 3778678 --- 热歌榜
    // 2250011882 --- 抖音排行榜
    const res = await this.service.song.addNewMusic(2250011882);
    this.ctx.body = {
      msg: "success",
      data: res,
    };
  }
}
