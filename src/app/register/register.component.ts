import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl} from '@angular/forms'
import {  Router} from '@angular/router'
import {AuthService} from '../_service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm;
  formData;
  user_data;
  resp;
  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) { 
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.userForm = this.fb.group({
      'email': this.fb.control('',[Validators.required,Validators.email]),
      'fname': this.fb.control('',Validators.required),
      'lname': this.fb.control(''),
      'password':this.fb.control('',[Validators.required,Validators.minLength(6),Validators.maxLength(20)])
    })
  }

  ngOnInit(): void {
  }
  submitForm(){
    this.formData = this.userForm.value
    if (this.userForm.invalid) {
      return;
    }
    this.user_data = {
      "email":this.formData.email,
      "password": this.formData.password,
      "fname": this.formData.fname,
      "lname": this.formData.lname
    }
    this.authService.addUser(this.user_data).subscribe( (data) => {
        console.log(data)
      if(data.ok== true){
        alert(data.message);
        this.router.navigate(['/login']);
      }
      else{
        alert(data.message); 
      }
        
    },
    (error)=>{
      alert(error.error.message);
    }
    );
  }
  

}
