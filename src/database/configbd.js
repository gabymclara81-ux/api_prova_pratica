import mysql from "mysql2"

const conn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

conn.connect((err) => {
    if (err) {
        console.log("Problema com bd:", err);
        return;
    }
        console.log("Conectado ao bd...")
})

export {conn}