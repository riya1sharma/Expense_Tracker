import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(private _router:Router){}
  logout() {
    if (confirm('Are you sure you want to log out?')) {
      // Redirect to login page
      this._router.navigate(['']);
    }
  }
}
