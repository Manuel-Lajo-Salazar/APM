export class TransporteCriteria {
    constructor(
        public FechaSalida: Date = null,
        public FechaLlegada: Date = null,
        public SucursalSalidaId: number = null,
        public SucursalLlegadaId: number = null,
        public VehiculoPlaca: string = null
    ) {}
}
