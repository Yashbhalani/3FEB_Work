import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Brand } from '../../Models/vehicle';
import { VehicledataService } from '../../Services/vehicledata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-brand-registration',
  templateUrl: './brand-registration.component.html',
  styleUrls: ['./brand-registration.component.css'],
})
export class BrandRegistrationComponent implements OnInit {

  brandForm: FormGroup = new FormGroup({});
  brand = new Brand();
  id = null;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: VehicledataService,
    private router: Router,
    private aRouter: ActivatedRoute,
    protected alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.aRouter.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.id && this.id != '') {
      this.brandService
        .getSpecificBrand(this.id)
        .subscribe((data) => (this.brand = data));
    }

    this.brandForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      shortDiscription: new FormControl('', [
        Validators.required,
        Validators.maxLength(260),
      ]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.brandForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.alertService.clear();
    if (this.brandForm.valid) {
      console.log(this.brandForm.value);

      this.brandService.createBrand(this.brandForm.value).subscribe(
        (data) => {
        console.log(data);
        this.alertService.success("Brand added successfully!")
        this.brandForm.reset();
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

  onUpdate() {
    this.alertService.clear();
    if (this.brandForm.valid) {
      this.brand.name = this.brandForm.value.name;
      this.brand.shortDiscription = this.brandForm.value.shortDiscription;

      this.brandService.updateBrand(this.brand).subscribe((res) => {
        console.log(res);
        this.alertService.success("Brand updated successfully!")
        this.router.navigate(['/brands'])
      },
      error =>{
        console.log(error)
        // if(error.status == 400){
        //   // alert("The brand with same name already exists!")
        // }else{
        //   this.alertService.error(error.message)
        // }
        this.alertService.error(error.error);
      }
      );
    }
  }
}
