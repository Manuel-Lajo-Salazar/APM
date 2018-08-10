export class Transporte {
    constructor(
        public id: number = null,
        public activo: boolean = false,

        public fechaSalida: Date = null,
        public fechaLlegada: Date = null,

        public tipo: number = null,

        public sucursalSalidaId: number = null,
        public sucursalSalidaNombre: string = null,
        public sucursalSalidaDepartamento: string = null,
        public sucursalSalidaDireccion: string = null,

        public sucursalLlegadaId: number = null,
        public sucursalLlegadaNombre: string = null,
        public sucursalLlegadaDepartamento: string = null,
        public sucursalLlegadaDireccion: string = null,

        public colaboradorChoferId: number = null,
        public colaboradorChoferNombre: string = null,
        public colaboradorChoferTipoDocumento: string = null,
        public colaboradorChoferNroDocumento: string = null,
        public colaboradorChoferNroLicencia: string = null,

        public colaboradorAuxiliarId: number = null,
        public colaboradorAuxiliarNombre: string = null,
        public colaboradorAuxiliarTipoDocumento: string = null,
        public colaboradorAuxiliarNroDocumento: string = null,
        public colaboradorAuxiliarNroLicencia: string = null,

        public vehiculoId: number = null,
        public vehiculoPlaca: string = null,
        public vehiculoCarga: string = null,
        public vehiculoVolumetria: string = null,
        public vehiculoCodConfiguracion: string = null,
        public vehiculoNroInscripcion: string = null,
        public vehiculoMarca: string = null,
    ) {}
}
