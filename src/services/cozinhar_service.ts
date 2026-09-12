import { sortear_massa_prato } from "./sorteio_service.js"
import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { get_capacidade_vitrine, xp_cozinhar, RNG_estrelas } from "../utils/Formulas.js";
import { get_nivel_forno, get_nivel_vitrine } from "../repositories/upgrade_repository.js";
import { get_vezes_sovada } from "../repositories/geladeira_repository.js";
import { get_gas_receita, get_raridade_receita, get_receita_nome, get_xp_raridade } from "../repositories/receita_repository.js";
import { get_pratos_vitrine_atual } from "../repositories/vitrine_repositoory.js";
import { get_gas_atual } from "../repositories/padaria_repository.js";
import { atualizar_xp } from "../repositories/player_repository.js";

export async function cozinhar(player: Player) {
    const nivel_forno = await get_nivel_forno(player)
    let pratos_criados = ``

    for(let index = 0; index <= nivel_forno; index++) {
        let mensagem = ``
        
        const massa_sorteada = await sortear_massa_prato(player)
        if (!massa_sorteada) {
            return pratos_criados + player.nickname + " sem massas na geladeira"
        }

        const id_massa_sorteada = massa_sorteada.id_geladeira
        const id_receita_sorteada = massa_sorteada.id_receita

        let estrela_sorteada = RNG_estrelas(player.level);
        let estrelas_texto = ''

        const vezes_sovada = await get_vezes_sovada(id_massa_sorteada)

        if(estrela_sorteada === 1 && vezes_sovada === 5) {
            estrela_sorteada ++
        }

        for(let i = 0; i < estrela_sorteada; i++) {
            estrelas_texto += "★"
        }

        const data_criada = new Date();

        const id_receita_massa_sorteada = massa_sorteada.id_receita
        const gas_receita_sorteada = await get_gas_receita(id_receita_massa_sorteada)
        const nome_receita = await get_receita_nome(id_receita_sorteada)

        const nivel_vitrine = await get_nivel_vitrine(player);       
        const capacidade_vitrine = get_capacidade_vitrine(nivel_vitrine)
        const espacos_vitrine_atual = await get_pratos_vitrine_atual(player)

        const receita_raridade = await get_raridade_receita(id_receita_sorteada)
        const xp_raridade = await get_xp_raridade(receita_raridade)
        const xp_recebido = xp_cozinhar(xp_raridade)
        
        if (espacos_vitrine_atual >= capacidade_vitrine) {
            return pratos_criados + player.nickname + " sua vitrine está CHEIA!"
        }
        
        const gas_atual = await get_gas_atual(player)

        if (gas_atual < gas_receita_sorteada) {
            return pratos_criados + player.nickname + " você está sem gás para a receita!"
        } else {
            await pool.query(
            `UPDATE padarias
            SET gas_atual 
            = gas_atual - $1 
            WHERE id_player
            = $2`,
            [gas_receita_sorteada,
            player.id_player]
            )
        }
        
        // CRIA PRATO
        await pool.query(
            `INSERT INTO vitrines 
            (id_player, id_receita,
            estrelas, hora_criada)
            VALUES ($1, $2, $3, $4)`,
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
      
        const mensagem_xp = String(await atualizar_xp(player, xp_recebido))

        mensagem += player.nickname + " cozinhou um/a: " + nome_receita + " de raridade "+ receita_raridade + ".\n"
        mensagem += "Com " + estrela_sorteada + " " +  estrelas_texto + "\n"
        mensagem += mensagem_xp
        mensagem += " pela destreza na cozinha!" + "\n"
        mensagem += "-------------------------------------------------------" + "\n"

        pratos_criados += mensagem
    }

    return pratos_criados

}