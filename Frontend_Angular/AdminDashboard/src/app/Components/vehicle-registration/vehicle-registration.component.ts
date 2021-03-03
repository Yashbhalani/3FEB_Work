import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/Models/vehicle';
import { AlertService } from 'src/app/_alert';
import { VehicledataService } from '../../Services/vehicledata.service';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.css'],
})
export class VehicleRegistrationComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  brands: any[] = [];
  models: any[] = [];

  vehicle = new Vehicle();

  id = null;
  modelId;
  brandId;

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicledataService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.id && this.id != '') {
      this.vehicleService.getSpecificVehicle(this.id).subscribe((data) => {
        this.vehicle = data;
        console.log(this.vehicle);
        this.brandId = data.modelMaster.brand.id;
        this.modelId = data.modelMaster.id;
        this.loadModel(this.brandId);
      });
    }

    this.vehicleService.getAllBrands().subscribe((data: any[]) => {
      this.brands = data;
    });

    // this.vehicleService.getAllModels().subscribe((data: any[]) => {
    //   this.models = data;
    //   console.log('models', this.models);
    // });

    this.registerForm = this.formBuilder.group({
      brandId: new FormControl('', [Validators.required]),
      modelId: new FormControl('', [Validators.required]),
      vINNum: new FormControl('', [
        Validators.required,
        this.vINNumberValidator,
      ]),
      licencePlate: new FormControl('', [
        Validators.required,
        this.licencePlateValidator,
      ]),
      averageUsage: new FormControl('', [Validators.required]),
      kilometers: new FormControl('', [Validators.required,
      Validators.pattern('^[0-9]*$')
      ]),
      seatingCapacity: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
        ]),
      engine: new FormControl('', [Validators.required]),
      bodyType: new FormControl('', [Validators.required]),
      fuelType: new FormControl('', [Validators.required]),
      numOfAirbags:  new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
        ]),
      numOfDoors:  new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
        ]),
      vehicleConfiguration: new FormControl('', [Validators.required]),
      wheelbase: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      fuelCapacity: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
        ]),
      cargoVolume:  new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
        ]),
      salesPrice:  new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')
        ]),
    });
  }

  vINNumberValidator(vINNum): any {
    if (vINNum.pristine) {
      return null;
    }

    const VINNum_REGEXP = /[a-zA-Z0-9]{17}$/;
    vINNum.markAsTouched();
    if (VINNum_REGEXP.test(vINNum.value)) {
      return null;
    }

    return {
      inValidvINNum: true,
    };
  }

  licencePlateValidator(licencePlate): any {
    if (licencePlate.pristine) {
      return null;
    }

    const VINNum_REGEXP = /[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
    licencePlate.markAsTouched();
    if (VINNum_REGEXP.test(licencePlate.value)) {
      return null;
    }

    return {
      inValidlicencePlate: true,
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  loadModel(brandId) {
    this.vehicleService.getModelsFromBrand(brandId).subscribe(
      (data: any[]) => {
        this.models = data;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error.error);
      }
    );
  }

  onSubmit() {
    this.alertService.clear();
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);

      this.vehicleService.createVehicle(this.registerForm.value).subscribe(
        (res) => {
          console.log('Vehicle registered successfully!');
          this.alertService.success('Vehicle registered successfully!');
        },
        (error) => {
          console.log(error);
          // if(error.status == 409){
          //   // alert("The brand with same name already exists!")
          //   this.alertService.error("The brand with same name already exists!")
          // }else{
          //   this.alertService.error(error.message)
          // }
          this.alertService.error(error.error);
        }
      );
    }
  }

  onUpdate() {
    this.alertService.clear();
    if (this.registerForm.valid) {
      this.vehicle.brandId = this.registerForm.value.brandId;
      this.vehicle.modelId = this.registerForm.value.modelId;
      this.vehicle.vINNum = this.registerForm.value.vINNum;
      this.vehicle.licencePlate = this.registerForm.value.licencePlate;
      this.vehicle.averageUsage = this.registerForm.value.averageUsage;
      this.vehicle.seatingCapicity = this.registerForm.value.seatingCapacity;
      this.vehicle.engine = this.registerForm.value.engine;
      this.vehicle.bodyType = this.registerForm.value.bodyType;
      this.vehicle.fuelType = this.registerForm.value.fuelType;
      this.vehicle.numOfAirbags = this.registerForm.value.numOfAirbags;
      this.vehicle.numOfDoors = this.registerForm.value.numOfDoors;
      this.vehicle.vehicleConfiguration = this.registerForm.value.vehicleConfiguration;
      this.vehicle.wheelbase = this.registerForm.value.wheelbase;
      this.vehicle.color = this.registerForm.value.color;
      this.vehicle.fuelCapacity = this.registerForm.value.fuelCapacity;
      this.vehicle.cargoVolume = this.registerForm.value.cargoVolume;
      this.vehicle.salesPrice = this.registerForm.value.salesPrice;

      this.vehicleService.updateVehicle(this.vehicle).subscribe(
        (res) => {
          console.log(res);
          this.alertService.success('Vehicle updated successfully!');
        },
        (error) => {
          console.log(error);
          // if(error.status == 409){
          //   // alert("The brand with same name already exists!")
          //   this.alertService.error("The brand with same name already exists!")
          // }else{
          //   this.alertService.error(error.message)
          // }
          this.alertService.error(error.error);
        }
      );
    } else {
      console.log(this.registerForm.errors);
    }
  }
}
