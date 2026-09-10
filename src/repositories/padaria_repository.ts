import pool from "../database/connection.js"
import Player from "../entities/Player.js"
import { get_capacidade_geladeira, get_capacidade_vitrine, get_gas_maximo } from "../utils/Formulas.js"
import { get_massas_geladeira_atual } from "./geladeira_repository.js"
import { get_nivel_forno, get_nivel_gas, get_nivel_geladeira, get_nivel_rolo, get_nivel_vitrine } from "./upgrade_repository.js"
import { get_pratos_vitrine_atual } from "./vitrine_repositoory.js"

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

    if (gas_atual_obj.rows.length === 0 ) {
        const gas_atual_obj = await pool.query(`
                INSERT INTO padarias (id_player)
                VALUES ($1) ON CONFLICT DO NOTHING
                RETURNING gas_atual`,
            [player.id_player]
        )

        const { gas_atual } = gas_atual_obj.rows[0]
        return gas_atual

    }

    const { gas_atual } = gas_atual_obj.rows[0]
    return gas_atual
}

export async function status_padaria(player:Player) {
    
    let mensagem = ``

    const gas_atual = await get_gas_atual(player)
    const nivel_gas = await get_nivel_gas(player)
    const gas_max = get_gas_maximo(nivel_gas)

    const massas_na_geladeira = await get_massas_geladeira_atual(player)
    const pratos_na_vitrine = await get_pratos_vitrine_atual(player)

    const nivel_geladeira = await get_nivel_geladeira(player)
    const nivel_vitrine = await get_nivel_vitrine(player)

    const nivel_rolo = await get_nivel_rolo(player)
    const nivel_forno = await get_nivel_forno(player)

    const max_espacos_geladeira = get_capacidade_geladeira(nivel_geladeira)
    const max_espacos_vitrine = get_capacidade_vitrine(nivel_vitrine)

    // dados legaia serem passados
    // gas atual / gas_max
    // massas na geladeira / max_massas na geladeira
    // massas na vitrine / max_pratos_vitrine
    // Já comprou receitas_compradas
    // O rolo tá nivel: nivel_rolo
    // E o forno está nivel: nivel_forno

    mensagem += player.nickname + "\n"
    mensagem += "Gás: "+ gas_atual + "/" + gas_max + "\n"
    mensagem +=  massas_na_geladeira + "/" + max_espacos_geladeira + " Massas na geladeira" + "\n"
    mensagem +=  pratos_na_vitrine + "/" + max_espacos_vitrine + " Pratos na vitrine" + "\n"
    mensagem +=  "Já comprou: " + player.receitas_compradas + " receitas" + "\n"
    mensagem +=  "O rolo tá nivel: " + nivel_rolo + "\n"
    mensagem +=  "E o forno está nivel: " + nivel_forno

    return mensagem
}