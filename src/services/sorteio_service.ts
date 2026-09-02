import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { get_receitas_raridade_sorteada, RNG_raridade_receita, sortInt } from "../utils/Formulas.js";


export async function sortear_id_massa_preparo(player: Player) {

    const raridade_sorteada = RNG_raridade_receita(player.level)
    const lista_receitas_sorteadas = await get_receitas_raridade_sorteada(player, raridade_sorteada)

    if(!lista_receitas_sorteadas || lista_receitas_sorteadas.length === 0) {
        console.log(player.id_player, "Infelizmente, por sua falta de Experiencia você errou a mão em uma massa: ", raridade_sorteada)
        return
    }

    const index = sortInt(0, lista_receitas_sorteadas.length - 1)

    return lista_receitas_sorteadas[index].id_receita


}

export async function sortear_massa_prato(player: Player) {

    const geladeira_player = await pool.query(`
        SELECT * 
        FROM geladeiras 
        WHERE id_player 
        = $1
        `,
        [player.id_player]
    )
    const massas_geladeira_player = geladeira_player.rows
    const index_massa_sorteada = sortInt(0, massas_geladeira_player.length - 1)

    return massas_geladeira_player[index_massa_sorteada]
}

export async function sortearPlayer() {

    const id_todos_jogadores = await pool.query("SELECT id_player FROM players")

    if (id_todos_jogadores.rows.length === 0) {
        throw new Error ("Sem jogadores na base de dados")
    }

    const index = sortInt(0, id_todos_jogadores.rows.length - 1)
    const id_jogador_sorteado = id_todos_jogadores.rows[index].id_player

    const dados_jogador_sorteado = await pool.query(
        `SELECT * FROM players WHERE id_player = $1`,
        [id_jogador_sorteado]
    )
    const objeto_jogador_sorteado = dados_jogador_sorteado.rows[0]

    const jogador_sorteado = new Player (
        objeto_jogador_sorteado.id_player,
        objeto_jogador_sorteado.tell,
        objeto_jogador_sorteado.nickname,
        objeto_jogador_sorteado.level,
        objeto_jogador_sorteado.xp,
        Number(objeto_jogador_sorteado.dinheiro)
    );
    
    return jogador_sorteado;
    
}