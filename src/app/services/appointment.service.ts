import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';

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

}
