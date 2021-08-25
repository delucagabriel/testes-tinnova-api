import { IBrand } from 'src/brands/interfaces/IBrand';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto implements IBrand {
    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    nome: string;
}
