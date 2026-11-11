import { Router } from "express";
import {conn} from "../database/configbd.js";
const tarefasRouter = Router();

tarefasRouter.post("/inserirTarefa", (req, res)=>{
    const {id, nome, data_inicio, data_termino, descricao, grau_prioridade} = req.body;
    conn.query(`INSERT INTO tarefa (id, nome, data_inicio, data_termino, descricao, grau_prioridade) VALUES ('${id}', '${nome}', '${data_inicio}', '${data_termino}', '${descricao}', '${grau_prioridade}')`,
        (err, result) =>{
        if(err){
            console.log("erro ao inserir tarefa")
            return;
        } else{
            res.json({result})
        }
    
    })
})

tarefasRouter.get("/listarTarefas", (req, res)=>{
    conn.query(`SELECT * FROM tarefa`, (err, result) =>{
        if(err){
            console.log("erro ao listar tarefas")
            return;
        } else{
            res.json({result})
        }
    })
})

tarefasRouter.put("/atualizarTarefa", (req, res)=>{
    const {id, nome, data_inicio, data_termino, descricao, grau_prioridade} = req.body;
    conn.query(`UPDATE tarefa SET nome='${nome}', data_inicio='${data_inicio}', data_termino='${data_termino}', descricao='${descricao}', grau_prioridade='${grau_prioridade}' WHERE id='${id}'`, (err, result) =>{
        if(err){
            console.log("erro ao atualizar tarefa")
            return;
        } else{
            res.json({result})
        }
    })
})

tarefasRouter.delete("/deletarTarefa", (req, res)=>{
    const {id} = req.body;
    conn.query(`DELETE FROM tarefa WHERE id='${id}'`, (err, result) =>{
        if(err){
            console.log("erro ao deletar tarefa")
            return;
        } else{
            res.json({result})
        }
    })
})


export{tarefasRouter};