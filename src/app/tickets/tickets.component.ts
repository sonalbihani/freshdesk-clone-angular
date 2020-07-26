import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
declare var $;
import { DataService } from '../_service/data.service';
import { AuthService } from '../_service/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from '../model'
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {

  tickets_data;
  contacts_data;
  user_data;
  statusValues = GlobalConstants.status;
  sourceValues = GlobalConstants.source;
  categoryValues = GlobalConstants.category;
  constructor(private dataService: DataService, private router: Router, private authService: AuthService) {
    this.load_contacts()
   }
  @ViewChild('dataTable', { static: true }) dataTable: ElementRef;

  dtOption: any = {};
  dt: any;
  ngOnInit(): void {
    // this.load_tickets()
   

  }
  ngAfterViewInit(): void {
    
    
    
  }
  rowClickHandler(data) {
    this.router.navigate(['ticket/details/' + data['id']]);
  }
  load_tickets() {
    this.dataService.getAllTickets().subscribe((response) => {
      this.tickets_data = response.map((data) => {
        data.created_at = new Date(data.created_at)
        data.due_by = new Date(data.due_by)
        data.updated_at = new Date(data.updated_at)
        return data;
        
      })
      this.tickets_data = this.tickets_data.map((d) => {
        d.source = this.sourceValues.find((i) =>i.id == d.source).name
        if(this.contacts_data!=null){
        d.requester_id = this.contacts_data.find((i) =>i.id == d.requester_id).name
        }
        d.category = this.categoryValues.find((i) => i.id == parseInt(d.category)).name
        d.status = this.statusValues.find((i) =>i.id == d.status).name
        if(d.responder_id!=null && this.user_data!=null){
          d.responder_id = this.user_data.find((i)=> i.id == d.responder_id).name
        }  
        return d
      })

      this.dtOption = {
        "data": this.tickets_data,
        "columns": [
          { title: 'Contact', data: 'requester_id' },
          { title: 'Subject', data: 'subject' },
          { title: 'Status', data: 'status' },
          { title: 'Category', data: 'category' },
          { title: 'Source', data: 'source' },
          { title: 'Agent', data: 'responder_id' },
          {
            title: 'Action',
            render: function (data: any, type: any, full: any) {
              return '<button class="btn btn-primary btn-user btn-block">View</button>';
            }
          }
        ],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          jQuery('td', row).unbind('click');
          jQuery('td', row).bind('click', () => {
            self.rowClickHandler(data);
          });
          return row;
        },
      };
      this.dt = $(this.dataTable.nativeElement)
      this.dt.DataTable(this.dtOption)
    })


  }
  load_contacts() {

    this.dataService.getAllContacts().subscribe((res) => {
      this.contacts_data = res
    })
    this.authService.getUsers().subscribe((res) => {
      this.user_data = res
    })
    this.load_tickets()
  }

}
