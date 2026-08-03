import { readFile } from "fs/promises";
import pool from "./connection.js"
import { cozinhar } from "../services/cozinhar_service.js";
import { preparar_massa } from "../services/preparar_massa.js";
import { sortearPlayer} from "../services/sorteio_service.js";

const tabelas_sql = [
    "src/database/sql/criar_jogador.sql",
    "src/database/sql/criar_padaria.sql",
    "src/database/sql/criar_geladeiras.sql",
    "src/database/sql/criar_vitrine.sql"
    
]

const seed_sql = "src/database/sql/seed.sql";

async function init() {

    // RESET SQL
    await pool.query(await readFile(
        "src/database/sql/reset.sql",
        "utf-8"
    ))
    console.log("reset feito")
    // 

    // CRIAR TABELAS
    for(const arquivo of tabelas_sql) {
        const sql = await readFile(arquivo, "utf-8");
        await pool.query(sql);
        console.log(`${arquivo} criado`)
    }
    console.log("tabelas criadas")
    // 

    // SEED
    await pool.query(await readFile(seed_sql, "utf-8"));
    console.log("seed_players plantada")
    // 

    // CRIAR PADARIAS
    async function criar_padarias() {
        const  id_todos_jogadores = await pool.query("SELECT id_player FROM players");
        for (const jogador of id_todos_jogadores.rows) {
            await pool.query(`
                INSERT INTO padarias (id_player)
                VALUES ($1) ON CONFLICT DO NOTHING;`,
            [jogador.id_player]);
    }
    }
    await criar_padarias();
    console.log("padarias criadas")
    // 

    // Criar seed da vitrine e geladeira
    async function criar_geladeiras() {
        for(let i = 0 ; i <= 80; i++) {
            await preparar_massa(await sortearPlayer());
        }
    }
    await criar_geladeiras();
    console.log("seed geladeiras feita")

    async function criar_vitrine() {
        for(let i = 0 ; i <= 40; i++) {
            try { await cozinhar(await sortearPlayer())}
            catch (error) {
                // console.error(error)
            }
        }
    }
    await criar_vitrine();
    console.log("seed vitrine feita")
    //

    await pool.end()
}

init();