import pool from "../../database/connection.js";
import Player from "../../entities/Player.js";
import { sortearPlayer } from "../sorteio_service.js";

async function comprar_gas(player: Player) {
    const id_player = player.id_player;

    const todos_dados_padaria_player = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1",
        [id_player]
    )
    const dados_padaria_player = todos_dados_padaria_player.rows[0]
    let gas_atual_player = Number(dados_padaria_player.gas_atual)
    let gas_total_player = Number(dados_padaria_player.gas_max)

    if (gas_atual_player === gas_total_player) {
        console.log("Player com gás cheio")
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

async function comprar_gas_total(player: Player) {
    const id_player = player.id_player;

    const todos_dados_padaria_player = await pool.query(
        "SELECT * FROM padarias WHERE id_player = $1",
        [id_player]
    )
    const dados_padaria_player = todos_dados_padaria_player.rows[0]
    let gas_total_player = Number(dados_padaria_player.gas_max)

    console.log(gas_total_player)


    await pool.query(
        "UPDATE padarias SET gas_max = $1 + 10 WHERE id_player = $2",
        [gas_total_player, id_player]
    )

    console.log("feito!")

    await pool.end()
}

await comprar_gas_total(await sortearPlayer());