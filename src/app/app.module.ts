import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { AuthGuard } from './_service/auth.guard';
import { RegisterComponent } from './register/register.component'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TicketsComponent,
    ContactsComponent,
    LoginComponent,
    TicketCreateComponent,
    ContactCreateComponent,
    TicketUpdateComponent,
    ContactUpdateComponent,
    TicketDetailsComponent,
    ContactDetailsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
