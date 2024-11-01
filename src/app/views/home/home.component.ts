import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { PacientesComponent } from "../pacientes/pacientes.component";
import { SaneamentoComponent } from "../saneamento/saneamento.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatTabsModule,
    PacientesComponent,
    SaneamentoComponent,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  goToPacientes(): void {
    this.router.navigate(['/pacientes'])
  }

  goToSaneamento(): void {
    this.router.navigate(['/saneamento'])
  }

  logout(): void {
    this.authService.setIsLogged(false);
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
