import { construir_player } from "../../repositories/player_repository.js";
import { melhorar_forno } from "../../services/loja_service.js";

export async function melhorar_forno_comando(id_player: number) {

    const player = await construir_player(id_player)

    const forno_texto = await melhorar_forno(player)
    
    return forno_texto

}