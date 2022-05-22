import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesData } from 'src/app/models/movies-data';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  sub!: Subscription;
  movie!: MoviesData;
  genre!: string[];

  constructor(private router: ActivatedRoute, private moviesSrv: MoviesService) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params) => {
      const id = +params['id'];
      if(!isNaN(id)){
        this.moviesSrv.getMovieById(id).subscribe((ris) => {
          this.movie = ris;
        })
      }
    })
  }

}
