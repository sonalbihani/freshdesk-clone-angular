import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl} from '@angular/forms'
import {DataService} from '../_service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {
  id;
  contactForm;
  isFormReady = false;
  prev_data;
  contact_data;
  formData;
  phoneNumber = "^0?[1-9][0-9]{9}$";
  constructor(private fb: FormBuilder, private router: Router,private dataService: DataService,private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];    
      });
    this.contactForm = this.fb.group({
      'name': this.fb.control('',Validators.required),
      'email': this.fb.control('',[Validators.required,Validators.email]),
      'phone': this.fb.control('',Validators.pattern(this.phoneNumber)),
      'company_name': this.fb.control('')
    })
  }

  ngOnInit(): void { 
    this.dataService.getContactById(this.id).subscribe((data)=>{
      this.prev_data = data;
      console.log(data)
      this.contactForm.patchValue({
        name: this.prev_data.name,
        email: this.prev_data.email,
        phone: this.prev_data.phone,
        company_name: this.prev_data.company_name
        
      });
    })
  }

  submitForm(){
    this.formData = this.contactForm.value
    if (this.contactForm.invalid) {
      return;
    }
    this.contact_data = {
      "id": this.id,
      "name": this.formData.name,
      "email":this.formData.email,
      "company_name" : this.formData.company_name,
      "phone": this.formData.phone
    }
    this.dataService.updateContact(this.contact_data).subscribe( data => {
      this.router.navigate(['/contacts']);
    });
  }


}
