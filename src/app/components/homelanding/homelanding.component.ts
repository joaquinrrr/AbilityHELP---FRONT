import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homelanding',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule
  ],
  templateUrl: './homelanding.component.html',
  styleUrl: './homelanding.component.css'
})
export class HomelandingComponent {
  constructor(private router: Router) { }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToRegister() {
    this.router.navigate(['/usuarios/insertar']); 
  }
}
