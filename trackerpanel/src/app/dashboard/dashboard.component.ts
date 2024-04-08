import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../component/navigation/navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showOverlay: boolean = false; // Initialize overlay to be hidden

  constructor(private _router: Router) {}

  // logout() {
  //   this.showOverlay = false; 
  //   this._router.navigate(['']);
  // }
  }
