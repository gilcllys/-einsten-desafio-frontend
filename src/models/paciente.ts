export class Paciente {
    id?: number;
    nome: string;
    genero: string;
    historico_saude: string;
    created_at: Date;
    has_esgoto: boolean

    constructor(nome: string, genero: string, historico_saude: string, created_at: Date, has_esgoto: boolean, id?: number,) {
        this.id = id;
        this.nome = nome;
        this.genero = genero;
        this.historico_saude = historico_saude;
        this.has_esgoto = has_esgoto
        this.created_at = created_at
    }
}