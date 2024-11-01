// paciente.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Paciente } from '../models/paciente';
// Ajuste o caminho conforme necessário

@Injectable({
    providedIn: 'root',
})
export class PacienteService {
    private pacienteListSource = new BehaviorSubject<Paciente[]>([]);
    pacienteList$ = this.pacienteListSource.asObservable();

    // Método para atualizar a lista de pacientes
    atualizarPacienteList(lista: Paciente[]) {
        this.pacienteListSource.next(lista);
    }
}