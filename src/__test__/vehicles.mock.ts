import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { BrandsMock } from "./brands.mock";

export const vehiclesMock = [
    new Vehicle({
        id: 1,
        veiculo: 'Honda fit',
        marca: BrandsMock[0],
        ano: 2020,
        descricao: 'Prata',
        vendido: false,
        created: new Date(),
        updated: new Date(),
    }),
    new Vehicle({
        id: 2,
        veiculo: 'HB20',
        marca: BrandsMock[1],
        ano: 2020,
        descricao: 'Branco',
        vendido: false,
        created: new Date(),
        updated: new Date(),
    }),
    new Vehicle({
        id: 3,
        veiculo: 'Celta',
        marca: BrandsMock[2],
        ano: 2002,
        descricao: 'preto',
        vendido: true,
        created: new Date(),
        updated: new Date(),
    }),
]
