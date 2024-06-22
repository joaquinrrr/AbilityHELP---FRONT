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
import { Meetings } from '../../../models/meetings';
import { MeetingsService } from '../../../services/meetings.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-listarreuniones',
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
  templateUrl: './listarreuniones.component.html',
  styleUrl: './listarreuniones.component.css'
})
export class ListarreunionesComponent implements OnInit{
  dataSource: MatTableDataSource<Meetings>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sM:MeetingsService, private aPP: AppComponent){}
  ngOnInit(): void {
    this.sM.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    })
    this.sM.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortGenders(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sM.eliminar(id).subscribe((data) => {
      this.sM.list().subscribe((data) => {
        this.sM.setList(this.sortGenders(data));
      });
    });
  }

  sortGenders(meetingsss: Meetings[]): Meetings[] {
    return meetingsss.sort((a, b) => a.idMeet - b.idMeet);
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
