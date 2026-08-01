import pool from "./database/connection.js";
import { cozinhar } from "./services/cozinhar_service.js";
import { sortearPlayer } from "./services/sorteio_service.js";

let resultadoTeste01 = await cozinhar(await sortearPlayer());
console.log(resultadoTeste01);

await pool.end();
