import { Component, OnInit } from '@angular/core';
import {DataService} from '../_service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
id;
contact_data;
  constructor(private router: Router,private dataService: DataService,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];    
      });
   }

  ngOnInit(): void {
    this.get_details()
  } 
  get_details(){
    this.dataService.getContactById(this.id).subscribe((data)=>{
      this.contact_data = data;

    })
  }

  contact_update(event: Event){
    this.router.navigate(['/contacts/update/'+this.id])
  }
  contact_delete(){
    this.dataService.deleteContact(this.id).subscribe(data=>{
      this.router.navigate(['/contacts']);
    } )  
  }

}
