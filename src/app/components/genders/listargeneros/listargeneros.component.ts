import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Gender } from '../../../models/genders';
import { GendersService } from '../../../services/genders.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listargeneros',
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
    RouterLink,],
  templateUrl: './listargeneros.component.html',
  styleUrl: './listargeneros.component.css'
})
export class ListargenerosComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['codigo', 'genero'];
  dataSource: MatTableDataSource<Gender>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sG:GendersService){}
  ngOnInit(): void {
    this.sG.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    })
    this.sG.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortGenders(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sG.eliminar(id).subscribe((data) => {
      this.sG.list().subscribe((data) => {
        this.sG.setList(this.sortGenders(data));
      });
    });
  }

  sortGenders(genders: Gender[]): Gender[] {
    return genders.sort((a, b) => a.idGender - b.idGender);
  }
}
