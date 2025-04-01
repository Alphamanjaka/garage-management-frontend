import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { PaginatedResponse } from '../models/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl+"/appointment";
  constructor(private http: HttpClient) { }

  addAppointment(appointment: Appointment): Observable<any> {
    console.log(appointment);
    
    return this.http.post(this.apiUrl, appointment);
  }

  getPaginatedTask(page : number, limit: number): Observable<PaginatedResponse> {
    
    return this.http.get<PaginatedResponse>(`${this.apiUrl}/fetch?page=${page}&limit=${limit}`);
  }

}
