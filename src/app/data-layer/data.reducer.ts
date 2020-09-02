import { LibraryActions, ADD_SONG, REMOVE_SONG, UPDATE_SONG, LOAD_SONGS } from './actions';
import { Song } from '../library/library.interface';

export function reducer(state: object[], action: LibraryActions) {
  switch(action.type) {
    case ADD_SONG:
      return state.concat(action.payload);
    case UPDATE_SONG:
        state = state.map((song: Song) => {
          if (song.id === action.payload.id) {
            song = {...action.payload};
          }
          return song;
        });
      return state;
    case REMOVE_SONG:
      return state.filter((song: Song) => song.id !== action.payload);
    case LOAD_SONGS:
      return action.payload;
    default:
      return state;
  }
}