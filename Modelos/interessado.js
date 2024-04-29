//Classe é a abstração de uma entidade do mundo real
//Em orientação a objetos uma classe possui métodos e atributos
//Atributos são caracteristicas de um Objeto
//Métodos são as ações que um objeto pode executar
import InteressadoDAO from "../Persistencia/InteressadoDAO.js";

export default class Interessado {
    //atributos são privados
    //somente por meio de métodos públicos é que podemos acessar os atributos de uma classe
    //em javascript definimos atributos privados usando #
    #codigo;
    #nome;
    #cpf;
    #telefone;
    #email;

    constructor(codigo=0, nome="", cpf="", telefone="", email="") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#telefone = telefone;
        this.#email = email;
    }
    
    //definir os métodos de acesso aos atributos de um interessado
    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }
    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        this.#nome = novoNome;
    }
    get cpf(){
        return this.#cpf;
    }
    set cpf(novoCPF){
        this.#cpf = novoCPF;
    }
    get telefone(){
        return this.#telefone;
    }
    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }
    get email(){
        return this.#email;
    }
    set email(novoEmail){
        this.#email = novoEmail;
    }

//Como armazenar os interessados no Banco de Dados

async gravar(){
    const dao = new InteressadoDAO();
    await dao.gravar(this); //this pode ser compreendido como a seguinte expressão: grave a mim mesmo
}
async atualizar(){
    const dao = new InteressadoDAO();
    await dao.atualizar(this); 
}
async excluir(){
    const dao = new InteressadoDAO();
    await dao.excluir(this);
}
async consultar(termoDePesquisa){
    const dao = new InteressadoDAO();
    return await dao.consultar(termoDePesquisa);
}
    //Override do método toString da classe pai Object
    toString(){
        return `Interessado código: ${this.#codigo} - nome: ${this.#nome}`
    }
    toJSON(){
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cpf": this.#cpf,
            "telefone": this.#telefone,
            "email": this.#email,
        }
    }
}