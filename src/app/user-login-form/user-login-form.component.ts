/**
 * The UserLoginFormComponent renders a mat dialog containing a form for the user to input and submit their
 * credentials to log in to myFlix.
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// used to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * userData values are populated by form inputs in the user-login-form template that are bound
   * using the ngModel directive. The userData object will be passed to the API call in the loginUser
   * function.
   */
  @Input() userData = {
    Username: '',
    Password: ''
  };

  /**
   * Passes classes as parameters to the constructor to set them as properties on the component class.
   * They can be accessed when needed.
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Invokes userLogin method on the fetchApiData service to login an existing user by sending the userData.
   * Closes form on successful login, redirecting user to "/movies".
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // closes the modal on success
      this.dialogRef.close();

      // add token and user to local storage when logged in successfully
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);

      this.snackBar.open('logged in successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open('wrong username or password', 'OK', {
        duration: 2000
      });
    });
  }

}
