import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './features/app-header/app-header.component';
import { TopNavComponent } from './features/top-nav/top-nav.component';
import { GeneraladminsectionComponent } from './components/generaladminsection/generaladminsection.component';
import { UserAccessComponent } from './components/user-access/user-access.component';
import { ThemeToggleComponent } from './features/theme-toggle/theme-toggle.component';
import { DatePickerComponent } from './features/date-picker/date-picker.component';
import { HierarchySelectComponent } from './features/hierarchy-select/hierarchy-select.component';
import { ModalComponent } from './features/modal/modal.component';
import { SnackbarComponent } from './features/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    TopNavComponent,
    GeneraladminsectionComponent,
    UserAccessComponent,
    ThemeToggleComponent,
    DatePickerComponent,
    HierarchySelectComponent,
    ModalComponent,
    SnackbarComponent
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
