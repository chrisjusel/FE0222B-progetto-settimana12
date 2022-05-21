import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import {MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class MoviesModule { }
