import { sortearEstrelas, sortearPlayer, sortear_massa_prato } from "../sorteio_service.js";
import pool from "../../database/connection.js";
import Player from "../../entities/Player.js";
import { get_capacidade_vitrine, get_pratos_vitrine_atual, get_dados_upgrade} from "../../utils/Formulas.js";

export async function cozinhar(player: Player) {

    //  Oque preciso?
    //  Criar o prato
    // 
    // 
    // 
    // 
    
    const dados_upgrade = await get_dados_upgrade(player)
    const nivel_forno = dados_upgrade.nivel_forno;

    for(let index = 0; index < nivel_forno; index++) {
        
        const massa_sorteada = sortear_massa_prato(player)
        if (!massa_sorteada) {
            return console.log(player.id_player, "Sem massas na geladeira")
        }
        const nivel_vitrine = dados_upgrade.nivel_vitrine        
        const capacidade_vitrine = get_capacidade_vitrine(nivel_vitrine)
        const espacos_vitrine_atual = await get_pratos_vitrine_atual(player)
        
        if (espacos_vitrine_atual >= capacidade_vitrine) {
            return console.log(player.id_player,"Sua vitrine está cheia!")
        }
        
        
        
        
        
        const estrela_sorteada = sortearEstrelas();
        const data_criada = new Date();






        console.log(espacos_vitrine_atual)
        console.log(capacidade_vitrine)
    }






    pool.end(); // EXCLUIR
    return console.log("") 
}


await cozinhar(await sortearPlayer());


