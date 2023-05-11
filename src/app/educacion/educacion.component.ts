import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { EducacionService } from 'src/app/educacion.service';
import { Educacion } from '../models/educacion.interface';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() educaciones: Educacion[] = [];

  public educacionesAPI: Educacion[] = [];
  public nuevaEducacion: Educacion = {} as Educacion;

  constructor(private educacionService: EducacionService) { }

 // ngOnInit() {
  //  this.getEducaciones();
  //}

  //getEducaciones(): void {
  //  this.educacionService.getEducacion().subscribe(educaciones => this.educaciones = educaciones);
  //}



  ngOnInit(): void {
    this.obtenerEducaciones();
  }

  public obtenerEducaciones(): void {
    this.educacionService.getEducacion().subscribe(educaciones => this.educaciones = educaciones);
  }

  
  public abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  public ocultarFormulario(): void {
    this.formularioActivo = false;
  }

  public agregarEducacion(): void {
    this.educacionService.agregarEducacionAPI(this.nuevaEducacion)
      .subscribe(() => {
        this.ocultarFormulario = () => false;
        this.obtenerEducaciones();
      });
  }


}
    
  

//
//export class EducacionComponent implements OnInit {

//  educaciones: Educacion[] = [];

 // constructor(private educacionService: EducacionService) { }

 // ngOnInit(): void {
 //   this.getAllEducations();
 // }

 // getAllEducations(): void {
 //   this.educacionService.getAllEducations()
 //     .subscribe(educaciones => this.educaciones = educaciones);
 // }
//}
