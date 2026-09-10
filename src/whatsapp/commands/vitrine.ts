import { construir_player } from "../../repositories/player_repository.js";
import { status_vitrine } from "../../repositories/vitrine_repositoory.js";

export async function mostrar_vitrine_comando(id_player: number) {

    const player = await construir_player(id_player)

    const vitrine_texto = status_vitrine(player)

    return vitrine_texto

}