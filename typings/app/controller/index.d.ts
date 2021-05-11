// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCollection from '../../../app/controller/collection';
import ExportGame from '../../../app/controller/game';
import ExportSong from '../../../app/controller/song';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    collection: ExportCollection;
    game: ExportGame;
    song: ExportSong;
    user: ExportUser;
  }
}
