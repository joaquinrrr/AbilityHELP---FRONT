import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, LabelItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MeetingsService } from '../../../services/meetings.service';
import { UsersService } from '../../../services/users.service';
import { CommonModule, NgIf } from '@angular/common';
import { Chart } from 'chart.js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cantmeetpercoach',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule, MatCardModule, MatLabel, MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
   ],
  templateUrl: './cantmeetpercoach.component.html',
  styleUrls: ['./cantmeetpercoach.component.css']
})
export class CantmeetpercoachComponent {
  meetData: any[] = [];
  coachName: string = ''; // Variable para almacenar el nombre del coach ingresado

  constructor(private meetingService: MeetingsService) {}

  ngOnInit(): void {
    // Aquí puedes inicializar cualquier lógica necesaria al iniciar el componente
  }

  fetchMeetingsByCoach(): void {
    if (this.coachName.trim() !== '') {
      this.meetingService.getQuantityMeetCoach(this.coachName).subscribe(
        data => {
          this.meetData = data;
        },
        error => {
          console.error('Error fetching meetings:', error);
        }
      );
    } else {
      console.error('Nombre del coach no puede estar vacío.');
    }
  }
}
