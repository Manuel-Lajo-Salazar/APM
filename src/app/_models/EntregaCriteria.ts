export class EntregaCriteria {
    constructor(
        public fechaSalida: Date = null,
        public fechaLlegada: Date = null,
        public sucursalSalidaId: number = null,
        public sucursalSalida: string = null,
        public sucursalLlegadaId: number = null,
        public sucursalLlegada: string = null,
        public remitente: string = null,
        public destinatario: string = null
    ) {}
}