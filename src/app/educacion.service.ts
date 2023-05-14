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

  getEducacion(): Observable<Educacion[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res: any[]) => res.map((educacion: any) => ({
        id: educacion.id,
        school: educacion.school,
        title: educacion.title,
        img: educacion.img,
        career: educacion.career,
        start: educacion.start,
        end: educacion.end
      })))
    );
  }

  addEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.post<any>(this.apiUrl, educacion).pipe(
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

 // updateEducacion(educacion: Educacion): Observable<Educacion> {
 //   return this.http.put<any>(`${this.apiUrl}/${educacion.id}`, educacion).pipe(
 //     map((res: any) => new Educacion(
 //       res.id,
 //       res.school,
 //       res.title,
 //       res.img,
 //       res.career,
 //       res.start,
 //       res.end
 //     ))
 //   );
 // }

  //deleteEducacion(id: number): Observable<void> {
 //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
 // }

  agregarEducacion(educacion: Educacion): Observable<Educacion> {
    return this.agregarEducacionAPI(educacion);
  }
  

  public agregarEducacionAPI(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.apiUrl}`, educacion);
}
}