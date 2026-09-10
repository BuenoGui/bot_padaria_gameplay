import pool from "../database/connection.js";
import type Player from "../entities/Player.js";
import { get_capacidade_vitrine } from "../utils/Formulas.js";
import { get_raridade_receita, get_receita_nome } from "./receita_repository.js";
import { get_nivel_vitrine } from "./upgrade_repository.js";

export async function get_pratos_vitrine_atual(player: Player) {
    
    const dados_contagem_vitrine = await pool.query(`
        SELECT COUNT(*)::INT AS total
        FROM vitrines
        WHERE id_player
        = $1 
        `,
        [player.id_player])

    const espaco_vitrine = dados_contagem_vitrine.rows[0].total

    return espaco_vitrine
}

export async function status_vitrine(player:Player) {

    let contador = 1
    let mensagem = ``


    const vitrine_obj = await pool.query(`
        SELECT * 
        FROM vitrines
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    const nivel_vitrine = await get_nivel_vitrine(player)
    const quantidade_vitrine = await get_pratos_vitrine_atual(player)
    const max_vitrine = get_capacidade_vitrine(nivel_vitrine)

    const vitrine = vitrine_obj.rows

    mensagem += "Capacidade da vitrine" + "\n"
    mensagem += quantidade_vitrine + "/" + max_vitrine + "\n"

    for(const item_vitrine of vitrine) {

        const nome_receita = await get_receita_nome(item_vitrine.id_receita)
        const raridade_receita = await get_raridade_receita(item_vitrine.id_receita)

        let quantidade_estrelas = ""

        const estrelas_prato = Number(item_vitrine.estrelas)
        for(let i = 0; i < estrelas_prato; i++) {
            quantidade_estrelas += "*"
        }


        mensagem += contador + " - " + nome_receita + "\n"
        mensagem += raridade_receita + "\n"
        mensagem += "Com" + item_vitrine.estrelas + quantidade_estrelas + "\n"
        mensagem += "-------------------------------------------------------" + "\n"
        contador++
    }

    return String(mensagem)

}