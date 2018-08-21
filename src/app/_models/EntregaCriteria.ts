export class EntregaCriteria {
    constructor(
        public NumeroTransporte: string = null,
        public fechaEntrega: Date = null,
        public sucursalOrigenId: number = null,
        public sucursalDestinoId: number = null,
        public clienteRemitenteId: number = null,
        public clienteDestinatarioId: number = null
    ) {}
}
