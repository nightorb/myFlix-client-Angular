import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(
    // gets movie details from the movie object
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
  }

}
