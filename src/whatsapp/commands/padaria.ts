import { status_padaria } from "../../repositories/padaria_repository.js"
import { construir_player, get_player_id } from "../../repositories/player_repository.js"

export async function padaria_comando(lid: string, mensagem: any  ) {
    
    console.log("Lid recebido: " + lid)
    console.log("Objeto mensagem:" + mensagem)
    console.log("-----------------------------------------------------------------------------------------------")



    const id_player = await get_player_id(lid, mensagem)

    const player = await construir_player(id_player)

    return await status_padaria(player)
}