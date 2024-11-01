import { Component } from '@angular/core';
import { FilterComponent } from "./components/filter/filter.component";
import { TableComponent } from "./components/table/table.component";
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-saneamento',
  standalone: true,
  imports: [
    FilterComponent,
    TableComponent,
    MatToolbarModule
  ],
  templateUrl: './saneamento.component.html',
  styleUrl: './saneamento.component.scss'
})
export class SaneamentoComponent {

}
