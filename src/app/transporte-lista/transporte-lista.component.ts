
import { TransporteService } from '../_services/transporte.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Transporte } from './../_models/Transporte';
import { AutoComplete } from '../_models/AutoComplete';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transporte-lista',
  templateUrl: './transporte-lista.component.html',
  styleUrls: ['./transporte-lista.component.css']
})

export class TransporteListaComponent implements OnInit {
  resultados: Transporte[] = [];
  model: Transporte;
  form: FormGroup;

  loadIcon: boolean;
  errorMessage;

  configTransporte: AutoComplete;
  transporte: any;
  transportes = [];

  configVehiculo: AutoComplete;
  vehiculo: any;
  vehiculos = [];

  configSucursalSalida: AutoComplete;
  sucursalSalida: any;
  sucursalesSalida = [];

  configSucursalLlegada: AutoComplete;
  sucursalLlegada: any;
  sucursalesLlegada = [];

  today: number = Date.now();

  constructor(
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.createForm();
    this.setConfigVehiculo();
    this.setConfigTransporte();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
  }

  createForm() {
    this.form = this.formBuilder.group({
      transporte: ['', []],
      vehiculo: ['', []],
      sucursalSalida: ['', []],
      sucursalLlegada: ['', []],
      fechaSalida: ['', []],
      fechaLlegada: ['', []]
    });
  }


  private setConfigTransporte() {
    this.configTransporte = new AutoComplete(
      'transporte',
      this.form,
      ['numero'],
      this.transportes,
      false,
      this.loadIcon,
      'Buscar Transportes',
      'id',
      ['numero', 'placa,tipo,marca', 'chofer'],
      []
    );
  }

  getTransportes(filter: string) {
    this.configTransporte.loadIcon = true;
    this.transporteService.getTransportes(filter)
      .subscribe(transportes => {
        this.configTransporte.searchList = transportes;
        this.configTransporte.loadIcon = false;
      }, error => {
        this.errorMessage = <any>error;
        this.configTransporte.loadIcon = false;
      });
  }

  setTransporte(selectedItem: any) {
    this.transporte = selectedItem;
  }


  private setConfigVehiculo() {
    this.configVehiculo = new AutoComplete(
      'vehiculo',
      this.form,
      ['placa', 'tipo', 'marca'],
      this.vehiculos,
      false,
      this.loadIcon,
      'Buscar Vehículo',
      'id',
      ['placa', 'tipo,marca', 'carga'],
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

  setVehiculo(selectedItem: any) {
    this.vehiculo = selectedItem;
  }


  private setConfigSucursalSalida() {
    this.configSucursalSalida = new AutoComplete(
      'sucursalSalida',
      this.form,
      ['nombre'],
      this.sucursalesSalida,
      false,
      this.loadIcon,
      'Buscar Sucursal de salida',
      'id',
      ['nombre'],
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

  setSucursalSalida(selectedItem: any) {
    this.sucursalSalida = selectedItem;
  }


  private setConfigSucursalLlegada() {
    this.configSucursalLlegada = new AutoComplete(
      'sucursalLlegada',
      this.form,
      ['nombre'],
      this.sucursalesLlegada,
      false,
      this.loadIcon,
      'Buscar Sucursal de llegada',
      'id',
      ['nombre'],
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

  setSucursalLlegada(selectedItem: any) {
    this.sucursalLlegada = selectedItem;
  }


  formValidation(controlName: string): boolean {
    return false;
  }

  search() {
    // temporalmente se usa el modelo Transporte como modelo de búsqueda
    this.model = new Transporte(
      this.transporte ? this.transporte.id : 0,
      this.transporte ? this.transporte.numero : null,
      true,
      this.form.get('fechaSalida').value,
      this.form.get('fechaLlegada').value,
      Number(this.sucursalSalida ? this.sucursalSalida.id : 0),
      this.sucursalSalida ? this.sucursalSalida.nombre : null,
      Number(this.sucursalLlegada ? this.sucursalLlegada.id : 0),
      this.sucursalLlegada ? this.sucursalLlegada.nombre : null,
      null,
      null,
      null,
      null,
      Number(this.vehiculo ? this.vehiculo.id : 0),
      this.vehiculo ? this.vehiculo.placa : null,
      this.vehiculo ? this.vehiculo.carga : null,
      this.vehiculo ? this.vehiculo.alto : null,
      null
    );
    console.log(this.model);
    this.transporteService.searchTransportes(this.model)
      .subscribe(response => {
        console.log(response);
        this.resultados = response;
      }, error => {
        console.log(error);
      });
  }

}
