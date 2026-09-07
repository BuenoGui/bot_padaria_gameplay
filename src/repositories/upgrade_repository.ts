import pool from "../database/connection.js";
import type Player from "../entities/Player.js";

export async function get_dados_upgrade(player: Player) {
    const resultado = await pool.query(`
        SELECT *
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    return resultado.rows[0];
}

export async function get_nivel_vitrine(player: Player) {
    const resultado = await pool.query(`
        SELECT nivel_vitrine
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    return resultado.rows[0].nivel_vitrine;
}

export async function get_nivel_rolo(player: Player) {
    const resultado = await pool.query(`
        SELECT nivel_rolo
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    return resultado.rows[0].nivel_rolo;
}

export async function get_nivel_forno(player: Player) {
    const resultado = await pool.query(`
        SELECT nivel_forno
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    return resultado.rows[0].nivel_forno;
}

export async function get_nivel_gas(player: Player) {
    const resultado = await pool.query(`
        SELECT nivel_gas
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    return resultado.rows[0].nivel_gas;
}

export async function get_nivel_geladeira(player: Player) {
    const resultado = await pool.query(`
        SELECT nivel_geladeira
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    return resultado.rows[0].nivel_geladeira;
}