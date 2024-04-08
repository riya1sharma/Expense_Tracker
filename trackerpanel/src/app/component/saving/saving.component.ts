import { Component, Input, OnInit } from '@angular/core';
import { IncomeComponent } from '../income/income.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-saving',
  standalone: true,
  imports: [IncomeComponent, ExpensesComponent, CommonModule],
  templateUrl: './saving.component.html',
  styleUrl: './saving.component.scss',
  providers: [CurrencyPipe]
})
export class SavingComponent implements OnInit {
  @Input() totalIncome = 0;
  @Input() totalExpense = 0;

  savings = 0;

  ngOnInit(): void {
    this.calculateSavings();
  }

  calculateSavings() {
    this.savings = this.totalIncome - this.totalExpense;
  }

}