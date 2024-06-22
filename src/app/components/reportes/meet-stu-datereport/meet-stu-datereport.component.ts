import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../../../services/meetings.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatCardModule } from '@angular/material/card';
import { meetStuDateDTO } from '../../../models/meetStuDateDTO';

@Component({
  selector: 'app-meet-stu-datereport',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaterialTimepickerModule, 
    MatCardModule,
    FormsModule],
  templateUrl: './meet-stu-datereport.component.html',
  styleUrl: './meet-stu-datereport.component.css'
})
export class MeetStuDatereportComponent implements OnInit{
  meetStuData: meetStuDateDTO[] = [];
  selectedDate: Date | null = null;  // Variable para almacenar la fecha seleccionada

  constructor(private sM: MeetingsService) {}

  ngOnInit(): void {
    this.fetchMeetingsByDate();
  }

  fetchMeetingsByDate(): void {
    if (this.selectedDate !== null) {
      const isoDate = this.selectedDate.toISOString().split('T')[0]; // Convertir a ISO-8601
      this.sM.getMeetStuDate(isoDate).subscribe(
        data => {
          this.meetStuData = data;
        },
        error => {
          console.error('Error fetching meetings:', error);
        }
      );
    } else {
      console.error('La fecha seleccionada no puede estar vacía.');
    }
  }
  
}
