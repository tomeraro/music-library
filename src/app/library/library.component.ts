import { Component, OnInit, OnDestroy } from '@angular/core';
import { Song } from './library.interface';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '../data-layer/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSongComponent } from './add-song/add-song.component';
import { AddSongDialogData } from './add-song/add-song.interface';
import { PlayerComponent } from './player/player.component';
import { DeleteSongComponent } from './delete-song/delete-song.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Genre } from './library.enum';

const LOADER_TIME = 2500;

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  public songs$: Observable<Song[]>;
  public updateSongs: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  public showLoader = false;
  public generes: Set<string> = new Set<string>([Genre.alternative, Genre["hip-hop"], Genre.pop, Genre.rap, Genre.rock]);
  public selectedGeners: Set<string> = new Set<string>();
  public subscription: Subscription;

  constructor(private dataService: DataService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.songs$ = this.updateSongs.asObservable();
    this.fetchSongs();
  }

  public fetchSongs(): void {
    this.showLoader = true;
    setTimeout(() => this.updateSongsByFilter(true), LOADER_TIME);
  }

  public addSong(): void {
    this.dialog.open(AddSongComponent, {
      width: '500px',    
      data: {
        mode: 'add',
      } as AddSongDialogData,
    });
  }

  public updateSong(id: number, song: Song): void {
    this.dialog.open(AddSongComponent, {
      width: '500px',    
      data: {
        id,
        mode: 'update',
        songToEdit: song,
      } as AddSongDialogData,
    });
  }

  public deleteSong(id: number): void {
    this.dialog.open(DeleteSongComponent, { data: id });
  }

  public playSong(url: string): void {
    this.dialog.open(PlayerComponent, { data: url });
  }

  public filterChange(event: MatCheckboxChange, genere: string): void {
    event.checked ? this.selectedGeners.add(genere) : this.selectedGeners.delete(genere);  
    this.updateSongsByFilter();
  }

  private updateSongsByFilter(showLoader = false): void {
    this.subscription = this.dataService.getAllSongs()
      .subscribe((songs: Song[]) => {
        if (this.selectedGeners.size === 0) {
          this.updateSongs.next(songs);
        } else {
          this.updateSongs.next(songs.filter(song => this.selectedGeners.has(song.genere)));
        }
        if (showLoader) {
          this.showLoader = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
