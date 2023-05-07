import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion.interface';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('./assets/data/data.json');
  }

  

}
export class EducacionService {

  private apiUrl = 'http://localhost:8080/educacion';

  constructor(private http: HttpClient) { }

  getAllEducations(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.apiUrl);
  }
}