import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { User } from '../../models/user.interface';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router: Router){
    this.form= this.formBuilder.group({
      password:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.email]],
    })
  }

  ngOnInit() {}

  onLogin(form: User){
    console.log("Se ejecutó el login");
    this.authService.login(form).then(() => {
      this.router.navigate(['/portfolio']);
    });
  }
}
