/*COMENTAR-DESCOMENTAR-INICIO*/
import { EntregaService } from '../_services/entrega.service';
import { TransporteService } from '../_services/transporte.service';
// import { EntregaMockService as EntregaService } from '../_services/entrega-mock.service';
// import { TransporteMockService as TransporteService } from '../_services/transporte-mock.service';
/*COMENTAR-DESCOMENTAR-FIN*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Entrega } from '../_models/Entrega';
import { Transporte } from '../_models/Transporte';
import { GuiaCliente } from '../_models/GuiaCliente';
import { ActivatedRoute } from '@angular/router';

declare let jQuery: any;

import * as jsPDF from 'jspdf';

@Component({
  templateUrl: './guia-transporte.component.html',
  styleUrls: ['./guia-transporte.component.scss']
})
export class GuiaTransporteComponent implements OnInit {
  entrega: Entrega;
  guiasCliente: Array<GuiaCliente>;
  transporte: Transporte;
  form: FormGroup;

  mostrarMensajeExito: boolean;
  mensajeExito: string;
  mostrarMensajeError: boolean;
  mensajeError: string;
  invalidDatosGuiaCliente: boolean;

  tempFile: File;
  files: Array<File>;

  doc: any;

  @ViewChild('attachInput') attachInput: ElementRef;

  constructor(
    private entregaService: EntregaService,
    private transporteService: TransporteService,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    jQuery('.prime-sidebar').show();
    jQuery('.navbar-dashboard').show();
    this.createForm();
    this.guiasCliente = [];
    this.files = [];
    this.getEntrega(Number(this._route.snapshot.paramMap.get('id')));
  }

  createForm() {
    this.form = this.formBuilder.group({
      guiaEntregaNroGuia: ['', Validators.required],
      nroGuia: ['', []]
    });
  }

  getEntrega(id: Number) {
    this.entregaService.getEntrega(id)
      .subscribe(response => {
        console.log(response);
        this.entrega = response;
        this.form.get('guiaEntregaNroGuia').setValue(response.guiaEntregaNroGuia);
        this.loadTransporte(response.transporteId);
        this.guiasCliente = response.guiaCliente ? response.guiaCliente : [];
      }, error => {
        console.log(error);
      });
  }

  loadTransporte(id: Number) {
    this.transporteService.getTransporte(id)
      .subscribe(response => {
        console.log(response);
        this.transporte = response;
      }, error => {
        console.log(error);
      });
  }

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(15);
    doc.text(this.form.get('guiaEntregaNroGuia').value, 160, 42);

    doc.setFontSize(7);
    doc.text(`${this.transporte.sucursalSalidaNombre} - ${this.transporte.sucursalSalidaDepartamento}`, 5, 55);
    doc.text(`${this.transporte.sucursalLlegadaNombre} - ${this.transporte.sucursalLlegadaDepartamento}`, 105, 55);
    doc.text(this.entrega.remitenteRazonSocial, 5, 65);
    doc.text(this.entrega.destinatarioRazonSocial, 105, 65);
    doc.text(`${this.transporte.vehiculoMarca} - ${this.transporte.vehiculoPlaca}`, 50, 75);
    doc.text(this.transporte.vehiculoNroInscripcion, 150, 75);
    doc.text(this.transporte.vehiculoCodConfiguracion, 50, 80);
    doc.text(this.transporte.colaboradorChoferNroLicencia, 150, 80);

    const fE: Date = new Date(this.entrega.transporteFechaSalida);
    const strfechaEntrega: string = `${fE.getDate()}/${fE.getMonth() + 1}/${fE.getFullYear()} ${fE.getHours()}:${fE.getMinutes()}`;
    doc.text(strfechaEntrega, 45, 85);

    let xOffset: number = 100;
    this.guiasCliente.forEach(function(item, index) {
      doc.text((index + 1).toString(), 10, xOffset + (index * 5));
      doc.text(item.nombreGuia, 25, xOffset + (index * 5));
    });

    doc.save(`Guía - ${this.form.get('guiaEntregaNroGuia').value}.pdf`);
  }

  save(): any {
    if (!this.form.valid) {
      this.form.get('guiaEntregaNroGuia').markAsDirty();
    } else {
      this.update();
    }
  }

  update() {
    const modelForUpdate = {
      id: this.entrega.id,
      guiaEntregaNroGuia: this.form.get('guiaEntregaNroGuia').value,
      guiasCliente: this.guiasCliente
    };
    console.log(modelForUpdate);
    this.entregaService.updateGuiaCliente(modelForUpdate)
      .subscribe(response => {
        console.log(response);
        this.mostrarMensajeExito = true;
        this.mensajeExito = `<span class="fw-semi-bold">Se actualizó exitosamente el Nro de Entrega
          ${this.entrega.nroEntrega} según la Guía de Transporte.</span>`;
      }, error => {
        console.log(error);
        this.mostrarMensajeError = true;
        this.mensajeError = `<span class="fw-semi-bold">Se produjo el siguiente error: ${error.message}.</span>`;
      });

    this.entregaService.saveGuiaClienteAttachments(this.files)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  handleFileInput(files: FileList) {
    this.tempFile = files.item(0);
  }

  addGuiaCliente() {
    this.invalidDatosGuiaCliente = !this.attachInput.nativeElement.value || !this.form.get('nroGuia').value;

    if (!this.invalidDatosGuiaCliente) {
      this.files.push(this.tempFile);
      this.guiasCliente.push(new GuiaCliente(this.tempFile.name, this.form.get('nroGuia').value));

      this.attachInput.nativeElement.value = '';
      this.tempFile = null;
      this.form.get('nroGuia').setValue('');
    }
  }

  deleteGuiaCliente(index: number) {
    this.guiasCliente.splice(index, 1);
  }


  formValidation(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control.dirty && control.errors) ? true : false;
  }

}
