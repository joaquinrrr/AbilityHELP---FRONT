import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Schedules } from '../../../models/schedules';
import { SchedulesService } from '../../../services/schedules.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-listarhorarios',
  standalone: true,
  imports: [
    MatTableModule, 
    MatCardModule, 
    CommonModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './listarhorarios.component.html',
  styleUrl: './listarhorarios.component.css'
})
export class ListarhorariosComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Schedules>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sS: SchedulesService, private aPP: AppComponent){}
  ngOnInit(): void {
    this.sS.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortSchedules(data));
    })
    this.sS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortSchedules(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sS.eliminar(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(this.sortSchedules(data));
      });
    });
  }

  sortSchedules(horariosss: Schedules[]): Schedules[] {
    return horariosss.sort((a, b) => a.idSchedule - b.idSchedule);
  }
  
  isADMIN(): boolean {
    return this.aPP.isADMIN();
  }
  isCOACH(): boolean {
    return this.aPP.isCOACH();
  }
  isSTUDENT(): boolean {
    return this.aPP.isSTUDENT();
  }
}
