import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly dni: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly apellido: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "password", deprecated: true })
    readonly password: string;

}

export class UpdateUserDto extends PartialType(UserDto) { }