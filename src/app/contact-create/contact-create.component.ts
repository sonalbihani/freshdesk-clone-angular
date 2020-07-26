import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl} from '@angular/forms'
import {  Router} from '@angular/router'
import {DataService} from '../_service/data.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  contactForm;
  formData;
  contact_data;
  phoneNumber = "^0?[1-9][0-9]{9}$";
  constructor(private fb: FormBuilder, private router: Router,private dataService: DataService) { 
    this.contactForm = this.fb.group({
      'name': this.fb.control('',Validators.required),
      'email': this.fb.control('',[Validators.required,Validators.email]),
      'phone': this.fb.control('',Validators.pattern(this.phoneNumber)),
      'company_name': this.fb.control('')
    })
  }

  ngOnInit(): void {
  }
  submitForm(){ 
    this.formData = this.contactForm.value
    if (this.contactForm.invalid) {
      return;
    }

    this.dataService.createContact(this.formData).subscribe( data => {
      this.router.navigate(['/contacts']);
      
    });
    
  }
}
