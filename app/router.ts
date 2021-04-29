/*
 * @Author: your name
 * @Date: 2021-04-25 20:50:10
 * @LastEditTime: 2021-04-29 16:17:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/router.ts
 */
import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  /* 用户相关接口 */
  router.post("/user/insert", controller.user.insertUser);

  /* 歌集相关接口 */
  router.post("/collection/create", controller.collection.createCollection);
  router.post("/collection/modify", controller.collection.modifyCollection);
  router.post("/collection/get", controller.collection.findCollection);
  // router.get("/collection/fav", controller.collection.getFavCollectionByUser);
  router.get(
    "/collection/updateLikeCount",
    controller.collection.updateCollectionLikeCount
  );
  // router.get(
  //   "/collection/insertFav",
  //   controller.collection.insertFavCollection
  // );
  router.post("/collection/delete", controller.collection.deleteCollection);

  /* 歌曲相关接口 */
  router.post("/song/get", controller.song.getSongByCollection);
  router.post("/song/fav", controller.song.getFavSongByUser);
  router.post("/song/updatePlayCount", controller.song.updateSongPlayCount);
  router.post("/song/mostPlay", controller.song.getMostPlaySongs);
  router.post("/song/insertFav", controller.song.insertFavSong);
  router.post("/song/deleteFav", controller.song.deleteFavSong);
  router.post("/song/addToCollection", controller.song.addSongToCollection);
  router.get(
    "/song/deleteFromCollection",
    controller.song.deleteSongFromCollection
  );
  router.post("/song/addToHistory", controller.song.addSongToHistory);
  router.post("/song/getHistory", controller.song.getSongFromHistoryByUser);
  router.post("/song/keyWord", controller.song.getSongByKeyword);

  /* 初始化数据库中的音乐数据 */
  router.get("/song/addMusic", controller.song.addNewMusic);
};
