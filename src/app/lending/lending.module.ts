import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LendingRoutingModule } from './lending-routing.module';
import { LendingComponent } from './lending.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    LendingComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LendingRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ]
})
export class LendingModule { }
