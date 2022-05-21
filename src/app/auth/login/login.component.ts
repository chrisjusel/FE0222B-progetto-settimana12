import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = undefined;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: any){
    try{
    await this.authSrv.login(form.value).toPromise();
    this.router.navigate(['/']);
    form.reset()
    this.errorMessage = undefined;
    } catch (error: any) {
      this.errorMessage = error;
      console.error(error);
    }
  }
}
