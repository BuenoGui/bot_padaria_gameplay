import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { sortear_massa_preparo } from "./sorteio_service.js";
import { capacidade_geladeira } from "../utils/Formulas.js";

export async function preparar_massa(player: Player) {
    
    const receita_sorteada = await sortear_massa_preparo();
    const geladeira_count = await pool.query(
        `SELECT COUNT(*)::INT AS total
        FROM geladeiras
        WHERE id_player = $1`,
        [player.id_player]
    )
    const espacos_geladeira = geladeira_count.rows[0].total;

    const dados_upgrade_sql = await pool.query(
        `SELECT * FROM upgrades WHERE id_player = $1`,
        [player.id_player]
    )
    const dados_upgrade = dados_upgrade_sql.rows[0]
    const nivel_geladeira = dados_upgrade.nivel_geladeira


    if (espacos_geladeira >= capacidade_geladeira(nivel_geladeira)) {
        console.log(`Sua geladeira está cheia! desculpa`)
        return
    } else {
        const id_massa_criada = await pool.query(
            `INSERT INTO geladeiras
            (id_player, id_receita)
            VALUES
            ($1, $2)
            RETURNING
            id_geladeira`
            ,
            [player.id_player,
            receita_sorteada]
        )
    
        return id_massa_criada.rows[0].id_geladeira
    }
}