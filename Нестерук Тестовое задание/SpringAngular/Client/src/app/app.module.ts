import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import {HttpClientModule} from "@angular/common/http";
import { CatalogComponent } from './components/catalog/catalog.component';
import { AdminComponent } from './components/admin/admin.component';
import {FormsModule} from "@angular/forms";
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { UsersComponent } from './components/users/users.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AutorizationComponent } from './components/autorization/autorization.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CatalogComponent,
    AdminComponent,
    BooksComponent,
    AuthorsComponent,
    UsersComponent,
    RegistrationComponent,
    AutorizationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
