//Rota é uma micro aplicação express que se encarrega de processar
//requisições em um determina endpoint
//Por exemplo: https://localhost:3000/interessado <--- interessado é um endpoint
//             domínio da aplicação   endpoint

import { Router } from 'express';
import InteressadosCtrl from '../Controles/InteressadosCtrl.js';

const rotaInteressado = new Router();
const intereCtrl = new interessadosCtrl();

rotaInteressado
.get('/', intereCtrl.consultar)
.get('/:termo', intereCtrl.consultar)  //atribuindo a função consultar como parâmetro do que executar quando receber um método get na rota
.post('/', intereCtrl.gravar)
.put('/:codigo', intereCtrl.atualizar)
.patch('/:codigo', intereCtrl.atualizar)
.delete('/:codigo', intereCtrl.excluir);


export default rotaInteressado;