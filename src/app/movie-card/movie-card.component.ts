/**
 * The MovieCardComponent displays the data retrieved from the myFlix database. The data is looped through using
 * the ngFor directive and each movie is rendered as a mat card in the template. Each card contains buttons that
 * open further information about the movie. Movies can be added/removed to/from a user's list of favorite movies
 * by clicking the heart icon on each movie card.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// import components
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
  user: any = {};
  favoriteMovies: any[] = [];

  /**
   * Passes classes as parameters to the constructor to set them as properties on the component class.
   * They can be accessed when needed.
   * @param fetchApiData 
   * @param snackBar 
   * @param dialog 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  /**
   * Calls getMovies and getUser method to populate the template as soon as the component loads.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * Invokes getAllMovies method on the fetchApiData service and populates the movies array with the response.
   * @returns - JSON array holding all movie objects
   */
  getMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      // fetch movies from FetchApiDataService with getAllMovies()
      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        this.movies = res;
        return this.movies;
      });
    }
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

  /**
   * Invokes getUser method on the fetchApiData service and populates the user object with the response.
   * @returns - object with user data
   */
  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        this.favoriteMovies = res.FavoriteMovies
        return this.user, this.favoriteMovies;
      });
    }
  }

  /**
   * Invokes addFavoriteMovie method on the fetchApiData service to add a movie to the user's list of favorite
   * movies.
   * Displays popup message to confirm movie has been added.
   * @param MovieID - _id of movie to be added
   * @param Title - Title of movie to be added
   * @returns - updated JSON array holding all favorite movies objects
   */
  addFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
    return this.getUser();
  }

  /**
   * Invokes removeFavoriteMovie method on the fetchApiData service to remove a movie from the user's list of
   * favorite movies.
   * Displays popup message to confirm movie has been removed.
   * @param MovieID - _id of the movie to be removed
   * @param Title - Title of the movie to be removed
   * @returns - updated JSON array holding all favorite movies objects
   */
  removeFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from your favorites`, 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
    return this.getUser();
  }

  /**
   * Checks whether a movie is in the user's list of favorite movies or not.
   * @param MovieID - _id of movie
   * @returns - true or false
   */
  isFavorited(MovieID: string): boolean {
    return this.favoriteMovies.includes(MovieID);
  }

  /**
   * Function to add/remove a movie to/from the user's list of favorite movies.
   * If movie isn't on the list, call addFavoriteMovie function.
   * If movie is already on the list, call removeFavoriteMovie function.
   * @param movie - the selected movie object
   * @returns - addFavoriteMovie or removeFavoriteMovie function
   */
  toggleFavorite(movie: any): void {
    this.isFavorited(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title)
  }
}
