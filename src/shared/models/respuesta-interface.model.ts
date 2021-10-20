import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';


export class RespuestaInterface {
    codigoEstado: HttpStatus;
    respuesta: Respuesta;
    headers?: Headers;
}

export class Respuesta {
    datos?: any;
    mensaje?: string;
    token?: string;
    tokenRefresh?: string;
}

export class MensajeRespuesta {
    @ApiProperty()
    mensaje: string;

}
export class RespuestaDesAutorizar {
    @ApiProperty({ example: "401" })
    codigoEstado: string;
    @ApiProperty({ example: "No Autorizado" })
    respuesta: MensajeRespuesta;

}

export class RespuestaParamsNoVali {
    @ApiProperty({ example: "406" })
    codigoEstado: string;
    @ApiProperty({ example: "Parámetros no válidos" })
    respuesta: MensajeRespuesta;

}

export interface ResponseValidators {
    statusCode?: number;
    message?: any;
    error?: string;
}

