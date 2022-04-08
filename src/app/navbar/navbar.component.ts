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

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  goToUserProfile(): void {
    this.router.navigate(['profile']);
  }

  UserLogOut(): void {
    localStorage.clear();
    this.snackBar.open('logged out successfully', 'OK', {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }

}
