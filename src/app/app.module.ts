import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';

import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AutoCompleteComponent } from './shared/auto-complete/auto-complete.component';

import { LoginComponent } from './login/login.component';

import { TransporteComponent } from './transporte/transporte.component';
import { TransporteListaComponent } from './transporte-lista/transporte-lista.component';
import { EntregaComponent } from './entrega/entrega.component';
import { EntregaListaComponent } from './entrega-lista/entrega-lista.component';

import { TransporteService } from './_services/transporte.service';
import { TransporteMockService } from './_services/transporte-mock.service';
import { EntregaService } from './_services/entrega.service';
import { EntregaMockService } from './_services/entrega-mock.service';

import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';


import 'jquery-slimscroll';
import { GuiaTransporteComponent } from './guia-transporte/guia-transporte.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    NavbarComponent,
    AutoCompleteComponent,
    LoginComponent,
    TransporteComponent,
    TransporteListaComponent,
    EntregaComponent,
    EntregaListaComponent,
    GuiaTransporteComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    AlertModule.forRoot()
  ],
  providers: [
    AppConfig,
    TransporteService,
    TransporteMockService,
    EntregaService,
    EntregaMockService
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
