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

  @Input() userData = {
    Username: '',
    Password: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  // function that sends form input to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // closes the modal on success
      this.dialogRef.close();

      // add token and user to local storage when logged in successfully
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);

      this.router.navigate(['movies']);
      this.snackBar.open('logged in successfully', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open('wrong username or password', 'OK', {
        duration: 2000
      });
    });
  }

}
