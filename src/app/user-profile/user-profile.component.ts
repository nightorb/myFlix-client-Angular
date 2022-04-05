import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

// import Materials
import { MatSnackBar } from '@angular/material/snack-bar';

// used to navigate back to welcome page on successful deregistration
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username = localStorage.getItem('user');
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [] || null;

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  // API call to get user information
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }

  }

  updateUserInfo(): void {
    this.fetchApiData.updateUserInfo(this.userData).subscribe((response) => {
      // save new username to local storage
      localStorage.setItem('user', response.user.Username);
      console.log(response);
      this.snackBar.open('profile updated successfully', 'OK', {
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      });
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
    this.fetchApiData.getFavoriteMovies().subscribe((res: any[]) => {
      this.movies = res;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
    });
  }

  removeFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((respose) => {
      this.snackBar.open(`removed ${Title} from your favorites`, 'OK', {
        duration: 2000
      });
    });
  }

}
