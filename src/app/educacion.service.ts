import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Educacion } from './models/educacion.interface';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiUrl = 'http://localhost:8080/api/educacion';

  constructor(private http: HttpClient) { }

  getEducacion(): Observable<Educacion[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res: any[]) => res.map((educacion: any) => new Educacion(
        educacion.id,
        educacion.school,
        educacion.title,
        educacion.img,
        educacion.career,
        educacion.start,
        educacion.end
      )))
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
}