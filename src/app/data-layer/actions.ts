import { Action } from '@ngrx/store'
import { Song } from '../library/library.interface';

//available events
export const ADD_SONG = 'ADD_SONG';
export const UPDATE_SONG = 'UPDATE_SONG';
export const REMOVE_SONG = 'REMOVE_SONG'
export const LOAD_SONGS = 'LOAD_SONGS'

export class AddSong implements Action {
  readonly type = ADD_SONG;
  constructor(public payload: any) {}
}

export class UpdateSong implements Action {
  readonly type = UPDATE_SONG;
  constructor(public payload: any) {}
}

export class RemoveSong implements Action {
  readonly type = REMOVE_SONG;
  constructor(public payload: any) {}
}

export class LoadSongs implements Action {
  readonly type = LOAD_SONGS;
  constructor(public payload: Song[]) {}
}

export type LibraryActions = AddSong | RemoveSong | UpdateSong | LoadSongs;
