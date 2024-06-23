import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AssignincidentsService } from '../../../services/assignincidents.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-incidentespor-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './incidentespor-user.component.html',
  styleUrls: ['./incidentespor-user.component.css'],
})
export class IncidentesporUserComponent implements OnInit {
  incidentData: any[] = [];
  userName: string = ''; // Variable para almacenar el nombre del usuario ingresado

  constructor(private sA: AssignincidentsService) {}

  ngOnInit(): void {
    this.fetchIncidentsByUser();
  }

  fetchIncidentsByUser(): void {
    if (this.userName.trim() !== '') {
      this.sA.getIncidentesUser(this.userName).subscribe(
        data => {
          this.incidentData = data;
        },
        error => {
          console.error('Error fetching incidents:', error);
        }
      );
    } else {
      console.error('Nombre del usuario no puede estar vacío.');
    }
  }
}
