import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environment/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ExpensesComponent } from './component/expenses/expenses.component';
import { CategoriesComponent } from './component/categories/categories.component';
import {MatChipsModule}  from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list'
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UpdateExpenseComponent } from './component/update-expense/update-expense.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PiechartComponent } from './component/piechart/piechart.component';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ExpensesComponent,
    CategoriesComponent,
    UpdateExpenseComponent,
    PiechartComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    NgChartsModule,
    MatListModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports:[MatChipsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
