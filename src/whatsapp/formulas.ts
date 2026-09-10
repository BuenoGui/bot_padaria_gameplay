export async function get_whats_nickname(mensagem:any) {

    const nickname = mensagem?.pushName
    if(!nickname) {
        return console.log("Erro ao pegar nome do whats")
    }

    return nickname

}

export async function get_whats_lid(mensagem:any) {

    const lid = mensagem?.key?.participant
    if(!lid) {
        return console.log("Erro ao pegar lid do whats")
    }

    return lid

}