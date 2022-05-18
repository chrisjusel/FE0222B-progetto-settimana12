import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LendingRoutingModule } from './lending-routing.module';
import { LendingComponent } from './lending.component';


@NgModule({
  declarations: [
    LendingComponent
  ],
  imports: [
    CommonModule,
    LendingRoutingModule
  ]
})
export class LendingModule { }
