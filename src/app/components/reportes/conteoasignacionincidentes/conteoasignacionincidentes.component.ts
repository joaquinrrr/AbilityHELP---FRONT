import { Component } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AssignincidentsService } from '../../../services/assignincidents.service';

@Component({
  selector: 'app-conteoasignacionincidentes',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './conteoasignacionincidentes.component.html',
  styleUrl: './conteoasignacionincidentes.component.css'
})
export class ConteoasignacionincidentesComponent {
  barChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(public sA: AssignincidentsService ) {}
  ngOnInit(): void {
    this.sA.getIncidentCount().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.TypeInci);
      this.barChartData = [
        {
          data: data.map((item) => item.quantity),
          label: 'Cantidad de Incidentes',
          backgroundColor: [
            '#4BACC6',
            '#4F81BC',
            '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
