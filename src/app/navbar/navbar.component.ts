/**
 * The NavbarComponent displays the navbar at the top of the page after the user has logged in. The navbar includes
 * links to the different routes of the app: "movies", "profile", and a button that allows users to logout.
 * @module NavbarComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * Passes classes as parameters to the constructor to set them as properties on the component class.
   * They can be accessed when needed.
   * @param fetchApiData 
   * @param router 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Redirects user to movies page.
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Redirects users to profile page.
   */
  goToUserProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out user and clears localStorage, then redirects to welcome page.
   */
  UserLogOut(): void {
    localStorage.clear();
    this.snackBar.open('logged out successfully', 'OK', {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }

}
