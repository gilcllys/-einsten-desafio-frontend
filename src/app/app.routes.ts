import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { PacientesComponent } from './views/pacientes/pacientes.component';
import { SaneamentoComponent } from './views/saneamento/saneamento.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", redirectTo: 'login', pathMatch: 'full' },
    { path: "signup", component: SignupComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "pacientes", component: PacientesComponent, canActivate: [AuthGuard] },
    { path: "saneamento", component: SaneamentoComponent, canActivate: [AuthGuard] },
];
