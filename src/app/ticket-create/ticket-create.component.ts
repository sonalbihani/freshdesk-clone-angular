import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { DataService } from '../_service/data.service';
import { AuthService } from '../_service/auth.service'
import { GlobalConstants } from '../model'
@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  ticketForm;
  contacts_data;
  tick_data;
  user_data;
  formData;
  statusValues = GlobalConstants.status;
  sourceValues = GlobalConstants.source;
  categoryValues = GlobalConstants.category;
  contactValues;
  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService, private authService: AuthService) {
    this.load_contacts()
    this.ticketForm = this.fb.group({
      'contact': this.fb.control(1, Validators.required),
      'subject': this.fb.control('', Validators.required),
      'description': this.fb.control('', Validators.required),
      'status': this.fb.control(''),
      'source': this.fb.control('', Validators.required),
      'agent': this.fb.control(null),
      'category': this.fb.control('', Validators.required)
    })
    this.ticketForm.controls['status'].setValue(this.statusValues[0].id, { onlySelf: true })
    this.ticketForm.controls['source'].setValue(this.sourceValues[1].id, { onlySelf: true })


  }

  ngOnInit(): void {
  }
  submitForm() {
    this.formData = this.ticketForm.value
    if (this.ticketForm.invalid) {
      return;
    }
    this.tick_data = {
      "responder_id": this.formData.agent,
      "requester_id": this.formData.contact,
      "category": this.formData.category,
      "description": this.formData.description,
      "subject": this.formData.subject,
      "source": this.formData.source,
      "status": this.formData.status,
    }
    this.dataService.createTicket(this.tick_data).subscribe(data => {
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
