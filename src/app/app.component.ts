import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// import components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-client-Angular';

  // pass Angular Material dialog in the constructor as an argument to make it available for use in the component
  constructor(public dialog: MatDialog) { }

  // function that opens registration dialog when signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // assign the dialog a width
      width: '280px'
    });
  }

  // function that opens login dialog when login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
