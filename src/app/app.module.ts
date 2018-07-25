import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AutoCompleteComponent } from './shared/auto-complete/auto-complete.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TransporteComponent } from './transporte/transporte.component';
import { TransporteListaComponent } from './transporte-lista/transporte-lista.component';
import { TransporteService } from './_services/transporte.service';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AutoCompleteComponent,
    TransporteComponent,
    TransporteListaComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    CalendarModule,
    BrowserAnimationsModule
  ],
  providers: [
    TransporteService
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
