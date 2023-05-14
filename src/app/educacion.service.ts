import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Educacion } from './models/educacion.interface';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiUrl = 'http://localhost:8080/educacion';

  constructor(private http: HttpClient) { }

  //funciona OK
 // getEducacion(educacionId: number): Observable<Educacion> {
  //  return this.http.get<Educacion>(`${this.apiUrl}/${educacionId}`);
//}

getEducacion(): Observable<Educacion[]> {
  return this.http.get<Educacion[]>(this.apiUrl);
}

getEducacionById(educacionId: number): Observable<Educacion> {
  const url = `${this.apiUrl}/${educacionId}`;
  return this.http.get<Educacion>(url);
}

updateEducacion(educacion: Educacion): Observable<Educacion> {
 return this.http.put<any>(`${this.apiUrl}/${educacion.id}`, educacion).pipe(
      map((res: any) => new Educacion(
      res.id,
      res.school,
      res.title,
      res.img,
      res.career,
      res.start,
      res.end
     ))
   );
 }

deleteEducacion(id: number): Observable<void> {
 return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

  agregarEducacion(educacion: Educacion): Observable<Educacion> {
    return this.agregarEducacionAPI(educacion);
  }
  

  public agregarEducacionAPI(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiUrl}`, educacion);
}
}