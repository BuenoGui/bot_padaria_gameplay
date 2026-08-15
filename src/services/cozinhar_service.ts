import { sortearEstrelas, sortear_massa_prato } from "./sorteio_service.js"
import pool from "../database/connection.js";
import Player from "../entities/Player.js";

export async function cozinhar(player: Player) {

    const estrela_sorteada = sortearEstrelas();
    const data_criada = new Date();
    // CHECA SE VC TEM MASSAS PARA COZINHAR
    const padaria_player = await pool.query(
        `SELECT * FROM padarias WHERE id_player = $1`,
        [player.id_player]
    )
    const dados_vitrine = await pool.query(
        `SELECT COUNT(*)::INT AS total
        FROM vitrine
        WHERE id_player = $1`,
        [player.id_player]
    )
    const espaco_vitrine = dados_vitrine.rows[0].total
    const dados_padaria_player = (padaria_player).rows[0];
    const gas_padaria_player: number = (dados_padaria_player.gas_atual);
    const sql_receita_sorteada = await sortear_massa_prato(player);

    if(!sql_receita_sorteada) {
        console.log(player.id_player, "Nâo tem massas na geladeira")
        return
    }

    const id_sql_receita_sorteada = sql_receita_sorteada.id;
    const id_receita_sorteada = sql_receita_sorteada.id_receita;
    const lista_receitas_sql = await pool.query(`
    SELECT * FROM receitas
    `)
    const lista_receitas = lista_receitas_sql.rows
    const receita_sorteada = lista_receitas[id_receita_sorteada - 1];
    const raridade_receita_sorteada = receita_sorteada?.raridade;
    const lista_raridades_sql = await pool.query(`
    SELECT * FROM raridades
    `)
    const lista_raridades = lista_raridades_sql.rows
    const dados_raridade = lista_raridades.find(
        (raridade) => raridade.nome === raridade_receita_sorteada 
    )

    const gas_necessario = Number(dados_raridade?.gas_necessario)

    // CHECA SUA VITRINE    
    if(espaco_vitrine >= 50) {
        console.log(player.id_player, "Sua vitrine está cheia!")
        return
    }

    // CHECA SE VOCÊ TEM GÁS PARA COZINHAR A RECEITA
    if(gas_padaria_player <= gas_necessario) {
        console.log (player.id_player, "Esta sem gás para cozinhar") 
        return
    } else {
        await pool.query(
            "UPDATE padarias SET gas_atual = gas_atual - $1 WHERE id_player = $2",
            [gas_necessario, player.id_player]);
    }

    // ADICIONA PRATO CRIADO A VITRINE
    const prato_vitrine = await pool.query(
        "INSERT INTO vitrine (id_player, id_receita, estrelas, hora_criada) VALUES ($1 , $2, $3, $4) RETURNING id_vitrine",
        [player.id_player, id_receita_sorteada, estrela_sorteada, data_criada]
    )

    // REMOVE MASSA DO INVENTARIO DO JOGADOR
    await pool.query(
        "DELETE FROM geladeiras WHERE id_geladeira = $1",
        [id_sql_receita_sorteada]
    );

    const id_prato_criado = prato_vitrine.rows[0].id;

    return id_prato_criado
}
