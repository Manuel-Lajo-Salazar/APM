import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';

import { NavComponent } from './nav/nav.component';
import { AutoCompleteComponent } from './shared/auto-complete/auto-complete.component';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TransporteComponent } from './transporte/transporte.component';
import { TransporteListaComponent } from './transporte-lista/transporte-lista.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TransporteService } from './_services/transporte.service';
import { TransporteMockService } from './_services/transporte-mock.service';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule } from 'ngx-bootstrap';

import 'jquery-slimscroll';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AutoCompleteComponent,
    TransporteComponent,
    TransporteListaComponent,
    SidebarComponent,
    NavbarComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule,
    // BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    CalendarModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppConfig,
    TransporteService,
    TransporteMockService
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
