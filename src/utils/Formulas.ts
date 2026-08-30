import pool from "../database/connection.js"
import type Player from "../entities/Player.js"

// SORT INT

export function sortInt (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

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
        FROM vitrines
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

export async function get_nivel_vitrine(player:Player) {
    const nivel_vitrine_obj = await pool.query(`
        SELECT nivel_vitrine
        FROM upgrades
        WHERE id_player
        = $1`, [player.id_player]
    )

    const { nivel_vitrine } = nivel_vitrine_obj.rows[0]
    return nivel_vitrine
}

export async function get_nivel_forno(player:Player) {
    const nivel_forno_obj = await pool.query(`
        SELECT nivel_forno
        FROM upgrades
        WHERE id_player
        = $1`, [player.id_player]
    )

    const { nivel_forno } = nivel_forno_obj.rows[0]
    return nivel_forno
}

export async function get_nivel_gas(player:Player) {
    const nivel_gas_obj = await pool.query(`
        SELECT nivel_gas
        FROM upgrades
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    const { nivel_gas } = nivel_gas_obj.rows[0]
    return nivel_gas
}

export async function get_nivel_geladeira(player:Player) {
    const nivel_geladeira_obj = await pool.query(`
        SELECT nivel_geladeira
        FROM upgrades
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    const { nivel_geladeira } = nivel_geladeira_obj.rows[0]
    return nivel_geladeira
}

export async function get_gas_receita(id_receita: number) {

    const receita_raridade_obj = await pool.query(`
        SELECT raridade
        FROM receitas
        WHERE id_receita
        = $1`, 
        [id_receita]
    )
    const { raridade } = receita_raridade_obj.rows[0]

    const gas_receita_obj = await pool.query(`
        SELECT gas_necessario
        FROM raridades
        WHERE nome
        = $1`,
        [raridade])
    const { gas_necessario } = gas_receita_obj.rows[0]
    

    return gas_necessario
}

export async function get_receitas_raridade_sorteada(raridade_nome: string) {
    const lista_receitas_raridade_sorteada_sql = await pool.query(`
        SELECT * 
        FROM receitas
        WHERE raridade
        = $1`,
        [raridade_nome]
        )

    const lista_receitas_raridade_sorteada = lista_receitas_raridade_sorteada_sql.rows

    
    return lista_receitas_raridade_sorteada

}





// PREÇOS

export function set_preco_gas_total(gas_total_player: number) {
     return Math.floor((gas_total_player / 20) * 8 * (gas_total_player / 80))
}

export function set_preco_forno(nivel_forno: number) {
    return (nivel_forno * 18) * (nivel_forno * 15)
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




















