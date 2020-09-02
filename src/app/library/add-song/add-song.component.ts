import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddSongDialogData } from './add-song.interface';
import { DataService } from 'src/app/data-layer/data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  public songForm: FormGroup;
  public genereOptions = ['pop', 'rap', 'rock', 'alternative', 'hip-hop'];
  public error = '';

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: AddSongDialogData,
              public dialogRef: MatDialogRef<AddSongComponent>,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.songForm = new FormGroup({
      name: new FormControl(this.dialogData.mode === 'update' ? this.dialogData.songToEdit.name : ''),
      artist: new FormControl(this.dialogData.mode === 'update' ? this.dialogData.songToEdit.artist : ''),
      genere: new FormControl(this.dialogData.mode === 'update' ? this.dialogData.songToEdit.genere : ''),
      coverUrl: new FormControl(this.dialogData.mode === 'update' ? this.dialogData.songToEdit.coverUrl : ''),
      releaseDate: new FormControl(this.dialogData.mode === 'update' ? this.dialogData.songToEdit.releaseDate : null),
    });
  }

  saveSong(): void {
    let formValues = this.songForm.value;
    if (this.dialogData.mode === 'update') {
      formValues = {...formValues, id: this.dialogData.id};
    }
    this.dataService.isSongNameValid(formValues.name, formValues.id)
    .pipe(first())
    .subscribe((isValid) => {
      if (isValid) {
        const api = this.dialogData.mode === 'add' ? 
        this.dataService.saveNewSong(formValues) :
        this.dataService.saveExistingSong(formValues);
        api.subscribe(res => this.close());
      } else {
        this.error = 'Song name already exist';
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
