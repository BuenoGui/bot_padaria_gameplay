import { construir_player } from "../../repositories/player_repository.js";
import { melhorar_gas } from "../../services/loja_service.js";

export async function melhorar_gas_comando(id_player: number) {

    const player = await construir_player(id_player)

    const gas_melhorado_texto = await melhorar_gas(player)
    
    return gas_melhorado_texto

}
