import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  ngOnInit():void{
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
