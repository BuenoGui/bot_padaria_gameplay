import pool from "../database/connection.js";
import type Player from "../entities/Player.js";

export async function get_pratos_vitrine_atual(player: Player) {
    
    const dados_contagem_vitrine = await pool.query(`
        SELECT COUNT(*)::INT AS total
        FROM vitrines
        WHERE id_player
        = $1 
        `,
        [player.id_player])

    const espaco_vitrine = dados_contagem_vitrine.rows[0].total

    return espaco_vitrine
}