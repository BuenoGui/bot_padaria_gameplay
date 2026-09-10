import { construir_player } from "../../repositories/player_repository.js";
import { melhorar_vitrine } from "../../services/loja_service.js";

export async function melhorar_vitrine_comando(id_player: number) {

    const player = await construir_player(id_player)

    const vitrine_texto = await melhorar_vitrine(player)
    
    return vitrine_texto

}