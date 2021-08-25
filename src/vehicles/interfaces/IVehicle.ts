import { IBrand } from "src/brands/interfaces/IBrand";

export interface IVehicle {
    id?: number;
    veiculo: string;
    marca: IBrand;
    ano: number;
    descricao: string;
    vendido: boolean;
}