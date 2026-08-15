import pool from "../database/connection.js";
import Player from "../entities/Player.js";


function sortInt (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function sortearEstrelas(): number {
    const resultadoEstrelar = sortInt(0, 100)
    
    if (resultadoEstrelar > 98) {
        return 5
    } 
    if (resultadoEstrelar > 90) {
        return 4
    } 
    if (resultadoEstrelar > 70) {
        return 3
    } 
    if (resultadoEstrelar > 40) {
        return 2
    }
    return 1

}

export async function sortear_massa_preparo() {

const lista_receitas_sql = await pool.query(`
    SELECT * FROM receitas
`)

const todas_receitas = lista_receitas_sql.rows

    if (todas_receitas.length === 0) {
        throw new Error ("A lista de receitas vazias paizão")
    } 

    const rng = sortInt(0, 100);

    let raridade_escolhida: string;

    if(rng > 50) { raridade_escolhida = "Incomum" }
    else {raridade_escolhida = "Comum"}


    const receitas_com_raridade = todas_receitas.filter(
        receita => receita.raridade === raridade_escolhida
    )

    const index_sorteado = sortInt(0, receitas_com_raridade.length - 1)
    const receita_escolhida = receitas_com_raridade[index_sorteado]
    const id_receita_escolhida = receita_escolhida?.id_receita
 
    return id_receita_escolhida!

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

