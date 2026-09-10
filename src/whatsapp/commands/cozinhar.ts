import { construir_player } from "../../repositories/player_repository.js";
import { cozinhar } from "../../services/cozinhar_service.js";

export async function cozinhar_comando(id_player: number) {

    const player = await construir_player(id_player)

    const prato_criado_texto = await cozinhar(player)
    
    return prato_criado_texto

}