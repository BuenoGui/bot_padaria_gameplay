import type Player from "../entities/Player.js"
import { get_gas_maximo, preco_forno, preco_gas_total, preco_geladeira, preco_rolo, preco_vitrine } from "../utils/Formulas.js"
import { get_nivel_forno, get_nivel_gas, get_nivel_geladeira, get_nivel_rolo, get_nivel_vitrine } from "./upgrade_repository.js"


export async function loja_player(player:Player) {
    // dados legaia serem passados
    // Preço de todos os upgrades
    // Descrição do que cada upgrade faz

    const preco_gas = 30

    const nivel_gas = await get_nivel_gas(player)
    const gas_total_player = get_gas_maximo(nivel_gas)



    const nivel_rolo = await get_nivel_rolo(player)
    const nivel_forno = await get_nivel_forno(player)
    const nivel_geladeira = await get_nivel_geladeira(player)
    const nivel_vitrine = await get_nivel_vitrine(player)

    const preco_upgrade_gas = preco_gas_total(gas_total_player)
    const preco_upgrade_geladeira = preco_geladeira(nivel_geladeira)
    const preco_upgrade_vitrine = preco_vitrine(nivel_vitrine)
    const preco_upgrade_rolo = preco_rolo(nivel_rolo)
    const preco_upgrade_forno = preco_forno(nivel_forno)




    console.log("+10 gás para sua padaria --->  R$:", preco_gas)
    console.log("+10 de gás total para sua padaria --->  R$:", preco_upgrade_gas)
    console.log("+5 espaços na sua geladeira --->  R$:", preco_upgrade_geladeira)
    console.log("+2 espaços na vitrine da sua padaria --->  R$:", preco_upgrade_vitrine)
    console.log("Pode preparar +1 massa por vez na geladeira --->  R$:", preco_upgrade_rolo)
    console.log("Pode assar +1 prato por vez no seu forno --->  R$:", preco_upgrade_forno)

}