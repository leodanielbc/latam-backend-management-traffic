import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { UserDto } from "../../users/dtos/user.dto";
import { Type } from 'class-transformer';

export class RegisterCarDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly placa: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly modelo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly color: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "" })
    readonly chasis: string;

    @IsObject()
    @ApiProperty({ description: "", type: UserDto})
    @ValidateNested({ each: true })
    @Type(() => UserDto)
    user: UserDto;
}

export class UpdateCarDto extends PartialType(RegisterCarDto) { }