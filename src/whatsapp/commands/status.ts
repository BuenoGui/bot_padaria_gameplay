import { construir_player, get_player_id, status } from "../../repositories/player_repository.js";


export async function texto_status(lid: string ) {
    
    const id_player = await get_player_id(lid, "")

    const player = await construir_player(id_player)

    await status(player)
}