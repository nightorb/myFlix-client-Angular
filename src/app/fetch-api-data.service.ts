import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// declaring the api url that will provide data for the client app
const apiUrl = 'https://nightorbs-myflix.herokuapp.com/';
// get token from local storage for authenticated requests
const token = localStorage.getItem('token');
// get username from local storage for URLs
const username = localStorage.getItem('user');

// the @Injectible decorator tells Angular that this service is available everywhere (hence the root)
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // inject HttpClient module to constructor params
  // this provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // making api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // get a list of all movies
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a single movie by its title
  getMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a list of all genres
  getAllGenres(): Observable<any> {
    return this.http.get(apiUrl + 'genres', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a single genre by its name
  getGenre(): Observable<any> {
    return this.http.get(apiUrl + 'genres/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a list of all directors
  getAllDirectors(): Observable<any> {
    return this.http.get(apiUrl + 'directors', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a single director by their name
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'directors/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a list of all actors
  getAllActors(): Observable<any> {
    return this.http.get(apiUrl + 'actors', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a single actor by their name
  getActor(): Observable<any> {
    return this.http.get(apiUrl + 'actors/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a user by username
  getUser(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // update a user's info by username
  updateUserInfo(userData: object): Observable<any> {
    return this.http.put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // deletes a user by username
  deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get a user's list of favorite movies
  getFavoriteMovies(): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/favorites`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // add a movie to a user's list of favorites
  addFavoriteMovie(id: string): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/favorites/${id}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    // remove a movie from a user's list of favorites
    removeFavoriteMovie(id: string): Observable<any> {
      return this.http.delete(apiUrl + `users/${username}/favorites/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // extract data response
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  // handle error function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body: ${error.error}`
      );
    }
    return throwError('Something bad happened. Please try again later.');
  }
}
