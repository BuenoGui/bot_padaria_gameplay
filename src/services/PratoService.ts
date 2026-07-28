import Player from "../entities/Player.js"
import Receita from "../entities/Receita.js"
import Prato from "../entities/Prato.js"

export function cozinhar(player: Player, receita: Receita) {
    const prato01 = new Prato (
        1,
        player.playerId,
        receita.id,
        3,
        new Date()
    )
    return prato01
}