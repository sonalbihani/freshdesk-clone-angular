import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';


const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"login",
    component: LoginComponent,
    runGuardsAndResolvers: "always"
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path:"tickets",
    component: TicketsComponent
  },
  {
    path: "ticket/new",
    component: TicketCreateComponent
  },
  {
    path: "tickets/update/:id",
    component: TicketUpdateComponent
  },
  {
    path: "contacts/update/:id",
    component: ContactUpdateComponent
  },
  {
    path: "ticket/details/:id",
    component: TicketDetailsComponent
  },
  {
    path: "contacts",
    component: ContactsComponent
  },
  {
    path: "contacts/new",
    component: ContactCreateComponent
  },
  {
    path: "contact/details/:id",
    component: ContactDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
