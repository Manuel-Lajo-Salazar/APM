export class Transporte {
    constructor(
        public id: number = null,
        public numero: string = null,
        public activo: boolean = false,
        public fechaSalida: Date = null,
        public fechaLlegada: Date = null,
        public sucursalSalidaId: number = null,
        public sucursalSalidaNombre: string = null,
        public sucursalLlegadaId: number = null,
        public sucursalLlegadaNombre: string = null,
        public choferId: number = null,
        public choferNombre: string = null,
        public auxiliarId: number = null,
        public auxiliarNombre: string = null,
        public vehiculoId: number = null,
        public placa: string = null,
        public carga: string = null,
        public volumetria: string = null,
        public tipoTransporte: number = null
    ) {}
}
