import { Router } from 'express';
import bcrypt from 'bcrypt';
import { conn } from '../database/configbd.js';

const usuarioRouter = Router();

// CRUD -> Create
usuarioRouter.post("/inserirUsuario", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Criptografa a senha antes de salvar no banco.
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Insere o usuário no banco de dados.
        conn.query(
            `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
            [nome, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error("Erro ao inserir usuário:", err);
                    return res.status(500).json({
                        mensagem: "Erro ao inserir usuário",
                        erro: err.message
                    });
                }

                // Retorna o resultado da inserção.
                res.json({ result });
            }
        );
    } catch (err) {
        console.log("erro ao hashear senha");
        return res.status(500).json({ mensagem: "Erro ao proteger senha" });
    }
});

// CRUD -> Read
usuarioRouter.get("/listarUsuarios", (req, res) => {
    // Seleciona apenas os campos principais para não expor a senha.
    conn.query(
        `SELECT id, nome, email FROM usuarios`,
        (err, result) => {
            if (err) {
                console.log("erro ao listar usuarios");
                return res.status(500).json({ mensagem: "Erro ao listar usuários" });
            }

            // Retorna a lista em formato JSON.
            res.json({ result });
        }
    );
});

// CRUD -> Update
usuarioRouter.put("/atualizarUsuario", async (req, res) => {
    const { id, nome, email, senha } = req.body;

    try {
        // Criptografa a nova senha antes de atualizar o cadastro.
        const hashedPassword = await bcrypt.hash(senha, 10);
        conn.query(
            `UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?`,
            [nome, email, hashedPassword, id],
            (err, result) => {
                if (err) {
                    console.log("erro ao atualizar usuario");
                    return res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
                }

                // Responde com o resultado da atualização.
                res.json({ result });
            }
        );
    } catch (err) {
        console.log("erro ao hashear senha");
        return res.status(500).json({ mensagem: "Erro ao proteger senha" });
    }
});

// CRUD -> Delete
usuarioRouter.delete("/deletarUsuario", (req, res) => {
    const { id } = req.body;

    conn.query(
        `DELETE FROM usuarios WHERE id=?`,
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
