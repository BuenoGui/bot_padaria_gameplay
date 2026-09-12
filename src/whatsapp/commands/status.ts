import { construir_player, status_player } from "../../repositories/player_repository.js";


export async function texto_status(id_player: number ) {

    const player = await construir_player(id_player)

    const texto_resposta = await status_player(player)
    
    return texto_resposta
}