import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  userName(){
    let loggedUser = this.authSrv.getUserInfo();
    if(loggedUser != undefined){
      return loggedUser['name'];
    }
    return;
  }

  userEmail(){
    let loggedUser = this.authSrv.getUserInfo();
    if(loggedUser != undefined){
      return loggedUser['email'];
    }
    return;
  }

}
