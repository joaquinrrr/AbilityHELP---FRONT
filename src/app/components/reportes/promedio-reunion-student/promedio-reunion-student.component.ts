import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../../../services/meetings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promedio-reunion-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promedio-reunion-student.component.html',
  styleUrl: './promedio-reunion-student.component.css'
})
export class PromedioReunionStudentComponent implements OnInit{
  studentMeetingAverages: any[] = [];

  constructor(private meetingsService: MeetingsService) {}

  ngOnInit(): void {
    this.meetingsService.getAverageMeetStudent().subscribe((data) => {
      this.studentMeetingAverages = data;
    });
  }
}
