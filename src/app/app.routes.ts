import { RouterModule, Routes } from '@angular/router';
import { TransporteComponent } from './transporte/transporte.component';
import { TransporteListaComponent } from './transporte-lista/transporte-lista.component';
import { LoginComponent } from './login/login.component';


 const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transporte/:id', component: TransporteComponent },
  { path: 'transporte', component: TransporteComponent },
  { path: 'transporteLista', component: TransporteListaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

