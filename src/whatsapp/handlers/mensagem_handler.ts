import { get_id_geladeira } from "../../repositories/geladeira_repository.js"
import { construir_player, get_player_id, get_player_nickname } from "../../repositories/player_repository.js"
import { separar_comando } from "../comando_parser.js"
import { texto_comandos } from "../commands/comandos.js"
import { comprar_gas_comando } from "../commands/comprar_gas.js"
import { cozinhar_comando } from "../commands/cozinhar.js"
import { mostrar_geladeira_comando } from "../commands/geladeira.js"
import { loja_comando } from "../commands/loja.js"
import { melhorar_forno_comando } from "../commands/melhorar_forno.js"
import { melhorar_gas_comando } from "../commands/melhorar_gas.js"
import { melhorar_geladeira_comando } from "../commands/melhorar_geladeira.js"
import { melhorar_rolo_comando } from "../commands/melhorar_rolo.js"
import { melhorar_vitrine_comando } from "../commands/melhorar_vitrine.js"
import { mudar_nick } from "../commands/nick.js"
import { padaria_comando } from "../commands/padaria.js"
import { preparar_massa_comando } from "../commands/preparar_massa.js"
import { sovar_massa_comando } from "../commands/sovar_massa.js"
import { mostrar_vitrine_comando } from "../commands/vitrine.js"

const dicionario_comandos_player = {
    "/sovar": preparar_massa_comando,
    "/assar": cozinhar_comando,
    "/geladeira": mostrar_geladeira_comando,
    "/vitrine": mostrar_vitrine_comando,
    "/padaria": padaria_comando,
    // "/nick": mudar_nick
}

const dicionario_comandos_loja = {
    "/loja": loja_comando,
    "/comprar gas": comprar_gas_comando,
    "/melhorar gas": melhorar_gas_comando,
    "melhorar geladeira": melhorar_geladeira_comando,
    "melhorar vitrine": melhorar_vitrine_comando,
    "/melhorar rolo": melhorar_rolo_comando,
    "/melhorar forno": melhorar_forno_comando,
}

export async function processar_mensagem(sock:any, mensagem:any) {

    const texto:string  = mensagem.message?.conversation || mensagem.message?.extendedTextMessage?.text
    if (!texto) return
    if (texto.substring(0, 1) !== "/") {
        console.log(mensagem)
        console.log("----------------------------------------------------------")
        console.log("mensagem normal:")
        console.log(texto)
        return
    }

    const texto_formatado = texto.toLowerCase().trim()

    if (texto_formatado === "/comandos") {
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: texto_comandos}
            )
    }

    const lid = mensagem.key.participant

    if(!lid) {
        return console.log("sem lid, quem é você?")
    }

    const dados_comando = separar_comando(texto_formatado)
    const comando = dados_comando.comando
    const argumento = dados_comando.argumento

    console.log("Comando: " + dados_comando.comando)
    console.log("Argumento: " + dados_comando.argumento)

    if(comando === "") {
        return "COMANDO INVALIDO"
    }

    // pega o id do player
    const id_player = await get_player_id(lid, mensagem)

    // Se o comando está no dicionario do player
    if (comando in dicionario_comandos_player) {
        
        if(comando === "/sovar" && argumento >= 1) {
            const texto_resposta = await sovar_massa_comando(id_player, await get_id_geladeira(id_player, argumento))
            
            return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: texto_resposta}
        )
            
        }

        // pega a função pra ser executada
        const comando_player = dicionario_comandos_player[comando as keyof typeof dicionario_comandos_player]


        const texto_resposta = await comando_player(id_player)

        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: texto_resposta}
            )

    }

    if (comando in dicionario_comandos_loja) {

        if(comando === "/comprar gas" && argumento >= 2) {
            let texto_resposta = ``
            let gas_comprado = 0

            const player = await construir_player(id_player)

            for(let i = 1; i <= argumento; i++) {
                const texto_gas = await comprar_gas_comando(id_player)

                if(texto_gas.includes("+10")) {
                    gas_comprado += 10 
                } else if(texto_gas.includes("você não tem dinheiro para comprar gás") || texto_gas.includes("eu gás já está cheio, bocó")) { 
                    texto_resposta += player.nickname + ", você comprou +" + gas_comprado + " de gás para sua padaria"
                    texto_resposta += " mas... \n" + texto_gas

                    return await sock.sendMessage(
                        mensagem.key.remoteJid!,
                        {text: texto_resposta}
                    )
                }

            }

            texto_resposta += player.nickname + ", você comprou + " + gas_comprado + " de gás para sua padaria!!!"

            return await sock.sendMessage(
                mensagem.key.remoteJid!,
                {text: texto_resposta}
            )

        }

        // pega a função pra ser executada
        const comando_player = dicionario_comandos_loja[comando as keyof typeof dicionario_comandos_loja]
        const texto_resposta = await comando_player(id_player)
        
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: texto_resposta}
            )


    }
    
}
