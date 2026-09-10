import { construir_player } from "../../repositories/player_repository.js";
import { melhorar_rolo } from "../../services/loja_service.js";

export async function melhorar_rolo_comando(id_player: number) {

    const player = await construir_player(id_player)

    const rolo_texto = await melhorar_rolo(player)
    
    return rolo_texto

}