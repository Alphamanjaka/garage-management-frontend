import { Component, NgModule } from '@angular/core';
import { environment } from '../../../environments/env';
import { Login } from '../../models/Login';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private apiUrl = environment.apiUrl;
  login: Login = new Login();
  loading = false;
  loginError = false;
  etat = 0;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.login.role = this.route.snapshot.params['role'];
    if (this.login.role == 'client') {
      this.login.username = 'client1';
      this.login.password = 'client1';
      this.etat = 1;
    }
    if (this.login.role == 'admin') {
      this.login.username = 'charles';
      this.login.password = '123456';
      this.etat = 2;
    }
    if (this.login.role == 'employe') {
      this.login.username = 'employe1';
      this.login.password = 'employe1';
      this.etat = 3;
    }
  }

  logIn() {
    this.loading = true;
    this.loginService.login(this.login).subscribe(
      (data: any) => {
        if (data.length == 0) {
          this.erreur();
        } else {
          this.correct();
        }
      },
      (error: any) => {
      }
    );
  }

  erreur() {
    this.loginError = true;
    this.login.username = "";
    this.login.password = "";
    this.loading = false;
  }

  correct() {
    this.router.navigate(['/' + this.login.role]);
  }

  home() {
    this.router.navigate(['']);
  }

}
