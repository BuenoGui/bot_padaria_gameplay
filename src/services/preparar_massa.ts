import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { sortear_massa_preparo } from "./sorteio_service.js";

export async function preparar_massa(player: Player) {
    
    const receita_sorteada = sortear_massa_preparo();

    const padaria_player = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1", [player.id_player]
    )
    const padaria_player_dados = padaria_player.rows[0];
    const espacos_geladeira = Number(padaria_player_dados.espaco_geladeira);
    
    if (espacos_geladeira >= 35) {
        console.log("Sua geladeira está cheia! desculpa")
    } else {
        const id_massa_criada = await pool.query(
            "INSERT INTO geladeiras (id_player, id_receita) VALUES ($1, $2) RETURNING id",
            [player.id_player, receita_sorteada]
        )
        return id_massa_criada
    }
}
