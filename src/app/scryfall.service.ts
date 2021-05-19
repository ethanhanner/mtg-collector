import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})

export class ScryfallService {
  private scryfallUrl = "https://api.scryfall.com/cards/search";

  constructor(private http: HttpClient) { }

  searchCards(term: string): Observable<Object> {
    term = term.trim();

    const options = term ?
      { params: new HttpParams()
        .set('q', term)
        .set('unique', 'prints') // later make this prints
      } : {};

    return this.http.get<Object>(this.scryfallUrl, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  parseResults(raw_result: any) {

  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);

  //     // requires message service from tour of heroes tutorial
  //     //this.log(`{$operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   }

  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred: ', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
