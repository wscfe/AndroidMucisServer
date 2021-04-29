/*
 * @Author: your name
 * @Date: 2021-04-26 11:04:27
 * @LastEditTime: 2021-04-29 19:13:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/controller/song.ts
 */
import { Controller } from "egg";

export default class SongController extends Controller {
  /* 根据歌集信息获取歌曲列表 */
  public async getSongByCollection() {
    const { collectionId, pageNumber } = this.ctx.request.body;
    const songs = await this.service.song.getSongByCollection({
      collection_id: collectionId,
      pageNumber: pageNumber,
    });

    this.ctx.body = {
      msg: "success",
      data: songs,
    };
  }

  /* 根据关键字获取歌曲信息 */
  public async getSongByKeyword() {
    const { keyWord } = this.ctx.request.body;
    const songs = await this.service.song.getSongByKeyword({
      keyWord: keyWord,
    });

    this.ctx.body = {
      msg: "success",
      data: songs,
    };
  }

  /* 根据用户信息获取喜欢的歌曲 */
  public async getFavSongByUser() {
    const { user_id } = this.ctx.request.body;
    const favSongs = await this.service.song.getFavSongsByUser({
      user_id: user_id,
    });
    this.ctx.body = {
      msg: "success",
      data: favSongs,
    };
  }

  /* 插入用户喜欢的歌 */
  public async insertFavSong() {
    const { song_id, user_id } = this.ctx.request.body;
    const insertRes = await this.service.song.insertFavSong({
      song_id: song_id,
      user_id: user_id,
    });
    this.ctx.body = {
      msg: "success",
      data: insertRes,
    };
  }

  /* 删除用户喜欢的歌 */
  public async deleteFavSong() {
    const { song_id, user_id } = this.ctx.request.body;
    const deleteRes = await this.service.song.deleteFavSong({
      song_id: song_id,
      user_id: user_id,
    });
    this.ctx.body = {
      msg: "success",
      data: deleteRes,
    };
  }

  /* 更新歌曲播放次数 */
  public async updateSongPlayCount() {
    const { song_id, song_play_count } = this.ctx.request.body;
    const updateRes = await this.service.song.updateSongPlayCount({
      song_id: song_id,
      song_play_count: song_play_count,
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
    const { collection_id, song_id } = this.ctx.request.body;
    const res = await this.service.song.addSongToCollection({
      collection_id: collection_id,
      song_id: song_id,
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

  /* 添加播放歌曲到历史记录中 */
  public async addSongToHistory() {
    const { user_id, song_id } = this.ctx.request.body;
    const addRes = await this.service.song.addSongToHistory({
      user_id: user_id,
      song_id: song_id,
    });
    this.ctx.body = {
      msg: "success",
      data: addRes,
    };
  }

  /* 获取当前用户的播放历史记录 */
  public async getSongFromHistoryByUser() {
    const { user_id, pageNumber } = this.ctx.request.body;
    const getRes = await this.service.song.getSongFromHistoryByUser({
      user_id: user_id,
      pageNumber: pageNumber,
    });
    this.ctx.body = {
      msg: "success",
      data: getRes,
    };
  }

  /* 获取音乐数据 */
  public async addNewMusic() {
    // 19723756 --- 飙升榜
    // 3779629 ---- 新歌榜
    // 3778678 --- 热歌榜
    // 2250011882 --- 抖音排行榜
    const res = await this.service.song.addNewMusic([
      19723756,
      3779629,
      3778678,
      2250011882,
      5453912201,
      991319590,
      71384707,
      1978921795,
      71385702,
      745956260,
      10520166,
      180106,
      60198,
      3812895,
      21845217,
      11641012,
      3001835560,
      3001795926,
      5059633707,
      5059642708,
      5059661515,
    ]);
    this.ctx.body = {
      msg: "success",
      data: res,
    };
  }
}
