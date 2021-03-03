import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Vehicle, Brand, Model } from '../Models/vehicle';

  
@Injectable({
  providedIn: 'root'
})
export class VehicledataService {

  private vehicles = environment.apiURL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAllBrands(): Observable<Brand[]> {

    return this.httpClient.get<Brand[]>(this.vehicles + '/brands')
          .pipe(
            catchError(this.errorHandler)
          )

  }

  getSpecificBrand(id): Observable<Brand> {
    return this.httpClient.get<Brand>(this.vehicles + '/brands/' + id)
          .pipe(
            catchError(this.errorHandler)
          )
  }

  createBrand(brand): Observable<Brand> {
    return this.httpClient.post<Brand>(this.vehicles + '/brands/', JSON.stringify(brand), this.httpOptions )
          // .pipe(
          //   catchError(this.errorHandler)
          // )
  }
  
  updateBrand( brand): Observable<Brand> {

    return this.httpClient.put<Brand>(this.vehicles + '/brands/' , JSON.stringify(brand), this.httpOptions)
          // .pipe(
          //   catchError(this.errorHandler)
          // )

  }

  deleteBrand(id) {
    return this.httpClient.delete(this.vehicles + '/brands/' + id, this.httpOptions)
          // .pipe(
          //   catchError(this.errorHandler)
          // )
  }

  getAllModels(): Observable<Model[]> {

    return this.httpClient.get<Model[]>(this.vehicles + '/models')
          .pipe(
            catchError(this.errorHandler)
          )

  }

  getSpecificModel(id): Observable<Model> {
    return this.httpClient.get<Model>(this.vehicles + '/models/' + id)
          .pipe(
            catchError(this.errorHandler)
          )
  }

  getModelsFromBrand(brandId){
    return this.httpClient.get<Model[]>(this.vehicles+'/modelsFromBrand/?brand='+brandId)
  }

  createModel(model): Observable<Model> {
    return this.httpClient.post<Model>(this.vehicles + '/models/', JSON.stringify(model), this.httpOptions )
          // .pipe(
          //   catchError(this.errorHandler)
          // )
  }
  
  updateModel( model): Observable<Model> {

    return this.httpClient.put<Model>(this.vehicles + '/models/' , JSON.stringify(model), this.httpOptions)
          // .pipe(
          //   catchError(this.errorHandler)
          // )

  }

  deleteModel(id) {
    return this.httpClient.delete(this.vehicles + '/models/' + id, this.httpOptions)
          // .pipe(
          //   catchError(this.errorHandler)
          // )
  }

  getAllVehicles(): Observable<Vehicle[]> {

    return this.httpClient.get<Vehicle[]>(this.vehicles + '/vehicles')
          .pipe(
            catchError(this.errorHandler)
          )

  }

  getSpecificVehicle(id): Observable<Vehicle> {
    return this.httpClient.get<Vehicle>(this.vehicles + '/vehicles/' + id)
          .pipe(
            catchError(this.errorHandler)
          )
  }

  createVehicle(vehicle): Observable<Brand> {
    return this.httpClient.post<Vehicle>(this.vehicles + '/vehicles/', JSON.stringify(vehicle), this.httpOptions )
          // .pipe(
          //   catchError(this.errorHandler)
          // )
  }
  
  updateVehicle( vehicle): Observable<Vehicle> {

    return this.httpClient.put<Vehicle>(this.vehicles + '/vehicles/' , JSON.stringify(vehicle), this.httpOptions)
          // .pipe(
          //   catchError(this.errorHandler)
          // )

  }

  deleteVehicle(id) {
    return this.httpClient.delete(this.vehicles + '/vehicles/' + id, this.httpOptions)
          // .pipe(
          //   catchError(this.errorHandler)
          // )
  }

  
  errorHandler(error) {

      let errorMessage = '';

      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      return throwError(errorMessage);
  }

}
