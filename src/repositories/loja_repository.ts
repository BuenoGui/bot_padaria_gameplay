import type Player from "../entities/Player.js"
import { get_gas_maximo, preco_forno, preco_gas_total, preco_geladeira, preco_rolo, preco_vitrine } from "../utils/Formulas.js"
import { get_dinheiro_player } from "./player_repository.js"
import { get_nivel_forno, get_nivel_gas, get_nivel_geladeira, get_nivel_rolo, get_nivel_vitrine } from "./upgrade_repository.js"


export async function loja_player(player:Player) {

    let mensagem = ``

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

    const dinheiro_player = await get_dinheiro_player(player)

    const dinheiro_player_texto = String(dinheiro_player).replace(".", ",")

    mensagem += player.nickname + " você tem: R$ " + dinheiro_player_texto + "\n"
    mensagem += "--------------------------------------------------" + "\n\n"
    mensagem += "/comprar gas" + "\n"
    mensagem += "+ 10 gás para sua padaria --->  R$: " +  preco_gas + ",00" + "\n\n"
    mensagem += "/melhorar gas" + "\n"
    mensagem += "+10 de gás total para sua padaria --->  R$: " + preco_upgrade_gas + ",00" + "\n\n"
    mensagem += "/melhorar geladeira" + "\n"
    mensagem += "+5 espaços na sua geladeira --->  R$: " + preco_upgrade_geladeira + ",00" + "\n\n"
    mensagem += "/melhorar vitrine" + "\n"
    mensagem += "+2 espaços na vitrine da sua padaria --->  R$: " + preco_upgrade_vitrine + ",00" + "\n\n"
    mensagem += "/melhorar rolo" + "\n"
    mensagem += "Pode preparar +1 massa por vez na geladeira --->  R$: " + preco_upgrade_rolo + ",00" + "\n\n"
    mensagem += "/melhorar forno" + "\n"
    mensagem += "Pode assar +1 prato por vez no seu forno --->  R$: " + preco_upgrade_forno + ",00" + "\n"

    return mensagem

}