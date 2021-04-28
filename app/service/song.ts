/*
 * @Author: your name
 * @Date: 2021-04-26 11:06:04
 * @LastEditTime: 2021-04-28 11:43:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/service/song.ts
 */
import { Service } from "egg";

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

interface IHistorySong {
  id?: number;
  song_id?: number;
  user_id?: string;
}

export default class SongService extends Service {
  /* 根据歌集信息获取歌曲列表 */
  public async getSongByCollection(params: ISong) {
    const songs = await this.app.mysql.query(
      "SELECT * FROM SongCollection, Collection, User, Song WHERE SongCollection.collection_id = ? AND SongCollection.song_id = Song.song_id AND SongCollection.collection_id = Collection.collection_id AND User.user_id = Collection.user_id",
      [params.collection_id, params.collection_id]
    );
    return songs;
  }

  /* 根据用户信息获取喜欢的歌曲 */
  public async getFavSongsByUser(params: IFavSong) {
    const favSongs = await this.app.mysql.query(
      "SELECT * FROM FavSongs, Song WHERE FavSongs.user_id = ? AND  Song.song_id = FavSongs.song_id",
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
    const songPlayCount: number = (params.song_play_count || 0) + 1;
    const updateRes = await this.app.mysql.query(
      "UPDATE Song SET song_play_count = ? where song_id = ?",
      [songPlayCount, params.song_id]
    );
    return updateRes;
  }

  /* 获取播放次数最多的10首歌 */
  public async getMostPlaySongs() {
    const songs = await this.app.mysql.select("Song", {
      orders: [["song_play_count", "desc"]],
      limit: 10,
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

  /* 添加播放歌曲到历史记录中 */
  public async addSongToHistory(params: IHistorySong) {
    const addRes = await this.app.mysql.insert("HistorySongs", {
      user_id: params.user_id,
      song_id: params.song_id,
    });
    return addRes;
  }

  /* 获取当前用户的播放历史记录 */
  public async getSongFromHistoryByUser(params: IHistorySong) {
    const getRes = await this.app.mysql.query(
      "SELECT * FROM HistorySongs, Song WHERE HistorySongs.user_id = ? AND HistorySongs.song_id = Song.song_id",
      [params.user_id]
    );
    return getRes;
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
