import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription } from 'rxjs';
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
  public mostrarFormulario = false;

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
    const nuevaEducacion = new Educacion(0, '', '', '', '', '', '');
    this.mostrarFormulario = true;
  }

  public ocultarFormulario(): void {
    this.mostrarFormulario = false;
  }

  public agregarEducacion(): void {
    const subscription: Subscription = this.educacionService.agregarEducacionAPI(this.nuevaEducacion)
      .subscribe(() => {
        this.obtenerEducaciones();
        this.ocultarFormulario();
        console.log('La educación se agregó correctamente.');
        console.log(this.nuevaEducacion);
      }, error => {
        console.error('Ocurrió un error al agregar la educación: ', error);
      });

    // Desuscribirse para evitar fugas de memoria
    subscription.unsubscribe();
  }

  guardarEducacion(): void {
    
    this.educaciones.push(this.nuevaEducacion);
    this.ocultarFormulario();
    this.nuevaEducacion = {} as Educacion; // asignar un objeto vacío a la propiedad nuevaEducacion
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
