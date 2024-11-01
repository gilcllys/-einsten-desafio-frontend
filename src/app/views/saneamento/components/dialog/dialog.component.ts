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
  selector: 'app-dialog-saneamento',
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
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private mainService: MainService,
    private toastr: ToastrService
  ) { }


  dialogForm = new FormGroup({
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    instalacoes_sanitarias: new FormControl(''),
    agua_potavel: new FormControl(''),
    coleta_lixo: new FormControl(''),
  });

  createSaneamento(): void {
    const data: any = {
      "bairro": this.dialogForm.controls.bairro.value,
      "cidade": this.dialogForm.controls.cidade.value,
      "agua_potavel": this.dialogForm.controls.agua_potavel.value,
      "coleta_lixo": this.dialogForm.controls.coleta_lixo.value,
      "instalacoes_sanitarias": this.dialogForm.controls.instalacoes_sanitarias.value,
    }
    this.mainService.createSaneamento(data).subscribe(
      (result) => {
        if (result.id) {
          this.data.recuperarSaneamento();
          this.dialogRef.close();
          this.toastr.success('Saneamento Salvo', 'Sucesso')

        }
      }
    )
  }

}

