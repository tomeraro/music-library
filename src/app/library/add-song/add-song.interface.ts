import { Song } from '../library.interface';

export interface AddSongDialogData {
  mode: 'add' | 'update';
  id?: number;
  songToEdit?: Song;
}