import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// import components
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  // pass Angular Material dialog in the constructor as an argument to make it available for use in the component
  constructor(public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.redirectToMovies();
  }

  // function that opens registration dialog when signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent);
  }

  // function that opens login dialog when login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent);
  }

  // if a user is already logged in (= user item in local storage), redirect to movies list instead
  redirectToMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['movies']);
    }
  }
}
