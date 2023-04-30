import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Agregamos esta línea
import { RouterModule } from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaEducacionComponent } from './componentes/experiencia-educacion/experiencia-educacion.component';

import { getAnalytics } from "firebase/analytics";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

import {HttpClientModule} from '@angular/common/http';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from "./register/register.component"
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaEducacionComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
