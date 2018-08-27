export class EntregaForCreate {
    constructor(
        public id: number = null,
        public transporteId: number = null,
        public remitenteId: number = null,
        public destinatarioId: number = null,
        public sucursalSalidaId: number = null,
        public sucursalLlegadaId: number = null,
        public fechaEntrega: Date = null,
        // Guia Remitente
        public rutaGuiaRemitente: string = null,
        public nroGuiaRemitente: string = null,
        public nroBultoRemitente: number = null
    ) {}
}
