import { Component, OnInit } from '@angular/core';
import {DataService} from '../_service/data.service';
import {AuthService} from '../_service/auth.service'
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalConstants} from '../model'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private dataService: DataService, private authService: AuthService) { }
  tickets_data;
  open_tickets;
  unassigned_tickets;
  overdue_tickets;
  solved_tickets;
  ngOnInit(): void {
    this.load_tickets()
  }
  load_tickets(){
    this.dataService.getAllTickets().subscribe((response) => {
      this.tickets_data = response.map((data) => {
        data.created_at = new Date(data.created_at)
        data.due_by = new Date(data.due_by)
        data.updated_at = new Date(data.updated_at)
        return data;
      })
      this.open_tickets = this.tickets_data.filter(function(ele){
        return ele.status ==2
      }).length
      this.overdue_tickets = this.tickets_data.filter(function(ele){
        return (ele.due_by<(new Date()))
      }).length
      this.solved_tickets = this.tickets_data.filter(function(ele){
        return ele.status ==4
      }).length
      this.unassigned_tickets = this.tickets_data.filter(function(ele){
        return ele.responder_id==null
      }).length
      
  })
}

}
