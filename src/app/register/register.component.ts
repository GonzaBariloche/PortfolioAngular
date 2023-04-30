import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/servicios/user.service'
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  async register() {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      this.router.navigate(["/dashboard"]);
    } catch (error) {
      console.log(error);
    }
  }
}