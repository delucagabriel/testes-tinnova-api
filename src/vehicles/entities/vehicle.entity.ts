import { IVehicle } from '../interfaces/IVehicle';
import { PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsInt, IsBoolean } from 'class-validator'
import { Brand } from '../../brands/entities/brand.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Vehicle implements IVehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    veiculo: string;

    @ManyToOne(() => Brand, (brand) => brand.id, { nullable: false })
    marca: Brand;

    @IsNotEmpty()
    @IsInt()
    @Column()
    ano: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    descricao: string;

    @IsNotEmpty()
    @IsBoolean()
    @Column()
    vendido: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    constructor(vehicle?: Partial<Vehicle>) { }
}
