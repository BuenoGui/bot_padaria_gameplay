import { readFile } from "fs/promises";
import client from "./connection.js"

const arquivos = [
    "src/database/sql/criar_jogador.sql",
    "src/database/sql/criar_padaria.sql",
    "src/database/sql/criar_inventario.sql",
    "src/database/sql/seed.sql"
]

async function init() {
    await client.connect();

    const resetSql = await readFile(
        "src/database/sql/reset.sql",
        "utf-8"
    )

    await client.query(resetSql)

    for(const arquivo of arquivos) {
        const sql = await readFile(arquivo, "utf-8");
        await client.query(sql);
        console.log(`${arquivo} criado`)
    } 

    console.log("Banco teste criado!")

    await client.end();
}

init();