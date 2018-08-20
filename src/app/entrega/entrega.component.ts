/**/
import { TransporteService } from '../_services/transporte.service';
// import { TransporteMockService as TransporteService } from '../_services/transporte-mock.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transporte } from '../_models/Transporte';
import { Sucursal } from '../_models/Sucursal';
import { AutoComplete } from '../_models/AutoComplete';
import { Router, ActivatedRoute } from '@angular/router';

declare let jQuery: any;

@Component({
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {
  model: Transporte;
  form: FormGroup;

  mostrarMensajeExito: boolean;
  mensajeExito: string;
  mostrarMensajeError: boolean;
  mensajeError: string;

  loadIcon: boolean;

  configSucursalSalida: AutoComplete;
  sucursalSalida: Sucursal;
  sucursalesSalida: Sucursal[] = [];

  configSucursalLlegada: AutoComplete;
  sucursalLlegada: Sucursal;
  sucursalesLlegada: Sucursal[] = [];

  constructor(
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    jQuery('.prime-sidebar').show();
    jQuery('.navbar-dashboard').show();
    this.createForm();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
    // const id: Number = Number(this._route.snapshot.paramMap.get('id'));
    // if (id) { this.getTransporte(id); }
  }

  createForm() {
    this.form = this.formBuilder.group({
      sucursalSalida: ['', Validators.required],
      sucursalLlegada: ['', Validators.required],
      fechaLlegada: [new Date(), Validators.required],
      horaLlegada: [new Date(), Validators.required]
    });
  }

  // getTransporte(id: Number) {
  //   /**/
  //   this.transporteService.getTransporte(id)
  //     .subscribe(response => {
  //       console.log(response);
  //       this.loadTransporteForDisplay(response);
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  loadTransporteForDisplay(transporte: Transporte) {
    this.model = transporte;
    this.sucursalSalida = {
      id: transporte.sucursalSalidaId,
      nombre: transporte.sucursalSalidaNombre,
      departamento: transporte.sucursalSalidaDepartamento,
      direccion: transporte.sucursalSalidaDireccion
    };
    this.sucursalLlegada = {
      id: transporte.sucursalLlegadaId,
      nombre: transporte.sucursalLlegadaNombre,
      departamento: transporte.sucursalLlegadaDepartamento,
      direccion: transporte.sucursalLlegadaDireccion
    };
    this.form.get('sucursalSalida').setValue(transporte.sucursalSalidaNombre + ', ' + transporte.sucursalSalidaDepartamento
                  + ', ' + transporte.sucursalSalidaDireccion);
    this.form.get('sucursalLlegada').setValue(transporte.sucursalLlegadaNombre + ', ' + transporte.sucursalLlegadaDepartamento
                  + ', ' + transporte.sucursalLlegadaDireccion);
    this.form.get('fechaLlegada').setValue(new Date(transporte.fechaLlegada));
    this.form.get('horaLlegada').setValue(new Date(transporte.fechaLlegada));
  }

  save(): any {
    // if (!this.form.valid) {
    //   this.markInputsAsDirty();
    // } else if (this.validarFechas()) {
    //   return;
    // } else {
    //   this.loadTransporteModelForSave();
    //   if (this.model) {
    //     this.update();
    //   } else {
    //     this.create();
    //   }
    //   /**/
    //   // this.create();
    // }
  }

  create() {
    // /**/
    // // this.transporteService.createTransporte(this.model)
    // this.transporteService.createTransporte(this.modelForCreate)
    //   .subscribe(response => {
    //     console.log(response);
    //     this.mostrarMensajeExito = true;
    //     this.mensajeExito = `<span class="fw-semi-bold">Se grabó exitosamente el Nro de Transporte T-00${response.id}.</span>` +
    //       `<a class="btn btn-default btn-xs float-right mr-5" href="/transporte/${response.id}">Ver</a>` +
    //       `<a class="btn btn-default btn-xs float-right mr-5" href="/transporte">Grabar otro</a>`;
    //   }, error => {
    //     console.log(error);
    //     this.mostrarMensajeError = true;
    //     this.mensajeExito = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error}.</span>`;
    //   });
  }

  update() {
    // /**/
    // // this.transporteService.updateTransporte(this.model)
    // this.transporteService.updateTransporte(this.modelForCreate)
    //   .subscribe(response => {
    //     console.log(response);
    //     this.mostrarMensajeExito = true;
    //     this.mensajeExito = `<span class="fw-semi-bold">Se actualizó exitosamente el Nro de Transporte T-00${response.id}.</span>` +
    //       `<a class="btn btn-default btn-xs float-right mr-5" href="/transporte">Grabar otro</a>`;
    //   }, error => {
    //     console.log(error);
    //     this.mostrarMensajeError = true;
    //     this.mensajeExito = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error}.</span>`;
    //   });
  }

  markInputsAsDirty() {
    this.form.get('sucursalSalida').markAsDirty();
    this.form.get('sucursalLlegada').markAsDirty();
    this.form.get('fechaLlegada').markAsDirty();
    this.form.get('horaLlegada').markAsDirty();
  }

  loadTransporteModelForSave() {
    // const fSalida: Date = this.form.get('fechaSalida').value;
    // const hSalida: Date = this.form.get('horaSalida').value;
    // const fLlegada: Date = this.form.get('fechaLlegada').value;
    // const hLlegada: Date = this.form.get('horaLlegada').value;
    // const salida = new Date(fSalida.getFullYear(), fSalida.getMonth(), fSalida.getDate(), hSalida.getHours(), hSalida.getMinutes());
    // const llegada = new Date(fLlegada.getFullYear(), fLlegada.getMonth(), fLlegada.getDate(), hLlegada.getHours(), hLlegada.getMinutes());
    // salida.setHours(salida.getHours() - 5);
    // llegada.setHours(llegada.getHours() - 5);

    // this.modelForCreate = new TransporteForCreate(
    //   this.model ? this.model.id : 0,
    //   Boolean(this.form.get('activo').value),
    //   salida,
    //   llegada,
    //   Number(this.form.get('tipoTransporte').value),
    //   Number(this.sucursalSalida.id),
    //   Number(this.sucursalLlegada.id),
    //   Number(this.chofer.id),
    //   Number(this.auxiliar.id),
    //   Number(this.vehiculo.id)
    // );

    // // MODELO para grabar en json-server
    // const id = 6;
    // this.model = new Transporte(
    //   this.model ? this.model.id : id,
    //   Boolean(this.form.get('activo').value),
    //   new Date(fSalida.getFullYear(), fSalida.getMonth(), fSalida.getDate(), hSalida.getHours(), hSalida.getMinutes()),
    //   new Date(fLlegada.getFullYear(), fLlegada.getMonth(), fLlegada.getDate(), hLlegada.getHours(), hLlegada.getMinutes()),
    //   Number(this.form.get('tipoTransporte').value),
    //   Number(this.sucursalSalida.id),
    //   this.sucursalSalida.nombre,
    //   this.sucursalSalida.departamento,
    //   this.sucursalSalida.direccion,
    //   Number(this.sucursalLlegada.id),
    //   this.sucursalLlegada.nombre,
    //   this.sucursalLlegada.departamento,
    //   this.sucursalLlegada.direccion,
    //   Number(this.chofer.id),
    //   this.chofer.nombre,
    //   this.chofer.tipoDocumento,
    //   this.chofer.nroDocumento,
    //   this.chofer.nroLicencia,
    //   Number(this.auxiliar.id),
    //   this.auxiliar.nombre,
    //   this.auxiliar.tipoDocumento,
    //   this.auxiliar.nroDocumento,
    //   this.auxiliar.nroLicencia,
    //   Number(this.vehiculo.id),
    //   this.vehiculo.placa,
    //   this.vehiculo.carga,
    //   this.vehiculo.volumetria,
    //   this.vehiculo.codConfiguracion,
    //   this.vehiculo.nroInscripcion,
    //   this.vehiculo.marca
    // );
  }


// configuration section


  private setConfigSucursalSalida() {
    this.configSucursalSalida = new AutoComplete(
      'sucursalSalida',
      this.form,
      ['nombre', 'departamento', 'direccion'],
      this.sucursalesSalida,
      false,
      this.loadIcon,
      'Buscar Sucursal de salida',
      'id',
      ['nombre', 'departamento', 'direccion'],
      []
    );
  }

  getSucursalesSalida(filter: string) {
    this.configSucursalSalida.loadIcon = true;
    this.transporteService.getSucursales(filter)
      .subscribe(sucursales => {
        this.configSucursalSalida.searchList = sucursales;
        this.configSucursalSalida.loadIcon = false;
      });
  }

  setSucursalSalida(selectedItem: Sucursal) {
    this.sucursalSalida = selectedItem;
  }


  private setConfigSucursalLlegada() {
    this.configSucursalLlegada = new AutoComplete(
      'sucursalLlegada',
      this.form,
      ['nombre', 'departamento', 'direccion'],
      this.sucursalesLlegada,
      false,
      this.loadIcon,
      'Buscar Sucursal de llegada',
      'id',
      ['nombre', 'departamento', 'direccion'],
      []
    );
  }

  getSucursalesLlegada(filter: string) {
    this.configSucursalLlegada.loadIcon = true;
    this.transporteService.getSucursales(filter)
      .subscribe(sucursales => {
        this.configSucursalLlegada.searchList = sucursales;
        this.configSucursalLlegada.loadIcon = false;
      });
  }

  setSucursalLlegada(selectedItem: Sucursal) {
    this.sucursalLlegada = selectedItem;
  }


  formValidation(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control.dirty && control.errors) ? true : false;
  }

}
