import { sortearEstrelas, sortear_massa_prato } from "./sorteio_service.js"
import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { get_capacidade_vitrine, get_dados_upgrade,
        get_pratos_vitrine_atual, get_gas_atual, 
        get_gas_receita, get_nivel_vitrine 
        } from "../utils/Formulas.js";

export async function cozinhar(player: Player) {
    const dados_upgrade = await get_dados_upgrade(player)
    const nivel_forno = dados_upgrade.nivel_forno;

    for(let index = 0; index < nivel_forno; index++) {
        
        const massa_sorteada = await sortear_massa_prato(player)
        if (!massa_sorteada) {
            return console.log(player.id_player, "Sem massas na geladeira")
        }

        const id_massa_sorteada = massa_sorteada.id_geladeira

        const estrela_sorteada = sortearEstrelas();
        const data_criada = new Date();

        const id_receita_massa_sorteada = massa_sorteada.id_receita
        const gas_receita_sorteada = await get_gas_receita(id_receita_massa_sorteada)

        const nivel_vitrine = await get_nivel_vitrine(player);       
        const capacidade_vitrine = get_capacidade_vitrine(nivel_vitrine)
        const espacos_vitrine_atual = await get_pratos_vitrine_atual(player)
        
        if (espacos_vitrine_atual >= capacidade_vitrine) {
            return console.log(player.id_player,"Sua vitrine está cheia!")
        }

    
        
        const gas_atual = await get_gas_atual(player)
        if (gas_atual < gas_receita_sorteada) {
            return console.log(player.id_player, "Sem gás para a receita")
        } else {
            await pool.query(
            `UPDATE padarias
            SET gas_atual 
            = gas_atual - $1 
            WHERE id_player
            = $2`,
            [gas_receita_sorteada,
            player.id_player]
        );
        }

        // CRIA PRATO
        const id_prato_vitrine = await pool.query(
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
        // APAGA MASSA DA GELADEIRA
        await pool.query(
            `DELETE FROM 
            geladeiras WHERE 
            id_geladeira = $1`,
            [id_massa_sorteada]
        )

        console.log(id_prato_vitrine.rows)
        
    }

}