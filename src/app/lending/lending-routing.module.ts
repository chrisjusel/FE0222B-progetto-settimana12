import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LendingComponent } from './lending.component';

const routes: Routes = [
  {
    path: '',
    component: LendingComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: '',
        loadChildren: () =>
          import('../movies/movies.module').then((m) => m.MoviesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LendingRoutingModule { }
