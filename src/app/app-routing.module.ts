import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {path: 'portfolio',component:PortfolioComponent},
  {path: 'iniciar-sesion',component:LoginComponent},
  {path:'',redirectTo:'iniciar-sesion',pathMatch:'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }