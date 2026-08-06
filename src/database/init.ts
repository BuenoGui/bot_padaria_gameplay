import { readFile } from "fs/promises";
import pool from "./connection.js"
import { cozinhar } from "../services/cozinhar_service.js";
import { preparar_massa } from "../services/preparar_massa.js";
import { sortearPlayer} from "../services/sorteio_service.js";
import { comprar_gas, comprar_gas_total } from "../services/loja_service.js";
import { vender } from "../services/vender_service.js";


const tabelas_sql = [
    "src/database/sql/criar_jogador.sql",
    "src/database/sql/criar_padaria.sql",
    "src/database/sql/criar_geladeiras.sql",
    "src/database/sql/criar_vitrine.sql"
    
]

const seed_sql = "src/database/sql/seed.sql";

const conjunto_acoes = [
    async () => await vender(),
    async () => await vender(),
    async () => await vender(),
    async () => await vender(),
    async () => await vender(),
    async () => await vender(),
    async () => await vender(),
    async () => await comprar_gas(await sortearPlayer()),
    async () => await comprar_gas_total(await sortearPlayer()),
    async () => await preparar_massa(await sortearPlayer()),
    async () => await preparar_massa(await sortearPlayer()),
    async () => await await cozinhar(await sortearPlayer()),
    async () => await await cozinhar(await sortearPlayer()),
    async () => await await cozinhar(await sortearPlayer()),
]

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

    // Criar geladeiras
    async function criar_geladeiras() {
        for(let i = 0 ; i <= 200; i++) {
            await preparar_massa(await sortearPlayer());
        }
    }
    criar_geladeiras();

    for (let i = 0; i <= 10000; i++) {
        const indexes_possiveis = Math.floor(Math.random() * conjunto_acoes.length) - 1

        await conjunto_acoes[indexes_possiveis]?.()
    }


    await pool.end()
}

init();