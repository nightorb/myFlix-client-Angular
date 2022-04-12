/**
 * The GenreCardComponent renders a mat dialog containing information about the genre of a specific movie.
 * @module GenreCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  constructor(
    /**
     * Injects data from MovieCardComponent into GenreCardComponent using the MAT_DIALOG_DATA injection token.
     * The data becomes a property on the class and is available to be output in the template.
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Name: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
  }

}
