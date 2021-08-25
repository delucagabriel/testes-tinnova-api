import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { Brand } from '../brands/entities/brand.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BrandsMock } from '../__test__/brands.mock';

describe('BrandsService', () => {
  let service: BrandsService;
  let repository: Repository<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useValue: {
            save: jest.fn().mockResolvedValue(BrandsMock[0]),
            find: jest.fn().mockResolvedValue(BrandsMock),
            findOne: jest.fn().mockResolvedValue(BrandsMock[0]),
            update: jest.fn().mockResolvedValue(BrandsMock[0]),
            remove: jest.fn().mockResolvedValue(BrandsMock[0]),
          }
        }
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    repository = module.get(getRepositoryToken(Brand));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should create a brand', async () => {
      const result = await service.create(BrandsMock[0]);
      expect(result).toEqual(BrandsMock[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error())
      expect(service.create(BrandsMock[0])).rejects.toThrowError();
    })
  })

  describe('findAll', () => {
    it('should return a brands list', async () => {
      const result = await service.findAll();
      expect(result).toEqual(BrandsMock);
      expect(repository.find).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error())
      expect(service.findAll()).rejects.toThrowError();
    })
  })

  describe('findOne', () => {
    it('should return a brand', async () => {
      const result = await service.findOne(BrandsMock[0].id);
      expect(result).toEqual(BrandsMock[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error())
      expect(service.findOne(1)).rejects.toThrowError();
    })
  })

  describe('update', () => {
    it('should return a updated brand', async () => {
      const result = await service.update(BrandsMock[0].id, BrandsMock[0]);
      expect(result).toEqual(BrandsMock[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledTimes(1);

    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'update').mockRejectedValueOnce(new Error())
      expect(service.update(1, BrandsMock[0])).rejects.toThrowError();
    })
  })

  describe('remove', () => {
    it('should return a removed brand', async () => {
      const result = await service.remove(BrandsMock[0].id);
      expect(result).toEqual(BrandsMock[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'remove').mockRejectedValueOnce(new Error())
      expect(service.remove(1)).rejects.toThrowError();
    })
  })
});
