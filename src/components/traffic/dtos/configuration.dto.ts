import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class ConfigurationDto {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: "", type: [] })
    readonly placas: [];

    @IsOptional()
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: "", type: [] })
    readonly diaSemana: [];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly tipo: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly estado: string;

}

export class UpdateConfigurationDto extends PartialType(ConfigurationDto) { }