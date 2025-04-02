import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
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
    return this.http.post(this.apiUrl, appointment);
  }

  getPaginatedUnassignedTask(page : number, limit: number): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(`${this.apiUrl}/unassigned?page=${page}&limit=${limit}`);
  }

  updateAppointment(id: string, addAppointment: Appointment): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,addAppointment);
  }

}
