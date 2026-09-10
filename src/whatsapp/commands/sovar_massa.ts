import { construir_player } from "../../repositories/player_repository.js";
import { sovar_massa } from "../../services/sovar_service.js";


export async function sovar_massa_comando(id_player: number, id_geladeira:number) {

    const player = await construir_player(id_player)

    const vitrine_texto = await sovar_massa(id_player, id_geladeira)
    
    return player.nickname + vitrine_texto

}