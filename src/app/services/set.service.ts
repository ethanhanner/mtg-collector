import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Set } from '../models/set.model';

const baseUrl = 'http://localhost:8080/api/sets';

@Injectable({
  providedIn: 'root'
})

export class SetService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Set[]> {
    return this.http.get<Set[]>(baseUrl);
  }

  get(code: any): Observable<any> { // TODO: why won't it let me use Observable<Set>?
    return this.http.get(`${baseUrl}/${code}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(code: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${code}`, data);
  }

  delete(code: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${code}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}
