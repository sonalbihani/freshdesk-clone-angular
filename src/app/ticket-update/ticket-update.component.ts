import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl} from '@angular/forms'
import {DataService} from '../_service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../_service/auth.service'
import { GlobalConstants } from '../model'
@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {
  id;
  ticketForm;
  contacts_data;
  user_data;
  isFormReady = false;
  prev_data;
  tick_data;
  formData;
  statusValues = GlobalConstants.status;
  sourceValues = GlobalConstants.source;
  categoryValues = GlobalConstants.category;
  contactValues =[
    {id: 1, name: 'Sonal'}
  ]
  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService, private dataService: DataService,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
    this.id = params['id'];    
    });
    this.load_contacts()
    this.ticketForm = this.fb.group({
      'contact': this.fb.control(1,Validators.required),
      'subject': this.fb.control('',Validators.required),
      'description': this.fb.control('',Validators.required),
      'status': this.fb.control(''),
      'source': this.fb.control('',Validators.required),
      'agent': this.fb.control(null),
      'category': this.fb.control('',Validators.required)
    }) 
    this.isFormReady=true;
    
    
   }

  ngOnInit(): void {
    this.dataService.getTicketById(this.id).subscribe((data)=>{
      this.prev_data = data;
      console.log(data)
      this.ticketForm.patchValue({
        contact: this.prev_data.requester_id,
        subject: this.prev_data.subject,
        description: this.prev_data.description,
        category: this.prev_data.category,
        status: this.prev_data.status,
        source: this.prev_data.source,
        agent: this.prev_data.responder_id 
      });
    })

  }
  submitForm(){
    this.formData = this.ticketForm.value
    if (this.ticketForm.invalid) {
      return;
    }
    this.tick_data = {
      "id": this.id,
      "responder_id":this.formData.agent,
      "requester_id": this.formData.contact,
      "category": this.formData.category,
      "description": this.formData.description,
      "subject": this.formData.subject,
      "source": this.formData.source,
      "status" : this.formData.status,
    }
    this.dataService.updateTicket(this.tick_data).subscribe( data => {
      this.router.navigate(['/tickets']);
    });

  }
  load_contacts() { 

    this.dataService.getAllContacts().subscribe((res) => {
      this.contacts_data = res
    })
    this.authService.getUsers().subscribe((res) => {
      this.user_data = res
    })
  }

}
