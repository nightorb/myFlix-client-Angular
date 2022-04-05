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
  username = localStorage.getItem('user');
  user: any = {};
  // movies returned from the API call will be kept here
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  // lifecycle hook; called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    // fetch movies from FetchApiDataService with getAllMovies()
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  addFavoriteMovies(MovieID: string, Title: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 2000
      });
    });
  }

  removeFavoriteMovies(MovieID: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from your favorites`, 'OK', {
        duration: 2000
      });
    });
  }

  openDirectorDialog(): void {
    this.dialog.open(DirectorCardComponent, {
      width: '500px'
    });
  }

  openGenreDialog(): void {
    this.dialog.open(GenreCardComponent, {
      width: '500px'
    });
  }

  openSynopsisDialog(): void {
    this.dialog.open(SynopsisCardComponent, {
      width: '500px'
    });
  }
}
