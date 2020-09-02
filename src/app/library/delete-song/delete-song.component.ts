import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data-layer/data.service';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
})
export class DeleteSongComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public id: number,
              public dialogRef: MatDialogRef<DeleteSongComponent>,
              private dataService: DataService) { }

  public deleteSong(): void {
    this.dataService.deleteSong(this.id);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
