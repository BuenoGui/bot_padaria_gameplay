import pool from "./connection.js"
import { readFile } from "fs/promises";
import { cozinhar } from "../services/cozinhar_service.js";
import { preparar_massa } from "../services/preparar_massa.js";
import { sortearPlayer} from "../services/sorteio_service.js";
import { vender } from "../services/vender_service.js";
import { sortInt } from "../utils/Formulas.js";
import { comprar_gas, melhorar_gas,
        melhorar_geladeira, melhorar_vitrine, 
        melhorar_forno, melhorar_rolo
        } from "../services/loja_service.js";


const tabelas_sql = [
    "src/database/sql/criar_jogadores.sql",
    "src/database/sql/criar_padarias.sql",
    "src/database/sql/criar_geladeiras.sql",
    "src/database/sql/criar_vitrines.sql",
    "src/database/sql/criar_raridades.sql",
    "src/database/sql/criar_receitas.sql",
    "src/database/sql/criar_upgrades.sql"
]
const seed_sql = "src/database/sql/seed.sql";

const conjunto_acoes = [
    async () => await vender(),
    async () => await comprar_gas(await sortearPlayer()),
    async () => await comprar_gas(await sortearPlayer()),
    async () => await melhorar_gas(await sortearPlayer()),
    async () => await melhorar_geladeira(await sortearPlayer()),
    async () => await melhorar_vitrine(await sortearPlayer()),
    async () => await melhorar_rolo(await sortearPlayer()),
    async () => await melhorar_forno(await sortearPlayer()),
    async () => await preparar_massa(await sortearPlayer()),
    async () => await preparar_massa(await sortearPlayer()),
    async () => await cozinhar(await sortearPlayer()),
    async () => await cozinhar(await sortearPlayer())
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
        const  todos_jogadores_sql = await pool.query("SELECT id_player FROM players");
        for (const jogador of todos_jogadores_sql.rows) {
            await pool.query(`
                INSERT INTO padarias (id_player)
                VALUES ($1) ON CONFLICT DO NOTHING;`,
            [jogador.id_player]);
        }
    }
    await criar_padarias();
    console.log("padarias criadas")
    // 

    // CRIAR UPGRADES
    async function criar_upgrades() {
        const  todos_jogadores_sql = await pool.query("SELECT id_player FROM players");
        for (const jogador of todos_jogadores_sql.rows) {
            await pool.query(`
                INSERT INTO upgrades (id_player)
                VALUES ($1) ON CONFLICT DO NOTHING;`,
            [jogador.id_player]);
        }
    }
    await criar_upgrades();
    console.log("uprades definidos")

    for (let i = 0; i <= 10000; i++) {
        const indexes_sorteado = sortInt(0, conjunto_acoes.length - 1)
        const acao_sorteada = await conjunto_acoes[indexes_sorteado]?.()
        
        acao_sorteada
    }

    await pool.end()
}

init();