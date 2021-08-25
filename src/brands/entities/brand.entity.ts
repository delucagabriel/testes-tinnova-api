import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { IBrand } from '../interfaces/IBrand';
import { IsNotEmpty, IsString } from "class-validator";
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Brand implements IBrand {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({ unique: true })
    nome: string;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.marca)
    veiculos: Vehicle[]

    constructor(brand?: Partial<Brand>) { }
}
