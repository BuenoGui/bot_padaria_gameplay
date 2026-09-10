import { get_player_id } from "../../repositories/player_repository.js"
import { texto_comandos } from "../commands/comandos.js"
import { comprar_gas_comando } from "../commands/comprar_gas.js"
import { cozinhar_comando } from "../commands/cozinhar.js"
import { mostrar_geladeira_comando } from "../commands/geladeira.js"
import { loja_comando } from "../commands/loja.js"
import { mudar_nick } from "../commands/nick.js"
import { padaria_comando } from "../commands/padaria.js"
import { preparar_massa_comando } from "../commands/preparar_massa.js"
import { mostrar_vitrine_comando } from "../commands/vitrine.js"


export async function processar_mensagem(sock:any, mensagem:any) {
    
    const texto:string  = mensagem.message?.conversation || mensagem.message?.extendedTextMessage?.text
    if (!texto) return

    const texto_formatado = texto.toLowerCase().trim()

    const lid = mensagem.key.participant
    if(!lid) {
        return console.log("sem lid, quem é você?")
    }

    if (texto.substring(0, 1) !== "/") {
        console.log(mensagem)
        console.log("----------------------------------------------------------")
        console.log("mensagem normal:")
        console.log(texto)
        return
    }

    if (texto_formatado === "/comandos") {
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: texto_comandos}
            )
    }

    // CRIAR VALIDAÇÕES
    // TEM QUE EXCLUIR O ANTIGO PLAYER DA TABELA
    if (texto_formatado.includes("/nick")) {
        const linha_comando = texto.split("/nick")
        const nickname = String(linha_comando[1]?.trim())

        const id_player = await get_player_id(lid, mensagem)

        const novo_nickname = await mudar_nick(nickname, lid)

        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: `Seu novo nick agora é: ${novo_nickname}`}
        )

    }

    if(texto_formatado === "/sovar") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const receita_criada_texto = await preparar_massa_comando(id_player)

        // envia a massa preparada como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: receita_criada_texto}
        )

    }

    if(texto_formatado === "/assar") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const prato_criado_texto = await cozinhar_comando(id_player)

        // envia a massa preparada como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: prato_criado_texto}
        )

    }

    if(texto_formatado === "/padaria") {
        // envia o comando para ser executado
        const texto_padaria = await padaria_comando(lid, mensagem)

        // envia a massa preparada como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: texto_padaria}
        )

    }

    if(texto_formatado === "/geladeira") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const geladeira_texto = await mostrar_geladeira_comando(id_player)

        // envia as massas na geladeira como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: geladeira_texto}
        )

    }

    if(texto_formatado === "/vitrine") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const vitrine_texto = await mostrar_vitrine_comando(id_player)

        // envia os pratos feitos como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: vitrine_texto}
        )

    }

    if(texto_formatado === "/loja") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const loja_texto = await loja_comando(id_player)

        // envia os preços da loja do player como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: loja_texto}
        )

    }

    if(texto_formatado === "/comprar gas") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const gas_texto = await comprar_gas_comando(id_player)

        // responde o player
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: gas_texto}
        )

    }

    
}
