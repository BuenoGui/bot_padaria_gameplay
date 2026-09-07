import pool from "../database/connection.js";
import type Player from "../entities/Player.js";

export async function get_receitas_padrao() {
    
    const receitas_padrao_obj = await pool.query(`
        SELECT *  
        FROM receitas
        WHERE receita_bloqueada
        = FALSE`,
    )

    const total = receitas_padrao_obj.rows

    return total

}

export async function get_xp_raridade(raridade_nome: string) {
    const xp_raridade_obj = await pool.query(`
        SELECT xp_raridade
        FROM raridades
        WHERE nome
        = $1`,
        [raridade_nome])

        const { xp_raridade } = xp_raridade_obj.rows[0]
        return xp_raridade
}

export async function get_receita_nome(id_receita: number) {
    
    const receita_nome_obj = await pool.query(`
        SELECT nome
        FROM receitas
        WHERE id_receita
        = $1 
        `,
        [id_receita])

        const { nome } = receita_nome_obj.rows[0]
        return nome
}

export async function get_gas_receita(id_receita: number) {

    const receita_raridade_obj = await pool.query(`
        SELECT raridade
        FROM receitas
        WHERE id_receita
        = $1`, 
        [id_receita]
    )
    const { raridade } = receita_raridade_obj.rows[0]

    const gas_receita_obj = await pool.query(`
        SELECT gas_necessario
        FROM raridades
        WHERE nome
        = $1`,
        [raridade])
    const { gas_necessario } = gas_receita_obj.rows[0]
    

    return gas_necessario
}

export async function get_raridade_receita(id_receita: number) {
    
    const raridade_nome_obj = await pool.query(`
        SELECT raridade
        FROM receitas
        WHERE id_receita
        = $1 
        `,
        [id_receita])

        const { raridade } = raridade_nome_obj.rows[0]
        return raridade
}

export async function get_receitas_players(player: Player) {
    
    const receitas_compradas_obj = await pool.query(`
        SELECT receitas_compradas  
        FROM players
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    const  { receitas_compradas }  = receitas_compradas_obj.rows[0]

    return receitas_compradas

}

export async function get_receita_bloqueada_id(player: Player) {
    
    const id_receita_bloqueada_obj = await pool.query(`
        SELECT receitas.id_receita
        FROM receitas 
        LEFT JOIN receitas_player 
            ON receitas_player.id_receita = receitas.id_receita
           AND receitas_player.id_player = $1
        WHERE receitas.receita_bloqueada = TRUE
          AND receitas_player.id_receita IS NULL
        ORDER BY RANDOM()
        LIMIT 1`,
        [player.id_player]
    )

    const { id_receita } = id_receita_bloqueada_obj.rows[0]
    return id_receita

}

export async function get_receitas_raridade_sorteada(player: Player, raridade_nome: string) {
    const lista_receitas_raridade_sorteada_sql = await pool.query(`
        SELECT receitas.*
        FROM receitas_player
        JOIN receitas
            ON receitas.id_receita = receitas_player.id_receita
        WHERE receitas_player.id_player = $1
        AND receitas.raridade = $2;`,
        [player.id_player, raridade_nome]
        )

    const lista_receitas_raridade_sorteada = lista_receitas_raridade_sorteada_sql.rows

    
    return lista_receitas_raridade_sorteada

}

export async function adicionar_receita_player(player: Player, id_receita: number) {
    // atualiza player receitas_compradas
    await pool.query(`
        UPDATE players
        SET receitas_compradas
        = receitas_compradas + 1
        WHERE id_player
        = $1`,
        [player.id_player])
    
    const linha_nova = await pool.query(`
        INSERT INTO receitas_player 
        (id_player, id_receita)
        VALUES ($1, $2)
        RETURNING id_receitas_player`,
        [player.id_player, id_receita]
        )

    const id_linha = linha_nova
    
    console.log(id_linha)
    console.log(player.id_player)

    return 
}