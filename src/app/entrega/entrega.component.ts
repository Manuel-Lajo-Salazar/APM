/**/
// import { EntregaService } from '../_services/entrega.service';
import { EntregaMockService as EntregaService } from '../_services/entrega-mock.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entrega } from '../_models/Entrega';
import { EntregaForCreate } from '../_models/EntregaForCreate';
import { Transporte } from '../_models/Transporte';
import { Sucursal } from '../_models/Sucursal';
import { Cliente } from '../_models/Cliente';
import { AutoComplete } from '../_models/AutoComplete';
import { Router, ActivatedRoute } from '@angular/router';

declare let jQuery: any;

@Component({
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {
  model: Entrega;
  modelForCreate: EntregaForCreate;
  form: FormGroup;

  mostrarMensajeExito: boolean;
  mensajeExito: string;
  mostrarMensajeError: boolean;
  mensajeError: string;

  loadIcon: boolean;

  configTransporte: AutoComplete;
  transporte: Transporte;
  transportes: Transporte[] = [];

  configRemitente: AutoComplete;
  remitente: Cliente;
  remitentes: Cliente[] = [];

  configDestinatario: AutoComplete;
  destinatario: Cliente;
  destinatarios: Cliente[] = [];

  configSucursalOrigen: AutoComplete;
  sucursalOrigen: Sucursal;
  sucursalesOrigen: Sucursal[] = [];

  configSucursalDestino: AutoComplete;
  sucursalDestino: Sucursal;
  sucursalesDestino: Sucursal[] = [];

  constructor(
    private entregaService: EntregaService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    jQuery('.prime-sidebar').show();
    jQuery('.navbar-dashboard').show();
    this.createForm();
    this.setConfigTransporte();
    this.setConfigRemitente();
    this.setConfigDestinatario();
    this.setConfigSucursalOrigen();
    this.setConfigSucursalDestino();
    const id: Number = Number(this._route.snapshot.paramMap.get('id'));
    if (id) { this.getEntrega(id); }
  }

  createForm() {
    this.form = this.formBuilder.group({
      transporte: ['', Validators.required],
      remitente: ['', Validators.required],
      destinatario: ['', Validators.required],
      sucursalOrigen: ['', Validators.required],
      sucursalDestino: ['', Validators.required],
      fechaEntrega: [new Date(), Validators.required],
      horaEntrega: [new Date(), Validators.required],
      numeroGuia: ['', Validators.required],
      numeroBultos: ['', Validators.required],
    });
  }

  getEntrega(id: Number) {
    /**/
    this.entregaService.getEntrega(id)
      .subscribe(response => {
        console.log(response);
        this.loadEntregaForDisplay(response);
      }, error => {
        console.log(error);
      });
  }

  loadEntregaForDisplay(entrega: Entrega) {
    this.model = entrega;
    this.transporte = {
      id: entrega.transporteId,
      activo: true,
      fechaSalida: entrega.transporteFechaSalida,
      fechaLlegada: entrega.transporteFechaLlegada,
      tipo: null,
      sucursalSalidaId: entrega.transporteSucursalSalidaId,
      sucursalSalidaNombre: entrega.transporteSucursalSalidaNombre,
      sucursalSalidaDepartamento: entrega.transporteSucursalSalidaDepartamento,
      sucursalSalidaDireccion: null,
      sucursalLlegadaId: entrega.transporteSucursalLlegadaId,
      sucursalLlegadaNombre: entrega.transporteSucursalLlegadaNombre,
      sucursalLlegadaDepartamento: entrega.transporteSucursalLlegadaDepartamento,
      sucursalLlegadaDireccion: null,
      colaboradorChoferId: entrega.transporteColaboradorChoferId,
      colaboradorChoferNombre: entrega.transporteColaboradorChoferNombre,
      colaboradorChoferTipoDocumento: null,
      colaboradorChoferNroDocumento: null,
      colaboradorChoferNroLicencia: null,
      colaboradorAuxiliarId: entrega.tranpsorteColaboradorAuxiliarId,
      colaboradorAuxiliarNombre: entrega.tranpsorteColaboradorAuxiliarNombre,
      colaboradorAuxiliarTipoDocumento: null,
      colaboradorAuxiliarNroDocumento: null,
      colaboradorAuxiliarNroLicencia: null,
      vehiculoId: entrega.transporteVehiculoId,
      vehiculoPlaca: entrega.transporteVehiculoPlaca,
      vehiculoCarga: entrega.transporteVehiculoCarga,
      vehiculoVolumetria: entrega.transporteVehiculoVolumetria,
      vehiculoCodConfiguracion: null,
      vehiculoNroInscripcion: null,
      vehiculoMarca: null
    };
    this.remitente = {
      id: entrega.clienteRemitenteId,
      razonSocial: entrega.clienteRemitenteRazonSocial,
      ruc: entrega.clienteRemitenteRuc,
      tipo: null // verificar si es necesario tener este valor
    };
    this.destinatario = {
      id: entrega.clienteDestinatarioId,
      razonSocial: entrega.clienteDestinatarioRazonSocial,
      ruc: entrega.clienteDestinatarioRuc,
      tipo: null // verificar si es necesario tener este valor
    };
    this.sucursalOrigen = {
      id: entrega.sucursalOrigenId,
      nombre: entrega.sucursalOrigenNombre,
      departamento: entrega.sucursalOrigenDepartamento,
      direccion: entrega.sucursalOrigenDireccion
    };
    this.sucursalDestino = {
      id: entrega.sucursalDestinoId,
      nombre: entrega.sucursalDestinoNombre,
      departamento: entrega.sucursalDestinoDepartamento,
      direccion: entrega.sucursalDestinoDireccion
    };
    this.form.get('transporte').setValue(entrega.transporteId);
    this.form.get('remitente').setValue(entrega.clienteRemitenteRazonSocial + ', ' + entrega.clienteRemitenteRuc);
    this.form.get('destinatario').setValue(entrega.clienteDestinatarioRazonSocial + ', ' + entrega.clienteDestinatarioRuc);
    this.form.get('sucursalOrigen').setValue(entrega.sucursalOrigenNombre + ', ' + entrega.sucursalOrigenDepartamento
    + ', ' + entrega.sucursalOrigenDireccion);
    this.form.get('sucursalDestino').setValue(entrega.sucursalDestinoNombre + ', ' + entrega.sucursalDestinoDepartamento
    + ', ' + entrega.sucursalDestinoDireccion);
    this.form.get('fechaEntrega').setValue(new Date(entrega.fechaEntrega));
    this.form.get('horaEntrega').setValue(new Date(entrega.fechaEntrega));
    this.form.get('numeroGuia').setValue(entrega.numeroGuia);
    this.form.get('numeroBultos').setValue(entrega.numeroBultos);
  }

  save(): any {
    if (!this.form.valid) {
      this.markInputsAsDirty();
    } else {
      /**/
      // this.loadEntregaModelForSave();
      // if (this.model) {
      //   this.update();
      // } else {
      //   this.create();
      // }
      this.create();
    }
  }

  create() {
    /**/
    this.entregaService.createEntrega(this.model)
    // this.entregaService.createEntrega(this.modelForCreate)
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se grabó exitosamente el Nro de Entrega T-00${response.id}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega/${response.id}">Ver</a>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega">Grabar otra</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error}.</span>`;
      });
  }

  update() {
    /**/
    this.entregaService.updateEntrega(this.model)
    // this.entregaService.updateEntrega(this.modelForCreate)
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se actualizó exitosamente el Nro de Entrega T-00${response.id}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega">Grabar otra</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error}.</span>`;
      });
  }

  markInputsAsDirty() {
    this.form.get('transporte').markAsDirty();
    this.form.get('remitente').markAsDirty();
    this.form.get('destinatario').markAsDirty();
    this.form.get('sucursalOrigen').markAsDirty();
    this.form.get('sucursalDestino').markAsDirty();
    this.form.get('fechaLlegada').markAsDirty();
    this.form.get('horaLlegada').markAsDirty();
    this.form.get('numeroGuia').markAsDirty();
    this.form.get('numeroBultos').markAsDirty();
  }

  loadEntregaModelForSave() {
    const fEntrega: Date = this.form.get('fechaEntrega').value;
    const hEntrega: Date = this.form.get('horaEntrega').value;
    const entrega = new Date(fEntrega.getFullYear(), fEntrega.getMonth(), fEntrega.getDate(), hEntrega.getHours(), hEntrega.getMinutes());
    entrega.setHours(entrega.getHours() - 5);

    // this.modelForCreate = new EntregaForCreate(
    //   this.model ? this.model.id : 0,
    //   Number(this.transporte.id),
    //   Number(this.remitente.id),
    //   Number(this.destinatario.id),
    //   Number(this.sucursalOrigen.id),
    //   Number(this.sucursalDestino.id),
    //   entrega,
    //   String(this.form.get('numeroGuia').value),
    //   Number(this.form.get('numeroBultos').value)
    // );

    // MODELO para grabar en json-server
    const id = 2;
    this.model = new Entrega(
      this.model ? this.model.id : id,
      Number(this.transporte.id),
      this.transporte.fechaSalida,
      this.transporte.fechaLlegada,
      this.transporte.sucursalSalidaId,
      this.transporte.sucursalSalidaNombre,
      this.transporte.sucursalSalidaDepartamento,
      this.transporte.sucursalLlegadaId,
      this.transporte.sucursalLlegadaNombre,
      this.transporte.sucursalLlegadaDepartamento,
      this.transporte.colaboradorChoferId,
      this.transporte.colaboradorChoferNombre,
      this.transporte.colaboradorAuxiliarId,
      this.transporte.colaboradorAuxiliarNombre,
      this.transporte.vehiculoId,
      this.transporte.vehiculoPlaca,
      this.transporte.vehiculoCarga,
      this.transporte.vehiculoVolumetria,
      Number(this.remitente.id),
      this.remitente.razonSocial,
      this.remitente.ruc,
      Number(this.destinatario.id),
      this.destinatario.razonSocial,
      this.destinatario.ruc,
      Number(this.sucursalOrigen.id),
      this.sucursalOrigen.nombre,
      this.sucursalOrigen.departamento,
      this.sucursalOrigen.direccion,
      Number(this.sucursalDestino.id),
      this.sucursalDestino.nombre,
      this.sucursalDestino.departamento,
      this.sucursalDestino.direccion,
      new Date(fEntrega.getFullYear(), fEntrega.getMonth(), fEntrega.getDate(), hEntrega.getHours(), hEntrega.getMinutes()),
      String(this.form.get('numeroGuia').value),
      Number(this.form.get('numeroBultos').value)
    );
  }


// configuration section


  private setConfigTransporte() {
    this.configTransporte = new AutoComplete(
      'transporte',
      this.form,
      ['id'],
      this.transportes,
      false,
      this.loadIcon,
      'Buscar Transporte',
      'id',
      ['id'],
      []
    );
  }

  getTransportes(filter: string) {
    this.configTransporte.loadIcon = true;
    this.entregaService.getTransportes(filter)
      .subscribe(transportes => {
        this.configTransporte.searchList = transportes;
        this.configTransporte.loadIcon = false;
      });
  }

  setTransporte(selectedItem: Transporte) {
    this.transporte = selectedItem;
  }


  private setConfigRemitente() {
    this.configRemitente = new AutoComplete(
      'remitente',
      this.form,
      ['razonSocial', 'ruc'],
      this.remitentes,
      false,
      this.loadIcon,
      'Buscar Remitente',
      'id',
      ['razonSocial', 'ruc'],
      []
    );
  }

  getRemitentes(filter: string) {
    this.configRemitente.loadIcon = true;
    this.entregaService.getRemitentes(filter)
      .subscribe(remitentes => {
        this.configRemitente.searchList = remitentes;
        this.configRemitente.loadIcon = false;
      });
  }

  setRemitente(selectedItem: Cliente) {
    this.remitente = selectedItem;
  }


  private setConfigDestinatario() {
    this.configDestinatario = new AutoComplete(
      'destinatario',
      this.form,
      ['razonSocial', 'ruc'],
      this.destinatarios,
      false,
      this.loadIcon,
      'Buscar Destinatario',
      'id',
      ['razonSocial', 'ruc'],
      []
    );
  }

  getDestinatarios(filter: string) {
    this.configDestinatario.loadIcon = true;
    this.entregaService.getDestinatarios(filter)
      .subscribe(destinatarios => {
        this.configDestinatario.searchList = destinatarios;
        this.configDestinatario.loadIcon = false;
      });
  }

  setDestinatario(selectedItem: Cliente) {
    this.destinatario = selectedItem;
  }


  private setConfigSucursalOrigen() {
    this.configSucursalOrigen = new AutoComplete(
      'sucursalOrigen',
      this.form,
      ['nombre', 'departamento', 'direccion'],
      this.sucursalesOrigen,
      false,
      this.loadIcon,
      'Buscar Sucursal origen',
      'id',
      ['nombre', 'departamento', 'direccion'],
      []
    );
  }

  getSucursalesOrigen(filter: string) {
    this.configSucursalOrigen.loadIcon = true;
    this.entregaService.getSucursales(filter)
      .subscribe(sucursales => {
        this.configSucursalOrigen.searchList = sucursales;
        this.configSucursalOrigen.loadIcon = false;
      });
  }

  setSucursalOrigen(selectedItem: Sucursal) {
    this.sucursalOrigen = selectedItem;
  }


  private setConfigSucursalDestino() {
    this.configSucursalDestino = new AutoComplete(
      'sucursalDestino',
      this.form,
      ['nombre', 'departamento', 'direccion'],
      this.sucursalesDestino,
      false,
      this.loadIcon,
      'Buscar Sucursal destino',
      'id',
      ['nombre', 'departamento', 'direccion'],
      []
    );
  }

  getSucursalesDestino(filter: string) {
    this.configSucursalDestino.loadIcon = true;
    this.entregaService.getSucursales(filter)
      .subscribe(sucursales => {
        this.configSucursalDestino.searchList = sucursales;
        this.configSucursalDestino.loadIcon = false;
      });
  }

  setSucursalDestino(selectedItem: Sucursal) {
    this.sucursalDestino = selectedItem;
  }


  formValidation(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control.dirty && control.errors) ? true : false;
  }

}
