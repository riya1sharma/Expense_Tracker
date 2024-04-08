import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoForm!: FormGroup;
  index: any;
  totalTodo: number = 0;

  constructor(private http: HttpClient,private _todo:TodoService) { }


  ngOnInit(): void {
    this.setForm();
  }


  setForm() {
    this.todoForm = new FormGroup({
      todoDate: new FormControl('',[Validators.required]),
      todoType: new FormControl('',[Validators.required]),
      todoAmount: new FormControl('',[Validators.required]),
    });
  }
  todoList: any = [];
  submit() {
    this.todoList.push(this.todoForm.value);
    console.log('todoList', this.todoList);
    if(this.todoForm.valid){
      console.log(this.todoForm.value)
      this._todo.todo(this.todoForm.value).subscribe((data: any) => {
      console.log(data)
      this.todoForm.reset();
      alert(data.msg);
      })
    }else{
      alert("Please Fill Valid Details...!")
    }
    this.closeModal('addTodoModal');
    this.resetForm();
    this.calculateTotalTodo();
  }


  //modal open method

  openModal(modalId:any, index:any){

    if(modalId=='updateTodoModal') {

      this.todoForm = new FormGroup({
        todoDate: new FormControl(this.todoList[index].todoDate),
        todoType: new FormControl(this.todoList[index].todoType),
        todoAmount: new FormControl(this.todoList[index].todoAmount),
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
    this.todoList.splice(index, 1);
    this.calculateTotalTodo();
  }

  update(index: number) {
    this.todoList[index].todoDate = this.todoForm.value.todoDate;
    this.todoList[index].todoType = this.todoForm.value.todoType;
    this.todoList[index].todoAmount = this.todoForm.value.todoAmount;
    this.calculateTotalTodo();
    this.closeModal('updateTodoModal');
  }
  
  calculateTotalTodo() {
    this.totalTodo = this.todoList.reduce((total: any, todo: any) => {
      return total + parseFloat(todo.todoAmount);
    }, 0);
  }
  
  resetForm() {
    this.todoForm.reset();
    this.setForm();
  }
  
  
}
