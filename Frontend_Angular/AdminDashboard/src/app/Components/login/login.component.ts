import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              private formBuilder: FormBuilder) { }

  loginForm: FormGroup = new FormGroup({});
  isSubmitted = false;
   
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    
    if(this.loginForm.invalid) {
      return; 
    }
    
    var status: boolean = this.authService.signIn(this.loginForm.value);

    if(status) {
      this.router.navigateByUrl('/home');
    }
    
  }

}
