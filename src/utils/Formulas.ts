import pool from "../database/connection.js"
import type Player from "../entities/Player.js"

// DADOS
export function get_gas_maximo(nivel_gas: number) {
    return 100 + (nivel_gas * 10)
}

export function get_capacidade_geladeira (nivel_geladeira: number) {
    return 20 + (nivel_geladeira * 5)
}

export function get_capacidade_vitrine (nivel_vitrine: number) {
    return 20 + (nivel_vitrine * 2)
}

export function get_capacidade_forno (nivel_forno: number) {
    return nivel_forno + 1
}


// CONSULTAS SQL

export async function get_pratos_vitrine_atual(player: Player) {
    
    const dados_contagem_vitrine = await pool.query(`
        SELECT COUNT(*)::INT AS total
        FROM vitrine
        WHERE id_player
        = $1 
        `,
        [player.id_player])

    const espaco_vitrine = dados_contagem_vitrine.rows[0].total

    return espaco_vitrine
}

export async function get_dados_upgrade(player:Player) {
        const dados_upgrade_sql = await pool.query(`
        SELECT *
        FROM upgrades
        WHERE id_player
        = $1`, [player.id_player]
    )

    return dados_upgrade_sql.rows[0]
}






// PREÇOS

export function set_preco_gas_total(gas_total_player: number) {
     return Math.floor((gas_total_player / 20) * 8 * (gas_total_player / 80))
}

export function set_preco_forno(nivel_forno: number) {
    return (nivel_forno * 15) + (nivel_forno * 30)
}

export function set_preco_geladeira(nivel_geladeira: number) {
    return Math.round((nivel_geladeira * 25) * ((nivel_geladeira + 10) / 5))
}

export function set_preco_vitrine(nivel_geladeira: number) {
    return Math.round((nivel_geladeira * 20) * ((nivel_geladeira + 14) / 2))
}




// VENDA

export function dinheiro_venda(preco_base: number, preco_raridade: number, estrela_prato: number) {
    return ((preco_base * preco_raridade) * (estrela_prato * 1.4)).toFixed(2)
} 




















