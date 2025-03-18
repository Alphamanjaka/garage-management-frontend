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

  login: Login=new Login();

  loading=false;

  loginError=false;

  etat=0;

  constructor(

    private http: HttpClient,

    // private loginService: LoginService,

    private router: Router,

    private route: ActivatedRoute

) { }

}
