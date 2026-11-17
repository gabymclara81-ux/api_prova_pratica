import { Router } from "express";
import {conn} from "../database/configbd.js";
const tarefasRouter = Router();

tarefasRouter.post("/inserirTarefa", (req, res)=>{
    const {nome, data_inicio, data_termino, descricao, grau_prioridade, responsavel} = req.body;
    conn.query(`INSERT INTO tarefas (id, nome, data_inicio, data_termino, descricao, grau_prioridade, responsavel) VALUES (NULL, '${nome}', '${data_inicio}', '${data_termino}', '${descricao}', '${grau_prioridade}', '${responsavel}')`,
        (err, result) =>{
        if(err){
            console.log("erro ao inserir tarefa", err)
            return;
        } else{
            res.json({result})
        }
    
    })
})

tarefasRouter.get("/listarTarefas", (req, res)=>{
    conn.query(`SELECT * FROM tarefas`, (err, result) =>{
        if(err){
            console.log("erro ao listar tarefas", err)
            return;
        } else{
            res.json({result})
        }
    })
})

tarefasRouter.put("/atualizarTarefa", (req, res)=>{
    const {id, nome, data_inicio, data_termino, descricao, grau_prioridade, responsavel} = req.body;
    conn.query(`UPDATE tarefas SET nome='${nome}', data_inicio='${data_inicio}', data_termino='${data_termino}', descricao='${descricao}', grau_prioridade='${grau_prioridade}', responsavel='${responsavel}' WHERE id='${id}'`, (err, result) =>{
        if(err){
            console.log("erro ao atualizar tarefa", err)
            return;
        } else{
            res.json({result})
        }
    })
})

tarefasRouter.delete("/deletarTarefa", (req, res)=>{
    const {id} = req.body;
    conn.query(`DELETE FROM tarefas WHERE id='${id}'`, (err, result) =>{
        if(err){
            console.log("erro ao deletar tarefa", err)
            return;
        } else{
            res.json({result})
        }
    })
})


export{tarefasRouter};