import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ExpenseService } from '../../services/expense.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  expenseForm!: FormGroup;
  index: any;
  totalExpense: number = 0;

  constructor(private http: HttpClient,private _expense:ExpenseService) { }


  ngOnInit(): void {
    this.setForm();
  }


  setForm() {
    this.expenseForm = new FormGroup({
      expenseDate: new FormControl('',[Validators.required]),
      expenseType: new FormControl('',[Validators.required]),
      expenseAmount: new FormControl('',[Validators.required]),
    });
  }
  expenseList: any = []; 
  submit() {
    this.expenseList.push(this.expenseForm.value);
    console.log('expenseList', this.expenseList);
    if(this.expenseForm.valid){
      console.log(this.expenseForm.value)
      this._expense.expense(this.expenseForm.value).subscribe((data: any) => {
      console.log(data)
      this.expenseForm.reset();
      alert(data.msg);
      })
    }else{
      alert("Please Fill Valid Details...!")
    }
    this.closeModal('addExpenseModal');
    this.resetForm();
    this.calculateTotalExpense();
  }


  //modal open method

  openModal(modalId:any, index:any){

    if(modalId=='updateExpenseModal') {

      this.expenseForm = new FormGroup({
        expenseDate: new FormControl(this.expenseList[index].expenseDate),
        expenseType: new FormControl(this.expenseList[index].expenseType),
        expenseAmount: new FormControl(this.expenseList[index].expenseAmount),
      });

    }



    console.log(index);
    this.index=index;
    const modalElement:any = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal(modalId:any){
    const modalElement:any = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    if(modal){
    modal.hide();
    }
  }

  delete(index: number) {
    this.expenseList.splice(index, 1);
    this.calculateTotalExpense();
  }
  

  update(index: number) {
    this.expenseList[index].expenseDate = this.expenseForm.value.expenseDate;
    this.expenseList[index].expenseType = this.expenseForm.value.expenseType;
    this.expenseList[index].expenseAmount = this.expenseForm.value.expenseAmount;
    this.calculateTotalExpense();
    this.closeModal('updateExpenseModal');
  }
  
  calculateTotalExpense() {
    this.totalExpense = this.expenseList.reduce((total: any, expense: any) => {
      return total + parseFloat(expense.expenseAmount);
    }, 0);
  }
  
  resetForm() {
    this.expenseForm.reset();
    this.setForm();
  }
  
  @Output() totalExpenses = new EventEmitter<number>();
}


