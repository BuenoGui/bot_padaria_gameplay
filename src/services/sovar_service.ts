import pool from "../database/connection.js";

export async function sovar_massa(id_geladeira: number) {

    // atualiza vezes_sovado na geladeira
    await pool.query(`
        UPDATE geladeiras
        SET vezes_sovado = vezes_sovado + 1
        WHERE id_geladeira = $1`,
        [id_geladeira]
    )
    return console.log("Você sovou a massa, agora ela está mais fofa! :3")

}