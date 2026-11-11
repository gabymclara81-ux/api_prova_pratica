
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { conn } from '../database/configbd.js';

const usuarioRouter = Router();

usuarioRouter.post("/inserirUsuario", async (req, res) => {
    const {nome, email, senha } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        conn.query(
            `INSERT INTO usuario (id, nome, email, senha) VALUES (?, ?, ?, ?)`,
            [null, nome, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.log("erro ao inserir usuario");
                    return res.status(500).json({ mensagem: "Erro ao inserir usuário" });
                }

                res.json({ result });
            }
        );
    } catch (err) {
        console.log("erro ao hashear senha");
        return res.status(500).json({ mensagem: "Erro ao proteger senha" });
    }
});


usuarioRouter.get("/listarUsuarios", (req, res) => {
    conn.query(
        `SELECT id, nome, email FROM usuario`,
        (err, result) => {
            if (err) {
                console.log("erro ao listar usuarios");
                return res.status(500).json({ mensagem: "Erro ao listar usuários" });
            }

            res.json({ result });
        }
    );
});


usuarioRouter.put("/atualizarUsuario", async (req, res) => {
    const { id, nome, email, senha } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        conn.query(
            `UPDATE usuario SET nome=?, email=?, senha=? WHERE id=?`,
            [nome, email, hashedPassword, id],
            (err, result) => {
                if (err) {
                    console.log("erro ao atualizar usuario");
                    return res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
                }

                res.json({ result });
            }
        );
    } catch (err) {
        console.log("erro ao hashear senha");
        return res.status(500).json({ mensagem: "Erro ao proteger senha" });
    }
});


usuarioRouter.delete("/deletarUsuario", (req, res) => {
    const { id } = req.body;

    conn.query(
        `DELETE FROM usuario WHERE id=?`,
        [id],
        (err, result) => {
            if (err) {
                console.log("erro ao deletar usuario");
                return res.status(500).json({ mensagem: "Erro ao deletar usuário" });
            }

            res.json({ result });
        }
    );
});

export { usuarioRouter };
