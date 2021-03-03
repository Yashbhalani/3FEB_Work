import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBrand, IModel, IVehicle } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private vehicles = environment.apiURL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAllBrands(): Observable<IBrand[]> {
    return this.httpClient.get<IBrand[]>(this.vehicles + '/brands')
          .pipe(
            catchError(this.errorHandler)
          )
  }

  getSpecificBrand(id): Observable<IBrand> {
    return this.httpClient.get<IBrand>(this.vehicles + '/brands/' + id)
          .pipe(
            catchError(this.errorHandler)
          )
  }

  getAllModels(): Observable<IModel[]> {

    return this.httpClient.get<IModel[]>(this.vehicles + '/models')
          .pipe(
            catchError(this.errorHandler)
          )

  }

  getSpecificModel(id): Observable<IModel> {
    return this.httpClient.get<IModel>(this.vehicles + '/models/' + id)
          .pipe(
            catchError(this.errorHandler)
          )
  }

  getModelsFromBrand(brandId){
    return this.httpClient.get<IModel[]>(this.vehicles+'/modelsFromBrand/?brand='+brandId)
  }

  getAllVehicles(): Observable<IVehicle[]> {

    return this.httpClient.get<IVehicle[]>(this.vehicles + '/vehicles')
          .pipe(
            catchError(this.errorHandler)
          )

  } 

  getSpecificVehicle(id): Observable<IVehicle> {
    return this.httpClient.get<IVehicle>(this.vehicles + '/vehicles/' + id)
          .pipe(
            catchError(this.errorHandler)
          )
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
