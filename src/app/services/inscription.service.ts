import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private httpClient = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  constructor(private router: Router) { }

  signIn(user : User, userRole : string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/user`,user);
  }
  
}
