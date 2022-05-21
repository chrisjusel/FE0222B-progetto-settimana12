import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesData } from 'src/app/models/movies-data';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  sub!: Subscription;
  movie!: MoviesData;

  constructor(private router: ActivatedRoute, private moviesSrv: MoviesService) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params) => {
      const id = +params['id'];
      this.moviesSrv.getMovieById(id).subscribe((ris) => {
        this.movie = ris;
      })
    })
  }

}
