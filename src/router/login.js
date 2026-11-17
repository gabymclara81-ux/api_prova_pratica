import { Router } from 'express';
import bcrypt from 'bcrypt';
import { conn } from '../database/configbd.js';

const loginRouter = Router();

// Rota responsável por autenticar um usuário no sistema.
loginRouter.post("/login", (req, res) => {

    const { email, senha } = req.body;

    conn.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],

        (err, result) => {

            // Se houver erro na consulta, retorna erro interno do servidor.
            if (err) {
                console.log(err);
                return res.status(500).json({ mensagem: "Erro no servidor" });
            }

            // Se não encontrar nenhum usuário com esse e-mail, retorna erro 401.
            if (result.length === 0) {
                return res.status(401).json({ mensagem: "Usuário não encontrado" });
            }

            // Pega o primeiro usuário encontrado na busca.
            const usuario = result[0];

            // IMPORTANTE: Compara a senha informada com a senha criptografada salva no banco.
            bcrypt.compare(senha, usuario.senha, (err, resultado) => {

                // Se houver erro na comparação, retorna erro ao verificar senha.
                if (err) {
                    console.log(err);
                    return res.status(500).json({ mensagem: "Erro ao verificar senha" });
                }

                // Se a senha não for válida, retorna acesso negado.
                if (!resultado) {
                    return res.status(401).json({ mensagem: "Senha incorreta" });
                }

                // Se tudo estiver correto, retorna os dados básicos do usuário.
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

export { loginRouter };
