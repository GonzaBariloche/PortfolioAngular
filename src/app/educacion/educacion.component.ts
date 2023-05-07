import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { EducacionService } from 'src/app/servicios/portfolio.service';
import { Educacion } from '../models/educacion.interface';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})


export class EducacionComponent implements OnInit {

  educaciones: Educacion[] = [];

  constructor(private educacionService: EducacionService) { }

  ngOnInit(): void {
    this.getAllEducations();
  }

  getAllEducations(): void {
    this.educacionService.getAllEducations()
      .subscribe(educaciones => this.educaciones = educaciones);
  }
}
