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
import { Chats } from '../../../models/chats';
import { ChatsService } from '../../../services/chats.service';

@Component({
  selector: 'app-listarchats',
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
  templateUrl: './listarchats.component.html',
  styleUrl: './listarchats.component.css'
})
export class ListarchatsComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['codigo', 'fecha', 'estudiante_envia', 'estudiante_recibe', 'tipo_interaccion']
  dataSource: MatTableDataSource<Chats>=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sC:ChatsService){}
  ngOnInit(): void {
    this.sC.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    })
    this.sC.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortGenders(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sC.eliminar(id).subscribe((data) => {
      this.sC.list().subscribe((data) => {
        this.sC.setList(this.sortGenders(data));
      });
    });
  }

  sortGenders(chatsss: Chats[]): Chats[] {
    return chatsss.sort((a, b) => a.idChat - b.idChat);
  }
}
