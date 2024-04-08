import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { IncomeComponent } from './component/income/income.component';
import { ExpensesComponent } from './component/expenses/expenses.component';
import { TodoComponent } from './component/todo/todo.component';
import { RegisterComponent } from './component/register/register.component';
import { SavingComponent } from './component/saving/saving.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {
        path:'dashboard',
        component:DashboardComponent,
        children:[
            {path:'',component:HomeComponent},
            {path:'income',component:IncomeComponent},
            {path:'expenses',component:ExpensesComponent},
            {path:'todo',component:TodoComponent},
            {path:'saving',component:SavingComponent},

        ]
    },
];
