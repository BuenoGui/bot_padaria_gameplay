export const comandos_gameplay_texto = [
    "/sovar", "/assar",
    "/geladeira", "/vitrine",
    "/padaria", "/nick",
    "/status"
]

export const comandos_loja_texto = [
    "/loja", "/treinar braço",
    "/comprar gas", "/melhorar gas",
    "/melhorar geladeira", "/melhorar vitrine",
    "/melhorar rolo", "/melhorar forno",
    "/desbloquear receita"
]

const comandos = [
    ...comandos_gameplay_texto,
    ...comandos_loja_texto
]


export function separar_comando(texto: string) {

    const texto_formatado = texto.toLowerCase().trim()

    const comando_encontrado = comandos.find(comando => 
        texto_formatado === comando ||
        texto_formatado.startsWith(comando + "")
    )

    if(!comando_encontrado){
        console.log("COMANDO INVALIDO")
        return {comando: "", argumento: 0}
    }

    // PEGA A PARTE DO TEXTO DPOIS DO COMANDO SOLICITADO PELO PLAYER
    const argumento_valor = Number(texto_formatado.substring(comando_encontrado.length).trim())


    return {
        comando: comando_encontrado,
        argumento: argumento_valor
    }

}