// SORT INT

export function sortInt (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// SORT RNG receita
export function RNG_raridade_receita (level_player: number) {
    
    const rng = sortInt(level_player, 100)

    let raridade_sorteada: string = ""

    if (rng < 40) { 
        raridade_sorteada = "Comum"        //40%
    } else if (rng < 70) { 
        raridade_sorteada = "Incomum"      //30%
    } else if (rng < 85) { 
        raridade_sorteada = "Raro"         //15%
    } else if (rng < 93) { 
        raridade_sorteada = "Épico"        //8%
    } else if (rng < 97) { 
        raridade_sorteada = "Lendário"     //4%
    } else if (rng < 99) { 
        raridade_sorteada = "Lenda"        //2%
    } else {
        raridade_sorteada = "Mysthico"     //1%
    }

    return raridade_sorteada

}

export function RNG_estrelas(level_player:number) {
    const resultadoEstrelar = sortInt(level_player, 100)
     
    if (resultadoEstrelar > 98) {
        return 5
    } 
    if (resultadoEstrelar > 90) {
        return 4
    } 
    if (resultadoEstrelar > 70) {
        return 3
    } 
    if (resultadoEstrelar > 40) {
        return 2
    }
    return 1
}

// DADOS
export function get_gas_maximo(nivel_gas: number) {
    return 100 + (nivel_gas * 10)
}

export function get_capacidade_geladeira (nivel_geladeira: number) {
    return 20 + (nivel_geladeira * 5)
}

export function get_capacidade_vitrine (nivel_vitrine: number) {
    return 20 + (nivel_vitrine * 2)
}

export function get_capacidade_forno (nivel_forno: number) {
    return nivel_forno + 1
}

// PREÇOS
export function preco_gas_total(gas_total_player: number) {
    return Math.floor((gas_total_player / 20) * 8 * (gas_total_player / 80))
}

export function preco_geladeira(nivel_geladeira: number) {
    return (nivel_geladeira ** 2) * (nivel_geladeira *20)
}

export function preco_vitrine(nivel_vitrine: number) {
    return (nivel_vitrine ** 3) * ((nivel_vitrine * 3) + 62)
}

export function preco_rolo(nivel_rolo: number) {
    return nivel_rolo ** 7 + (nivel_rolo * 15) * (nivel_rolo * 15)
}

export function preco_forno(nivel_forno: number) {
    return (nivel_forno * 20) + ((nivel_forno*35) * ((nivel_forno*4)**2))
}

export function preco_receita(receitas_compradas: number) {
    return ((receitas_compradas * 5)**2 + 540)
}

// XP
export function xp_rankup(level_player: number) {
    return (43 + level_player * 755) 
}

export function xp_cozinhar(xp_recebido: number) {
    return  xp_recebido * 2
}

export function xp_preparar(xp_recebido: number) {
    return  xp_recebido * 4 
}

export function xp_venda(xp_recebido: number) {
    return xp_recebido
}

// VENDA
export function dinheiro_venda(preco_base: number, preco_raridade: number, estrela_prato: number) {
    return ((preco_base * preco_raridade) * (estrela_prato * 1.4)).toFixed(2)
} 


