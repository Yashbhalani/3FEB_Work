import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from 'src/app/Models/vehicle';
import { AlertService } from 'src/app/_alert';
import { VehicledataService } from '../../Services/vehicledata.service';

@Component({
  selector: 'app-model-registration',
  templateUrl: './model-registration.component.html',
  styleUrls: ['./model-registration.component.css'],
})
export class ModelRegistrationComponent implements OnInit {
  modelForm: FormGroup;
  brands: any[] = [];
  model = new Model();
  id = null;
  brandId:any;

  constructor(
    private formBuilder: FormBuilder,
    private modelService: VehicledataService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.id && this.id != '') {
      this.modelService
        .getSpecificModel(this.id)
        .subscribe((data) => {
          (this.model = data)
          this.brandId = data.brand.id;
        });
    }

    this.modelService.getAllBrands().subscribe((data: any[]) => {
      this.brands = data;
    });

    this.modelForm = this.formBuilder.group({
      brandId: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      shortDiscription: new FormControl('', [
        Validators.required,
        Validators.maxLength(260),
      ]),
      modelYear: new FormControl('', [
        Validators.required,
        this.modelYearValidator,
      ]),
    });
  }

  // Validates numbers
  modelYearValidator(year): any {
    if (year.pristine) {
      return null;
    }
    const NUMBER_REGEXP = /[0-9]{4}$/;
    year.markAsTouched();
    if (
      NUMBER_REGEXP.test(year.value) &&
      (year.value as number) <= new Date().getFullYear()
    ) {
      return null;
    }
    return {
      inValidModelYear: true,
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.modelForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.alertService.clear();
    if (this.modelForm.valid) {
      this.modelService.createModel(this.modelForm.value).subscribe((res) => {
        console.log(res);
        this.alertService.success("Model added successfully!")
        this.modelForm.reset();
      } ,error =>{
        console.log(error)
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
    if (this.modelForm.valid) {
      this.model.name = this.modelForm.value.name;
      this.model.modelYear = this.modelForm.value.modelYear;
      this.model.brandId = this.modelForm.value.brandId;
      this.model.shortDiscription = this.modelForm.value.shortDiscription;

      this.modelService.updateModel(this.model).subscribe((res) => {
        console.log(res);
        this.alertService.success("Model updated successfully!")
      },
      error =>{
        console.log(error)
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
}
