import { Router } from "express";
import FilhotesCtrl from "../Controles/filhotesCtrl.js";

const rotaFilhote = new Router();
const filhoteCtrl = new FilhotesCtrl();

rotaFilhote
    .get("/", filhoteCtrl.consultar)
    .get("/:termo", filhoteCtrl.consultar)
    .post("/", filhoteCtrl.gravar)
    .put("/:codigo", filhoteCtrl.atualizar)
    .patch("/:codigo", filhoteCtrl.atualizar)
    .delete('/:codigo', filhoteCtrl.excluir);

export default rotaFilhote;