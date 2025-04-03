import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  private apiUrl = environment.apiUrl+"/mailing";

  constructor(private http: HttpClient) { }

  user = { 
    name : "Andrea",
    email : "rakotonirinacharlesandrea@gmail.com"
  }

  sendSimpleMail(data : any): Observable<any> {
    data = this.user;
    return this.http.post(this.apiUrl+"/success-register",data);
  }
}
