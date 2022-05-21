import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Favorite } from '../models/favorite';
import { MoviesData } from '../models/movies-data';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  //https://image.tmdb.org/t/p/w600_and_h900_bestv2/iW03OMEI3htIAV1P8FwM867PLIj.jpg

  URL = 'http://localhost:4201';
  constructor(private http: HttpClient) { }

  fetchMovies(){
    return this.http.get<MoviesData[]>(`${this.URL}/movies-popular`).pipe(catchError(err => {
      return throwError(this.errorMessage(err.status))
    }))

  }

  like(data: Favorite){
    return this.http.post(`${this.URL}/favorites`, data).pipe(catchError(this.errorMessage));
  }

  dislike(favoriteId: number){
    return this.http.delete(`${this.URL}/favorites/${favoriteId}`).pipe(catchError(this.errorMessage));
  }

  getUserLikes(userId: number){
    return this.http.get<Favorite[]>(`${this.URL}/favorites?userId=${userId}`).pipe(catchError(err => {
      return throwError(this.errorMessage);
    }))
  }

  getMovieById(movieId: number){
    return this.http.get<MoviesData>(`${this.URL}/movies-popular/${movieId}`).pipe(catchError(err => {
      return throwError(this.errorMessage(err.status))
    }))
  }

  errorMessage(status: number){
    let msg = '';
    switch(status){
      case 404:
        msg = 'Not found';
        break;
      case 500:
        msg = 'Internal server error';
        break;
      default:
        msg = 'Undefined error';
        break;
    }
    return msg;
  }

}
