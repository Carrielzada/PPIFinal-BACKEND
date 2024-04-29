import FilhoteDAO from "../Persistencia/FilhoteDAO.js";

export default class Filhote {

    #codigo;
    #especie;
    #raca;

    constructor(codigo = 0, especie = "", raca = "") {
        this.#codigo = codigo;
        this.#especie = especie;
        this.#raca = raca;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get especie() {
        return this.#especie;
    }

    set especie(novaEspecie) {
        this.#especie = novaEspecie;
    }

    get raca() {
        return this.#raca;
    }

    set raca(novaRaca) {
        this.#raca = novaRaca;
    }

    async gravar(){
        const dao = new FilhoteDAO();
        await dao.gravar(this); //this pode ser compreendido como a seguinte expressão: grave a mim mesmo
    }
    async atualizar(){
        const dao = new FilhoteDAO();
        await dao.atualizar(this); 
    }
    async excluir(){
        const dao = new FilhoteDAO();
        await dao.excluir(this);
    }
    async consultar(termoDePesquisa){
        const dao = new FilhoteDAO();
        return await dao.consultar(termoDePesquisa);
    }
        //Override do método toString da classe pai Object
        toString(){
            return `Filhote código: ${this.#codigo} - espécie: ${this.#especie}`
        }
        toJSON(){
            return {
                "codigo": this.#codigo,
                "espécie": this.#especie,
                "raça": this.#raca
            }
        }
    }