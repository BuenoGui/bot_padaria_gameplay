import pool from "../database/connection.js";
import Player from "../entities/Player.js";

export async function comprar_gas(player: Player) {
    const id_player = player.id_player;

    const todos_dados_padaria_player = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1",
        [id_player]
    )
    const dados_padaria_player = todos_dados_padaria_player.rows[0]
    let gas_atual_player = Number(dados_padaria_player.gas_atual)
    let gas_total_player = Number(dados_padaria_player.gas_max)

    if (gas_atual_player === gas_total_player) {
        return
    }
    
    let gas_novo_player = gas_atual_player + 10;

    if(gas_novo_player < gas_total_player) {
        await pool.query(
            "UPDATE padarias SET gas_atual = $1 WHERE id_player = $2",
            [gas_novo_player, id_player]
        )
    } else {
            await pool.query(
            "UPDATE padarias SET gas_atual = $1 WHERE id_player = $2",
            [gas_total_player, id_player]
        )
    }

    return
}

export async function comprar_gas_total(player: Player) {
    const id_player = player.id_player;

    const todos_dados_padaria_player = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1",
        [id_player]
    )
    const dados_padaria_player = todos_dados_padaria_player.rows[0]
    let gas_total_player = Number(dados_padaria_player.gas_max)
    const preco_upgrade = Math.floor((gas_total_player / 100) * (8 * gas_total_player / 100))

    if (player.dinheiro < preco_upgrade) {
        console.log(player.dinheiro, "Sem dinheiro para o upgrade")
        return
    }

    await pool.query(
        "UPDATE padarias SET gas_max = $1 + 10 WHERE id_player = $2",
        [gas_total_player, id_player],
    )
    await pool.query(
        "UPDATE players SET dinheiro = dinheiro - $1 WHERE id_player = $2",
        [preco_upgrade, id_player]
    )
    
    console.log(id_player, "Parabens por comprar + 10 de gás total")
    return
}