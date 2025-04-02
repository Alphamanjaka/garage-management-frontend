import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl + "/services";
  constructor(private http: HttpClient) { }

  getServices(): Observable<any> {
    return this.http.get(this.apiUrl);
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
  searchService(serviceName: string): Observable<Service[]>{
    return this.http.get<Service[]>(`${this.apiUrl}/search?name=${serviceName}`);
  }
}
