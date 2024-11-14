import { iMovies } from './../model/i-movies';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl: string = environment.moviesUrl;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<iMovies[]> {
    return this.http.get<iMovies[]>(this.apiUrl);
  }
}
