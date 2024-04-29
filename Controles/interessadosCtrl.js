import Interessado from "../Modelos/interessado.js";
export default class InteressadosCtrl {
// Essa classe terá a responsabilidade de traduzir pedidos HTTP em comandos internos da aplicação
// A nossa aplicação sabe gravar, atualizar, excluir e consultar interessado no BD.
// Será necessário manipular requisições HTTP
// Requisições HTTP (GET, POST, PUT OU PATCH , DELETE)

// Camada de controle será síncrona, então iremos resolver os métodos assíncronos com promises


gravar(requisicao, resposta){

        //prepar o método gravar para produzir respostas no formato JSON
        resposta.type('application/json');

        //HTTP gravar um interessado é enviar uma requisição do tipo POST
        //trazendo dados no formato JSON
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            const nome = dados.nome;
            const cpf = dados.cpf;
            const telefone = dados.telefone;
            const email = dados.email;

            //pseudo validação nos dados
            if(nome && cpf && telefone && email){
                const interessado = new Interessado(0, nome, cpf, telefone, email);
                interessado.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Interessado gravado com sucesso!",
                        "codigo_interessado": interessado.codigo
                    });
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o interessado! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do interessado, conforme documentação da API"
                });
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar interessado!"
            })
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body; // extrair dados do corpo da requisição
            // Código será extraído da URL, exemplo http://localhost:4000/interessado/1 // 1 é o código
            const codigo = parseInt(requisicao.params.codigo);
            const nome = dados.nome;
            const cpf = dados.cpf;
            const telefone = dados.telefone;
            const email = dados.email;
            if (nome && cpf && telefone && email) {
                const interessado = new Interessado(codigo, nome, cpf, telefone, email);
                interessado.atualizar()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Interessado atualizado com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível atualizar o interessado! " + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe todos os dados do interessado, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um interessado!"
            })
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "DELETE"){
            //o código do interessado que será excluído será extraído da url
            const codigo = requisicao.params.codigo;
            if (codigo && codigo > 0){
                const interessado = new Interessado(codigo);
                interessado.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status":true,
                        "mensagem": "Interessado excluído com sucesso!",
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível excluir o interessado! " + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Por favor, informe o código do interessado que deseja excluir, conforme documentação da API"
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método DELETE para excluir interessado!"
            })
        }
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const interessado = new Interessado(0);
            interessado.consultar(termoDePesquisa)
            .then((interessados)=>{
                resposta.status(200);
                resposta.json(interessados);
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível consultar os interessados! " + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar os interessados!"
            })
        }
    }

}