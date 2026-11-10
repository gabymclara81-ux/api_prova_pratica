import express from 'express';
import { usuarioRouter } from './src/router/usuarios.js';
import { tarefasRouter } from './src/router/tarefas.js';

const app = express();
app.use(express.json());
app.use(usuarioRouter);
app.use(tarefasRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(9999, (req, res) => {
    console.log('Servidor rodando na porta 9999');
});