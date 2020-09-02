import { Injectable } from '@angular/core';
import { AppState, Song } from '../library/library.interface';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as LibraryActions from './actions';
import { map, first, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private store: Store<AppState>,
              private http: HttpClient) {}

  public getAllSongs(): Observable<Song[]> {
    return this.store.select('songs').pipe(
      switchMap((res: Song[]) => {
        if (!res) {
          return this.http.get('./assets/data.json').pipe(
            map((songs: Song[]) => {
              this.store.dispatch(new LibraryActions.LoadSongs(songs));
              return songs;
            })
          );
        }
        return of(res);
      })
    );
  }

  public saveNewSong(song: Song): Observable<boolean> {
    this.store.dispatch(new LibraryActions.AddSong(song));
    return of(true);
  }

  public saveExistingSong(song: Song): Observable<boolean> {
    this.store.dispatch(new LibraryActions.UpdateSong(song));
    return of(true);
  }

  public deleteSong(id: number): void {
    this.store.dispatch(new LibraryActions.RemoveSong(id));
  }

  public isSongNameValid(songName: string, currentSongId?: number): Observable<boolean> {
    return this.getAllSongs()
      .pipe(
        first(),
        map((songs: Song[]) => songs.find(song => song.name.toLowerCase() === songName.toLowerCase() && song.id !== currentSongId) === undefined)
      );
  }
}
