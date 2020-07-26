import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import {TicketData,ContactData,UserData} from '../model'
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }


  getAllTickets():Observable<TicketData[]>{
    return this.http.get<TicketData[]>(this.API_URL+'tickets')
  }

  getAllContacts():Observable<ContactData[]>{
    return this.http.get<ContactData[]>(this.API_URL+'contacts')
  }

  getTicketById(id: number): Observable<TicketData> {
    return this.http.get<TicketData>(this.API_URL +'tickets/'+id);
  }

  getContactById(id: number): Observable<ContactData> {
    return this.http.get<ContactData>(this.API_URL +'contacts/'+id);
  }

  createTicket(ticket: TicketData):Observable<TicketData>{
    return this.http.post<TicketData>(this.API_URL+'tickets',ticket)
  }

  updateTicket(ticket: TicketData): Observable<TicketData> {
    return this.http.put<TicketData>(this.API_URL+'tickets/update/' + ticket.id, ticket);
  }

  updateContact(contact: ContactData): Observable<ContactData> {
    return this.http.put<ContactData>(this.API_URL+'contacts/update/' + contact.id, contact);
  }

  deleteTicket(id: number): Observable<TicketData> {
    return this.http.delete<TicketData>(this.API_URL +'tickets/delete/'+ id);
  }
  deleteContact(id: number): Observable<ContactData> {
    return this.http.delete<ContactData>(this.API_URL +'contacts/delete/'+ id);
  }

  createContact(contact: ContactData):Observable<ContactData>{
    return this.http.post<ContactData>(this.API_URL+'contacts',contact)
  }

  
}
