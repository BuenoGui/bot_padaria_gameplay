import client from "../connection.js";


async function init() {
    await client.connect();

    const todos_jogadores = await client.query("SELECT id_player FROM players")

    for (const jogador of todos_jogadores.rows) {
        await client.query(`
            INSERT INTO padarias (id_player)
            VALUES (${jogador.id_player}) ON CONFLICT DO NOTHING;
            `)
    }

    client.end()
}

init();

