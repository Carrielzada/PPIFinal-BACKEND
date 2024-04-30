import conectar from "./Conexao.js";
import Filhote from "../Modelos/filhotes.js";

export default class FilhoteDAO {

    async gravar(filhote) {
        if (filhote instanceof Filhote) {
            const conexao = await conectar();
            const sql = "INSERT INTO filhote (especie, raca) VALUES (?, ?)";
            const parametros = [filhote.especie, filhote.raca];
            const [resultados] = await conexao.execute(sql, parametros);
            filhote.codigo = resultados.insertId;
        }
    }

    async atualizar(filhote) {
        if (filhote instanceof Filhote) {
            const conexao = await conectar();
            const sql = "UPDATE filhote SET especie = ?, raca = ? WHERE id = ?";
            const parametros = [filhote.especie, filhote.raca, filhote.codigo];
            await conexao.execute(sql, parametros);
        }
    }

    async excluir(filhote) {
        if (filhote instanceof Filhote) {
            const conexao = await conectar();
            const sql = "DELETE FROM filhote WHERE id = ?";
            const parametros = [filhote.codigo];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(termoDePesquisa) {
        let sql = "";
        if (termoDePesquisa === undefined) {
            termoDePesquisa = "";
        }

        if (isNaN(parseInt(termoDePesquisa))) {
            sql = "SELECT * FROM filhote WHERE especie LIKE ?";
            termoDePesquisa = "%" + termoDePesquisa + "%";
        } else {
            sql = "SELECT * FROM filhote WHERE id = ?";
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, [termoDePesquisa]);

        let listaFilhotes = [];
        for (const registro of registros) {
            const filhote = new Filhote(
                registro.id,
                registro.especie,
                registro.raca
            );
            listaFilhotes.push(filhote);
        }
        return listaFilhotes;
    }
}