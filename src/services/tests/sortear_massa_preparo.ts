import { listaReceitas } from "../../data/Receitas.js"

export function sortear_massa_preparo() {

    if (listaReceitas.length === 0) {
        throw new Error ("A lista de receitas esta vazia paizão")
    } 

    const rng = Math.floor(Math.random() * 100) + 1;

    let raridade_escolhida: string;

    if(rng > 70) { raridade_escolhida = "incomum" }
    else {raridade_escolhida = "comum"}


    const receitas_raridade_escolhida = listaReceitas.filter(
        receita => receita.raridade === raridade_escolhida
    )

    const index_sorteado = Math.floor(Math.random() * receitas_raridade_escolhida.length)
    const receita_escolhida = receitas_raridade_escolhida[index_sorteado];
    const id_receita_escolhida = receita_escolhida?.id_receita
 
    return id_receita_escolhida

}

console.log(sortear_massa_preparo());