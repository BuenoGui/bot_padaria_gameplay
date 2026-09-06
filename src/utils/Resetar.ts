import pool from "../database/connection.js";

const players_teste: Array<String> = [
    ('11912345678'),('11911111111'),
    ('11922222222'),('11933333333'),
    ('11944444444'),('11955555555'),
    ('11966666666'),('11977777777'),
    ('11988888888'),('19999999999'),
    ('19000000000'),('19111111112'),
    ('19111111113'),('19111111114'),
    ('19111111115'),('19111111116'),
    ('19111111117'),('19111111118'),
    ('19111111119'),('19111111110'),
    ('19111111122'),('19111111133'),
    ('19111102582'),('19111174892'),
    ('19112163112'),('19119856412'),
    ('20027868725'),('21657886132')
]

console.log(players_teste)

for (const player_tell of players_teste) {
        const id_player_excluido_obj = await pool.query(`
        DELETE FROM players
        WHERE tell = $1
        RETURNING id_player 
        `, [player_tell])

    const id_player_excluido = id_player_excluido_obj.rows[0]
    console.log(id_player_excluido)
}



