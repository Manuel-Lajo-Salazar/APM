/*COMENTAR-DESCOMENTAR-INICIO*/
import { EntregaService } from '../_services/entrega.service';
import { TransporteService } from '../_services/transporte.service';
// import { EntregaMockService as EntregaService } from '../_services/entrega-mock.service';
// import { TransporteMockService as TransporteService } from '../_services/transporte-mock.service';
/*COMENTAR-DESCOMENTAR-FIN*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EntregaForListDto } from '../_models/EntregaForListDto';
import { AutoComplete } from '../_models/AutoComplete';
import { Sucursal } from '../_models/Sucursal';
import { Cliente } from '../_models/Cliente';
import { EntregaCriteria } from '../_models/EntregaCriteria';
import { ActivatedRoute } from '@angular/router';

declare let jQuery: any;

@Component({
  templateUrl: './entrega-lista.component.html',
  styleUrls: ['./entrega-lista.component.scss']
})

export class EntregaListaComponent implements OnInit {
  resultados: EntregaForListDto[] = [];
  model: EntregaCriteria;
  form: FormGroup;

  loadIcon: boolean;

  configSucursalSalida: AutoComplete;
  sucursalSalida: Sucursal;
  sucursalesSalida: Sucursal[] = [];

  configSucursalLlegada: AutoComplete;
  sucursalLlegada: Sucursal;
  sucursalesLlegada: Sucursal[] = [];

  configRemitente: AutoComplete;
  remitente: Cliente;
  remitentes: Cliente[] = [];

  configDestinatario: AutoComplete;
  destinatario: Cliente;
  destinatarios: Cliente[] = [];

  constructor(
    private entregaService: EntregaService,
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    jQuery('.prime-sidebar').show();
    jQuery('.navbar-dashboard').show();
    this.createForm();
    this.setConfigRemitente();
    this.setConfigDestinatario();
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
      nroEntrega: ['', []],
      nroTransporte: ['', []],
      fechaSalida: ['', []],
      fechaLlegada: ['', []],
      sucursalSalida: ['', []],
      sucursalSalidaDescripcion: ['', []],
      sucursalLlegada: ['', []],
      sucursalLlegadaDescripcion: ['', []],
      remitente: ['', []],
      destinatario: ['', []]
    });
  }

  search() {
    this.model = new EntregaCriteria(
      this.form.get('nroEntrega').value ? this.form.get('nroEntrega').value : null,
      this.form.get('nroTransporte').value ? this.form.get('nroTransporte').value : null,
      this.form.get('fechaSalida').value ? <Date>this.form.get('fechaSalida').value : null,
      this.form.get('fechaLlegada').value ? <Date>this.form.get('fechaLlegada').value : null,
      this.sucursalSalida ? this.sucursalSalida.id : null,
      this.form.get('sucursalSalidaDescripcion').value ? this.form.get('sucursalSalidaDescripcion').value : null,
      this.sucursalLlegada ? this.sucursalLlegada.id : null,
      this.form.get('sucursalLlegadaDescripcion').value ? this.form.get('sucursalLlegadaDescripcion').value : null,
      this.form.get('remitente').value ? this.form.get('remitente').value : null,
      this.form.get('destinatario').value ? this.form.get('destinatario').value : null,
    );
    this.entregaService.searchEntregas(this.model)
      .subscribe(response => {
        console.log(response);
        this.resultados = response;
      }, error => {
        console.log(error);
      });
  }

  reset() {
    this.form.reset();
  }


  // configuration section

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
