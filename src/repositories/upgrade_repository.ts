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

export async function get_nivel_gas(player: Player) {
    const resultado_obj = await pool.query(`
        SELECT nivel_gas
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    if (resultado_obj.rows.length === 0) {
        const nivel_gas_obj = await pool.query(`
            INSERT INTO upgrades (id_player)
            VALUES ($1) ON CONFLICT DO NOTHING
            RETURNING nivel_gas`,
            [player.id_player]
        )

        const { nivel_gas } = nivel_gas_obj.rows[0]

        return nivel_gas

    }

    const { nivel_gas } = resultado_obj.rows[0]

    return nivel_gas
}

export async function get_nivel_geladeira(player: Player) {
    const resultado = await pool.query(`
        SELECT nivel_geladeira
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    return resultado.rows[0].nivel_geladeira;
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
    const resultado_obj = await pool.query(`
        SELECT nivel_rolo
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    if(resultado_obj.rows.length === 0) {

        const nivel_rolo_obj = await pool.query(`
            INSERT INTO upgrades (id_player)
            VALUES ($1) ON CONFLICT DO NOTHING
            RETURNING nivel_rolo`,
            [player.id_player]
        )

        const { nivel_rolo } = nivel_rolo_obj.rows[0]

        return nivel_rolo

    }

    const { nivel_rolo } = resultado_obj.rows[0]

    return nivel_rolo;
}

export async function get_nivel_forno(player: Player) {
    const resultado_obj = await pool.query(`
        SELECT nivel_forno
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    if(resultado_obj.rows.length === 0) {

        const nivel_rolo_obj = await pool.query(`
            INSERT INTO upgrades (id_player)
            VALUES ($1) ON CONFLICT DO NOTHING
            RETURNING nivel_forno`,
            [player.id_player]
        )

        const { nivel_forno } = nivel_rolo_obj.rows[0]

        return nivel_forno

    }

    const { nivel_forno } = resultado_obj.rows[0]

    return nivel_forno
}

export async function get_nivel_braco(player: Player) {
    const resultado_obj = await pool.query(`
        SELECT nivel_braco
        FROM upgrades
        WHERE id_player = $1
    `, [player.id_player]);

    if(resultado_obj.rows.length === 0) {

        const nivel_braco_obj = await pool.query(`
            INSERT INTO upgrades (id_player)
            VALUES ($1) ON CONFLICT DO NOTHING
            RETURNING nivel_braco`,
            [player.id_player]
        )

        const { nivel_braco } = nivel_braco_obj.rows[0]

        return nivel_braco

    }

    const { nivel_braco } = resultado_obj.rows[0]

    return nivel_braco
}

