import { Component, Input, OnInit } from '@angular/core';
import { IVehicle } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() vehicleItem: IVehicle;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToVehicle(id:any) {
    this.router.navigate(['/vehicle',id]); 
  }
}
