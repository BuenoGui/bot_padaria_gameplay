import { readFile } from "fs/promises";
import client from "./connection.js"

const tabelas_sql = [
    "src/database/sql/criar_jogador.sql",
    "src/database/sql/criar_padaria.sql",
    "src/database/sql/criar_inventario.sql"
    
]

const seed_sql = "src/database/sql/seed.sql";


const arquivos_base_sql = [
    "src/database/tests/criar_padarias.ts"
] 

async function init() {
    await client.connect();

    // RESET SQL
    await client.query(await readFile(
        "src/database/sql/reset.sql",
        "utf-8"
    ))
    // 

    // CRIAR TABELAS
    for(const arquivo of tabelas_sql) {
        const sql = await readFile(arquivo, "utf-8");
        await client.query(sql);
        console.log(`${arquivo} criado`)
    }
    // 

    // SEED
    await client.query(await readFile(seed_sql, "utf-8"));
    // 

    // CRIAR PADARIAS DOS JOGADORES
    const todos_jogadores = await client.query("SELECT id_player FROM players")

    async function criar_padarias() {
        for (const jogador of todos_jogadores.rows) {
            await client.query(`
                INSERT INTO padarias (id_player)
                VALUES (${jogador.id_player}) ON CONFLICT DO NOTHING;
            `);
    }
    }

    await criar_padarias();
    // 

    console.log("Banco teste criado!")
    console.log("Jogadores criados!")






    await client.end();
}

init();