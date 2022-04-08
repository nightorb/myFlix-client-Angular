import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // data returned from the API call will be kept here
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  // lifecycle hook; called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    // fetch movies from FetchApiDataService with getAllMovies()
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
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

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
    });
  }

  addFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  removeFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from your favorites`, 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  // checks whether a movie is in the user's favorite list or not
  isFavorited(MovieID: string): boolean {
    return this.favoriteMovies.includes(MovieID);
  }

  // function to add/remove a movie to/from the favorites list
  toggleFavorite(movie: any): void {
    this.isFavorited(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title)
  }
}
