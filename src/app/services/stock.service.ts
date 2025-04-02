import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';
import { Piece } from '../models/Piece';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl + "/stock/pieces";

  constructor(private http: HttpClient) { }

  getPieces(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchPiece(pieceName: string): Observable<Piece[]> {
    return this.http.get<Piece[]>(`${this.apiUrl}/search?name=${pieceName}`);
  }

  addPiece(piece: any): Observable<any> {
    return this.http.post(this.apiUrl, piece);
  }
  updatePiece(id: string, Piece: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, Piece);
  }
  deletePiece(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
