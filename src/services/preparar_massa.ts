import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { sortear_massa_preparo } from "./sorteio_service.js";
import { atualizar_xp, get_capacidade_geladeira, get_nivel_geladeira, 
        get_nivel_rolo, get_quantidade_geladeira_atual,
        get_raridade_receita, get_xp_raridade, set_xp_preparar
        } from "../utils/Formulas.js";

export async function preparar_massa(player: Player) {
    
    const nivel_rolo = await get_nivel_rolo(player)

    for (let i = 0; i < nivel_rolo; i++) {
        const id_receita_sorteada = await sortear_massa_preparo();
        const quantidade_geladeira_atual = await get_quantidade_geladeira_atual(player)
        const receita_raridade = await get_raridade_receita(id_receita_sorteada)
        const xp_raridade = await get_xp_raridade(receita_raridade)
        const xp_recebido = set_xp_preparar(xp_raridade)
        const nivel_geladeira = await get_nivel_geladeira(player)



        if (quantidade_geladeira_atual >= get_capacidade_geladeira(nivel_geladeira)) {
            console.log(`Sua geladeira está cheia! desculpa`)
            return
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
        
        


        console.log(player.id_player, "criou a receita com id:" , id_receita_sorteada, "na geladeira")
        atualizar_xp(player, xp_recebido)

    }

}