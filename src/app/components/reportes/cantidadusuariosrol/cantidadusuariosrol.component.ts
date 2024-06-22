import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-cantidadusuariosrol',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadusuariosrol.component.html',
  styleUrl: './cantidadusuariosrol.component.css'
})
export class CantidadusuariosrolComponent implements OnInit {
  barChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  barChartType: ChartType = 'polarArea';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(public sR: RolesService ) {}
  ngOnInit(): void {
    this.sR.getQuantityUserRol().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameR);
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
