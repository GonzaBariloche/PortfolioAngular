import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.default.User> | undefined;
  isAuthenticated = false; // Agregamos la propiedad isAuthenticated y la inicializamos en falso.

  constructor(private authFire: AngularFireAuth, private afAuth: AngularFireAuth) { }

  async login(user: User) {

    const {email, password} = user

    try {

      return await this.authFire.signInWithEmailAndPassword(email, password).then(result=>{

        console.log('Logueado correctamente',result)
        this.isAuthenticated = true; // Actualizamos la propiedad isAuthenticated a verdadero.

      });

    } catch (error) {

      console.log("Hubo un error en el login: ", error);
      this.isAuthenticated = false; // Actualizamos la propiedad isAuthenticated a falso.

      return null;

    }

  }
  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }
}

