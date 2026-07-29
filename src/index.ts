import Player from "./entities/Player.js"
import { cozinhar } from "./services/PratoService.js";
import Receita from "./entities/Receita.js";
import { listaReceitas } from "./data/Receitas.js";
import { sortearReceita } from "./services/SorteioService.js";

const player_um = new Player("Pedro", 1, 0, 0);
console.log(player_um);

    let resultadoTeste01 = cozinhar(player_um, sortearReceita())
    console.log(resultadoTeste01);

