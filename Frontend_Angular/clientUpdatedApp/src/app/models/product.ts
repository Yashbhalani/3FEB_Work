import { DecimalPipe } from '@angular/common';

export interface IVehicle {
    id: number;
    modelMaster: IModel;
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
    modelId: string;
    brandId: string;
  }
  
  export interface IModel {
    id: number;
    name: string;
    shortDiscription: string;
    modelYear: string;
    brandId: number;
    brand: IBrand;
  }
  
  export interface IBrand {
    id: number;
    name: string;
    shortDiscription: string;
  }
  
  export interface IQuote {
    id: number;
    quoteAmount: number;
    status: string;
    vehicleId: number;
    customerId: number;
    leaseMaster: ILeaseMaster;

  }

  export interface ILeaseMaster {
    id: number;
    leaseAmount: number;
    leaseDuration: number;
    kilometers: number;
    status: boolean;
    vehicleId: number;
  }
