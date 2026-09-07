import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { get_gas_atual } from "../repositories/padaria_repository.js";
import { atualizar_dinheiro_upgrade, get_receitas_compradas } from "../repositories/player_repository.js";
import { adicionar_receita_player, get_receita_bloqueada_id } from "../repositories/receita_repository.js";
import { get_nivel_forno, get_nivel_gas, get_nivel_geladeira, get_nivel_rolo, get_nivel_vitrine } from "../repositories/upgrade_repository.js";
import { preco_vitrine, preco_geladeira, get_gas_maximo, 
        preco_gas_total, preco_forno, preco_rolo,
        preco_receita } from "../utils/Formulas.js";

export async function comprar_gas(player: Player) {

    const gas_atual = await get_gas_atual(player)
    const nivel_gas = await get_nivel_gas(player)
    const gas_max = get_gas_maximo(nivel_gas)
    const preco_upgrade = 30

    if(player.dinheiro < preco_upgrade) {
        return console.log(player.id_player, "Sem dinheiro para comprar gás")
    }

    if (gas_atual === gas_max) {
        return console.log ([player.id_player], "seu gás está cheio")
    }
   
    const gas_novo_player = gas_atual + 10;

    if(gas_novo_player < gas_max) {
        await pool.query(
            `UPDATE padarias
            SET gas_atual
            = $1 
            WHERE id_player 
            = $2`,
            [gas_novo_player,
            player.id_player]
        )
    } else {
            await pool.query(
            `UPDATE padarias
            SET gas_atual = 
            $1 WHERE 
            id_player
            = $2`,
            [gas_max, 
            player.id_player]
        )
    }

    await atualizar_dinheiro_upgrade(player, preco_upgrade)

    return console.log(player.id_player, "+10 de gás na sua padaria")
}

export async function melhorar_gas(player: Player) {

    const nivel_gas = await get_nivel_gas(player)
    const gas_max = get_gas_maximo(nivel_gas)

    const preco_upgrade = preco_gas_total(gas_max)

    // Checa dinheiro
    if (player.dinheiro < preco_upgrade) {
        console.log(player.dinheiro, "Sem dinheiro para o upgrade")
        return
    }

    // Adiciona gas total
    await pool.query(
        "UPDATE upgrades SET nivel_gas = $1 + 1 WHERE id_player = $2",
        [nivel_gas, player.id_player],
    )
    // Atualiza gas
    await pool.query(
        `
        UPDATE padarias
        SET gas_atual = 
        gas_atual + 10 
        WHERE id_player = $1`
        ,
        [player.id_player]
    )
    // Diminui dinheiro
    await atualizar_dinheiro_upgrade(player, preco_upgrade)
    
    return console.log(player.id_player, "Parabens por comprar + 10 de gás total")
}

export async function melhorar_geladeira(player:Player) {

    const nivel_geladeira = await get_nivel_geladeira(player)
    const preco_upgrade = preco_geladeira(nivel_geladeira)

    if (player.dinheiro < preco_upgrade) {
        return console.log(player.id_player, "Player sem dinheiro pro Upgrade da geladeira")
    }

    // Atualiza upgrades
    await pool.query (`
        UPDATE upgrades
        SET nivel_geladeira
        = nivel_geladeira + 1
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    // Diminui dinheiro
    await atualizar_dinheiro_upgrade(player, preco_upgrade)

    return (player.id_player ,"Você acaba de comprar +5 espaços pra sua geladeira!")

}

export async function melhorar_vitrine(player:Player) {

    const nivel_vitrine = await get_nivel_vitrine(player)
    const preco_upgrade = preco_vitrine(nivel_vitrine)

    if (player.dinheiro < preco_upgrade) {
        return console.log("Player sem dinheiro pro Upgrade da vitrine")
    }

    // Atualiza upgrades
    await pool.query (`
        UPDATE upgrades
        SET nivel_vitrine
        = nivel_vitrine + 1
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    // Diminui dinheiro
    await atualizar_dinheiro_upgrade(player, preco_upgrade)

    return (player.id_player ,"Você acaba de comprar +2 espaços pra sua vitrine!")

}

export async function melhorar_rolo(player:Player) {
    const nivel_rolo = await get_nivel_rolo(player)
    const preco_upgrade = preco_rolo(nivel_rolo)

    if (player.dinheiro < preco_upgrade) {
        return console.log(player.id_player, "Player sem dinheiro pro Upgrade do rolo")
    }

    // Atualiza upgrades
    await pool.query (`
        UPDATE upgrades
        SET nivel_rolo
        = nivel_rolo + 1
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    // Diminui dinheiro
    await atualizar_dinheiro_upgrade(player, preco_upgrade)

    return (player.id_player ,"Você acaba de comprar +1 rolo para massas!!")
}

export async function melhorar_forno(player:Player) {
    const nivel_forno = await get_nivel_forno(player)
    const preco_upgrade = preco_forno(nivel_forno)

    if (player.dinheiro < preco_upgrade) {
        return console.log("Player sem dinheiro pro Upgrade do forno")
    }

    // Atualiza upgrades
    await pool.query (`
        UPDATE upgrades
        SET nivel_forno
        = nivel_forno + 1
        WHERE id_player
        = $1`,
        [player.id_player]
    )

    // Diminui dinheiro
    await atualizar_dinheiro_upgrade(player, preco_upgrade)

    return (player.id_player ,"Você acaba de comprar +1 espaços para seu Forno!!!")
}

export async function desbloquear_receita(player: Player) {

    const preco_upgrade = preco_receita(await get_receitas_compradas(player))

    if(player.dinheiro < preco_upgrade) {
        console.log (player.id_player, "Sem dinheiro para comprar novas receitas!")
        return
    }

    const id_receita_comprada = Number(await get_receita_bloqueada_id(player))
    await adicionar_receita_player(player, id_receita_comprada)
    await atualizar_dinheiro_upgrade(player, preco_upgrade)

    
}