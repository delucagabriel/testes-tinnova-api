import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { vehiclesMock } from '../__test__/vehicles.mock';
import { Repository } from 'typeorm';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: {
            save: jest.fn().mockResolvedValue(vehiclesMock[0]),
            find: jest.fn().mockResolvedValue(vehiclesMock),
            findOne: jest.fn().mockResolvedValue(vehiclesMock[0]),
            update: jest.fn().mockResolvedValue(vehiclesMock[0]),
            remove: jest.fn().mockResolvedValue(vehiclesMock[0]),
          }
        }
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get(getRepositoryToken(Vehicle));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should create a vehicle', async () => {
      const result = await service.create(vehiclesMock[0]);
      expect(result).toEqual(vehiclesMock[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error())
      expect(service.create(vehiclesMock[0])).rejects.toThrowError();
    })
  })

  describe('findAll', () => {
    it('should return a vehicles list', async () => {
      const result = await service.findAll();
      expect(result).toEqual(vehiclesMock);
      expect(repository.find).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new Error())
      expect(service.findAll()).rejects.toThrowError();
    })
  })

  describe('findOne', () => {
    it('should return a vehicle', async () => {
      const result = await service.findOne(vehiclesMock[0].id);
      expect(result).toEqual(vehiclesMock[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error())
      expect(service.findOne(1)).rejects.toThrowError();
    })
  })

  describe('update', () => {
    it('should return a updated vehicle', async () => {
      const result = await service.update(vehiclesMock[0].id, vehiclesMock[0]);
      expect(result).toEqual(vehiclesMock[0]);
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledTimes(1);

    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'update').mockRejectedValueOnce(new Error())
      expect(service.update(1, vehiclesMock[0])).rejects.toThrowError();
    })
  })

  describe('remove', () => {
    it('should return a removed vehicle', async () => {
      const result = await service.remove(vehiclesMock[0].id);
      expect(result).toEqual(vehiclesMock[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    })

    it('should throw an exception', () => {
      jest.spyOn(repository, 'remove').mockRejectedValueOnce(new Error())
      expect(service.remove(1)).rejects.toThrowError();
    })
  })
});
