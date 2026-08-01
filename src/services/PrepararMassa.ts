import { listaReceitas } from "../data/Receitas.js";
import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { sortearPlayer, sortearReceita } from "./SorteioService.js";

export async function prepararMassa(player: Player) {
    
    const receita_sorteada = sortearReceita();

    const player_padaria = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1", [player.id_player]
    )
    const player_padaria_dados = player_padaria.rows[0];
    const espacos_disponiveis = Number(player_padaria_dados.espaco_geladeira);

    console.log(espacos_disponiveis)
    console.log(player.id_player)
    
    if (espacos_disponiveis >= 15) {
        console.log("Sua geladeira está cheia! desculpa")
    } else {
        await pool.query(
            "INSERT INTO inventarios (id_player, id_receita) VALUES ($1, $2)",
            [player.id_player, receita_sorteada]
        )
    }



    await pool.end();
}

prepararMassa(await sortearPlayer());
