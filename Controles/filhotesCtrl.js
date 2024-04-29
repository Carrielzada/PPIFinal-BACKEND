import Filhote from "../Modelos/filhotes.js";

export default class FilhotesCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const especie = dados.especie;
            const raca = dados.raca;

            if (especie && raca) {
                const filhote = new Filhote(0, especie, raca);
                filhote
                    .gravar()
                    .then(() => {
                        resposta.status(201);
                        resposta.json({
                            status: true,
                            mensagem: "Filhote gravado com sucesso!",
                            codigo_filhote: filhote.codigo,
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500);
                        resposta.json({
                            status: false,
                            mensagem: "Não foi possível armazenar o filhote! " + erro.message,
                        });
                    });
            } else {
                resposta.status(400);
                resposta.json({
                    status: false,
                    mensagem: "Por favor, informe todos os dados do filhote, conforme documentação da API",
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                status: false,
                mensagem: "Requisição inválida! Esperando o método POST e dados no formato JSON para gravar filhote!",
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')) {
            const dados = requisicao.body; // extrair dados do corpo da requisição
            // Código será extraído da URL, exemplo http://localhost:4000/interessado/1 // 1 é o código
            const codigo = parseInt(requisicao.params.codigo);
            const especie = dados.especie;
            const raca = dados.raca;
            if (especie && raca) {
                const filhote = new Filhote(codigo, especie, raca);
                filhote.atualizar()
                    .then(() => {
                        resposta.status(200);
                        resposta.json({
                            "status": true,
                            "mensagem": "Filhote atualizado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500);
                        resposta.json({
                            "status": false,
                            "mensagem": "Não foi possível atualizar o filhote! " + erro.message,
                        });
                    });
            } else {
                resposta.status(400);
                resposta.json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do filhote, conforme documentação da API",
                });
            }
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método PATCH, PUT e dados no formato JSON para atualizar um filhote!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        const codigo = requisicao.params.codigo;
        if (codigo && codigo > 0) {
            const filhote = new Filhote(codigo);
            filhote.excluir()
                .then(() => {
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "filhote excluído com sucesso!",
                    });
                })
                .catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível excluir o filhote! " + erro.message,
                    });
                });
        } else {
            resposta.status(400);
            resposta.json({
                "status": false,
                "mensagem": "Por favor, informe o código do filhote que deseja excluir, conforme documentação da API",
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const termoDePesquisa = requisicao.params.termo;
            const filhote = new Filhote(0);
            filhote.consultar(termoDePesquisa)
                .then((filhotes) => {
                    resposta.status(200);
                    resposta.json(filhotes);
                })
                .catch((erro) => {
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possível consultar o filhote! " + erro.message,
                    });
                });
        } else {
            resposta.status(405);
            resposta.json({
                "status": false,
                "mensagem": "Requisição inválida! Esperando o método GET para consultar o filhote!"
            });
        }
    }
}
