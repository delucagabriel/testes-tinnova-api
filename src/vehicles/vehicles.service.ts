import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  @InjectRepository(Vehicle)
  private vehicleRepository: Repository<Vehicle>;

  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.save(createVehicleDto);
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      relations: ['marca'],
      loadEagerRelations: true,
    });
  }

  findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne(id, {
      relations: ['marca'],
      loadEagerRelations: true,
    });
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    await this.vehicleRepository.update(id, updateVehicleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    return this.vehicleRepository.remove(vehicle);
  }
}
