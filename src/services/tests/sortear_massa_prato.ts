import pool from "../../database/connection.js";
import type Player from "../../entities/Player.js";
import { sortearPlayer } from "../sorteio_service.js";


export async function sortear_massa_prato(player: Player) {

    const geladeira_player = await pool.query(
        "SELECT * FROM geladeiras WHERE id_player = $1",
        [player.id_player]
    )
    const massas_geladeira_player = geladeira_player.rows
    const index_massa_sorteada = Math.floor(Math.random() * massas_geladeira_player.length)

    return massas_geladeira_player[index_massa_sorteada]
}

console.log(await sortear_massa_prato(await sortearPlayer()))