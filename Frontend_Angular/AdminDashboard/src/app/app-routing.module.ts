import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './auth.guard';
import { VehicleRegistrationComponent } from './Components/vehicle-registration/vehicle-registration.component';
import { BrandRegistrationComponent } from './Components/brand-registration/brand-registration.component';
import { ModelRegistrationComponent } from './Components/model-registration/model-registration.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { ModelDetailsComponent } from './Components/model-details/model-details.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'login' },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'addvehicle', component: VehicleRegistrationComponent },
  { path: 'addvehicle/:id', component: VehicleRegistrationComponent },
  { path: 'addbrand', component: BrandRegistrationComponent },
  { path: 'addbrand/:id', component: BrandRegistrationComponent },
  { path: 'addmodel', component: ModelRegistrationComponent },
  { path: 'addmodel/:id', component: ModelRegistrationComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'models', component: ModelDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
