import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MainService } from '../../../../../services/main.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  constructor(
    private mainService: MainService,
    private toastr: ToastrService
  ) {

  }

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
  currentDate = new Date();

  dialogForm = new FormGroup({
    nome: new FormControl(''),
    genero: new FormControl(''),
    has_saneamento: new FormControl(''),
    historico_saude: new FormControl(''),
    created_at: new FormControl(this.currentDate),
  });

  getGenero(genero: string) {
    return this.generos[genero]
  }

  createPaciente(): void {
    const data: any = {
      "nome": this.dialogForm.controls.nome.value,
      "genero": this.getGenero(this.dialogForm.controls.genero.value!),
      "has_esgoto": this.dialogForm.controls.has_saneamento.value,
      "historico_saude": this.dialogForm.controls.historico_saude.value,
    }

    this.mainService.createPaciente(data).subscribe(
      (result) => {
        if (result.id) {
          this.data.recuperarPacientes();
          this.dialogRef.close();
          this.toastr.success('Paciente Salvo', 'Sucesso')

        }
      }
    )
  }


}
