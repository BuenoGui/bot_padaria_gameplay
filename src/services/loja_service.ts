import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { 
    set_preco_vitrine, set_preco_geladeira, get_gas_maximo, 
    set_preco_gas_total, get_nivel_vitrine, get_nivel_forno, 
    set_preco_forno, get_gas_atual, get_nivel_gas,
    get_nivel_geladeira
    } 
    from "../utils/Formulas.js";

export async function comprar_gas(player: Player) {

    const gas_atual = await get_gas_atual(player)
    const nivel_gas = await get_nivel_gas(player)
    const gas_max = get_gas_maximo(nivel_gas)

    if (gas_atual === gas_max) {
        return console.log ([player.id_player], "seu gás está cheio")
    }
   
    let gas_novo_player = gas_atual + 10;

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

    return console.log(player.id_player, "+10 de gás na sua padaria")
}

export async function melhorar_gas(player: Player) {

    const nivel_gas = await get_nivel_gas(player)
    const gas_max = get_gas_maximo(nivel_gas)

    let preco_upgrade = set_preco_gas_total(gas_max)

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
    await pool.query(
        `UPDATE players
        SET dinheiro = 
        dinheiro - $1
        WHERE id_player
        = $2`,
        [
        preco_upgrade,
        player.id_player
        ]
    )
    
    return console.log(player.id_player, "Parabens por comprar + 10 de gás total")
}

export async function melhorar_geladeira(player:Player) {

    const nivel_geladeira = await get_nivel_geladeira(player)
    let preco_upgrade = set_preco_geladeira(nivel_geladeira)

    if (player.dinheiro < preco_upgrade) {
        return console.log("Player sem dinheiro pro Upgrade da geladeira")
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
    await pool.query(
        `UPDATE players
        SET dinheiro = 
        dinheiro - $1
        WHERE id_player
        = $2`,
        [
        preco_upgrade,
        player.id_player
        ]
    )

    return (player.id_player ,"Você acaba de comprar +5 espaços pra sua geladeira!")

}

export async function melhorar_vitrine(player:Player) {

    const nivel_vitrine = await get_nivel_vitrine(player)
    let preco_upgrade = set_preco_vitrine(nivel_vitrine)

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
    await pool.query(
        `UPDATE players
        SET dinheiro = 
        dinheiro - $1
        WHERE id_player
        = $2`,
        [
        preco_upgrade,
        player.id_player
        ]
    )

    return (player.id_player ,"Você acaba de comprar +2 espaços pra sua vitrine!")

}

export async function melhorar_forno(player:Player) {
    const nivel_forno = await get_nivel_forno(player)
    let preco_upgrade = set_preco_forno(nivel_forno)

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
    await pool.query(
        `UPDATE players
        SET dinheiro = 
        dinheiro - $1
        WHERE id_player
        = $2`,
        [
        preco_upgrade,
        player.id_player
        ]
    )

    return (player.id_player ,"Você acaba de comprar +1 espaços para seu Forno!!!")
}