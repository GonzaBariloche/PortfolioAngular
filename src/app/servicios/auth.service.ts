import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, of, startWith } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$: Observable<boolean> = of(false); // <--- Quitamos el inicializador de la propiedad

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user),
      startWith(false)
    );
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): void {
    this.afAuth.signOut();
  }

  isLoggedIn(): Observable<any> {
    return this.afAuth.authState;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/iniciar-sesion']);
          resolve(false);
        }
      });
    });
  }

}

