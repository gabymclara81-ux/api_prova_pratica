import mysql from "mysql2"

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tarefas_api_provapratica"
})

conn.connect((err) => {
    if (err) {
        console.log("Problema com bd:", err);
        return;
    }
        console.log("Conectado ao bd...")
})

export {conn}