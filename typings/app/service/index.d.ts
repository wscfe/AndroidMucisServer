// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCollection from '../../../app/service/collection';
import ExportSong from '../../../app/service/song';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    collection: AutoInstanceType<typeof ExportCollection>;
    song: AutoInstanceType<typeof ExportSong>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
