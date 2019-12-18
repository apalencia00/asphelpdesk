
export class Incidente {

	id?: number;
	num_servicio: string;
    fk_tipo_solicitante: number;
    identificacion_solictante : string;
    direccion_servicio : string ; 
    sucursal : string ;
    tipo_solicitud : number;
    tipo_asunto : number ;
    punto_movil_fijo : string ;
    descripcion : string;
    fechaser :  Date ;
    archivo : string ;
    fk_usuario : number ;
    estado : string ;
    fecha_actualiza : Date ;
    usuario_actualiza : number ;
    ide_punto : string;

    constructor(){}





}