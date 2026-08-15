import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { sortear_massa_preparo } from "./sorteio_service.js";

export async function preparar_massa(player: Player) {
    
    const receita_sorteada = await sortear_massa_preparo();

    const consulta_geladeira = await pool.query(
        `SELECT COUNT(*)::INT AS total
        FROM geladeiras
        WHERE id_player = $1`,
        [player.id_player]
    )

    const espacos_geladeira = consulta_geladeira.rows[0].total;

    if (espacos_geladeira >= 35) {
        console.log(`Sua geladeira está cheia! desculpa`)
        return
    } else {
        const id_massa_criada = await pool.query(
            `INSERT INTO geladeiras
            (id_player, id_receita)
            VALUES
            ($1, $2)
            RETURNING
            id_geladeira`
            ,
            [player.id_player,
            receita_sorteada]
        )
        
        return id_massa_criada.rows[0].id_geladeira
    }
}