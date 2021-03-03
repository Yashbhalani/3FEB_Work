import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './components/product-list/vehicle/vehicle.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-list/product-item/product-item.component';


const routes: Routes = [
  {
    path: 'vehicles', component: ProductListComponent,
    children: [
       { 
         path: 'ProductItemComponent', 
         component: ProductItemComponent,
        }, 
     ] 
  },
  { path: 'vehicle/:id', component: VehicleComponent },
  {
    path: '', component: ProductListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
