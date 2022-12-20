import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { FormsModule } from '@angular/forms';
import { DisableButtonDirective } from './shared/directives/disable-button.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    DetailUserComponent,
    DisableButtonDirective,
    DialogComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DisableButtonDirective],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
