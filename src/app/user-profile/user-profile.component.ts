/**
 * The UserProfileComponent renders a mat card displaying the user's information. Users can edit their
 * profile information by filling out the updateUser form and hitting the "Update" button. The user can also
 * delete their account by clicking the "Delete Account" button.
 * @module UserProfileComponent
 */

import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

// import Materials
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// used to navigate back to welcome page on successful deregistration
import { Router } from '@angular/router';

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', '../movie-card/movie-card.component.scss']
})
export class UserProfileComponent implements OnInit {
  username = localStorage.getItem('user');
  user: any = {};
  favoriteMovies: any[] = [];

  /**
   * userData values are retrieved from user object. New userData values are populated by form inputs 
   * in the update-user-form inside the user-profile template that are bound using the ngModel directive.
   * The userData object will be passed to the API call in the updateUserInfo function.
   */
  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }

  /**
   * Passes classes as parameters to the constructor to set them as properties on the component class.
   * They can be accessed when needed.
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   * @param router 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) { }

  /**
   * Calls getUser and getFavoriteMovies method to populate the template as soon as the component loads
   */
  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  /**
   * Invokes getUser method on the fetchApiData service and populates the user object with the response
   * @returns - object with user data
   */
  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        return this.user;
      });
    }
  }

  /**
   * Takes userData from the form and invokes updateUserInfo methon on the fetchApiData service to update user object.
   * Updates user object and user item in localstorage
   * @returns - object with updated user data
   */
  updateUserInfo(): void {
    this.fetchApiData.updateUserInfo(this.userData).subscribe((response) => {
      // save new username to local storage
      localStorage.setItem('user', response.Username);
      this.snackBar.open('profile updated successfully', 'OK', {
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }

  /**
   * Invokes deleteUser method on the fetchApiData service to delete the user profile, but only after the user
   * confirmed this action.
   * Clears localstorage on success and redirects user back to welcome page.
   * @return - text response (confirmation)
   */
  deleteUser(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        this.snackBar.open(`${this.user.Usermame} has been removed`, 'OK', {
          duration: 2000
        });
      });
      // delete everything from local storage
      localStorage.clear();
      // navigate back to welcome screen after account has been deleted
      this.router.navigate(['welcome']);
    }
  }

  /**
   * Invokes getFavoriteMovies method on the fetchApiData service and populates the favoriteMovies array with
   * the response.
   * @returns - array holding movie objects
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      return this.favoriteMovies;
    });
  }

  /**
   * Removes a movie object from the user's list of favorite movies using an API call.
   * Reloads page to update the UI.
   * @param MovieID - _id of the movie to be removed
   * @param Title - Title of the movie to be removed
   * @returns - updated JSON array holding all favorite movies objects
   */
  removeFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((respose) => {
      this.snackBar.open(`removed ${Title} from your favorites`, 'OK', {
        duration: 2000
      });
      window.location.reload();
    });
  }

  /**
   * Opens dialog to display director component, passing it the data it needs to display.
   * @param title - Title of movie
   * @param name - Name of director
   * @param bio - Bio of director
   * @param birth - BirthYear of director
   */
  openDirectorDialog(title: string, name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Title: title,
        Name: name,
        Bio: bio,
        BirthYear: birth
      },
      width: '500px'
    });
  }

  /**
   * Opens dialog to display genre component, passing it the data it needs to display.
   * @param title - Title of movie
   * @param name - Name of genre
   * @param description - Description of genre
   */
  openGenreDialog(title: string, name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Title: title,
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }

  /**
   * Opens dialog to display synopsis component, passing it the data it needs to display.
   * @param title - Title of movie
   * @param description - Description of movie
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

}
