import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token = localStorage.getItem('user-token');

  constructor(
    private router: Router, private authService: AuthService) {

    
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    
  }
  check_navbar(){
    if (localStorage.getItem('user-token') == null) {
      document.getElementById("tick-id").style.display="none";
      document.getElementById("cont").style.display="none";
      document.getElementById("logout-id").style.display="none";
      document.getElementById("login-id").style.display="block";
      document.getElementById("register-id").style.display="block";
    }
    else{
      document.getElementById("login-id").style.display="none";
      document.getElementById("register-id").style.display="none";
      document.getElementById("tick-id").style.display="block";
      document.getElementById("cont").style.display="block";
      document.getElementById("logout-id").style.display="block";
    }
  }

}
