import { IVehicle } from '../interfaces/IVehicle';
import { Brand } from 'src/brands/entities/brand.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto implements IVehicle {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    veiculo: string;

    @ApiProperty()
    marca: Brand;

    @ApiProperty()
    ano: number;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    vendido: boolean;

}
