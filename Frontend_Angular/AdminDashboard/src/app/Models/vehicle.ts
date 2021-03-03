
export class Brand {
    id: number;
    name: string;
    shortDiscription: string;
}

export class Model {
    id: number;
    name: string;
    shortDiscription: string;
    modelYear: string;
    brandId:number;
    brand:Brand;
}

export class Vehicle {
    id: number;
    modelMaster: Model;
    name: string;
    shortDiscription: string;
    modelYear: string;
    vINNum: string;
    licencePlate: string;
    averageUsage: string;
    kilometers: number;
    seatingCapicity: number;
    engine: string;
    bodyType: string;
    fuelType: string;
    numOfAirbags: number;
    numOfDoors: number;
    vehicleConfiguration: string;
    wheelbase: string;
    color: string;
    fuelCapacity: number;
    cargoVolume: number;
    salesPrice: number;
    modelId:number;
    brandId:number;
}