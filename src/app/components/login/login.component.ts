import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login } from '../../models/Login';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private apiUrl = environment.apiUrl;

  login: Login = new Login();

  loading = false;

  loginError = false;

  etat = 0;

  constructor(

    private http: HttpClient,

    // private loginService: LoginService,

    private router: Router,

    private route: ActivatedRoute

  ) { }

  onClick() {

    this.loading = true;

    // this.loginService.login(this.login, this.etat).subscribe(
    //   (data: any) => {
    //     if (data.length == 0) {
    //       this.erreur();
    //     } else {
    //       this.correct();
    //     }
    //   },
    //   (error: any) => {
    //   }
    // );
  }

  erreur(){
    this.loginError = true;
    this.login.email = "";
    this.login.password = "";
    this.loading = false;
  }

  correct(){
    this.router.navigate(['/'+this.login.role]);
  }

}
