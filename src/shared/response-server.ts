import { RespuestaInterface } from "./models/respuesta-interface.model";

export class ResponseServer {

    constructor() { }


    enviarRespuestaOptimizada(resp) {
        const respuesta = new RespuestaInterface;
        respuesta.codigoEstado = resp.codigoEstado;
        if (resp.mensaje && !resp.datos) {
            respuesta.respuesta = {
                mensaje: resp.mensaje,
            }

        }
        if (resp.datos && !resp.mensaje) {
            respuesta.respuesta = {
                datos: resp.datos,
            }
        }
        if (resp.datos && resp.mensaje) {
            respuesta.respuesta = {
                mensaje: resp.mensaje,
                datos: resp.datos,
            }
        }
        if (resp.mensaje && resp.token) {
            respuesta.respuesta = {
                mensaje: resp.mensaje,
                token: resp.token
            }
        }
        return respuesta;

    }

}