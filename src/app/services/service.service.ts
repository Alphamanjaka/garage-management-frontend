import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl + "/services";
  constructor(private http: HttpClient) { }

  getServices(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur API :', error);
          return throwError(() => new Error('Erreur lors de la récupération des services'));
        })
      );;
  }
  addService(Service: any): Observable<any> {
    return this.http.post(this.apiUrl, Service);
  }
  updateService(id: string, Service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, Service);
  }
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
