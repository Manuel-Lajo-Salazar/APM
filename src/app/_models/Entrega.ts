export class Entrega {
    constructor(
        public id: number = null,
        public codBarraEntrega: string = null,
        public fechaEntrega: Date = null,
        public estado: boolean = true,
        public nroEntrega: string = null,

        // Transporte
        public transporteId: number = null,
        public transporteNroTransporte: string = null,
        public transporteFechaSalida: Date = null,
        public transporteFechaLlegada: Date = null,
        public transporteSucursalSalidaId: number = null,
        public transporteSucursalLlegadaId: number = null,

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
        public sucursalSalidaDescripcion: string = null,

        // Sucursal Destino
        public sucursalLlegadaId: number = null,
        public sucursalLlegadaNombre: string = null,
        public sucursalLlegadaDepartamento: string = null,
        public sucursalLlegadaDireccion: string = null,
        public sucursalLlegadaDescripcion: string = null,

        // GuiaRemitente
        public guiaRemitenteId: number = null,
        public guiaRemitenteNombreGuia: string = null,
        public guiaRemitenteNroGuia: string = null,
        public guiaRemitenteNroBulto: string = null,
        public guiaRemitenteVolumen: string = null,

        // GuiaEntrega
        public guiaEntregaId: number = null,
        public guiaEntregaNroGuia: string = null,

        // Rotulo
        // public rotulo: Array<Rotulo> = null
    ) {}
}
