import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainService } from '../../../../../services/main.service';
import { SaneamentoService } from '../../../../../services/saneamento.service';

@Component({
  selector: 'app-filter-saneamento',
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
    private mainService: MainService,
    private saneamentoService: SaneamentoService
  ) {

  }

  filterForm = new FormGroup({
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    instalacoes_sanitarias: new FormControl(''),
    agua_potavel: new FormControl(''),
    coleta_lixo: new FormControl(''),
  });

  aplicarFiltro() {

    const data: any = {
      "bairro": this.filterForm.controls.bairro.value,
      "cidade": this.filterForm.controls.cidade.value,
      "instalacoes_sanitarias": this.filterForm.controls.instalacoes_sanitarias.value,
      "agua_potavel": this.filterForm.controls.agua_potavel.value,
      "coleta_lixo": this.filterForm.controls.coleta_lixo.value
    }
    // Substitua pela sua lógica de filtragem
    this.mainService.filtrarSaneamento(data).subscribe(
      (result) => {
        this.saneamentoService.atualizarSaneamentoList(result);

      }
    )

  }

}
