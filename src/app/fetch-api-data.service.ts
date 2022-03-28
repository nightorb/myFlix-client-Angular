import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map  } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { map } from 'rxjs';

// declaring the api url that will provide data for the client app
const apiUrl = 'https://nightorbs-myflix.herokuapp.com/';

// the @Injectible decorator tells Angular that this service is available everywhere (hence the root)
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // inject HttpClient module to constructor params
  // this provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // making api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

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
