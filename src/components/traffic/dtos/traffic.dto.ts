import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ConfigurationDto } from "./configuration.dto";

export class TrafficDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly tipo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly estado: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    fechaInicio: Date;

    @IsOptional()
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    fechaFin: Date;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ description: "", default: false })
    readonly default: boolean;

    @IsObject()
    @ApiProperty({ description: "", type: [ConfigurationDto] })
    @ValidateNested({ each: true })
    @Type((type) => ConfigurationDto)
    configuration: Array<ConfigurationDto>;
}

export class TrafficConsultDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly placa: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly fecha: string;
}

export class UpdateTrafficDto extends PartialType(TrafficDto) { }