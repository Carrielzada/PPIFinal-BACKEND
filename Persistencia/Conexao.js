//O banco de dados escolhido foi o MySQL
import mysql from 'mysql2/promise';

//Nós vamos desenvolver código assíncrono, já que nossa aplicação
//Não é o banco de dados, e sim se comunica com um banco de dados que pode
//Responder de imediato, demorar para responder ou nunca responder
//Por isso vamos usar Async e Await
export default async function conectar() {
    //Criando um pool de Conexões
    if (global.pool !== undefined) {
        return await global.pool.getConnection();
    } 
    else {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', //Não é recomendado usar o super usuário
            password: '',
            port: '3306',
            database: '1backend',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 360000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
        
        //Garantindo que haja somente uma cópia desse pool para minha aplicação
        global.pool = pool;
        return await pool.getConnection();

    }   //Salvando a Pool de Conexões na variável Global
}