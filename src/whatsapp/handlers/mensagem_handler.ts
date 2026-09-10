import { get_id_geladeira_player } from "../../repositories/geladeira_repository.js"
import { get_player_id } from "../../repositories/player_repository.js"
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

    if(texto_formatado.includes("/sovar")) {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        const sovar_mensagem = texto_formatado.split("/sovar")
        // envia o comando para ser executado
        if(texto_formatado === "/sovar") {
        const receita_criada_texto = await preparar_massa_comando(id_player)

        // envia a massa preparada como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: receita_criada_texto}
        )
        }

        // PENDENTE
        // if(Number(sovar_mensagem[1])) {
        //     const id_geladeira_player = Number(sovar_mensagem[1])
        //     const id_geladeira = await get_id_geladeira_player(id_player, id_geladeira_player)

        //     const mensagem_sovado = await sovar_massa_comando(id_player, id_geladeira)
        //     return await sock.sendMessage(
        //     mensagem.key.remoteJid!,
        //     {text: mensagem_sovado}
        //     )
        // }

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

    if(texto_formatado.includes("/comprar gas")) {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        const mensagem_gas = texto_formatado.split("/comprar gas")

        // quantos gás a pessoa quer comprar?
        if (!isNaN(Number(mensagem_gas[1]))) {            
            const vezes_acao = Number(mensagem_gas[1])


            for(let i = 0; i < vezes_acao; i++) {
                // envia o comando para ser executado
                const gas_texto = await comprar_gas_comando(id_player)
                // responde o player
                await sock.sendMessage(
                    mensagem.key.remoteJid!,
                    {text: gas_texto}
                )
            }
            
            return
        }
        
    }

    if (texto_formatado.includes("/melhorar gas")) {

        const id_player = await get_player_id(lid, mensagem)

        const gas_melhorado_texto = await melhorar_gas_comando(id_player)

        return await sock.sendMessage(
        mensagem.key.remoteJid!,
        {text: gas_melhorado_texto}
        )
    }

    if(texto_formatado === "/melhorar geladeira") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const up_geladeira_texto = await melhorar_geladeira_comando(id_player)

        // envia os preços da loja do player como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: up_geladeira_texto}
        )

    }

    if(texto_formatado === "/melhorar vitrine") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const up_vitrine_texto = await melhorar_vitrine_comando(id_player)

        // envia os preços da loja do player como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: up_vitrine_texto}
        )

    }

    if(texto_formatado === "/melhorar rolo") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const up_rolo_texto = await melhorar_rolo_comando(id_player)

        // envia os preços da loja do player como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: up_rolo_texto}
        )

    }

    if(texto_formatado === "/melhorar forno") {
        // SE O PLAYER NÃO EXISTIR NO SQL, CRIAR
        const id_player = await get_player_id(lid, mensagem)

        // envia o comando para ser executado
        const up_forno_texto = await melhorar_forno_comando(id_player)

        // envia os preços da loja do player como resposta
        return await sock.sendMessage(
            mensagem.key.remoteJid!,
            {text: up_forno_texto}
        )

    }
    
}
