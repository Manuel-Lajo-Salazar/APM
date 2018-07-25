export class TransporteForListDto {
        constructor(
        public id: number = null,
        public activo: Boolean = false,
        public fechaSalida: Date = null,
        public fechaLlegada: Date = null,
        public tipo: object = null,
        public sucursalSalidaId: number = null,
        public sucursalSalidaNombre: string = null,
        public sucursalLlegadaId: number = null,
        public sucursalLlegadaNombre: string = null,
        public colaboradorChoferId: number = null,
        public colaboradorChoferNombre: string = null,
        public colaboradorChoferNroDocumento: string = null,
        public colaboradorAuxiliarId: number = null,
        public colaboradorAuxiliarNombre: string = null,
        public colaboradorAuxiliarNroDocumento: string = null,
        public vehiculoId: number = null,
        public vehiculoPlaca: string = null,
        public vehiculoCarga: string = null,
        public vehiculoVolumetria: string = null
        ) {}
    }
