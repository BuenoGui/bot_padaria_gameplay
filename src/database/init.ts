import { readFile } from "fs/promises";
import pool from "./connection.js"

const tabelas_sql = [
    "src/database/sql/criar_jogador.sql",
    "src/database/sql/criar_padaria.sql",
    "src/database/sql/criar_inventario.sql"
    
]

const seed_sql = "src/database/sql/seed.sql";

async function init() {

    // RESET SQL
    await pool.query(await readFile(
        "src/database/sql/reset.sql",
        "utf-8"
    ))
    // 

    // CRIAR TABELAS
    for(const arquivo of tabelas_sql) {
        const sql = await readFile(arquivo, "utf-8");
        await pool.query(sql);
        console.log(`${arquivo} criado`)
    }
    // 

    // SEED
    await pool.query(await readFile(seed_sql, "utf-8"));
    // 

    // CRIAR PADARIAS
    async function criar_padarias() {
        const  id_todos_jogadores = await pool.query("SELECT id_player FROM players");
        for (const jogador of id_todos_jogadores.rows) {
            await pool.query(`
                INSERT INTO padarias (id_player)
                VALUES (${jogador.id_player}) ON CONFLICT DO NOTHING;
            `);
    }
    }

    await criar_padarias();
    // 

    console.log("Banco teste criado!")
    console.log("Jogadores criados!")
    console.log("Padarias criadas")

    await pool.end();
}

init();