import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { User } from '../../models/user.interface';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router: Router){
    this.form= this.formBuilder.group({
      password:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.email]],
    })
  }

  ngOnInit() {}

  async onLogin(): Promise<void> {
    const { email, password } = this.form.value;

    try {
      await this.authService.login({ email, password });
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/portfolio']);
      } else {
        console.log('Credenciales incorrectas');
        // mostrar mensaje de error
      }
    } catch (error) {
      console.log('Error en la autenticación', error);
      // mostrar mensaje de error
    }
  }
}

   //
 // onLogin(form: User){
  //   this.authService.login(form).then(() => {
     // Verificar si el usuario está autenticado
   //    if (this.authService.isLoggedIn()) {
    //     console.log('Usuario autenticado correctamente');
    //     this.router.navigate(['/portfolio']);
    //   } else {
        // Si la autenticación falla, mostrar mensaje de error
    //     console.log("Credenciales incorrectas");
    //     this.router.navigate(['/iniciar-sesion']);
    //   }
   //  });
  // }
  
 //}
