import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './description-dialog.component.html',
  styleUrl: './description-dialog.component.scss'
})
export class DescriptionDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DescriptionDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
