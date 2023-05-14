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
    school: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    career: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl(''),
    img: new FormControl('')
  });


  constructor(private educacionService: EducacionService, private formBuilder: FormBuilder) { 
    
    this.formularioEducacion = new FormGroup({
    school: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    career: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl(''),
    img: new FormControl('')
  });
}

ngOnInit(): void {
  this.formularioEducacion = this.formBuilder.group({
    school: ['', Validators.required],
    title: ['', Validators.required],
    career: ['', Validators.required],
    start: ['', Validators.required],
    end: [''],
    img: ['']
  });
}

  public obtenerEducaciones(): void {
    this.educacionService.getEducacion().subscribe(educaciones => this.educaciones = educaciones);
  }

  
  public abrirFormulario(): void {
    const nuevaEducacion = new Educacion(0, '', '', '', '', '', '');
    this.mostrarFormulario = true;
  }

  ocultarFormulario(): void {
    this.formularioEducacion.reset();
    this.mostrarFormulario = false;
  }


  public guardarEducacion(): void {
    this.nuevaEducacion = this.formularioEducacion.value;
    this.educacionService.agregarEducacionAPI(this.nuevaEducacion)
      .subscribe(() => {
        this.obtenerEducaciones();
        this.ocultarFormulario();
        console.log('La educación se agregó correctamente.');
        console.log(this.nuevaEducacion);
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
