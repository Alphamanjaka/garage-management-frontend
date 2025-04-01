import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from '../models/Login';
import { Observable, catchError, of, tap } from 'rxjs';
import { Token } from '../models/Token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }


  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);


  login(user: Login): Observable<Token> {
    const url = this.apiUrl + "/login";
    return this.httpClient.post<Token>(url, user).pipe(
      tap((response) => {
        const decodedToken = this.decodeToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('identifiant', response.identifiant);
        localStorage.setItem('role', response.role);
      }),
      catchError((error) => this.handleError(error, [],1))
    );
  }


  private handleError(error: HttpErrorResponse, errorValue: any, route: number) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      if (error.status == 401) {
        if (route == 1) {
          window.alert("client")
          // this.router.navigate(['/login/client']);
        }
        if (route == 2) {
          window.alert("admin")
          // this.router.navigate(['/login/admin']);
        }
        if (route == 3) {
          window.alert("employe")
          // this.router.navigate(['/login/employe']);
        }
      }
      console.error('Une erreur s\'est produite :', error.error.message);
    }

    return of(errorValue);
  }

  // Fonction pour récupérer et décoder le token JWT
  decodeToken(token: string) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken; // Retourne les données décodées du token
    } catch (error) {
      console.error('Erreur de décodage du token', error);
      return null!;
    }
  }

  seDeconnecter() {
    localStorage.clear();
  }
}

