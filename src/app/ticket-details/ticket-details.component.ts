import { Component, OnInit } from '@angular/core';
import {DataService} from '../_service/data.service';
import {AuthService} from '../_service/auth.service'
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalConstants} from '../model'
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  id;
  tick_data;
  contacts_data;
  user_data;
  statusValues = GlobalConstants.status;
  sourceValues = GlobalConstants.source;
  categoryValues = GlobalConstants.category;
  constructor(private router: Router,private dataService: DataService,private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];     
      });
   }

  ngOnInit(): void {
    this.load_contacts()
    this.get_details()
    // this.ticket_delete();
  }
  get_details(){ 
    this.dataService.getTicketById(this.id).subscribe((data)=>{
        this.tick_data = data;
        this.tick_data.created_at = new Date(data.created_at)
        this.tick_data.due_by = new Date(data.due_by)
        this.tick_data.updated_at = new Date(data.updated_at)
        this.tick_data.source = this.sourceValues.find((i) =>i.id == data.source).name
        this.tick_data.requester_id = this.contacts_data.find((i) =>i.id == data.requester_id).name
        this.tick_data.category = this.categoryValues.find((i) => i.id ==data.category).name
        this.tick_data.status = this.statusValues.find((i) =>i.id == data.status).name
        if(this.tick_data.responder_id!=null){
          this.tick_data.responder_id = this.user_data.find((i)=>i.id == data.responder_id).name
        }
        else{
          this.tick_data.responder_id = 'Unassigned'
        }
        

    })
  }
  ticket_update(event: Event){
    this.router.navigate(['/tickets/update/'+this.id])
  }
  ticket_delete(){
    this.dataService.deleteTicket(this.id).subscribe((data)=>{
      this.router.navigate(['/tickets']);
    })  
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
