import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Favorite } from '../models/favorite';
import { MoviesData } from '../models/movies-data';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies!: MoviesData[];
  favorites!: Favorite[];

  constructor(private moviesSrv: MoviesService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchFavorites();
  }

  fetchMovies(){
    this.moviesSrv.fetchMovies().subscribe((ris) => {
      this.movies = ris;
      console.log(this.movies);
    })
  }

  fetchFavorites(){
    this.moviesSrv.getUserLikes(this.authSrv.getUserId()).subscribe((ris) => {
      this.favorites = ris;
      console.log(this.favorites);
    })
  }

  checkIfLiked(movieId: number){
    for(let i=0; i<this.favorites.length; i++){
      if(this.favorites[i].movieId == movieId){
        console.log("trovato");
        return true
      }
    }
    return false;
  }

  async onlike(movieID: number){
    let userID = this.authSrv.getUserId();
    let temp: Favorite = {
      movieId: movieID,
      userId: userID,
    }

    await this.moviesSrv.like(temp).toPromise();
  }

/*   async ondislike(movieID: number){
    let userID = this.authSrv.getUserId();
    let temp: Favorite = {
      movieId: movieID,
      userId: userID
    }
    await this.moviesSrv.dislike(this.getFavoriteIdByData(movieID)).toPromise();
  } */
}
