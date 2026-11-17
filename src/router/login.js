
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { conn } from '../database/configbd.js';


const loginRouter = Router();

loginRouter.post("/login", (req, res) => {

    const { email, senha } = req.body;

    conn.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],

        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ mensagem: "Erro no servidor" });
            }

            if (result.length === 0) {
                return res.status(401).json({ mensagem: "Usuário não encontrado" });
            }

            const usuario = result[0];

            bcrypt.compare(senha, usuario.senha, (err, resultado) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json({ mensagem: "Erro ao verificar senha" });
                }

                if (!resultado) {
                    return res.status(401).json({ mensagem: "Senha incorreta" });
                }

                return res.json({
                    mensagem: "Login realizado com sucesso!",
                    usuario: {
                        nome: usuario.nome,
                        email: usuario.email
                    }
                });

            });
        }
    );
});

export{loginRouter};
