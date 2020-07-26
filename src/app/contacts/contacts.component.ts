import { Component, OnInit ,ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {DataService} from '../_service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
declare var $;
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit,AfterViewInit {
  contacts_data;
  constructor(private dataService: DataService,private router: Router) { }
  

  @ViewChild('dataTable', {static: false}) dataTable: ElementRef;

  dtOption: any = {};
  dt: any;
  ngOnInit(): void {
    
}
ngAfterViewInit(): void{
  this.load_contacts();
  
}
rowClickHandler(data){
  this.router.navigate(['contact/details/' + data['id']]);
}
load_contacts(){
  this.dataService.getAllContacts().subscribe((response)=>{
      this.contacts_data = response
    this.dtOption = {
      "data": this.contacts_data,
      "columns": [
        {title: 'Name', data: 'name'},
        {title: 'Email', data: 'email'},
        {title: 'Phone', data: 'phone'},
        {title: 'Company Name',data:'company_name'},
        { 
          title: 'Action',
          render: function (data: any, type: any, full: any) {
            return '<button class="btn btn-primary btn-user btn-block">View</button>';
          }
        }  
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) =>{
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
  

}
