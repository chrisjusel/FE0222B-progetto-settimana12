import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: any){
    try{
      await this.authSrv.signUp(form.value).toPromise();
      form.reset();
      this.errorMessage = undefined;
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error;
      console.error(error);
    }
  }

}
