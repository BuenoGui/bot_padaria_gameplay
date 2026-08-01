import { listaReceitas } from "../data/Receitas.js";
import pool from "../database/connection.js";
import Player from "../entities/Player.js";

export function sortearEstrelas(): number {
    const resultadoEstrelar = Math.floor(Math.random() * 100) + 1;
    
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

export function sortearReceita(): number {

    if (listaReceitas.length === 0) {
        throw new Error ("A lista de receitas vazias paizão")
    } 
    
    const receitaSorteada = Math.floor(Math.random() * listaReceitas.length)
 
    return receitaSorteada!

}

export async function sortearPlayer() {

    const id_todos_jogadores = await pool.query("SELECT id_player FROM players");

    if (id_todos_jogadores.rows.length === 0) {
        throw new Error ("Sem jogadores na base de dados")
    }

    const index = Math.floor(Math.random() * id_todos_jogadores.rows.length);
    const id_jogador_sorteado = id_todos_jogadores.rows[index].id_player;

    const dados_jogador_sorteado = await pool.query(
        `SELECT * FROM players WHERE id_player = $1`,
        [id_jogador_sorteado]
    )
    const objeto_jogador_sorteado = dados_jogador_sorteado.rows[0];

    const jogador_sorteado = new Player (
        objeto_jogador_sorteado.id_player,
        objeto_jogador_sorteado.level,
        objeto_jogador_sorteado.xp,
        Number(objeto_jogador_sorteado.money)
    );
    
    return jogador_sorteado;
    
}