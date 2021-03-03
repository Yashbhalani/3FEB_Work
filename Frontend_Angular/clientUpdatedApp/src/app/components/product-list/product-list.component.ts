import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { IVehicle } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: IVehicle[] = [];

  constructor(private vehicleService: VehiclesService) { }

  ngOnInit(): void {

    this.vehicleService.getAllVehicles().subscribe((data: any[])=>{
      this.productList = data;
      console.log(this.productList);
    })

  }

}
