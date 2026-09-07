import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { xp_rankup } from "../utils/Formulas.js";

export async function get_xp_player(player: Player) {
    const xp_player_obj = await pool.query(`
        SELECT xp
        FROM players
        WHERE id_player
        = $1`, [player.id_player]
    )

    const { xp } = xp_player_obj.rows[0]
    return xp
}

export async function get_level_player(player: Player) {
    const level_player_obj = await pool.query(`
        SELECT level
        FROM players
        WHERE id_player
        = $1`, [player.id_player]
    )

    const { level } = level_player_obj.rows[0]
    return level
}

export async function get_dinheiro_player(player: Player) {
    const dinheiro_player_obj = await pool.query(`
        SELECT level
        FROM players
        WHERE id_player
        = $1`, [player.id_player]
    )

    const { dinheiro } = dinheiro_player_obj.rows[0]
    return dinheiro
}

export async function get_receitas_compradas(player: Player) {
    
    const receitas_compradas_obj = await pool.query(`
        SELECT receitas_compradas  
        FROM players
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    const  { receitas_compradas }  = receitas_compradas_obj.rows[0]

    return receitas_compradas

}

export async function atualizar_dinheiro_upgrade(player: Player, preco_upgrade: number) {

    const dinheiro_atual_obj = await pool.query(
        `UPDATE players
        SET dinheiro
        = dinheiro - $1
        WHERE id_player
        = $2
        RETURNING dinheiro`,
        [preco_upgrade, player.id_player]
    )

    const { dinheiro } = dinheiro_atual_obj.rows[0]


    return console.log(player.id_player,"Seu dinheiro atual:", dinheiro)

}

export async function atualizar_xp(player:Player, xp_recebido: number) {

    const xp_player = await get_xp_player(player)
    const level_player = await get_level_player(player)
    const xp_up = xp_rankup(level_player)
    if ((xp_recebido + xp_player) > xp_rankup) {
        // atualiza xp
        let xp_restante =  (xp_recebido + xp_player) - xp_up
        await pool.query(`
            UPDATE players
            SET xp
            = $1
            WHERE id_player
            = $2`,
            [xp_restante, player.id_player])

        // Upa nivel
        await pool.query(`
            UPDATE players
            SET level
            = level + 1
            WHERE id_player
            = $1`,
            [player.id_player])

            return console.log(player.id_player, "Subiu de nivel")
    }
    await pool.query(`
        UPDATE players
        SET xp = 
        xp + $1
        WHERE id_player
        = $2`,
        [xp_recebido, player.id_player])

    console.log(player.id_player, "Recebeu +", xp_recebido ,"XP")

}










export async function construir_player(id_player: number) {
    const dados_player_sql = await pool.query(`
        SELECT * 
        FROM players
        WHERE id_player
        = $1`,
        [id_player]
        )

    const dados_player = dados_player_sql.rows[0]

    const player = new Player (
        dados_player.id_player,
        dados_player.tell,
        dados_player.nickname,
        dados_player.level,
        dados_player.xp,
        dados_player.dinheiro
    )
    
    return player

}