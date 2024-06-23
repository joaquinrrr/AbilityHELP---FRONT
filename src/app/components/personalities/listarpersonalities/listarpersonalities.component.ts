import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Personalities } from '../../../models/personalities';
import { PersonalitiesService } from '../../../services/personalities.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-listarpersonalities',
  standalone: true,
  imports: [MatTableModule, 
    MatCardModule, 
    CommonModule, 
    MatPaginator, 
    MatPaginatorModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    RouterLink],
  templateUrl: './listarpersonalities.component.html',
  styleUrl: './listarpersonalities.component.css'
})
export class ListarpersonalitiesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion'];
  dataSource: MatTableDataSource<Personalities>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sP:PersonalitiesService, private aPP: AppComponent){}
  ngOnInit(): void {
    this.sP.list().subscribe((data)=>{ 
      this.dataSource = new MatTableDataSource(this.sortPersonalities(data));
    })
    this.sP.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortPersonalities(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sP.eliminar(id).subscribe((data) => {
      this.sP.list().subscribe((data) => {
        this.sP.setList(this.sortPersonalities(data));
      });
    });
  }

  sortPersonalities(personalities: Personalities[]): Personalities[] {
    return personalities.sort((a, b) => a.idPersonality - b.idPersonality);
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
