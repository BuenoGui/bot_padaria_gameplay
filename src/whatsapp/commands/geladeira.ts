import { status_geladeira } from "../../repositories/geladeira_repository.js";
import { construir_player } from "../../repositories/player_repository.js";

export async function mostrar_geladeira_comando(id_player: number) {

    const player = await construir_player(id_player)

    const geladeira_player_texto = status_geladeira(player)
    
    

    return geladeira_player_texto

}