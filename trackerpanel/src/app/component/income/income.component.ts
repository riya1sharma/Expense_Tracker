import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import * as bootstrap from 'bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {

  incomeForm!: FormGroup;
  index: any;
  totalIncome: number = 0;
// i: number;

  constructor(private http: HttpClient, private _income:IncomeService) { }


  ngOnInit(): void {
    this.setForm();
  }


  setForm() {
    this.incomeForm = new FormGroup({
      incomeDate: new FormControl('',[Validators.required]),
      incomeType: new FormControl('',[Validators.required]),
      incomeAmount: new FormControl('',[Validators.required]),
    });
  }
  incomeList: any = [];
  submit() {
    this.incomeList.push(this.incomeForm.value);
    console.log('incomeList', this.incomeList);
    if(this.incomeForm.valid){
      console.log(this.incomeForm.value)
      this._income.income(this.incomeForm.value).subscribe((data: any) => {
      console.log(data)
      this.incomeForm.reset();
      alert(data.msg);
      })
    }else{
      alert("Please Fill Valid Details...!")
    }
    this.closeModal('addIncomeModal');
    this.resetForm();
    this.calculateTotalIncome();
  }


  //modal open method

  openModal(modalId:any, index:any){

    if(modalId=='updateIncomeModal') {

      this.incomeForm = new FormGroup({
        incomeDate: new FormControl(this.incomeList[index].incomeDate),
        incomeType: new FormControl(this.incomeList[index].incomeType),
        incomeAmount: new FormControl(this.incomeList[index].incomeAmount),
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
    this.incomeList.splice(index, 1);
    this.calculateTotalIncome();
  }

  update(index: number) {
    this.incomeList[index].incomeDate = this.incomeForm.value.incomeDate;
    this.incomeList[index].incomeType = this.incomeForm.value.incomeType;
    this.incomeList[index].incomeAmount = this.incomeForm.value.incomeAmount;
    this.calculateTotalIncome();
    this.closeModal('updateIncomeModal');
  }
  
  calculateTotalIncome() {
    this.totalIncome = this.incomeList.reduce((total: any, income: any) => {
      return total + parseFloat(income.incomeAmount);
    }, 0);
  }
  
  resetForm() {
    this.incomeForm.reset();
    this.setForm();
  }
  
  @Output() totalIncomes = new EventEmitter<number>();
}
