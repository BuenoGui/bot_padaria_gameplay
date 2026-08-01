import { listaRaridades } from "../data/Raridades.js";
import { listaReceitas } from "../data/Receitas.js";
import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import Prato from "../entities/Prato.js"
import { sortearEstrelas, sortearReceita } from "./SorteioService.js"

export async function cozinhar(player: Player) {

    const padaria_player = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1",
        [player.id_player])
    const dados_padaria_player = await (padaria_player).rows[0];
    const gas_padaria_player: number = await(dados_padaria_player.gas_atual);

    const id_receita_sorteada = sortearReceita();
    const receita = listaReceitas[id_receita_sorteada];
    const receita_raridade = receita?.raridade;
    const dados_raridade = listaRaridades.find(
        (raridade) => raridade.nome === receita_raridade 
    )

    const gas_necessario = Number(dados_raridade?.gas_necessario)

    if(gas_padaria_player >= gas_necessario) {
        pool.query(`
            UPDATE padarias
            SET gas_atual = gas_atual - $1
            WHERE id_player = $2 `,
        [gas_necessario, player.id_player]);
    } else {
        console.log(`
            O player: ${player.id_player}
            não tem gás necessario para essa receita
            `)
    }

    const prato = new Prato (
        1,
        player.id_player,
        id_receita_sorteada,
        sortearEstrelas(),
        new Date(),
        false
    )
    return prato
}