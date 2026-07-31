import { listaReceitas } from "../data/Receitas.js";
import type Receita from "../entities/Receita.js";

export function sortearEstrelas(): number {
    const resultadoEstrelar = Math.floor(Math.random() * 100) + 1;
    
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

export function sortearReceita(): number {

    if (listaReceitas.length === 0) {
        throw new Error ("A lista de receitas vazias paizão")
    } 
    
    const receitaSorteada = Math.floor(Math.random() * listaReceitas.length)
 
    return receitaSorteada!

}

