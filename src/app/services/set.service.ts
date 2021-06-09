// https://bezkoder.com/angular-11-crud-app/
// MUST RUN ON PORT 8081
// ng serve --port 8081 --open

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Set } from '../models/set.model';

const baseUrl = 'http://localhost:8080/api/sets';
const iconImgBaseUrl = 'http://localhost:8080/set_icons/';

@Injectable({
  providedIn: 'root'
})

export class SetService {

  constructor(private http: HttpClient) { }

  // retrieve all Sets from the database
  getAll(): Observable<Set[]> {
    return this.http.get<Set[]>(baseUrl);
  }

  // get a Set with a specified code from the database
  get(code: any): Observable<any> { // TODO: why won't it let me use Observable<Set>?
    return this.http.get(`${baseUrl}/${code}`);
  }

  // add a Set to the database
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // update an existing Set in the database
  update(code: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${code}`, data);
  }

  // delete the Set with the specified code from the database
  delete(code: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${code}`);
  }

  // delete all Sets in the database
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
