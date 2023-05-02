import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.default.User> | undefined;

  constructor(private authFire: AngularFireAuth, private afAuth: AngularFireAuth) { }

  async login(user: User) {

    const {email, password} = user

    try {

      return await this.authFire.signInWithEmailAndPassword(email, password).then(result=>{

        console.log('Logueado correctamente',result)

      });

    } catch (error) {

      console.log("Hubo un error en el login: ", error);

      return null;

    }

  }
  isLoggedIn(): boolean {
    return !!this.afAuth.currentUser;
  }
}
