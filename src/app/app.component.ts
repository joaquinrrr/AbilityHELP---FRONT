import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PersonalitiesComponent } from './components/personalities/personalities.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practiceAbilityHelp';
  role: string = '';
  usuario: string = '';
  joaquin: string='joaquin'
  userId: string | null = null;

  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    //this.usuario = this.loginService.userlogin(this.joaquin);
    this.userId = this.loginService.showName();

    return this.loginService.verificar();
  }

  isADMIN() {
    return this.role === 'ADMIN';
  }

  isCOACH() {
    return this.role === 'COACH';
  }

  isSTUDENT() {
    return this.role === 'STUDENT';
  }


}
