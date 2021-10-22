import { Body, Controller, Post, Headers, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ResponseServer } from '../../../shared/response-server';
import { TrafficConsultDto, TrafficDto } from '../dtos/traffic.dto';
import { TrafficService } from '../services/traffic.service';

@ApiTags('Traffic')
@Controller('api/traffic')
export class TrafficController {

    constructor(
        private trafficService: TrafficService,
        private readonly responseServer: ResponseServer,
    ) {
    }

    @Post('/')
    @ApiSecurity('Authorization')
    @ApiBody({ type: TrafficDto })
    @ApiHeader({ name: 'apiKey', description: 'key para usar las rutas', required: true })
    @ApiOperation({ summary: 'Registra configuración de tráfico' })
    @ApiResponse({ status: 201, description: 'Creación correcta' })
    @ApiResponse({ status: 404, description: 'Error al crear' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 406, description: 'Parámetros no validos' })

    async createTraffic(
        @Headers() headers,
        @Body() dataTraffic: TrafficDto
    ) {

        try {
            const traffic = await this.trafficService.createConfigurationTraffic(dataTraffic);
            if (traffic) {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.OK, datos: traffic })
            } else {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.EXPECTATION_FAILED, mensaje: "Error al registrar los datos" })
            }
        } catch (error) {
            return this.responseServer.enviarRespuestaOptimizada({
                codigoEstado: HttpStatus.INTERNAL_SERVER_ERROR,
                mensaje: error.message
            });
        }

    }

    @Get('/')
    @ApiSecurity('Authorization')
    @ApiBody({ type: TrafficConsultDto })
    @ApiHeader({ name: 'apiKey', description: 'key para usar las rutas', required: true })
    @ApiOperation({ summary: 'consultar circulacion por placa y fecha' })
    @ApiResponse({ status: 200, description: 'El vehiculo NO puede circular' })
    @ApiResponse({ status: 404, description: 'No hay una configuracion' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 406, description: 'Parámetros no validos' })

    async checkTraffic(
        @Headers() headers,
        @Query() dataTraffic: TrafficConsultDto
    ) {

        try {
            const traffic: any = await this.trafficService.checkTraffic(dataTraffic);
            if (traffic.circular) {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.OK, mensaje: traffic.message, datos: traffic.circular });
            } else {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.OK, mensaje: traffic.message, datos: traffic.circular });
            }
        } catch (error) {
            if (error.codigoEstado) {
                return this.responseServer.enviarRespuestaOptimizada({
                    codigoEstado: error.codigoEstado,
                    mensaje: error.message
                });
            } else {
                return this.responseServer.enviarRespuestaOptimizada({
                    codigoEstado: HttpStatus.INTERNAL_SERVER_ERROR,
                    mensaje: error.message
                });
            }
        }

    }
}
