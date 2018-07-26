export class TransporteForCreate {
    constructor(
        public id: number = null,
        public activo: boolean = false,
        public fechaSalida: Date = null,
        public fechaLlegada: Date = null,
        public tipo: any = null,
        public sucursalSalidaId: number = null,
        public sucursalLlegadaId: number = null,
        public colaboradorChoferId: number = null,
        public colaboradorAuxiliarId: number = null,
        public vehiculoId: number = null
    ) {}
}
