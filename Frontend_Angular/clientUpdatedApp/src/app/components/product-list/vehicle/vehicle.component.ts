import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { IVehicle } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicle: IVehicle;
  id="";

  constructor(private vehicleService: VehiclesService, private aRouter:ActivatedRoute,private route: Router) { }

  ngOnInit(): void {
    
    this.aRouter.params.subscribe(params => {
      this.id = params['id'];
    })

    this.vehicleService.getSpecificVehicle(this.id).subscribe(data=>{
      this.vehicle = data;
      console.log(this.vehicle);
      
    })

  }

  onLease(){
    this.route.navigate(['/lease',this.id]);
  }

}
