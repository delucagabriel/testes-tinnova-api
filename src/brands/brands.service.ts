import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  @InjectRepository(Brand)
  private brandRepository: Repository<Brand>;

  create(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandRepository.save(createBrandDto);
  }

  findAll(): Promise<Brand[]> {
    return this.brandRepository.find({
      relations: ['veiculos'],
      loadEagerRelations: true,
    });
  }

  findOne(id: number): Promise<Brand> {
    return this.brandRepository.findOne(id, {
      relations: ['veiculos'],
      loadEagerRelations: true,
    });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    await this.brandRepository.update(id, updateBrandDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Brand> {
    const brand = await this.findOne(id);
    return this.brandRepository.remove(brand);
  }
}
