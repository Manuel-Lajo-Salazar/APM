
import { TransporteService } from '../_services/transporte.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { TransporteForListDto } from '../_models/TransporteForListDto';
import { AutoComplete } from '../_models/AutoComplete';
import { Vehiculo } from '../_models/Vehiculo';
import { Sucursal } from '../_models/Sucursal';
import { TransporteCriteria } from '../_models/TransporteCriteria';

@Component({
  templateUrl: './transporte-lista.component.html',
  styleUrls: ['./transporte-lista.component.scss']
})

export class TransporteListaComponent implements OnInit {
  resultados: TransporteForListDto[] = [];
  model: TransporteCriteria;
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

  constructor(
    private transporteService: TransporteService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.setConfigVehiculo();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
  }

  createForm() {
    this.form = this.formBuilder.group({
      vehiculo: ['', []],
      sucursalSalida: ['', []],
      sucursalLlegada: ['', []],
      fechaSalida: ['', []],
      fechaLlegada: ['', []]
    });
  }

  search() {
    this.model = new TransporteCriteria(
      this.form.get('fechaSalida').value ? this.form.get('fechaSalida').value : null,
      this.form.get('fechaLlegada').value ? this.form.get('fechaLlegada').value : null,
      this.sucursalSalida ? this.sucursalSalida.id : null,
      this.sucursalLlegada ? this.sucursalLlegada.id : null,
      this.vehiculo ? this.vehiculo.placa : null,
    );
    this.transporteService.searchTransportes(this.model)
      .subscribe(response => {
        console.log(response);
        this.resultados = response;
      }, error => {
        console.log(error);
      });
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


  formValidation(controlName: string): boolean {
    return false;
  }

}
