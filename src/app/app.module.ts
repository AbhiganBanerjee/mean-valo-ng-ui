import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Materialdemo1Component } from './components/materialdemo1/materialdemo1.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AgentsComponent } from './components/agents/agents.component';
import { HomeComponent } from './components/home/home.component';
import { MapsComponent } from './components/maps/maps.component';
import { ArsenalComponent } from './components/arsenal/arsenal.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { LogindialogComponent } from './components/logindialog/logindialog.component';
import { GuarddialogComponent } from './components/guarddialog/guarddialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginsnackbarComponent } from './components/loginsnackbar/loginsnackbar.component';
import { LogoutsnackbarComponent } from './components/logoutsnackbar/logoutsnackbar.component';
import { RegistersuccesssnackbarComponent } from './components/registersuccesssnackbar/registersuccesssnackbar.component';
import { RegerrorsnackbarComponent } from './components/regerrorsnackbar/regerrorsnackbar.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    Materialdemo1Component,
    NavbarComponent,
    AgentsComponent,
    HomeComponent,
    MapsComponent,
    ArsenalComponent,
    LoginComponent,
    RegisterComponent,
    LogindialogComponent,
    GuarddialogComponent,
    LoginsnackbarComponent,
    LogoutsnackbarComponent,
    RegistersuccesssnackbarComponent,
    RegerrorsnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
