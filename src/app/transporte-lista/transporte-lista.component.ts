/*COMENTAR-DESCOMENTAR-INICIO*/
import { TransporteService } from '../_services/transporte.service';
// import { TransporteMockService as TransporteService } from '../_services/transporte-mock.service';
/*COMENTAR-DESCOMENTAR-FIN*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TransporteForListDto } from '../_models/TransporteForListDto';
import { AutoComplete } from '../_models/AutoComplete';
import { Vehiculo } from '../_models/Vehiculo';
import { Sucursal } from '../_models/Sucursal';
import { TransporteCriteria } from '../_models/TransporteCriteria';
import { ActivatedRoute } from '@angular/router';

declare let jQuery: any;

@Component({
  templateUrl: './transporte-lista.component.html',
  styleUrls: ['./transporte-lista.component.scss']
})

export class TransporteListaComponent implements OnInit {
  resultados: TransporteForListDto[] = [];
  model: TransporteCriteria;
  form: FormGroup;

  loadIcon: boolean;
  resultsLoadIcon: boolean;

  configVehiculo: AutoComplete;
  vehiculo: Vehiculo;
  vehiculos: Vehiculo[] = [];

  configSucursalSalida: AutoComplete;
  sucursalSalida: Sucursal;
  sucursalesSalida: Sucursal[] = [];

  configSucursalLlegada: AutoComplete;
  sucursalLlegada: Sucursal;
  sucursalesLlegada: Sucursal[] = [];

  formatoFechas: any;

  constructor(
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    jQuery('.prime-sidebar').show();
    jQuery('.navbar-dashboard').show();
    this.formatoFechas = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
        monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre" ],
        monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Set", "Oct", "Nov", "Dic" ],
        today: 'Hoy',
        clear: 'Limpiar'
    };
    this.createForm();
    this.setConfigVehiculo();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
    const param: string = this._route.snapshot.paramMap.get('numero');
    if (param) {
      this.form.get('nroTransporte').setValue(param);
      this.search();
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      nroTransporte: ['', []],
      vehiculo: ['', []],
      sucursalSalida: ['', []],
      sucursalLlegada: ['', []],
      fechaSalida: ['', []],
      fechaLlegada: ['', []]
    });
  }

  search() {
    this.model = new TransporteCriteria(
      this.form.get('nroTransporte').value ? this.form.get('nroTransporte').value : null,
      this.form.get('fechaSalida').value ? <Date>this.form.get('fechaSalida').value : null,
      this.form.get('fechaLlegada').value ? <Date>this.form.get('fechaLlegada').value : null,
      this.sucursalSalida ? this.sucursalSalida.id : null,
      this.sucursalLlegada ? this.sucursalLlegada.id : null,
      this.vehiculo ? this.vehiculo.placa : null,
    );
    this.resultsLoadIcon = true;
    this.transporteService.searchTransportes(this.model)
      .subscribe(response => {
        console.log(response);
        this.resultados = response;
        this.resultsLoadIcon = false;
      }, error => {
        console.log(error);
      });
  }

  reset() {
    this.form.reset();
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

  formValidation(controlName: string): boolean {
    return false;
  }

}
