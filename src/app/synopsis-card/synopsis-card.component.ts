/**
 * The SynopsisCardComponent renders a mat dialog containing the synopsis of a specific movie.
 * @module SynopsisCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(
    /**
     * Injects data from MovieCardComponent into SynopisCardComponent using the MAT_DIALOG_DATA injection token.
     * The data becomes a property on the class and is available to be output in the template.
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
  }

}
