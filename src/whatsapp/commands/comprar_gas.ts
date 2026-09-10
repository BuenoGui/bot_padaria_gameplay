import { construir_player } from "../../repositories/player_repository.js";
import { comprar_gas } from "../../services/loja_service.js";

export async function comprar_gas_comando(id_player: number) {

    const player = await construir_player(id_player)

    const gas_comprado_texto = await comprar_gas(player)
    
    return gas_comprado_texto

}