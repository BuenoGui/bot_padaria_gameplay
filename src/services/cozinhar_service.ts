import { sortear_massa_prato } from "./sorteio_service.js"
import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { get_capacidade_vitrine,
        get_pratos_vitrine_atual, get_gas_atual, 
        get_gas_receita, get_nivel_vitrine, 
        get_raridade_receita,
        get_xp_raridade,
        set_xp_cozinhar,
        atualizar_xp,
        get_nivel_forno,
        RNG_estrelas,
        get_vezes_sovada
        } from "../utils/Formulas.js";

export async function cozinhar(player: Player) {
    const nivel_forno = await get_nivel_forno(player)

    for(let index = 0; index < nivel_forno; index++) {
        
        const massa_sorteada = await sortear_massa_prato(player)
        if (!massa_sorteada) {
            continue
        }

        const id_massa_sorteada = massa_sorteada.id_geladeira
        const id_receita_sorteada = massa_sorteada.id_receita


        let estrela_sorteada = RNG_estrelas(player.level);
        const vezes_sovada = await get_vezes_sovada(id_massa_sorteada)

        if(estrela_sorteada === 1 && vezes_sovada === 5) {
            estrela_sorteada ++
        }

        const data_criada = new Date();

        const id_receita_massa_sorteada = massa_sorteada.id_receita
        const gas_receita_sorteada = await get_gas_receita(id_receita_massa_sorteada)

        const nivel_vitrine = await get_nivel_vitrine(player);       
        const capacidade_vitrine = get_capacidade_vitrine(nivel_vitrine)
        const espacos_vitrine_atual = await get_pratos_vitrine_atual(player)

        const receita_raridade = await get_raridade_receita(id_receita_sorteada)
        const xp_raridade = await get_xp_raridade(receita_raridade)
        const xp_recebido = set_xp_cozinhar(xp_raridade)
        
        if (espacos_vitrine_atual >= capacidade_vitrine) {
            console.log(player.id_player,"Sua vitrine está cheia!")
            break 
        }
        
        const gas_atual = await get_gas_atual(player)
        if (gas_atual < gas_receita_sorteada) {
            console.log(player.id_player, "Sem gás para a receita")
            break
        } 
        await pool.query(
            `UPDATE padarias
            SET gas_atual 
            = gas_atual - $1 
            WHERE id_player
            = $2`,
            [gas_receita_sorteada,
            player.id_player]
        );
        
        // CRIA PRATO
        const id_prato_vitrine_obj = await pool.query(
            `INSERT INTO vitrines 
            (id_player, id_receita,
            estrelas, hora_criada)
            VALUES ($1 , $2, $3, $4)
            RETURNING id_vitrine`,
            [player.id_player,
            id_receita_massa_sorteada,
            estrela_sorteada,
            data_criada]
            )

        const id_prato_vitrine = id_prato_vitrine_obj.rows[0]
        const id_vitrine = id_prato_vitrine.id_vitrine
        // APAGA MASSA DA GELADEIRA
        await pool.query(
            `DELETE FROM 
            geladeiras WHERE 
            id_geladeira = $1`,
            [id_massa_sorteada]
        )

        console.log(player.nickname, "Você cozinhou o prato número:", id_vitrine)
        console.log("Você recebeu:", xp_recebido, "XP")
        console.log("Ao preparar um prato" , receita_raridade, "de:", estrela_sorteada ,"estrelas")

        atualizar_xp(player, xp_recebido)
        
    }

}