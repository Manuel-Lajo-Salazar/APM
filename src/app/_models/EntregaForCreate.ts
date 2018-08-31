export class EntregaForCreate {
    constructor(
        public id: number = null,
        public transporteId: number = null,
        public remitenteId: number = null,
        public destinatarioId: number = null,
        public sucursalSalidaId: number = null,
        public sucursalSalidaDescripcion: string = null,
        public sucursalLlegadaId: number = null,
        public sucursalLlegadaDescripcion: string = null,
        public fechaEntrega: Date = null,
        // Guia Remitente
        public rutaGuiaRemitente: string = null,
        public nroGuiaRemitente: string = null,
        public nroBultoRemitente: number = null,
        public volumenRemitente: string = null
    ) {}
}
