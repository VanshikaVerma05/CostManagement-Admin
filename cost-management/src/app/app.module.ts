import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './features/app-header/app-header.component';
import { TopNavComponent } from './features/top-nav/top-nav.component';
import { HomeComponent } from './components/home/home.component';
import { ThemeToggleComponent } from './features/theme-toggle/theme-toggle.component';
import { InvoiceUploadComponent } from './components/invoice-upload/invoice-upload.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { DatePickerComponent } from './features/date-picker/date-picker.component';
import { HierarchySelectComponent } from './features/hierarchy-select/hierarchy-select.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    TopNavComponent,
    HomeComponent,
    ThemeToggleComponent,
    InvoiceUploadComponent,
    ForecastComponent,
    DatePickerComponent,
    HierarchySelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
