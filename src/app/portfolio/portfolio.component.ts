import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  isLoggedIn: Observable<boolean> | undefined; // Cambiar a tipo Observable<boolean>

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/iniciar-sesion']);
      }
    });}
  }

