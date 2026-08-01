import pool from "../connection.js";
import { cozinhar } from "../../services/cozinhar_service.js";
import { sortearPlayer } from "../../services/sorteio_service.js";
import { prepararMassa } from "../../services/preparar_massa.js";

for(let i = 0 ; i <= 20; i++) {
    await cozinhar(await sortearPlayer());
}

for(let i = 0 ; i <= 20; i++) {
    await prepararMassa(await sortearPlayer());
}

await pool.end();
