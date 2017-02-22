import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GoogleApiService } from "./google-api.service";
import { UserService } from "./users/user.service";
import { UserComponent } from "./users/user.component";
import { FilterListComponent } from "./filters/filter-list.component";
import { FilterProvider } from "./filters/filter.provider"; 

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FilterListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    GoogleApiService,
    UserService,
    FilterProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
