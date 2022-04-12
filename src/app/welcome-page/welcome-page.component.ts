/**
 * The WelcomePageComponent renders a mat card containing a welcome message and action buttons for registration/login.
 * Clicking one of those buttons opens a mat dialog containing the component responsible for each process.
 * @module WelcomePageComponent
 */

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

  /**
   * Passes classes as parameters to the constructor to set them as properties on the component class.
   * They can be accessed when needed.
   * @param dialog
   * @param router
   */
  constructor(
    public dialog: MatDialog,
    private router: Router) { }

  /**
   * Calls redirectToMovies method to check whether there's an already logged in user as soon as the component loads
   */
  ngOnInit(): void {
    this.redirectToMovies();
  }

  /**
   * Opens dialog containing the user-registration-form component
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent);
  }

  /**
   * Opens dialog containing the user-login-form component
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent);
  }

  /**
   * Redirects user to movies list if the user is already logged in
   * Checks localstorage for user item
   */
  redirectToMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['movies']);
    }
  }
}
