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
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username = localStorage.getItem('user');
  user: any = {};
  favoriteMovies: any[] = [];

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  // API call to get user information
  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        return this.user;
      });
    }
  }

  updateUserInfo(): void {
    this.fetchApiData.updateUserInfo(this.userData).subscribe((response) => {
      // save new username to local storage
      localStorage.setItem('user', response.Username);
      console.log(response);
      this.snackBar.open('profile updated successfully', 'OK', {
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open(`${this.user.Usermame} has been removed`, 'OK', {
        duration: 2000
      });
      // delete everything from local storage
      localStorage.clear();
    });
    setTimeout(() => {
      // navigate back to welcome screen after account has been deleted
      this.router.navigate(['welcome']);
    }, 1000);
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      return this.favoriteMovies;
    });
  }

  removeFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((respose) => {
      this.snackBar.open(`removed ${Title} from your favorites`, 'OK', {
        duration: 2000
      });
      window.location.reload();
    });
  }

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
