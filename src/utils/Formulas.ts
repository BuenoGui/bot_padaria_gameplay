export function preco_gas_total(gas_total_player: number) {
     return Math.floor((gas_total_player / 20) * 24 * (gas_total_player / 80))
}

export function preco_novo_forno(nivel_forno: number) {
    return (nivel_forno * 15) + (nivel_forno * 30)
}

export function dinheiro_venda(preco_base: number, preco_raridade: number, estrela_prato: number) {
    return ((preco_base * preco_raridade) * (estrela_prato * 1.4)).toFixed(2)
} 


