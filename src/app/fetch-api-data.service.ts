/**
 * The FetchApiDataService is used to make HTTP requests to the myFlix movie API to retrieve data on movies
 * and users, as well as to register and login user, update their details, and to add/remove movies to/from
 * their list of favorite movies. The class is marked with the Injectible decorator and injected as a dependency
 * to the root component, thereby making the service available to all other components.
 * @module FetchApiDataService
 */

// used to provide the service as an injectible dependency to the root app
import { Injectable } from '@angular/core';
// requests return Observables
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// used to make HTTP requests to the API
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

  /**
   * Injects HttpClient module to the constructor params which provides HttpClient to the entire class,
   * making it available via this.http.
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Sends POST request to users endpoint to register a new user (POST /users).
   * @param userDetails - object containing the user's data (username, password, email, birthday)
   * @returns - JSON object with the user's details
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends POST request to user login endpoint to login an existing user (POST /login).
   * @param userDetails - object containing the user's credentials (username, password)
   * @returns - JSON object with user's details
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends GET request to movies endpoint to get a list of all movies (GET /movies).
   * @returns - JSON array holding all movie objects
   */
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

  /**
   * Sends GET request to movies/:Title endpoint to get a single movie by title (GET /movies/:Title).
   * @returns - JSON object with a single movie's data
   */
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

  /**
   * Sends GET request to genres endpoint to get a list of all genres (GET /genres).
   * @returns - JSON array holding all genre objects
   */
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

  /**
   * Sends GET request to genres/:Name endpoint to get a single genre by name (GET /genres/:Name).
   * @returns - JSON object with a single genre's data
   */
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

  /**
   * Sends GET request to directors endpoint to get a list of all directors (GET /directors).
   * @returns - JSON array holding all director objects
   */
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

  /**
   * Sends GET request to directors/:Name endpoint to get a single director by name (GET /directors/:Name).
   * @returns - JSON object with a single director's data
   */
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

  /**
   * Sends GET request to actors endpoint to get a list of all actors (GET /actors).
   * @returns - JSON array holding all actor objects
   */
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

  /**
   * Sends GET request to actors/:Name endpoint to get a single actor by name (GET /actors/:Name).
   * @returns - JSON object with a single actor's data
   */
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

  /**
   * Sends GET request to users/:Username endpoint to get a user by username (GET /users/:Username).
   * Username retrieved from localstorage.
   * User authentication required (bearer token retrieved from localstorage).
   * @returns - JSON object with user information
   */
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

  /**
   * Sends PUT request to users/:Username endpoint to update a user's information (PUT /users/:Username).
   * Username retrieved from localstorage.
   * User authentication required (bearer token retrieved from localstorage).
   * @param userData - object containing newly updated user details
   * @returns - JSON object with updated user information
   */
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

  /**
   * Sends DELETE request to users/:Username endpoint to delete a user (DELETE /users/:Username).
   * Username retrieved from localstorage.
   * User authentication required (bearer token retrieved from localstorage).
   * @returns - text response (confirmation)
   */
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

  /**
   * Sends GET request to users/:Username/favorites endpoint to get a user by username (GET /users/:Username/favorites).
   * Username retrieved from localstorage.
   * User authentication required (bearer token retrieved from localstorage).
   * @returns - JSON array holding all favorite movies objects
   */
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

  /**
   * Sends POST request to users/:Username/favorites/:id endpoint to add a movie to a user's list of favorite movies (POST /users/:Username/favorites/:id).
   * Username retrieved from localstorage.
   * User authentication required (bearer token retrieved from localstorage).
   * @param id - a movie's _id
   * @returns - updated JSON array holding all favorite movies objects
   */
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

  /**
   * Sends DELETE request to users/:Username/favorites/:id endpoint to remove a movie from a user's list of favorite movies (POST /users/:Username/favorites/:id).
   * Username retrieved from localstorage.
   * User authentication required (bearer token retrieved from localstorage).
   * @param id - a movie's _id
   * @returns - updated JSON array holding all favorite movies objects
   */
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

  /**
   * Takes a request response and returns either response body or an empty object.
   * @param res - the response to an HTTP request
   * @returns - the response or an empty object
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles error responses to HTTP requests.
   * @param error - the HttpErrorResponse
   * @returns - error messages
   */
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
