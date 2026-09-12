import { construir_player } from "../../repositories/player_repository.js";
import { melhorar_braco } from "../../services/loja_service.js";

export async function melhorar_braco_comando(id_player: number) {

    const player = await construir_player(id_player)

    const braco_texto = await melhorar_braco(player)
    
    return braco_texto

}