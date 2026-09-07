import pool from "./connection.js"
import { readFile } from "fs/promises";
import { cozinhar } from "../services/cozinhar_service.js";
import { preparar_massa } from "../services/preparar_massa.js";
import { sortear_id_geladeira_player, sortearPlayer} from "../services/sorteio_service.js";
import { vender } from "../services/vender_service.js";
import { sortInt } from "../utils/Formulas.js";
import { comprar_gas, melhorar_gas,
        melhorar_geladeira, melhorar_vitrine, 
        melhorar_forno, melhorar_rolo,
        desbloquear_receita
        } from "../services/loja_service.js";
import { PLAYERS_TESTE } from "../enums/players.js";
import { sovar_massa } from "../services/sovar_service.js";
import { get_receitas_padrao } from "../repositories/receita_repository.js";


const conjunto_acoes = [
    async () => await vender(),
    async () => await vender(),
    async () => await comprar_gas(await sortearPlayer()),
    async () => await comprar_gas(await sortearPlayer()),
    async () => await melhorar_gas(await sortearPlayer()),
    async () => await melhorar_geladeira(await sortearPlayer()),
    async () => await melhorar_vitrine(await sortearPlayer()),
    async () => await melhorar_rolo(await sortearPlayer()),
    async () => await melhorar_forno(await sortearPlayer()),
    async () => await desbloquear_receita(await sortearPlayer()),
    async () => await preparar_massa(await sortearPlayer()),
    async () => await sovar_massa(Number(await sortear_id_geladeira_player(await sortearPlayer()))),
    async () => await cozinhar(await sortearPlayer())
]

const tabelas_sql = [
    "raridades", "receitas", "players", "padarias", "vitrines", "geladeiras", "receitas_player", "upgrades"
]

const tabelas_seed = [
    "raridades", "receitas", "players"
]

const players_teste: Array<String> = [
    ('11912345678'),('11911111111'),
    ('11922222222'),('11933333333'),
    ('11944444444'),('11955555555'),
    ('11966666666'),('11977777777'),
    ('11988888888'),('19999999999'),
    ('19000000000'),('19111111112'),
    ('19111111113'),('19111111114'),
    ('19111111115'),('19111111116'),
    ('19111111117'),('19111111118'),
    ('19111111119'),('19111111110'),
    ('19111111122'),('19111111133'),
    ('19111102582'),('19111174892'),
    ('19112163112'),('19119856412'),
    ('20027868725'),('21657886132')
]

const players_teste_ids: Array<String> = []
const players_restantes: Array<String> = []

// CRIA AS TABELAS
for (const tabela of tabelas_sql) {
    // Vê se as tabelas já existem
    const info = await pool.query(`
            SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
            );`,
        [tabela]
    )
    // Se não existe cria
    if(info.rows[0].exists === false) {
            const arquivo = `src/database/sql/criar_${tabela}.sql`
            const sql = await readFile(arquivo, "utf-8");
            await pool.query(sql);
    }

    // ADICIONA SEED
    const linhas_tabela = await pool.query(`
        SELECT EXISTS (
        SELECT 1 
        FROM ${tabela}
        LIMIT 1
        );`
    )
    if(linhas_tabela.rows[0].exists === false) {
        if(tabelas_seed.includes(tabela)) {
            const arquivo_seed = `src/database/sql/seed_${tabela}.sql`
                const seed_sql = await readFile(arquivo_seed, "utf-8");
                await pool.query(seed_sql)
            } 
        } 
}

const receitas_padrao = await get_receitas_padrao()

// CHECA QUAIS PLAYERS DE TESTE EXISTEM
for(const player of players_teste) {
    const player_tell_obj = await pool.query(`
        SELECT id_player
        FROM players
        WHERE tell = $1
        `, [player]
        )

    if(player_tell_obj.rows.length === 0) {
        players_restantes.push(player)
    } else {
        const { id_player } = player_tell_obj.rows[0]
        players_teste_ids.push(id_player)
    }

}

// CRIAR PLAYERS RESTANTES
if (players_restantes.length > 0) {
    for(const player_restante of players_restantes) {

        const id_player_obj = await pool.query(`
            INSERT INTO players
            (tell, nickname)
            VALUES
            ($1, $2)
            RETURNING id_player`,
            [player_restante, PLAYERS_TESTE[player_restante as keyof typeof PLAYERS_TESTE]])

        const  { id_player } = id_player_obj.rows[0]  

        players_teste_ids.push(id_player)
    }
}

for(const id_player of players_teste_ids) {
    // CRIA A PADARIA
    await pool.query(`
                INSERT INTO padarias (id_player)
                VALUES ($1) ON CONFLICT DO NOTHING;`,
            [id_player]
    )

    // CRIA RECEITAS_PLAYER
    for(const receita of receitas_padrao) {
        await pool.query(`
            INSERT INTO receitas_player (id_receita, id_player)
            VALUES ($1, $2) ON CONFLICT DO NOTHING;`,
            [receita.id_receita, id_player]);
    }

    // CRIA UPGRADES
    await pool.query(`
        INSERT INTO upgrades (id_player)
        VALUES ($1) ON CONFLICT DO NOTHING;`,
        [id_player]
    )

    console.log(id_player , "Criado!")
}

for (let i = 0; i <= 40000; i++) {
    const indexes_sorteado = sortInt(0, conjunto_acoes.length - 1)
    const acao_sorteada = await conjunto_acoes[indexes_sorteado]?.()
        
    acao_sorteada
}

await pool.end();