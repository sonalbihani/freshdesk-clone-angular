import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl} from '@angular/forms'
import {  Router,NavigationEnd} from '@angular/router';
import {AuthService} from '../_service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  navigationSubscription;
  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) { 

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    } 
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   // If it is a NavigationEnd event re-initalise the component
    //   if (e instanceof NavigationEnd) {
    //     this.initialiseInvites();
    //   }
    // });
    this.loginForm = this.fb.group({
      'email': this.fb.control('',[Validators.required]),
      'password': this.fb.control('',[Validators.required])
    });
  
  }
  ngOnInit(): void {
  }
  submitForm(){
    if(this.loginForm.valid){
      this.authService.loginUser(this.loginForm.value).subscribe((data)=>{
        localStorage.setItem("user-token",data.data.token);
        this.router.navigate(['/'])
      },
      (error)=>{
        alert(error.error.message);
      }
      )
    }
    
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    // if (this.navigationSubscription) {  
    //    this.navigationSubscription.unsubscribe();
    // }
  }

}
