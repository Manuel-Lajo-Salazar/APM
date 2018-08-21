export class EntregaForListDto {
    constructor(
    public id: number = null,
    public transporteId: number = null,
    public clienteRemitenteId: number = null,
    public clienteRemitenteRazonSocial: string = null,
    public clienteDestinatarioId: number = null,
    public clienteDestinatarioRazonSocial: string = null,
    public sucursalOrigenId: number = null,
    public sucursalOrigenNombre: string = null,
    public sucursalDestinoId: number = null,
    public sucursalDestinoNombre: string = null,
    public fechaEntrega: Date = null,
    public numeroGuia: string = null,
    public numeroBultos: number = null
    ) {}
}
