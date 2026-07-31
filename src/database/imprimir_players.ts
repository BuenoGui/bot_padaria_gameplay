import client from "./connection.js";

async function imprimir() {
    await client.connect();

    const resultado = await client.query("SELECT * FROM players");

    console.log(resultado.rows)

    client.end()
}

imprimir();