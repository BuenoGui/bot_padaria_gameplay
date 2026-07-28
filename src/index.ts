import Player from "./entities/Player.js"
import { cozinhar } from "./services/PratoService.js";
import Receita from "./entities/Receita.js";
import { listaReceitas } from "./data/Receitas.js";

const player_um = new Player("Pedro", 1, 0, 0);
const receita_pao = listaReceitas.find(receita => receita.id === 1);

console.log(player_um);

if (receita_pao) {
    let resultadoTeste01 = cozinhar(player_um, receita_pao)
    console.log(receita_pao);
    console.log(resultadoTeste01);
} else {
    console.log("Essa receita aindanão foi inventada")
}





