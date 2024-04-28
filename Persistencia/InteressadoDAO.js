import conectar from "./Conexao.js"; //Não esquecer do .js no final
import Interessado from "../Modelos/interessado.js";
//DAO Data Access Object
export default class InteressadoDAO{
    async gravar(interessado){
        if (interessado instanceof Interessado){
            const conexao = await conectar();
            const sql = `INSERT INTO interessado (nome, cpf, telefone, email) 
            values (?, ?, ?, ?)`;
        const parametros =[
            interessado.nome,
            interessado.cpf,
            interessado.telefone,
            interessado.email
        ];
            const [resultados, campos] = await conexao.execute(sql, parametros); // Adicionado "=" aqui
            interessado.codigo = resultados.insertId; // Recupero o ID gerado pelo DB
        }
    }
    async atualizar(interessado){
        if (interessado instanceof Interessado){
            const conexao = await conectar();
            const sql = `UPDATE Interessado SET nome = ?, 
            cpf = ?, telefone = ?, email = ?, 
            WHERE id = ?`;
        const parametros = [
            interessado.nome,
            interessado.cpf,
            interessado.telefone,
            interessado.email,
            interessado.codigo
        ];

        await conexao.execute(sql, parametros);
        }
    }
    async excluir(interessado){
        if (interessado instanceof Interessado) {
            const conexao = await conectar ();
            const sql = `DELETE FROM interessado WHERE id = ?`;
            const parametros = [
                interessado.codigo
            ]
            await conexao.execute(sql, parametros);
        }

    }

    //Termo de pesquisa pode ser código do artista ou nome.
    //Se o termo for um número, pesquisar pelo código 
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql=""

        if (isNaN(parseInt(termoDePesquisa))){ //Termo de pesquisa não é número (isNaN = Is Not a Number)   
            sql = `SELECT * FROM interessado WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT  * FROM interessado WHERE id = ?`;
        }
    const conexao = await conectar();
    const [registros] = await conexao.execute(sql,[termoDePesquisa]);
    //Utilizar os registros encontrados para novos objetos do tipo interessado
    let listaInteressados = [];
    for (const registro of registros){
        const interessado = new Interessado(
            registro.id,
            registro.nome,
            registro.cpf,
            registro.telefone,
            registro.email
        );
        listaInteressados.push(interessado);
        }
        return listaInteressados;

    }

    async consultar(){
    var sql = "SELECT * FROM Interessado";
       const conexao = await conectar(); 
       const [registros] = await conexao.execute(sql);

       let listaInteressados = [];
       for (const registro of registros){
           const interessado = new Interessado(
            registro.id,
            registro.nome,
            registro.cpf,
            registro.telefone,
            registro.email
           );
           listaInteressados.push(interessado);
       }
       return listaInteressados;
   }
}