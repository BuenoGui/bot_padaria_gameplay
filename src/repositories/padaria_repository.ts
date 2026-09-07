import pool from "../database/connection.js"
import Player from "../entities/Player.js"

export async function get_dados_padaria(player:Player) {
        const dados_padaria_sql = await pool.query(`
        SELECT *
        FROM padarias
        WHERE id_player
        = $1`, [player.id_player]
    )

    return dados_padaria_sql.rows[0]    
}

export async function get_gas_atual(player:Player) {
    const gas_atual_obj = await pool.query(`
        SELECT gas_atual
        FROM padarias
        WHERE id_player
        = $1`, [player.id_player]
    )

    const { gas_atual } = gas_atual_obj.rows[0]
    return gas_atual
}

