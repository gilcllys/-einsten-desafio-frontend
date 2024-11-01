import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MainService } from '../../../../../services/main.service';
import { Paciente } from '../../../../../models/paciente';
import { ToastrService } from 'ngx-toastr';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';
import { PacienteService } from '../../../../../services/paciente.service';

@Component({
  selector: 'app-table',
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
  pacienteList: Paciente[] = [];

  constructor(
    private mainService: MainService,
    private toastr: ToastrService,
    private pacienteService: PacienteService
  ) {
  }
  ngOnInit(): void {
    this.retrieveAllPacientes();
    this.pacienteService.pacienteList$.subscribe(lista => {
      this.pacienteList = lista; // Reatribui a lista recebida
    });
  }

  generos: any = {
    "MC": "Mulher cisgênero",
    "MTG": "Mulher transgênero",
    "HC": "Homem cisgênero",
    "HTG": "Homem transgênero",
    "GNB": "Gênero não-binário",
    "A": "Agênero",
    "GF": "Gênero-fluido",
    "B": "Bigênero",
    "MTS": "Mulher transexual",
    "HTS": "Homem transexual",
    "P": "Poligênero",
    "O": "Outros",
    "ND": "Não declarado",
  }
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'nome', 'genero', 'esgoto', 'action'];




  openDialog(): void {
    this.dialog.open(
      DialogComponent, {
      width: '650px',
      height: '650px',
      data: { recuperarPacientes: this.retrieveAllPacientes.bind(this) }
    },
    )
  }

  openDescriptionDialog(pacienteData: Paciente): void {
    this.dialog.open(
      DescriptionDialogComponent, {
      width: '650px',
      height: '650px',
      data: { pacienteInfo: pacienteData }
    },
    )
  }

  retrieveAllPacientes(): void {
    this.mainService.getAllPacientes().subscribe(
      (result) => {
        this.pacienteList = result;
        this.pacienteService.atualizarPacienteList(result);
      }
    )
  }

  getGenero(genero: string) {
    return this.generos[genero];
  }

  deletarPaciente(idPaciente: string): void {
    this.mainService.deletePaciente(idPaciente).subscribe(
      (result) => {
        this.retrieveAllPacientes()
        this.toastr.success('Paciente deletado', 'sucesso')

      }
    )
  }
}
