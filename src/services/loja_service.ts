import pool from "../database/connection.js";
import Player from "../entities/Player.js";
import { preco_gas_total, gas_maximo, preco_geladeira, preco_vitrine } from "../utils/Formulas.js";

export async function comprar_gas(player: Player) {

    const dados_padaria_sql = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1",
        [player.id_player]
    )
    const dados_padaria = dados_padaria_sql.rows[0]
    let gas_atual_player = Number(dados_padaria.gas_atual)

    const dados_upgrade_sql = await pool.query(
        `SELECT * FROM upgrades WHERE id_player = $1`,
        [player.id_player]
    )
    const dados_upgrade = dados_upgrade_sql.rows[0]
    let gas_max = gas_maximo(dados_upgrade.nivel_gas)


    if (gas_atual_player === gas_max) {
        return console.log ([player.id_player], "seu gás está cheio")
    }
   
    let gas_novo_player = gas_atual_player + 10;

    if(gas_novo_player < gas_max) {
        await pool.query(
            "UPDATE padarias SET gas_atual = $1 WHERE id_player = $2",
            [gas_novo_player, player.id_player]
        )
    } else {
            await pool.query(
            "UPDATE padarias SET gas_atual = $1 WHERE id_player = $2",
            [gas_max, player.id_player]
        )
    }

    return
}

export async function melhorar_gas(player: Player) {

    const dados_upgrade_sql = await pool.query(
        `SELECT * 
        FROM upgrades 
        WHERE id_player
        = $1`,
        [player.id_player]
    )
    const dados_upgrade = dados_upgrade_sql.rows[0]
    let gas_lvl = dados_upgrade.nivel_gas
    let gas_max = gas_maximo(gas_lvl)
    let preco_upgrade = preco_gas_total(gas_max)

    // Checa dinheiro
    if (player.dinheiro < preco_upgrade) {
        console.log(player.dinheiro, "Sem dinheiro para o upgrade")
        return
    }

    // Adiciona gas total
    await pool.query(
        "UPDATE upgrades SET nivel_gas = $1 + 1 WHERE id_player = $2",
        [gas_lvl, player.id_player],
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

    const dados_upgrade_sql = await pool.query(`
        SELECT *
        FROM upgrades
        WHERE id_player
        = $1`, [player.id_player]
    )
    const { nivel_geladeira } = dados_upgrade_sql.rows[0]
    let preco_upgrade = preco_geladeira(nivel_geladeira)

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

    const dados_upgrade_sql = await pool.query(`
        SELECT *
        FROM upgrades
        WHERE id_player
        = $1`, [player.id_player]
    )
    const { nivel_vitrine } = dados_upgrade_sql.rows[0]
    let preco_upgrade = preco_vitrine(nivel_vitrine)

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