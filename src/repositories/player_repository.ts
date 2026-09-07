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

export async function atualizar_xp(player: Player, xp_recebido: number) {

    let xp_player = await get_xp_player(player)
    let level_player = await get_level_player(player)

    let total_xp = xp_player + xp_recebido
    let rankup = false

    while(total_xp >= xp_rankup(level_player)) {
        total_xp -= xp_rankup(level_player)
        level_player++
        rankup = true
    }

    await pool.query(`
        UPDATE players
        SET xp = $1, level = $2
        WHERE id_player = $3`,
        [total_xp, level_player, player.id_player]
    )

    if (rankup) {
        return console.log(player.nickname, "Subiu de nivel! Agora é level:", level_player)
    }

    console.log(player.id_player, "Recebeu +", xp_recebido, "XP")
}

export async function status_player(player:Player) {
    // dados legaia serem passados
    // Player: nickname
    // Nivel: Level, XP/XP proximo nivel,
    // Tem R$ dinheiro guardado
    // Já desbloqueou receitas_compradas receitas
    console.log("Player:", player.nickname)
    console.log("Nivel:", player.level)
    console.log(player.xp ,"XP /", xp_rankup(player.level), "XP")
    console.log("Tem R$:" , player.dinheiro, "guardados")
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
        dados_player.dinheiro,
        dados_player.receitas_compradas
    )
    
    return player

}