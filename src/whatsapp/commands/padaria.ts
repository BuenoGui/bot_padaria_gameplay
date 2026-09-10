import { status_padaria } from "../../repositories/padaria_repository.js"
import { construir_player, get_player_id } from "../../repositories/player_repository.js"

export async function padaria_comando(lid: string, mensagem: any  ) {
    
    const id_player = await get_player_id(lid, mensagem)

    const player = await construir_player(id_player)

    return await status_padaria(player)
}