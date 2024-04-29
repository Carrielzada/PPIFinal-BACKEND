import express from "express";
import rotaInteressado from "./Rotas/rotaInteressado.js";
import rotaFilhote from "./Rotas/rotaFilhote.js";
import cors from "cors";
const host = '0.0.0.0'; //IP genérico que representa todas as interfaces
const porta = 3000; //Sempre utilize portas com valor maior que 1024

const app = express();

app.use(cors({
    origin: '*'//Permite acesso controlado a origens distintas de portas diferentes
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
app.use('/interessados', rotaInteressado);
app.use("/filhotes", rotaFilhote);
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});