/*COMENTAR-DESCOMENTAR-INICIO*/
// import { TransporteService } from '../_services/transporte.service';
import { TransporteMockService as TransporteService } from '../_services/transporte-mock.service';
/*COMENTAR-DESCOMENTAR-FIN*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transporte } from '../_models/Transporte';
import { TransporteForCreate } from '../_models/TransporteForCreate';
import { Vehiculo } from '../_models/Vehiculo';
import { Sucursal } from '../_models/Sucursal';
import { Colaborador } from '../_models/Colaborador';
import { TipoTransporte } from '../_models/TipoTransporte';
import { AutoComplete } from '../_models/AutoComplete';
import { Router, ActivatedRoute } from '@angular/router';

declare let jQuery: any;

@Component({
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.scss']
})
export class TransporteComponent implements OnInit {
  model: Transporte;
  modelForCreate: TransporteForCreate;
  form: FormGroup;

  mostrarMensajeExito: boolean;
  mensajeExito: string;
  mostrarMensajeError: boolean;
  mensajeError: string;

  mostrarEliminar: boolean;

  loadIcon: boolean;

  configVehiculo: AutoComplete;
  vehiculo: Vehiculo;
  vehiculos: Vehiculo[] = [];

  configSucursalSalida: AutoComplete;
  sucursalSalida: Sucursal;
  sucursalesSalida: Sucursal[] = [];

  configSucursalLlegada: AutoComplete;
  sucursalLlegada: Sucursal;
  sucursalesLlegada: Sucursal[] = [];

  configChofer: AutoComplete;
  chofer: Colaborador;
  choferes: Colaborador[] = [];

  configAuxiliar: AutoComplete;
  auxiliar: Colaborador;
  auxiliares: Colaborador[] = [];

  tiposTransporte: TipoTransporte[] = [];

  constructor(
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    jQuery('.prime-sidebar').show();
    jQuery('.navbar-dashboard').show();
    this.createForm();
    this.setConfigVehiculo();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
    this.setConfigChofer();
    this.setConfigAuxiliar();
    this.getTiposTransporte();
    const id: Number = Number(this._route.snapshot.paramMap.get('id'));
    if (id) {
      this.getTransporte(id);
      this.mostrarEliminar = true;
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      vehiculo: ['', Validators.required],
      sucursalSalida: ['', Validators.required],
      fechaSalida: [new Date(), Validators.required],
      horaSalida: [new Date(), Validators.required],
      sucursalLlegada: ['', Validators.required],
      fechaLlegada: [new Date(), Validators.required],
      horaLlegada: [new Date(), Validators.required],
      chofer: ['', Validators.required],
      auxiliar: ['', Validators.required],
      tipoTransporte: ['1', Validators.required],
      activo: [true, []]
    });
  }

  getTransporte(id: Number) {
    this.transporteService.getTransporte(id)
      .subscribe(response => {
        console.log(response);
        this.loadTransporteForDisplay(response);
      }, error => {
        console.log(error);
      });
  }

  loadTransporteForDisplay(transporte: Transporte) {
    this.model = transporte;
    this.vehiculo = {
      id: transporte.vehiculoId,
      placa: transporte.vehiculoPlaca,
      carga: transporte.vehiculoCarga,
      volumetria: transporte.vehiculoVolumetria,
      codConfiguracion: transporte.vehiculoCodConfiguracion,
      nroInscripcion: transporte.vehiculoNroInscripcion,
      marca: transporte.vehiculoMarca
    };
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
    this.chofer = {
      id: transporte.colaboradorChoferId,
      nombre: transporte.colaboradorChoferNombre,
      tipoDocumento: transporte.colaboradorChoferTipoDocumento,
      nroDocumento: transporte.colaboradorChoferNroDocumento,
      nroLicencia: transporte.colaboradorChoferNroLicencia,
      tipo: null // verificar si es necesario tener este valor
    };
    this.auxiliar = {
      id: transporte.colaboradorAuxiliarId,
      nombre: transporte.colaboradorAuxiliarNombre,
      tipoDocumento: transporte.colaboradorAuxiliarTipoDocumento,
      nroDocumento: transporte.colaboradorAuxiliarNroDocumento,
      nroLicencia: transporte.colaboradorAuxiliarNroLicencia,
      tipo: null // verificar si es necesario tener este valor
    };
    this.form.get('vehiculo').setValue(transporte.vehiculoPlaca + ', ' + transporte.vehiculoMarca);
    this.form.get('sucursalSalida').setValue(transporte.sucursalSalidaNombre + ', ' + transporte.sucursalSalidaDepartamento
                  + ', ' + transporte.sucursalSalidaDireccion);
    this.form.get('fechaSalida').setValue(new Date(transporte.fechaSalida));
    this.form.get('horaSalida').setValue(new Date(transporte.fechaSalida));
    this.form.get('sucursalLlegada').setValue(transporte.sucursalLlegadaNombre + ', ' + transporte.sucursalLlegadaDepartamento
                  + ', ' + transporte.sucursalLlegadaDireccion);
    this.form.get('fechaLlegada').setValue(new Date(transporte.fechaLlegada));
    this.form.get('horaLlegada').setValue(new Date(transporte.fechaLlegada));
    this.form.get('chofer').setValue(transporte.colaboradorChoferNombre + ', ' + transporte.colaboradorChoferNroDocumento
                  + ', ' + transporte.colaboradorChoferNroLicencia);
    this.form.get('auxiliar').setValue(transporte.colaboradorAuxiliarNombre + ', ' + transporte.colaboradorAuxiliarNroDocumento
                  + ', ' + transporte.colaboradorAuxiliarNroLicencia);
    this.form.get('tipoTransporte').setValue(transporte.tipo);
    this.form.get('activo').setValue(transporte.activo);
  }

  save(): any {
    if (!this.form.valid) {
      this.markInputsAsDirty();
    } else if (this.validarFechas()) {
      return;
    } else {
      this.loadTransporteModelForSave();
      /*COMENTAR-DESCOMENTAR-INICIO*/
      this.create();
      // if (this.model) {
      //   this.update();
      // } else {
      //   this.create();
      // }
      /*COMENTAR-DESCOMENTAR-FIN*/
    }
  }

  create() {
    /*COMENTAR-DESCOMENTAR-INICIO*/
    this.transporteService.createTransporte(this.model)
    // this.transporteService.createTransporte(this.modelForCreate)
    /*COMENTAR-DESCOMENTAR-FIN*/
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se grabó exitosamente el Nro de Transporte ${response.nroTransporte}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/transporte/${response.id}">Ver/Actualizar</a>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/transporte">Grabar otro</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeError = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });
  }

  update() {
    this.transporteService.updateTransporte(this.modelForCreate)
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se actualizó exitosamente el Nro de Transporte ${response.nroTransporte}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/transporte">Grabar otro</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeError = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });
  }

  confirmDelete() {
    const answer = confirm('¿Confirmar eliminación de Transporte?');
    if (answer) {
      this.delete();
    }
  }

  delete() {
    this.transporteService.deleteTransporte(this.model.id)
      .subscribe(response => {
        console.log(response);
        this._router.navigate(['/transporte']);
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeError = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });
  }

  markInputsAsDirty() {
    this.form.get('vehiculo').markAsDirty();
    this.form.get('sucursalSalida').markAsDirty();
    this.form.get('fechaSalida').markAsDirty();
    this.form.get('horaSalida').markAsDirty();
    this.form.get('sucursalLlegada').markAsDirty();
    this.form.get('fechaLlegada').markAsDirty();
    this.form.get('horaLlegada').markAsDirty();
    this.form.get('chofer').markAsDirty();
    this.form.get('auxiliar').markAsDirty();
    this.form.get('tipoTransporte').markAsDirty();
  }

  loadTransporteModelForSave() {
    const fSalida: Date = this.form.get('fechaSalida').value;
    const hSalida: Date = this.form.get('horaSalida').value;
    const fLlegada: Date = this.form.get('fechaLlegada').value;
    const hLlegada: Date = this.form.get('horaLlegada').value;
    const fechaSalida =
      new Date(fSalida.getFullYear(), fSalida.getMonth(), fSalida.getDate(), hSalida.getHours(), hSalida.getMinutes());
    const fechaLlegada =
      new Date(fLlegada.getFullYear(), fLlegada.getMonth(), fLlegada.getDate(), hLlegada.getHours(), hLlegada.getMinutes());
    fechaSalida.setHours(fechaSalida.getHours() - 5);
    fechaLlegada.setHours(fechaLlegada.getHours() - 5);

    /*COMENTAR-DESCOMENTAR-INICIO*/

    // this.modelForCreate = new TransporteForCreate(
    //   this.model ? this.model.id : 0,
    //   Boolean(this.form.get('activo').value),
    //   fechaSalida,
    //   fechaLlegada,
    //   Number(this.form.get('tipoTransporte').value),
    //   Number(this.sucursalSalida.id),
    //   Number(this.sucursalLlegada.id),
    //   Number(this.chofer.id),
    //   Number(this.auxiliar.id),
    //   Number(this.vehiculo.id)
    // );

    const id = 4;
    fechaSalida.setHours(fechaSalida.getHours() + 5);
    fechaLlegada.setHours(fechaLlegada.getHours() + 5);
    this.model = new Transporte(
      this.model ? this.model.id : id,
      this.model ? this.model.nroTransporte : `T-00${id}`,
      Boolean(this.form.get('activo').value),
      true,
      fechaSalida,
      fechaLlegada,
      Number(this.form.get('tipoTransporte').value),
      Number(this.sucursalSalida.id),
      this.sucursalSalida.nombre,
      this.sucursalSalida.departamento,
      this.sucursalSalida.direccion,
      Number(this.sucursalLlegada.id),
      this.sucursalLlegada.nombre,
      this.sucursalLlegada.departamento,
      this.sucursalLlegada.direccion,
      Number(this.chofer.id),
      this.chofer.nombre,
      this.chofer.tipoDocumento,
      this.chofer.nroDocumento,
      this.chofer.nroLicencia,
      Number(this.auxiliar.id),
      this.auxiliar.nombre,
      this.auxiliar.tipoDocumento,
      this.auxiliar.nroDocumento,
      this.auxiliar.nroLicencia,
      Number(this.vehiculo.id),
      this.vehiculo.placa,
      this.vehiculo.carga,
      this.vehiculo.volumetria,
      this.vehiculo.codConfiguracion,
      this.vehiculo.nroInscripcion,
      this.vehiculo.marca
    );

    /*COMENTAR-DESCOMENTAR-FIN*/
  }


// configuration section

  private setConfigVehiculo() {
    this.configVehiculo = new AutoComplete(
      'vehiculo',
      this.form,
      ['placa', 'marca'],
      this.vehiculos,
      false,
      this.loadIcon,
      'Buscar Vehículo',
      'id',
      ['placa', 'marca', 'carga'],
      []
    );
  }

  getVehiculos(filter: string) {
    this.configVehiculo.loadIcon = true;
    this.transporteService.getVehiculos(filter)
      .subscribe(vehiculos => {
        this.configVehiculo.searchList = vehiculos;
        this.configVehiculo.loadIcon = false;
      });
  }

  setVehiculo(selectedItem: Vehiculo) {
    this.vehiculo = selectedItem;
  }


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


  private setConfigChofer() {
    this.configChofer = new AutoComplete(
      'chofer',
      this.form,
      ['nombre', 'nroDocumento', 'nroLicencia'],
      this.choferes,
      false,
      this.loadIcon,
      'Buscar Chofer',
      'id',
      ['nombre', 'nroDocumento', 'nroLicencia'],
      []
    );
  }

  getChoferes(filter: string) {
    this.configChofer.loadIcon = true;
    this.transporteService.getChoferes(filter)
      .subscribe(choferes => {
        this.configChofer.searchList = choferes;
        this.configChofer.loadIcon = false;
      });
  }

  setChofer(selectedItem: Colaborador) {
    this.chofer = selectedItem;
  }


  private setConfigAuxiliar() {
    this.configAuxiliar = new AutoComplete(
      'auxiliar',
      this.form,
      ['nombre', 'nroDocumento', 'nroLicencia'],
      this.auxiliares,
      false,
      this.loadIcon,
      'Buscar Auxiliar',
      'id',
      ['nombre', 'nroDocumento', 'nroLicencia'],
      []
    );
  }

  getAuxiliares(filter: string) {
    this.configAuxiliar.loadIcon = true;
    this.transporteService.getAuxiliares(filter)
      .subscribe(auxiliares => {
        this.configAuxiliar.searchList = auxiliares;
        this.configAuxiliar.loadIcon = false;
      });
  }

  setAuxiliar(selectedItem: Colaborador) {
    this.auxiliar = selectedItem;
  }


  getTiposTransporte() {
    this.tiposTransporte = [
      { id: 1, nombre: 'Recojo' },
      { id: 2, nombre: 'Transferencia' },
      { id: 3, nombre: 'Ditribucion' }
    ];
  }


  formValidation(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control.dirty && control.errors) ? true : false;
  }

  validarFechas(): boolean {
    const fSalida: Date = this.form.get('fechaSalida').value;
    const hSalida: Date = this.form.get('horaSalida').value;
    const fLlegada: Date = this.form.get('fechaLlegada').value;
    const hLlegada: Date = this.form.get('horaLlegada').value;

    if (!fSalida || !hSalida || !fLlegada || !hLlegada) {
      return false;
    }

    const salida = new Date(fSalida.getFullYear(), fSalida.getMonth(), fSalida.getDate(), hSalida.getHours(), hSalida.getMinutes());
    const llegada = new Date(fLlegada.getFullYear(), fLlegada.getMonth(), fLlegada.getDate(), hLlegada.getHours(), hLlegada.getMinutes());

    return (salida > llegada);
  }

}
