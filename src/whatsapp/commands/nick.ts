import pool from "../../database/connection.js";
import { criar_player } from "../../repositories/player_repository.js";

export async function mudar_nick(nick: string, lid:string ) {

    let novo_nickname_obj = await pool.query(`
        UPDATE players
        SET nickname = $1
        WHERE lid = $2
        RETURNING nickname`,
        [nick, lid]
    )

    if(!novo_nickname_obj || novo_nickname_obj.rows.length === 0) {
        await criar_player(lid, nick)

        return nick
    }

    const { nickname } = novo_nickname_obj.rows[0]

    return nickname

}