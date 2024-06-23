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
import { TypeinteractionService } from '../../../services/typeinteraction.service';
import { TypeInteraccion } from '../../../models/typeinteraction';
@Component({
  selector: 'app-listartipointeraccion',
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
  templateUrl: './listartipointeraccion.component.html',
  styleUrl: './listartipointeraccion.component.css'
})
export class ListartipointeraccionComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['codigo', 'tipo'];
  dataSource: MatTableDataSource<TypeInteraccion>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sT:TypeinteractionService){}
  ngOnInit(): void {
    this.sT.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    })
    this.sT.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortGenders(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
//eliminar tipo interaccion
  eliminar(id: number) {
    this.sT.eliminar(id).subscribe((data) => {
      this.sT.list().subscribe((data) => {
        this.sT.setList(this.sortGenders(data));
      });
    });
  }

  sortGenders(type: TypeInteraccion[]): TypeInteraccion[] {
    return type.sort((a, b) => a.id - b.id);
  }
}
