/**
 * The DirectorCardComponent renders a mat dialog containing information about the director of a specific movie.
 * @module DirectorCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  constructor(
    /**
     * Injects data from MovieCardComponent into DierctorCardComponent using the MAT_DIALOG_DATA injection token.
     * The data becomes a property on the class and is available to be output in the template.
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Name: string,
      Bio: string,
      BirthYear: string
    }
  ) { }

  ngOnInit(): void {
  }

}
