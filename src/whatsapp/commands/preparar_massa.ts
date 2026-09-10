import { construir_player } from "../../repositories/player_repository.js";
import { preparar_massa } from "../../services/preparar_massa.js";

export async function preparar_massa_comando(id_player: number) {

    const player = await construir_player(id_player)

    const receita_criada_texto = await preparar_massa(player)

    return receita_criada_texto

}