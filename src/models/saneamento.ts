export class SaneamentoInfo {
    id?: number;
    bairro: string;
    cidade: string;
    agua_potavel: boolean;
    coleta_lixo: boolean
    instalacoes_sanitarias: boolean
    created_at: Date;

    constructor(
        bairro: string,
        cidade: string,
        instalacoes_sanitarias: boolean,
        agua_potavel: boolean,
        coleta_lixo: boolean,
        created_at: Date,
        id?: number,
    ) {
        this.id = id;
        this.bairro = bairro;
        this.cidade = cidade;
        this.agua_potavel = agua_potavel;
        this.coleta_lixo = coleta_lixo;
        this.instalacoes_sanitarias = instalacoes_sanitarias;
        this.created_at = created_at
    }
}
