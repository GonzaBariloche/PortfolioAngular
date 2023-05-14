import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription, Observable } from 'rxjs';
import { EducacionService } from 'src/app/educacion.service';
import { Educacion } from '../models/educacion.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Input() educaciones: Educacion[] = [];

  educacion: Educacion;

  showForm: boolean = false;
  educacionForm!: FormGroup;

  educacionId!: number;

  public educacionesAPI: Educacion[] = [];
  public nuevaEducacion: Educacion = new Educacion(0, '', '', '', '', '', '');

  public mostrarFormulario: boolean = false;


  constructor(
    private educacionService: EducacionService,
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){this.educacionForm = this.fb.group({
    school: ['', Validators.required],
    title: ['', Validators.required],
    img: ['', Validators.required],
    career: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required]
  });
  this.educacion = {id: 0, school: '', title: '', img: '', career: '', start: '', end: ''};
  this.educacionId = +this.route.snapshot.params['id'];};


ngOnInit(): void {
  this.educacionId = +this.route.snapshot.params['id'];
  this.getEducaciones();
  this.initForm();
}

initForm(): void {
  this.educacionForm = this.fb.group({
    school: ['', Validators.required],
    title: ['', Validators.required],
    img: ['', Validators.required],
    career: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
  });
}

  //public obtenerEducaciones(): void {
  //  this.educacionService.getEducacion().subscribe(educaciones => this.educaciones = educaciones);
  //}

///Puse un cero para probar
getEducaciones(): void {
  this.educacionService.getEducacion().subscribe(
    (data: Educacion[]) => {
      this.educaciones = this.educaciones.concat(data);
    },
    (error) => {
      console.error('Ocurrió un error al obtener las educaciones: ', error);
    }
  );
}


  
  
  public abrirFormulario(): void {
    this.nuevaEducacion = new Educacion(0, '', '', '', '', '', '');
    this.mostrarFormulario = true;
  }

  public ocultarFormulario(): void {
    this.mostrarFormulario = false;
  }


  ///esto es lo mas importante!!!
  public guardarEducacion(): void {
    console.log('nueva educaicon:');
    console.log(this.nuevaEducacion);
    console.log('school:');
    console.log(this.nuevaEducacion.school);
    console.log('valid:');


    console.log('objeto a enviar:');
    console.log(this.nuevaEducacion);

    this.educacionService.agregarEducacionAPI(this.nuevaEducacion)
      .subscribe(() => {
        console.log('lo que llega:');
        console.log(this.nuevaEducacion);
        console.log(this.nuevaEducacion.school);

        this.getEducaciones();
        this.ocultarFormulario();
        console.log('La educación se agregó correctamente.');
        }, error => {
        console.error('Ocurrió un error al agregar la educación: ', error);
      });
  }



  public showEditForm(educacionId: number): void {
    this.educacionId = educacionId;
    this.educacionService.getEducacion(educacionId).subscribe((data) => {
        this.educacion = data;
        this.educacionForm.patchValue({
            school: this.educacion.school,
            title: this.educacion.title,
            img: this.educacion.img,
            career: this.educacion.career,
            start: this.educacion.start,
            end: this.educacion.end,
        });
        this.showForm = true;
    });
}









  updateEducacion(): void {
    const updatedEducacion = {...this.educacionForm.value, id: this.educacionId};
    this.educacionService.updateEducacion(updatedEducacion)
      .subscribe(() => {
        this.getEducaciones();
        this.showForm = false;
        this.educacionForm.reset();
        console.log('La educación se actualizó correctamente.');
        this.router.navigate(['/educaciones']);
      }, error => {
        console.error('Ocurrió un error al actualizar la educación: ', error);
      });
  }


  public deleteEducacion(id: number) {
    if (confirm("¿Estás seguro de que quieres eliminar esta educación?")) {
      this.educacionService.deleteEducacion(id).subscribe(() => {
        this.educaciones = this.educaciones.filter(e => e.id !== id);
      });
    }
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
