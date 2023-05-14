import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription, Observable } from 'rxjs';
import { EducacionService } from 'src/app/educacion.service';
import { Educacion } from '../models/educacion.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() educaciones: Educacion[] = [];

  public educacionesAPI: Educacion[] = [];
  public nuevaEducacion: Educacion = new Educacion(0, '', '', '', '', '', '');

  public mostrarFormulario: boolean = false;


  constructor(private educacionService: EducacionService) { };


ngOnInit(): void {}

  public obtenerEducaciones(): void {
    this.educacionService.getEducacion().subscribe(educaciones => this.educaciones = educaciones);
  }

  
  public abrirFormulario(): void {
    this.nuevaEducacion = new Educacion(0, '', '', '', '', '', '');
    this.mostrarFormulario = true;
  }

  public ocultarFormulario(): void {
    this.mostrarFormulario = false;
  }


  
  public guardarEducacion(): void {
    console.log('nueva educaicon:');
    console.log(this.nuevaEducacion);
    console.log('school:');
    console.log(this.nuevaEducacion.school);
    console.log('valid:');


    console.log('objeto a enviar');
    console.log(this.nuevaEducacion);

    this.educacionService.agregarEducacionAPI(this.nuevaEducacion)
      .subscribe(() => {
        console.log('lo que llega:');
        console.log(this.nuevaEducacion);
        console.log(this.nuevaEducacion.school);

        this.obtenerEducaciones();
        this.ocultarFormulario();
        console.log('La educación se agregó correctamente.');
        }, error => {
        console.error('Ocurrió un error al agregar la educación: ', error);
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
