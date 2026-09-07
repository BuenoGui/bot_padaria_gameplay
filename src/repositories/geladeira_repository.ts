import pool from "../database/connection.js";
import type Player from "../entities/Player.js";


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

