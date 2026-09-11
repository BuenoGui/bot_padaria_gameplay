import pool from "../database/connection.js";
import { get_vezes_sovada } from "../repositories/geladeira_repository.js";
import { get_receita_nome } from "../repositories/receita_repository.js";

export async function sovar_massa(id_player: number, id_geladeira:number) {

    if(!id_geladeira) {
        return " você não passou uma massa para sovar"
    }

    const vezes_sovadas = await get_vezes_sovada(id_geladeira)
    if(vezes_sovadas >= 5) {
        return " essa massa já foi sovada o bastante"
    }

    const massa_sovada = await pool.query(`
        UPDATE geladeiras
        SET vezes_sovado = vezes_sovado + 1
        WHERE id_geladeira = $1
        AND id_player = $2
        RETURNING id_receita`,
        [id_geladeira, id_player]
    )

    if(massa_sovada.rows.length === 0) {
        return ` pq você estaria sovando a massa de outra pessoa???`
    }

    const { id_receita } = massa_sovada.rows[0]

    const nome_receita = await get_receita_nome(id_receita)


    return " você sovou a massa de um/a " + nome_receita + ", e agora ela está mais fofa! :3"

}