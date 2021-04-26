/*
 * @Author: your name
 * @Date: 2021-04-25 20:50:10
 * @LastEditTime: 2021-04-26 16:15:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /musicServer/app/router.ts
 */
import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  /* 用户相关接口 */
  router.get("/user/insert", controller.user.insertUser);

  /* 歌集相关接口 */
  router.get("/collection/create", controller.collection.createCollection);
  router.get("/collection/modify", controller.collection.modifyCollection);
  router.get("/collection/get", controller.collection.findCollection);
  router.get("/collection/fav", controller.collection.getFavCollectionByUser);
  router.get(
    "/collection/updateLikeCount",
    controller.collection.updateCollectionLikeCount
  );
  router.get(
    "/collection/insertFav",
    controller.collection.insertFavCollection
  );
  router.get(
    "/collection/deleteFav",
    controller.collection.deleteFavCollection
  );

  /* 歌曲相关接口 */
  router.get("/song/get", controller.song.getSongByCollection);
  router.get("/song/fav", controller.song.getFavSongByUser);
  router.get("/song/updatePlayCount", controller.song.updateSongPlayCount);
  router.get("/song/mostPlay", controller.song.getMostPlaySongs);
  router.get("/song/insertFav", controller.song.insertFavSong);
  router.get("/song/deleteFav", controller.song.deleteFavSong);
  router.get("/song/addToCollection", controller.song.addSongToCollection);
  router.get(
    "/song/deleteFromCollection",
    controller.song.deleteSongFromCollection
  );

  /* 初始化数据库中的音乐数据 */
  router.get("/song/addMusic", controller.song.addNewMusic);
};
