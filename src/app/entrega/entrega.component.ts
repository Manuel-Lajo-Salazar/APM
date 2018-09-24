/*COMENTAR-DESCOMENTAR-INICIO*/
import { EntregaService } from '../_services/entrega.service';
import { TransporteService } from '../_services/transporte.service';
// import { EntregaMockService as EntregaService } from '../_services/entrega-mock.service';
// import { TransporteMockService as TransporteService } from '../_services/transporte-mock.service';
/*COMENTAR-DESCOMENTAR-FIN*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Entrega } from '../_models/Entrega';
import { EntregaForCreate } from '../_models/EntregaForCreate';
import { Transporte } from '../_models/Transporte';
import { Sucursal } from '../_models/Sucursal';
import { Remitente } from '../_models/Remitente';
import { Destinatario } from '../_models/Destinatario';
import { AutoComplete } from '../_models/AutoComplete';
import { Router, ActivatedRoute } from '@angular/router';
import { Rotulo } from '../_models/Rotulo';

declare var require: any;
const JsBarcode = require('jsbarcode');

declare let jQuery: any;
import * as jsPDF from 'jspdf';

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
  invalidDocumento: boolean;

  mostrarRegresar: boolean;
  mostrarVerEntregas: boolean;
  mostrarVerGuiaTransporte: boolean;
  mostrarEliminar: boolean;
  mostrarCodigos: boolean;

  loadIcon: boolean;

  configTransporte: AutoComplete;
  transporte: Transporte;
  transportes: Transporte[] = [];

  configRemitente: AutoComplete;
  remitente: Remitente;
  remitentes: Remitente[] = [];

  configDestinatario: AutoComplete;
  destinatario: Destinatario;
  destinatarios: Destinatario[] = [];

  configSucursalSalida: AutoComplete;
  sucursalSalida: Sucursal;
  sucursalesSalida: Sucursal[] = [];

  configSucursalLlegada: AutoComplete;
  sucursalLlegada: Sucursal;
  ucursalesLlegada: Sucursal[] = [];

  guiaRemitenteFile: File;

  showBarcodes: boolean;

  formatoFechas: any;

  @ViewChild('attachInput') attachInput: ElementRef;

  constructor(
    private entregaService: EntregaService,
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router) { }

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
    this.setConfigTransporte();
    this.setConfigRemitente();
    this.setConfigDestinatario();
    this.setConfigSucursalSalida();
    this.setConfigSucursalLlegada();
    const param: string = this._route.snapshot.paramMap.get('id');
    if (param) {
      if (param.indexOf('T-') > -1) {
        this.loadTransporte(Number(param.substring(2)));
        this.mostrarRegresar = true;
      } else {
        this.getEntrega(Number(param));
        this.mostrarVerGuiaTransporte = true;
        this.mostrarEliminar = true;
        this.mostrarCodigos = true;
      }
      this.mostrarVerEntregas = true;
    }
  }

  showCodes() {
    JsBarcode('#CodigoBarra').init();
    this.model.rotulo.forEach(function(item) {
      JsBarcode('#Rotulo-' + item.id).init();
    });
    this.showBarcodes = true;
  }

  saveBarCodePDF(svgId: string) {
    const svg = document.querySelector(`#${svgId}`);
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = document.createElement('img');
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));

    img.onload = () => {
      ctx.drawImage(img, 0,0);
      const pngData = canvas.toDataURL('image/png');

      const doc = new jsPDF();
      doc.setFontSize(15);
      doc.addImage(pngData, 'PNG', 0, 0, 0, 0);
      doc.save(`Entrega - ${svgId}.pdf`);
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      transporte: ['', Validators.required],
      remitente: ['', Validators.required],
      destinatario: ['', Validators.required],
      sucursalSalida: ['', []],
      sucursalSalidaDescripcion: ['', []],
      sucursalLlegada: ['', Validators.required],
      sucursalLlegadaDescripcion: ['', []],
      fechaEntrega: [new Date(), Validators.required],
      horaEntrega: [new Date(), Validators.required],
      nombreGuiaRemitente: ['', []],
      nroGuiaRemitente: ['', Validators.required],
      nroBultoRemitente: ['', Validators.required],
      volumenRemitente: ['', Validators.required],
    });
  }

  loadTransporte(id: Number) {
    this.transporteService.getTransporte(id)
      .subscribe(response => {
        console.log(response);
        this.transporte = response;
        this.form.get('transporte').setValue(response.nroTransporte);
      }, error => {
        console.log(error);
      });
  }

  getEntrega(id: Number) {
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
    this.loadTransporte(entrega.transporteId);
    this.remitente = {
      id: entrega.remitenteId,
      razonSocial: entrega.remitenteRazonSocial,
      ruc: entrega.remitenteRuc,
      direccion: entrega.remitenteDireccion
    };
    this.destinatario = {
      id: entrega.destinatarioId,
      razonSocial: entrega.destinatarioRazonSocial,
      ruc: entrega.destinatarioRuc,
      direccion: entrega.destinatarioDireccion
    };
    this.sucursalSalida = {
      id: entrega.sucursalSalidaId,
      nombre: entrega.sucursalSalidaNombre,
      departamento: entrega.sucursalSalidaDepartamento,
      direccion: entrega.sucursalSalidaDireccion
    };
    this.sucursalLlegada = {
      id: entrega.sucursalLlegadaId,
      nombre: entrega.sucursalLlegadaNombre,
      departamento: entrega.sucursalLlegadaDepartamento,
      direccion: entrega.sucursalLlegadaDireccion
    };
    this.form.get('transporte').setValue(entrega.transporteNroTransporte);
    this.form.get('remitente').setValue(entrega.remitenteRazonSocial + ', ' + entrega.remitenteRuc);
    this.form.get('destinatario').setValue(entrega.destinatarioRazonSocial + ', ' + entrega.destinatarioRuc);
    if (entrega.sucursalSalidaId !== 1) {
      this.form.get('sucursalSalida').setValue(entrega.sucursalSalidaNombre + ', ' + entrega.sucursalSalidaDepartamento
        + ', ' + entrega.sucursalSalidaDireccion);
    }
    this.form.get('sucursalSalidaDescripcion').setValue(entrega.sucursalSalidaDescripcion);
    if (entrega.sucursalLlegadaId !== 1) {
      this.form.get('sucursalLlegada').setValue(entrega.sucursalLlegadaNombre + ', ' + entrega.sucursalLlegadaDepartamento
        + ', ' + entrega.sucursalLlegadaDireccion);
    }
    this.form.get('sucursalLlegadaDescripcion').setValue(entrega.sucursalLlegadaDescripcion);
    this.form.get('fechaEntrega').setValue(new Date(entrega.fechaEntrega));
    this.form.get('horaEntrega').setValue(new Date(entrega.fechaEntrega));
    this.attachInput.nativeElement.value = '';
    this.form.get('nroGuiaRemitente').setValue(entrega.guiaRemitenteNroGuia);
    this.form.get('nroBultoRemitente').setValue(entrega.guiaRemitenteNroBulto);
    this.form.get('volumenRemitente').setValue(entrega.guiaRemitenteVolumen);
  }

  save(): any {
    const invalidFechaEntrega = this.validarFechas();
    this.invalidDocumento = !this.guiaRemitenteFile;
    if (!this.form.valid) {
      this.markInputsAsDirty();
    } else if (invalidFechaEntrega || this.invalidDocumento) {
      return;
    } else {
      this.loadEntregaModelForSave();
      /*COMENTAR-DESCOMENTAR-INICIO*/
      // this.create();
      if (this.model) {
        this.update();
      } else {
        this.create();
      }
      /*COMENTAR-DESCOMENTAR-FIN*/
    }
  }

  create() {
    /*COMENTAR-DESCOMENTAR-INICIO*/
    // this.entregaService.createEntrega(this.model)
    this.entregaService.createEntrega(this.modelForCreate)
    /*COMENTAR-DESCOMENTAR-FIN*/
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se grabó exitosamente el Nro de Entrega ${response.nroEntrega}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega/${response.id}">Ver/Actualizar</a>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega/T-${response.transporteId}">Grabar otra</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeError = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });

    this.entregaService.saveAttachment(this.guiaRemitenteFile)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  update() {
    this.entregaService.updateEntrega(this.modelForCreate)
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se actualizó exitosamente el Nro de Entrega ${response.nroEntrega}.</span>` +
          `<a class="btn btn-default btn-xs float-right mr-5" href="/entrega/T-${response.transporteId}">Grabar otra</a>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeError = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });

    this.entregaService.saveAttachment(this.guiaRemitenteFile)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  confirmDelete() {
    const answer = confirm('¿Confirmar eliminación de Entrega?');
    if (answer) {
      this.delete();
    }
  }

  delete() {
    this.entregaService.deleteEntrega(this.model.id)
      .subscribe(response => {
        console.log(response);
        this._router.navigate(['/entrega']);
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeError = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });
  }

  markInputsAsDirty() {
    this.form.get('transporte').markAsDirty();
    this.form.get('remitente').markAsDirty();
    this.form.get('destinatario').markAsDirty();
    this.form.get('sucursalSalida').markAsDirty();
    this.form.get('sucursalLlegada').markAsDirty();
    this.form.get('fechaEntrega').markAsDirty();
    this.form.get('horaEntrega').markAsDirty();
    this.form.get('nroGuiaRemitente').markAsDirty();
    this.form.get('nroBultoRemitente').markAsDirty();
    this.form.get('volumenRemitente').markAsDirty();
  }

  loadEntregaModelForSave() {
    const fEntrega: Date = this.form.get('fechaEntrega').value;
    const hEntrega: Date = this.form.get('horaEntrega').value;
    const fechaEntrega =
      new Date(fEntrega.getFullYear(), fEntrega.getMonth(), fEntrega.getDate(), hEntrega.getHours(), hEntrega.getMinutes());
    fechaEntrega.setHours(fechaEntrega.getHours() - 5);

    /*COMENTAR-DESCOMENTAR-INICIO*/

    this.modelForCreate = new EntregaForCreate(
      this.model ? this.model.id : 0,
      Number(this.transporte.id),
      Number(this.remitente.id),
      Number(this.destinatario.id),
      Number(this.sucursalSalida.id),
      String(this.form.get('sucursalSalidaDescripcion').value),
      Number(this.sucursalLlegada.id),
      String(this.form.get('sucursalLlegadaDescripcion').value),
      fechaEntrega,
      this.guiaRemitenteFile ? this.guiaRemitenteFile.name : '',
      String(this.form.get('nroGuiaRemitente').value),
      Number(this.form.get('nroBultoRemitente').value),
      String(this.form.get('volumenRemitente').value),
      null  // revisar si se debe enviar null, [] o qué valor
    );

    // const id = 4;
    // fechaEntrega.setHours(fechaEntrega.getHours() + 5);
    // this.model = new Entrega(
    //   this.model ? this.model.id : id,
    //   null, // codBarraEntrega
    //   fechaEntrega,
    //   true,
    //   this.model ? this.model.nroEntrega : `E-00${id}`,
    //   Number(this.transporte.id),
    //   this.transporte.nroTransporte,
    //   this.transporte.fechaSalida,
    //   this.transporte.fechaLlegada,
    //   this.transporte.sucursalSalidaId,
    //   this.transporte.sucursalLlegadaId,
    //   Number(this.remitente.id),
    //   this.remitente.razonSocial,
    //   this.remitente.ruc,
    //   this.remitente.direccion,
    //   Number(this.destinatario.id),
    //   this.destinatario.razonSocial,
    //   this.destinatario.ruc,
    //   this.destinatario.direccion,
    //   Number(this.sucursalSalida.id),
    //   this.sucursalSalida.nombre,
    //   this.sucursalSalida.departamento,
    //   this.sucursalSalida.direccion,
    //   String(this.form.get('sucursalSalidaDescripcion').value),
    //   Number(this.sucursalLlegada.id),
    //   this.sucursalLlegada.nombre,
    //   this.sucursalLlegada.departamento,
    //   this.sucursalLlegada.direccion,
    //   String(this.form.get('sucursalLlegadaDescripcion').value),
    //   0, // guiaRemitenteId
    //   this.guiaRemitenteFile ? this.guiaRemitenteFile.name : '',
    //   String(this.form.get('nroGuiaRemitente').value),
    //   String(this.form.get('nroBultoRemitente').value),
    //   String(this.form.get('volumenRemitente').value),
    //   0, // guiaEntregaId
    //   null, // guiaEntregaNroGuia
    //   [new Rotulo('id-1', '9638507'), new Rotulo('id-2', '4532131'), new Rotulo('id-3', '6892482'), new Rotulo('id-4', '2345423')]
    // );

    /*COMENTAR-DESCOMENTAR-FIN*/
  }

  regresar() {
    this._router.navigate(['/transporteLista', this.transporte.nroTransporte]);
  }

  verEntregas() {
    this._router.navigate(['/entregaLista', this.transporte.nroTransporte]);
  }

  verGuiaTransporte() {
    this._router.navigate(['/guiaTransporte', this.model.id]);
  }

  handleFileInput(files: FileList) {
    this.guiaRemitenteFile = files.item(0);
  }


// configuration section


  private setConfigTransporte() {
    this.configTransporte = new AutoComplete(
      'transporte',
      this.form,
      ['nroTransporte'],
      this.transportes,
      false,
      this.loadIcon,
      'Buscar Transporte',
      'id',
      ['nroTransporte'],
      []
    );
  }

  getTransportes(filter: string) {
    this.configTransporte.loadIcon = true;
    this.transporteService.getTransportes(filter)
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

  setRemitente(selectedItem: Remitente) {
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

  setDestinatario(selectedItem: Destinatario) {
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
      this.ucursalesLlegada,
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

  validarFechas(): boolean {
    const salida = this.transporte ? new Date(this.transporte.fechaSalida) : null;
    const llegada = this.transporte ? new Date(this.transporte.fechaLlegada) : null;
    const fEntrega: Date = this.form.get('fechaEntrega').value;
    const hEntrega: Date = this.form.get('horaEntrega').value;

    if (!salida || !llegada || !fEntrega || !hEntrega) {
      return false;
    }

    const entrega = new Date(fEntrega.getFullYear(), fEntrega.getMonth(), fEntrega.getDate(), hEntrega.getHours(), hEntrega.getMinutes());

    return (entrega > llegada || entrega < salida);
  }

}
