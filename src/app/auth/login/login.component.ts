import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = undefined;
  successMessage: string | undefined = undefined;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: any){
    await this.authSrv.login(form.value).toPromise();
    this.router.navigate(['/']);
    form.reset()
    this.errorMessage = undefined;
    this.successMessage = "Login effettuato con successo";
    console.log(this.successMessage);
  }
}
