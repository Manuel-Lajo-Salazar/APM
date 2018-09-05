export class EntregaCriteria {
    constructor(
        public nroEntrega: string = null,
        public nroTransporte: string = null,
        public fechaSalida: Date = null,
        public fechaLlegada: Date = null,
        public sucursalSalidaId: number = null,
        public SucursalSalidaDescripcion: string = null,
        public sucursalLlegadaId: number = null,
        public sucursalLlegadaDescripcion: string = null,
        public remitente: string = null,
        public destinatario: string = null
    ) {}
}
