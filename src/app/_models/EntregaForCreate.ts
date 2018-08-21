export class EntregaForCreate {
    constructor(
        public id: number = null,
        public transporteId: number = null,
        public clienteRemitenteId: number = null,
        public clienteDestinatarioId: number = null,
        public sucursalOrigenId: number = null,
        public sucursalDestinoId: number = null,
        public fechaEntrega: Date = null,
        public numeroGuia: string = null,
        public numeroBultos: number = null
    ) {}
}
