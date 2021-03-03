import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../../Services/auth.service';
 
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  
  constructor(private authService: AuthService, private router: Router) {}

  opened = false;
  isShown: boolean = true;

  ngOnInit() {
    
    if(!this.authService.isLoggedIn) {
      this.isShown = false;
    }

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
