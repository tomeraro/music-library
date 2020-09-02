import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
})
export class PlayerComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public url: string,
              private sanitizer: DomSanitizer) {}


  public getVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url.replace("watch?v=", "embed/"));
  }
}
