import Player from "../entities/Player.js"
import Prato from "../entities/Prato.js"
import { sortearEstrelas, sortearReceita } from "./SorteioService.js"

const jogador = new Player('1191111111', 0, 0, 0)

export function cozinhar(player: Player) {
    const prato01 = new Prato (
        1,
        player.id_player,
        sortearReceita(),
        sortearEstrelas(),
        new Date(),
        false
    )
    return prato01
}

console.log(cozinhar(jogador));