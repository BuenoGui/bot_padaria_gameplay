import { construir_player } from "../../repositories/player_repository.js";
import { melhorar_geladeira } from "../../services/loja_service.js";

export async function melhorar_geladeira_comando(id_player: number) {

    const player = await construir_player(id_player)

    const geladeira_texto = await melhorar_geladeira(player)
    
    return geladeira_texto

}