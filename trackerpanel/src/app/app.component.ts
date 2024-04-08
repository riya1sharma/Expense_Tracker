import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LoginComponent,
    FormsModule, 
    ReactiveFormsModule,
    DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  // totalIncomes: number = 0;
  // totalExpenses: number = 0;

  // updateTotalIncome(income: number) {
  //   this.totalIncomes = income;
  // }

  // updateTotalExpense(expense: number) {
  //   this.totalExpenses = expense;
  // }
}

