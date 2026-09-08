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

    const geladeira_obj = await pool.query(`
        SELECT * 
        FROM geladeiras
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    const nivel_geladeira = await get_nivel_geladeira(player)
    const quantidade_geladeira = await get_massas_geladeira_atual(player)
    const max_geladeira = get_capacidade_geladeira(nivel_geladeira)

    const geladeira = geladeira_obj.rows

    console.log("Capacidade da geladeira")
    console.log(quantidade_geladeira+"/"+max_geladeira)

    for(const item_geladeira of geladeira) {
        
        const nome_receita = await get_receita_nome(item_geladeira.id_receita)
        const raridade_receita = await get_raridade_receita(item_geladeira.id_receita)

        console.log(contador+".", nome_receita)
        console.log(raridade_receita)
        console.log("Sovado:", item_geladeira.vezes_sovado + "x")
        console.log("------------------------------------------------------------")
        contador++
    }   

}