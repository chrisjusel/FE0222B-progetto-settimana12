import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  URL = 'http://localhost:4201/movies';
  constructor() { }


}
