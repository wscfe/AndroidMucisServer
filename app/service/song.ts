/*
 * @Author: your name
 * @Date: 2021-04-26 11:06:04
 * @LastEditTime: 2021-04-26 23:06:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/service/song.ts
 */
import { Service } from "egg";
import { v4 as uuidv4 } from "uuid";

interface ISong {
  id?: number;
  song_id?: number;
  song_title?: string;
  song_cover?: string;
  song_artist?: string;
  collection_id?: number;
  song_play_count?: number;
}

interface IFavSong {
  id?: number;
  song_id?: number;
  user_id?: string;
}

interface ISongCollection {
  id?: number;
  collection_id?: number;
  song_id?: number;
}

export default class SongService extends Service {
  /* 根据歌集信息获取歌曲列表 */
  public async getSongByCollection(params: ISong) {
    const songs = await this.app.mysql.query(
      "SELECT * FROM Song WHERE collection_id = ?",
      [params.collection_id]
    );

    return songs;
  }

  /* 根据用户信息获取喜欢的歌曲 */
  public async getFavSongsByUser(params: IFavSong) {
    const favSongs = await this.app.mysql.query(
      "SELECT * FROM FavSongs WHERE user_id = ?",
      [params.user_id]
    );
    return favSongs;
  }

  /* 插入用户喜欢的歌 */
  public async insertFavSong(params: IFavSong) {
    const insertRes = await this.app.mysql.insert("FavSongs", {
      song_id: params.song_id,
      user_id: params.user_id,
    });
    return insertRes;
  }

  /* 删除用户喜欢的歌 */
  public async deleteFavSong(params: IFavSong) {
    const deleteRes = await this.app.mysql.delete("FavSongs", {
      user_id: params.user_id,
      song_id: params.song_id,
    });
    return deleteRes;
  }

  /* 更新歌曲的播放次数 */
  public async updateSongPlayCount(params: ISong) {
    const updateRes = await this.app.mysql.update("Song", {
      song_id: params.song_id,
      song_play_count: params.song_play_count || 0,
    });
    return updateRes;
  }

  /* 获取播放次数最多的2首歌 */
  public async getMostPlaySongs() {
    const songs = await this.app.mysql.select("Song", {
      orders: [["song_play_count", "desc"]],
      limit: 2,
      offset: 0,
    });
    return songs;
  }

  /* 添加歌曲至指定歌集中 */
  public async addSongToCollection(params: ISongCollection) {
    const res = await this.app.mysql.insert("SongCollection", {
      collection_id: params.collection_id,
      song_id: params.song_id,
    });
    return res;
  }

  /* 删除歌曲在指定歌集中 */
  public async deleteSongFromCollection(params: ISongCollection) {
    const res = await this.app.mysql.delete("SongCollection", {
      collection_id: params.collection_id,
      song_id: params.song_id,
    });
    return res;
  }

  /* 获取音乐数据 */
  public async addNewMusic(collectionId: number) {
    // 19723756
    const musics = await this.ctx.curl(
      `https://music.163.com/api/playlist/detail?id=${collectionId}`,
      {
        dataType: "json",
      }
    );
    // const formatMusics = musics.data.result.tracks.map((song) => {
    //   return {
    //     song_id: song.id,
    //     song_title: song.name,
    //     song_cover: song.artists[0].picUrl,
    //     song_artist: song.artists[0].name,
    //     collection_id: collectionId,
    //     song_play_count: 0,
    //   };
    // });

    // const res = await this.app.mysql.insert("Song", formatMusics);
    const formatMusics = musics.data.result.tracks.map((song) => {
      return {
        song_id: song.id,
        collection_id: collectionId,
      };
    });

    const res = await this.app.mysql.insert("SongCollection", formatMusics);
    return res;
  }
}
