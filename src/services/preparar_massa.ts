import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { sortear_id_massa_preparo } from "./sorteio_service.js";
import { get_capacidade_geladeira,  xp_preparar } from "../utils/Formulas.js";
import { get_raridade_receita, get_receita_nome, get_xp_raridade } from "../repositories/receita_repository.js";
import { get_nivel_geladeira, get_nivel_rolo } from "../repositories/upgrade_repository.js";
import { get_massas_geladeira_atual } from "../repositories/geladeira_repository.js";
import { atualizar_xp } from "../repositories/player_repository.js";

export async function preparar_massa(player: Player) {
    
    const nivel_rolo = await get_nivel_rolo(player)
    let receitas_criadas = ``

    for (let i = 0; i <= nivel_rolo; i++) {

        let mensagem = `` 

        const id_receita_sorteada = await sortear_id_massa_preparo(player);

        const raridade_receita = await get_raridade_receita(id_receita_sorteada)
        if(!id_receita_sorteada || id_receita_sorteada === undefined) {
            return "Errou a mão na receita e perdeu uma massa:" + raridade_receita
        }

        const nivel_geladeira = await get_nivel_geladeira(player)
        const capacidade_geladeira = get_capacidade_geladeira(nivel_geladeira)
        const nome_receita = await get_receita_nome(id_receita_sorteada)
        const quantidade_geladeira_atual = await get_massas_geladeira_atual(player)
        const receita_raridade = await get_raridade_receita(id_receita_sorteada)
        const xp_raridade = await get_xp_raridade(receita_raridade)
        const xp_recebido = xp_preparar(xp_raridade)

        if (quantidade_geladeira_atual >= capacidade_geladeira) {
            return "Sua geladeira está cheia! desculpa"
        }
        await pool.query(
            `INSERT INTO geladeiras
            (id_player, id_receita)
            VALUES
            ($1, $2)
            RETURNING
            id_geladeira`
            ,
            [player.id_player,
            id_receita_sorteada]
        )

        const mensagem_xp = String(await atualizar_xp(player, xp_recebido))

        mensagem += "Criou um/a: " + nome_receita + " de raridade "+ receita_raridade + "\n"
        mensagem += "e deixou na geladeira. \n"
        mensagem += mensagem_xp
        mensagem += " pela receita \n"
        mensagem += "-------------------------------------------------------" + "\n"

        receitas_criadas += mensagem
    }

    return receitas_criadas

}