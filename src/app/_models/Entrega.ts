export class Entrega {
    constructor(
        public id: number = null,
        public numero: string = null,
        public codBarraEntrega: string = null,
        public fechaEntrega: Date = null,

        // Transporte
        public transporteId: number = null,
        public transporteNumero: string = null,
        public transporteFechaSalida: Date = null,
        public transporteFechaLlegada: Date = null,

        // pendientes de añadir en el backend
        public transporteSucursalSalidaId: number = null,
        public transporteSucursalSalidaNombre: string = null,
        public transporteSucursalSalidaDepartamento: string = null,
        public transporteSucursalLlegadaId: number = null,
        public transporteSucursalLlegadaNombre: string = null,
        public transporteSucursalLlegadaDepartamento: string = null,
        public transporteColaboradorChoferId: number = null,
        public transporteColaboradorChoferNombre: string = null,
        public tranpsorteColaboradorAuxiliarId: number = null,
        public tranpsorteColaboradorAuxiliarNombre: string = null,
        public transporteVehiculoId: number = null,
        public transporteVehiculoPlaca: string = null,
        public transporteVehiculoCarga: string = null,
        public transporteVehiculoVolumetria: string = null,

        // Remitente
        public remitenteId: number = null,
        public remitenteRazonSocial: string = null,
        public remitenteRuc: string = null,
        public remitenteDireccion: string = null,

        // Destinatario
        public destinatarioId: number = null,
        public destinatarioRazonSocial: string = null,
        public destinatarioRuc: string = null,
        public destinatarioDireccion: string = null,

        // Sucursal Origen
        public sucursalSalidaId: number = null,
        public sucursalSalidaNombre: string = null,
        public sucursalSalidaDepartamento: string = null,
        public sucursalSalidaDireccion: string = null,

        // Sucursal Destino
        public sucursalLlegadaId: number = null,
        public sucursalLlegadaNombre: string = null,
        public sucursalLlegadaDepartamento: string = null,
        public sucursalLlegadaDireccion: string = null,

        // GuiaRemitente
        public guiaRemitenteId: number = null,
        public guiaRemitenteRutaGuia: string = null,
        public guiaRemitenteNroGuia: string = null,
        public guiaRemitenteNroBulto: string = null,

        // GuiaEntrega
        public guiaEntregaId: number = null,
        public guiaEntregaNroGuia: string = null,

        // public guiaRemitente: ByteString = null, // revisar

        // Rotulo
        // public rotulo: Array<any> = null
    ) {}
}


// export class Entrega {
//     constructor(
//         public id: number = null,

//         public transporteId: number = null,

//         public transporteFechaSalida: Date = null,
//         public transporteFechaLlegada: Date = null,

//         public transporteSucursalSalidaId: number = null,
//         public transporteSucursalSalidaNombre: string = null,
//         public transporteSucursalSalidaDepartamento: string = null,

//         public transporteSucursalLlegadaId: number = null,
//         public transporteSucursalLlegadaNombre: string = null,
//         public transporteSucursalLlegadaDepartamento: string = null,

//         public transporteColaboradorChoferId: number = null,
//         public transporteColaboradorChoferNombre: string = null,

//         public tranpsorteColaboradorAuxiliarId: number = null,
//         public tranpsorteColaboradorAuxiliarNombre: string = null,

//         public transporteVehiculoId: number = null,
//         public transporteVehiculoPlaca: string = null,
//         public transporteVehiculoCarga: string = null,
//         public transporteVehiculoVolumetria: string = null,


//         public clienteRemitenteId: number = null,
//         public clienteRemitenteRazonSocial: string = null,
//         public clienteRemitenteRuc: string = null,

//         public clienteDestinatarioId: number = null,
//         public clienteDestinatarioRazonSocial: string = null,
//         public clienteDestinatarioRuc: string = null,

//         public sucursalOrigenId: number = null,
//         public sucursalOrigenNombre: string = null,
//         public sucursalOrigenDepartamento: string = null,
//         public sucursalOrigenDireccion: string = null,

//         public sucursalDestinoId: number = null,
//         public sucursalDestinoNombre: string = null,
//         public sucursalDestinoDepartamento: string = null,
//         public sucursalDestinoDireccion: string = null,

//         public fechaEntrega: Date = null,

//         // public guiaRemitente: ByteString = null, // revisar

//         public numeroGuia: string = null,
//         public numeroBultos: number = null,
//     ) {}
// }
