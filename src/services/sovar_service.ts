import pool from "../database/connection.js";
import { get_vezes_sovada } from "../repositories/geladeira_repository.js";

export async function sovar_massa(id_player: number, id_geladeira:number) {

    if(!id_geladeira) {
        return console.log("Você não passou uma massa para sovar")
    }

    const vezes_sovadas = await get_vezes_sovada(id_geladeira)
    if(vezes_sovadas >= 5) {
        return console.log("Essa massa já foi sovada o bastante")
    }

    const massa_sovada = await pool.query(`
        UPDATE geladeiras
        SET vezes_sovado = vezes_sovado + 1
        WHERE id_geladeira = $1
        AND id_player = $2`,
        [id_geladeira, id_player]
    )

    if(massa_sovada.rows.length === 0) {
        return ` pq você estaria sovando a massa de outra pessoa???`
    }
    return "Você sovou a massa, agora ela está mais fofa! :3"

}