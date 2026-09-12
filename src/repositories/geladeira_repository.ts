import pool from "../database/connection.js";
import type Player from "../entities/Player.js";
import { get_capacidade_geladeira } from "../utils/Formulas.js";
import { get_raridade_receita, get_receita_nome } from "./receita_repository.js";
import { get_nivel_geladeira } from "./upgrade_repository.js";


export async function get_vezes_sovada(id_geladeira: number) {
    const massa_geladeira_obj = await pool.query(`
        SELECT vezes_sovado
        FROM geladeiras
        WHERE id_geladeira = $1`,
        [id_geladeira]
        )

    if(!massa_geladeira_obj?.rows || massa_geladeira_obj.rows.length == 0) {
        console.log("Nenhuma massa na geladeira para ser sovada")
        return
    }

    const { vezes_sovado } = massa_geladeira_obj.rows[0]

    return vezes_sovado

}

export async function get_massas_geladeira_atual(player:Player) {
    
    const total_geladeira_obj = await pool.query(`
        SELECT COUNT(*)::INT AS total
        FROM geladeiras
        WHERE id_player = $1`,
        [player.id_player]
    )

    const  total_geladeira  = total_geladeira_obj.rows[0].total
    return total_geladeira

}

export async function status_geladeira(player:Player) {

    let contador = 1
    let status_geladeira_texto = `Capacidade da geladeira \n`

    const geladeira_obj = await pool.query(`
        SELECT * 
        FROM geladeiras
        WHERE id_player
        = $1
        ORDER BY id_geladeira`,
        [player.id_player]
    )

    const nivel_geladeira = await get_nivel_geladeira(player)
    const quantidade_geladeira = await get_massas_geladeira_atual(player)
    const max_geladeira = get_capacidade_geladeira(nivel_geladeira)

    const geladeira = geladeira_obj.rows

    status_geladeira_texto += quantidade_geladeira + "/" + max_geladeira + "\n"

    for(const item_geladeira of geladeira) {
        
        const nome_receita = await get_receita_nome(item_geladeira.id_receita)
        const raridade_receita = await get_raridade_receita(item_geladeira.id_receita)

        status_geladeira_texto += contador+ " - " + nome_receita + "\n"
        status_geladeira_texto += raridade_receita + "\n"
        status_geladeira_texto += "Sovado: "+ item_geladeira.vezes_sovado + "x" + "\n"
        status_geladeira_texto += "-------------------------------------------------------" + "\n"
        contador++
    }

    return String(status_geladeira_texto)

}

export async function get_id_geladeira(id_player: number, id_geladeira_player: number) {

    const offset = id_geladeira_player - 1

    if(id_geladeira_player < 0) {
        return " você não quer sovar nada"
    }

    const id_geladeira_obj = await pool.query(`
        SELECT id_geladeira
        FROM geladeiras
        WHERE id_player = $1
        ORDER BY id_geladeira ASC
        LIMIT 1
        OFFSET $2`,
        [id_player, offset]
        )

    console.log(id_geladeira_obj)

    if(id_geladeira_obj.rows.length === 0) {
        return "Nenhuma massa na geladeira para ser sovada"
    }

    const { id_geladeira } = id_geladeira_obj.rows[0]

    return id_geladeira

}

export async function get_id_receita(id_geladeira: number) {
    const id_receita_obj = await pool.query(`
        SELECT id_receita
        FROM geladeiras
        WHERE id_geladeira = $1`,
        [id_geladeira]
        )

    if(!id_receita_obj?.rows || id_receita_obj.rows.length == 0) {
        console.log("Nenhuma massa na geladeira para ser sovada")
        return
    }

    const { id_receita } = id_receita_obj.rows[0]

    return id_receita

}



