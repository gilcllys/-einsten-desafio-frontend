import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PacienteService } from '../../../../../services/paciente.service';
import { Paciente } from '../../../../../models/paciente';
import { MainService } from '../../../../../services/main.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  constructor(
    private pacienteService: PacienteService,
    private mainService: MainService
  ) { }

  generosList = [
    "Mulher cisgênero",
    "Mulher transgênero",
    "Homem cisgênero",
    "Homem transgênero",
    "Gênero não-binário",
    "Agênero",
    "Gênero-fluido",
    "Bigênero",
    "Mulher transexual",
    "Homem transexual",
    "Poligênero",
    "Outros",
    "Não declarado",
  ]

  generos: any = {
    "Mulher cisgênero": "MC",
    "Mulher transgênero": "MTG",
    "Homem cisgênero": "HC",
    "Homem transgênero": "HTG",
    "Gênero não-binário": "GNB",
    "Agênero": "A",
    "Gênero-fluido": "GF",
    "Bigênero": "B",
    "Mulher transexual": "MTS",
    "Homem transexual": "HTS",
    "Poligênero": "P",
    "Outros": "O",
    "Não declarado": "ND",
  }

  filterForm = new FormGroup({
    nome: new FormControl(''),
    genero: new FormControl(''),
    has_saneamento: new FormControl('')
  });

  aplicarFiltro() {

    const data: any = {
      "nome": this.filterForm.controls.nome.value,
      "genero": this.getGenero(this.filterForm.controls.genero.value!),
      "has_esgoto": this.filterForm.controls.has_saneamento.value
    }
    // Substitua pela sua lógica de filtragem
    this.mainService.filtrarPaciente(data).subscribe(
      (result) => {
        this.pacienteService.atualizarPacienteList(result);

      }
    )

  }


  getGenero(genero: string) {
    return genero ? this.generos[genero] : ""
  }


}
