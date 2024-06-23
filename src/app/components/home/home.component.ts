import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private loginService: LoginService) {}

  username: string = '';
  role: string = '';

  ngOnInit(): void {
    this.username = this.loginService.showName();
  }

  verificar() {
    this.role = this.loginService.showRole();
    //this.usuario = this.loginService.userlogin(this.joaquin);
    this.username = this.loginService.showName();

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
