import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SaneamentoInfo } from '../../../../../models/saneamento';
import { MainService } from '../../../../../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { SaneamentoService } from '../../../../../services/saneamento.service';



@Component({
  selector: 'app-table-saneamento',
  standalone: true,
  imports: [
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private toastr: ToastrService,
    private saneamentoService: SaneamentoService

  ) { }
  ngOnInit(): void {
    this.retrieveAllSaneamento();
    this.saneamentoService.saneamentoList$.subscribe(lista => {
      this.saneamentoList = lista; // Reatribui a lista recebida
    });
  }

  saneamentoList: SaneamentoInfo[] = []

  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'bairro', 'cidade', 'agua_potavel', 'coleta_lixo', 'instalacoes_sanitarias', 'action'];


  openDialog(): void {
    this.dialog.open(
      DialogComponent, {
      width: '650px',
      height: '650px',
      data: { recuperarSaneamento: this.retrieveAllSaneamento.bind(this) }
    }
    )
  }

  retrieveAllSaneamento(): void {
    this.mainService.getAllSaneamentos().subscribe(
      (result) => {
        this.saneamentoList = result;
        this.saneamentoService.atualizarSaneamentoList(result);
      }
    )
  }

  deleteSaneamento(saneamentoId: string): void {
    this.mainService.deleteSaneamento(saneamentoId).subscribe(
      (result) => {
        this.retrieveAllSaneamento()
        this.toastr.success('Saneamento deletado', 'sucesso')

      }
    )
  }



}
