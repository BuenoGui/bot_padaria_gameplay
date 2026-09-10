import { loja_player } from "../../repositories/loja_repository.js";
import { construir_player } from "../../repositories/player_repository.js";

export async function loja_comando(id_player: number) {

    const player = await construir_player(id_player)

    const loja_texto = await loja_player(player)
    
    return loja_texto

}