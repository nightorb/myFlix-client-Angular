import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// used to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  // the selector makes it possible to use this component in HTML files like this:
  // <app-user-registration-form></app-user-registration-form>
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  // @Input decorator defines the component's input (here: the user data)
  // the userData object will be passed into the API call in the registerUser function
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  // called once the component has received all its inputs (it's data-bound properties)
  // from the calling component (the real-life user)
  ngOnInit(): void {
  }

  // function that sends form input to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      let userCredentials = (({ Username, Password }) => ({ Username, Password })) (this.userData);
      this.fetchApiData.userLogin(userCredentials).subscribe((response) => {
        // closes the modal on success
        this.dialogRef.close();

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.Username);

        this.router.navigate(['movies']);
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
      this.snackBar.open('user registered successfully', 'OK', {
        duration: 2000
      });
    }, () => {
      this.snackBar.open('registration failed', 'OK', {
        duration: 2000
      });
    });
  }

}