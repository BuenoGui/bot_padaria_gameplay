import { construir_player } from "../../repositories/player_repository.js";
import { desbloquear_receita } from "../../services/loja_service.js";

export async function desbloquear_receita_comando(id_player: number) {

    const player = await construir_player(id_player)

    const receita_comprada_texto = await desbloquear_receita(player)
    
    return receita_comprada_texto

}