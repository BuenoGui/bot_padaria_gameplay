import pool from "../database/connection.js";
import { get_vezes_sovada } from "../repositories/geladeira_repository.js";

export async function sovar_massa(id_geladeira: number) {

    if(!id_geladeira) {
        return console.log("Você não passou uma massa para sovar")
    }

    const vezes_sovadas = await get_vezes_sovada(id_geladeira)

    if(vezes_sovadas >= 5) {
        return console.log("Essa massa já foi sovada o bastante")
    }

    await pool.query(`
        UPDATE geladeiras
        SET vezes_sovado = vezes_sovado + 1
        WHERE id_geladeira = $1`,
        [id_geladeira]
    )
    return console.log("Você sovou a massa, agora ela está mais fofa! :3")

}