import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authSrv: AuthService, private router: Router) {}

  onlogout(){
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  getUserName(){
    let loggedUser = this.authSrv.getUserInfo();
    if(loggedUser != undefined){
      return loggedUser['name'];
    }
    return;
  }
}
