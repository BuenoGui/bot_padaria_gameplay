import pool from "../database/connection.js";
import type Player from "../entities/Player.js";
import { get_id_geladeira, get_id_receita, get_vezes_sovada } from "../repositories/geladeira_repository.js";
import { get_receita_nome } from "../repositories/receita_repository.js";
import { get_nivel_braco } from "../repositories/upgrade_repository.js";

export async function sovar_massa(player: Player, id_geladeira:number) {

    if(!id_geladeira) {
        return " você não passou uma massa para sovar"
    }

    const nivel_braco = await get_nivel_braco(player)
    let contador_loop = 0

    for(let i = 0; i <= nivel_braco; i++) {

        contador_loop++

        const vezes_sovadas = await get_vezes_sovada(id_geladeira)
        if(vezes_sovadas >= 5) {
            return " essa massa já foi sovada o bastante"
        }

        const massa_sovada_obj = await pool.query(`
            UPDATE geladeiras
            SET vezes_sovado = vezes_sovado + 1
            WHERE id_geladeira = $1
            AND id_player = $2
            RETURNING vezes_sovado`,
            [id_geladeira, player.id_player]
        )

        if(massa_sovada_obj.rows.length === 0) {
            return ` pq você estaria sovando a massa de outra pessoa???`
        }

        const { vezes_sovado } = massa_sovada_obj.rows[0]

        if (vezes_sovado >= 5 && nivel_braco > 0) {
            const id_receita = await get_id_receita(id_geladeira)
            const nome_receita = await get_receita_nome(id_receita)
            return " você sovou a massa de um " + nome_receita + " por " + contador_loop + "x "+ "e agora ela está no apíce da fofura! :3"
        }

    }

    const id_receita = await get_id_receita(id_geladeira)
    const nome_receita = await get_receita_nome(id_receita)

    if (nivel_braco < 1) {
        return " você sovou a massa de um/a " + nome_receita + ", e agora ela está mais fofa! :3"
    }

    return " você sovou a massa de um/a " + nome_receita + " " + contador_loop + "x "+ "e agora ela está mais fofa! :3"

}