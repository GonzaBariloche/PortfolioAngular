import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription } from 'rxjs';
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
  public nuevaEducacion: Educacion = {} as Educacion;

  public mostrarFormulario: boolean = false;

  formularioEducacion: FormGroup = new FormGroup({
    school: new FormControl(''),
    title: new FormControl(''),
    career: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    img: new FormControl('')
  });


  constructor(private educacionService: EducacionService, private formBuilder: FormBuilder) { 
    
    this.formularioEducacion = new FormGroup({
    school: new FormControl(''),
    title: new FormControl(''),
    career: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    img: new FormControl('')
  });
}

ngOnInit(): void {}

  public obtenerEducaciones(): void {
    this.educacionService.getEducacion().subscribe(educaciones => this.educaciones = educaciones);
  }

  
  public abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  public ocultarFormulario(): void {
    this.formularioEducacion.reset();
    this.mostrarFormulario = false;
  }


  public guardarEducacion(): void {
    this.nuevaEducacion.school = this.formularioEducacion.value.school;
    console.log(this.nuevaEducacion.school);
    this.nuevaEducacion.title = this.formularioEducacion.value.title;
    console.log(this.nuevaEducacion.title);
    this.nuevaEducacion.career = this.formularioEducacion.value.career;
    console.log(this.nuevaEducacion.career);
    this.nuevaEducacion.start = this.formularioEducacion.value.start;
    console.log(this.nuevaEducacion.start);
    this.nuevaEducacion.end = this.formularioEducacion.value.end;
    console.log(this.nuevaEducacion.end);
    this.nuevaEducacion.img = this.formularioEducacion.value.img;
    console.log(this.nuevaEducacion.img);
    console.log(this.nuevaEducacion.school);
    console.log(this.formularioEducacion.value.school);
    
    this.educacionService.agregarEducacionAPI(this.nuevaEducacion)
      .subscribe(() => {
        this.obtenerEducaciones();
        this.ocultarFormulario();
        console.log('La educación se agregó correctamente.');
        console.log(this.nuevaEducacion);
        console.log(this.nuevaEducacion.school);
        console.log(this.formularioEducacion.value.school);
        console.log(this.formularioEducacion.valid);
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
