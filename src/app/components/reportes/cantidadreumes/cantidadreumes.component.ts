import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MeetingsService } from '../../../services/meetings.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cantidadreumes',
  standalone: true,
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './cantidadreumes.component.html',
  styleUrls: ['./cantidadreumes.component.css']
})
export class CantidadreumesComponent implements OnInit {
  year: number = new Date().getFullYear(); // Default to current year
  barChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private meetingService: MeetingsService) {}

  ngOnInit(): void {
    this.fetchMeetingData();
  }

  fetchMeetingData(): void {
    if (this.year) {
      this.meetingService.getMeetingMoth(this.year).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.month);
        this.barChartData = [
          {
            data: data.map((item) => item.quantity),
            label: 'Cantidad de Reuniones',
            backgroundColor: [
              '#4BACC6',
              '#4F81BC',
              '#C0504D',
              '#9BBB59',
              '#8064A2',
              '#4BACC6',
              '#F79646',
              '#4F81BC',
              '#C0504D',
              '#9BBB59',
              '#8064A2',
              '#F79646'
            ],
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ];
      });
    }
  }
}
