import pool from "../../database/connection.js";

export async function mudar_nick(nick: string, id_player: number ) {

    let novo_nickname_obj = await pool.query(`
        UPDATE players
        SET nickname = $1
        WHERE id_player = $2
        RETURNING nickname`,
        [nick, id_player]
    )

    const { nickname } = novo_nickname_obj.rows[0]

    return nickname

}