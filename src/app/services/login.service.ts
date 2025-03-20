import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from '../models/Login';
import { Observable, catchError, of, tap } from 'rxjs';
import { Token } from '../models/Token';

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
        console.log('resp',response);
        
        // localStorage.setItem('token', response.token);
        // localStorage.setItem('identifiant', response.identifiant);
        // localStorage.setItem('role', response.role);
      }),
      catchError((error) => this.handleError(error, [],1))
    );
  }

//   loginFunction(login: { username: string, password: string }) {
//     return this.httpClient.post<{ token: string }>(`${this.apiUrl}/login`, login)
//         .pipe(
//             catchError(error => {
//             console.error('Erreur de connexion :', error);
//             alert('Échec de l’authentification. Vérifiez vos identifiants.');
//             return throwError(() => error);
//             })
//         )
//         .subscribe({
//             next: res => {
//               localStorage.setItem('token', res.token);
//               const userRole = this.getRole();
//               this.redirectUser(userRole);
//             },
//             error: () => console.log("Erreur déjà gérée dans catchError")
//           });
// }

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
}
