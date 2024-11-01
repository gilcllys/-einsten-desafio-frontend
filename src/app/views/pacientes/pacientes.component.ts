import { Component } from '@angular/core';
import { FilterComponent } from "./components/filter/filter.component";
import { TableComponent } from "./components/table/table.component";
import { Paciente } from '../../../models/paciente';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    FilterComponent,
    TableComponent,
    MatToolbarModule
  ],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss'
})
export class PacientesComponent {

}
