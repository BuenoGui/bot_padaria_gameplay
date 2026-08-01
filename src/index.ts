import pool from "./database/connection.js";
import { cozinhar } from "./services/CozinharService.js";
import { sortearPlayer } from "./services/SorteioService.js";

let resultadoTeste01 = await cozinhar(await sortearPlayer());
console.log(resultadoTeste01);

await pool.end();
