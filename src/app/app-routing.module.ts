import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard]
    loadChildren: () =>
      import('./lending/lending.module').then(
        (m) => m.LendingModule)
  }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
