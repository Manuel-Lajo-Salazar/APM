import { TransporteService } from '../_services/transporte.service';
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

@Component({
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.css']
})
export class TransporteComponent implements OnInit {
  model: Transporte;
  modelForCreate: TransporteForCreate;
  form: FormGroup;

  loadIcon: boolean;
  errorMessage;

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
    this.createForm();
    this.setConfigVehiculo();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
    this.setConfigChofer();
    this.setConfigAuxiliar();
    this.getTiposTransporte();
    this.getTransporte(Number(this._route.snapshot.paramMap.get('id')));
  }

  createForm() {
    this.form = this.formBuilder.group({
      vehiculo: ['', Validators.required],
      sucursalSalida: ['', Validators.required],
      fechaSalida: [new Date(), Validators.required],
      sucursalLlegada: ['', Validators.required],
      fechaLlegada: [new Date(), Validators.required],
      chofer: ['', Validators.required],
      auxiliar: ['', Validators.required],
      tipoTransporte: ['', Validators.required],
      activo: [true, []]
    });
  }

  getTransporte(id: Number) {
    if (id) {
      this.transporteService.getTransporte(id)
        .subscribe(response => {
          console.log(response);
          this.loadTransporteForDisplay(response);
        }, error => {
          console.log(error);
        });
    }
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
    this.form.get('vehiculo').setValue(transporte.vehiculoPlaca); /**/
    this.form.get('sucursalSalida').setValue(transporte.sucursalSalidaNombre); /**/
    this.form.get('fechaSalida').setValue(new Date(transporte.fechaSalida));
    this.form.get('sucursalLlegada').setValue(transporte.sucursalLlegadaNombre);
    this.form.get('fechaLlegada').setValue(new Date(transporte.fechaLlegada));
    this.form.get('chofer').setValue(transporte.colaboradorChoferNombre);
    this.form.get('auxiliar').setValue(transporte.colaboradorAuxiliarNombre);
    this.form.get('tipoTransporte').setValue(transporte.tipo.nombre);
    this.form.get('activo').setValue(transporte.activo);
  }

  saveAndNew(): any {
    if (!this.form.valid) {
      this.markInputsAsDirty();
    } else {
      this.save('andNew');
    }
  }

  saveOnly(): any {
    if (!this.form.valid) {
      this.markInputsAsDirty();
    } else {
      this.save('only');
    }
  }

  save(type: string): any {
    this.loadTransporteModelForSave();
    if (this.model.id) {
      this.update(type);
    } else {
      this.create(type);
    }
  }

  update(type: string) {
    this.transporteService.updateTransporte(this.model)
      .subscribe(response => {
        console.log(response);
        if (type === 'only') {
          this._router.navigate(['/transporte', response.id]);
        }
        if (type === 'andNew') {
          this._router.navigate(['/transporte']);
        }
      }, error => {
        console.log(error);
      });
  }

  create(type: string) {
    // change to create new ID for Transporte
    this.model.id = 6;
    this.transporteService.createTransporte(this.model)
      .subscribe(response => {
        console.log(response);
        if (type === 'only') {
          this._router.navigate(['/transporte', response.id]);
        }
        if (type === 'andNew') {
          this._router.navigate(['/transporte']);
        }
      }, error => {
        console.log(error);
      });
  }

  markInputsAsDirty() {
    this.form.get('vehiculo').markAsDirty();
    this.form.get('sucursalSalida').markAsDirty();
    this.form.get('fechaSalida').markAsDirty();
    this.form.get('sucursalLlegada').markAsDirty();
    this.form.get('fechaLlegada').markAsDirty();
    this.form.get('chofer').markAsDirty();
    this.form.get('auxiliar').markAsDirty();
    this.form.get('tipoTransporte').markAsDirty();
  }

  loadTransporteModelForSave() {
    this.model = new Transporte(
      this.model ? this.model.id : undefined,
      Boolean(this.form.get('activo').value),
      this.form.get('fechaSalida').value,
      this.form.get('fechaLlegada').value,
      null,
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
      }, error => {
        this.errorMessage = <any>error;
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
      }, error => {
        this.errorMessage = <any>error;
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
      }, error => {
        this.errorMessage = <any>error;
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
      }, error => {
        this.errorMessage = <any>error;
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
      }, error => {
        this.errorMessage = <any>error;
        this.configAuxiliar.loadIcon = false;
      });
  }

  setAuxiliar(selectedItem: Colaborador) {
    this.auxiliar = selectedItem;
  }


  getTiposTransporte() {
    this.transporteService.getTiposTransporte()
      .subscribe(tiposTransporte => {
        this.tiposTransporte = tiposTransporte;
      }, error => {
        this.errorMessage = <any>error;
      });
  }


  formValidation(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control.dirty && control.errors) ? true : false;
  }

}
