import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit, OnDestroy {
    miPortfolio: any;
    isLoggedIn = false;
    editMode = 'Usted está en modo observación. Ingrese para editar';
 
    private subscription: Subscription;

    constructor(private datosPortfolio:PortfolioService,  private authService:AuthService, private router:Router) {
      this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.editMode = isLoggedIn ? 'Usted está en modo edición' : 'Usted está en modo observación. Ingrese para editar';
      });}

    ngOnInit():void{
      this.datosPortfolio.obtenerDatos().subscribe(data => {
        this.miPortfolio = data.sobremi;
      });
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/iniciar-sesion']);
    }
}
