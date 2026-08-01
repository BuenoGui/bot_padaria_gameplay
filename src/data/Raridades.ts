import Raridade from "../entities/Raridade.js";


export const listaRaridades: Raridade[] = [
    new Raridade ("comum", 1, 5, 10),
    new Raridade ("incomum", 1.2, 7, 15),
    new Raridade ("raro", 1.5, 12, 25),
    new Raridade ("épico", 1.8, 25, 33),
    new Raridade ("lendário", 2.2, 45, 45),
    // new Raridade ("Mysthico", 3.5, 65, 65),
    // new Raridade ("Lenda", 5, 95, 85)
] 