import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Paciente } from '../models/paciente';
import { SaneamentoInfo } from '../models/saneamento';

@Injectable({
    providedIn: 'root'
})
export class MainService extends BaseService {
    private authRoutes: string = 'auth/core/'
    saneamentoShared: SaneamentoInfo[] = [];
    pacienteList: Paciente[] = [];



    // Método para buscar todos os usuários
    getAllPacientes(): Observable<any> {
        return this.get(this.authRoutes + 'paciente/');  // O endpoint será "http://localhost:8000/api/auth/core/paciente"
    }
    getAllSaneamentos(): Observable<any> {
        return this.get(this.authRoutes + 'saneamento_info/');
    }

    // Método para buscar um Paciente pelo ID
    getPacienteById(id: string): Observable<any> {
        return this.get(this.authRoutes + `paciente/${id}`);
    }

    getSaneamentoById(id: string): Observable<any> {
        return this.get(this.authRoutes + `saneamento_info/${id}`);
    }

    // Método para criar um novo Paciente
    createPaciente(PacienteData: any): Observable<any> {
        return this.post(this.authRoutes + 'paciente/', PacienteData);
    }

    createSaneamento(saneamentoData: any): Observable<any> {
        return this.post(this.authRoutes + 'saneamento_info/', saneamentoData);
    }

    // Método para atualizar um paciente
    updatePaciente(id: string, pacienteData: any): Observable<any> {
        return this.put(this.authRoutes + `paciente/${id}`, pacienteData);
    }
    updateSaneamento(id: string, saneamentoData: any): Observable<any> {
        return this.put(this.authRoutes + `saneamento_info/${id}`, saneamentoData);
    }

    // Método para deletar um Paciente
    deletePaciente(id: string): Observable<any> {
        return this.delete(this.authRoutes + `paciente/${id}/`);
    }
    deleteSaneamento(id: string): Observable<any> {
        return this.delete(this.authRoutes + `saneamento_info/${id}/`);
    }

    filtrarPaciente(PacienteData: any): Observable<any> {
        return this.post(this.authRoutes + 'paciente/filtrar/', PacienteData);
    }

    filtrarSaneamento(SaneamentoData: any): Observable<any> {
        return this.post(this.authRoutes + 'saneamento_info/filtrar/', SaneamentoData);
    }

    // Variável para armazenar a função

}
