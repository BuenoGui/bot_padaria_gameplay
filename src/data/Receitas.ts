import Receita from "../entities/Receita.js";

export const listaReceitas: Receita[] = [
    new Receita(1, "Pão francês", "comum", 3),
    new Receita(2, "Pão de leite", "comum", 3),
    new Receita(3, "Baquete", "comum", 3.2),
    new Receita(4, "Brioche", "comum", 3.5),
    new Receita(5, "Pão sovado", "comum", 3.5),
    new Receita(6, "Pão de hot-dog", "incomum", 6),
    new Receita(7, "Massa de Pizza", "incomum", 6),
    new Receita(8, "Massa de ciabatta", "incomum", 6.8),
    new Receita(9, "Pão Australiano", "incomum", 8)
];