import { listaRaridades } from "../../data/Raridades.js";
import { listaReceitas } from "../../data/Receitas.js";
import { sortearEstrelas, sortear_massa_prato } from "../sorteio_service.js";
import pool from "../../database/connection.js";
import Player from "../../entities/Player.js";

export async function cozinhar(player: Player) {

    const estrela_sorteada = sortearEstrelas();
    const data_criada = new Date();

    const padaria_player = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1",
        [player.id_player])
    const dados_padaria_player = (padaria_player).rows[0];
    const gas_padaria_player: number = (dados_padaria_player.gas_atual);

    const sql_receita_sorteada = await sortear_massa_prato(player);
    const id_sql_receita_sorteada = sql_receita_sorteada.id;
    const id_receita_sorteada = sql_receita_sorteada.id_receita;
    const receita = listaReceitas[id_receita_sorteada];
    const receita_raridade = receita?.raridade;
    const dados_raridade = listaRaridades.find(
        (raridade) => raridade.nome === receita_raridade 
    )

    const gas_necessario = Number(dados_raridade?.gas_necessario)


    // CHECA SE VOCÊ TEM GÁS PARA COZINHAR A RECEITA
    if(gas_padaria_player >= gas_necessario) {
        await pool.query(`
            UPDATE padarias
            SET gas_atual = gas_atual - $1
            WHERE id_player = $2 `,
        [gas_necessario, player.id_player]);
    } else {
        console.log(`
            O player: ${player.id_player}
            não tem gás necessario para essa receita
            `)
        throw new Error ("Sem gás para cozinhar") 
    }

    // ADICIONA PRATO CRIADO A VITRINE
    const prato_vitrine = await pool.query(
        "INSERT INTO vitrine (id_player, id_receita, estrelas, hora_criada) VALUES ($1 , $2, $3, $4) RETURNING id",
        [player.id_player, id_receita_sorteada, estrela_sorteada, data_criada]
    )

    // REMOVE MASSA DO INVENTARIO DO JOGADOR
    await pool.query(
        "DELETE FROM geladeiras WHERE id = $1",
        [id_sql_receita_sorteada]
    );

    const id_prato_criado = prato_vitrine.rows[0].id;

    return id_prato_criado

}

