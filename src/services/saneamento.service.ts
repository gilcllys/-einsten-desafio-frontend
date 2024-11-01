import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SaneamentoInfo } from '../models/saneamento';
// Ajuste o caminho conforme necessário

@Injectable({
    providedIn: 'root',
})
export class SaneamentoService {
    private saneamentoListSource = new BehaviorSubject<SaneamentoInfo[]>([]);
    saneamentoList$ = this.saneamentoListSource.asObservable();

    // Método para atualizar a lista de saneamentp
    atualizarSaneamentoList(lista: SaneamentoInfo[]) {
        this.saneamentoListSource.next(lista);
    }
}