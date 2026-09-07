import { readFile } from "fs/promises"
import pool from "./connection.js"


await pool.query(await readFile(
    "src/database/sql/reset.sql",
    "utf-8"
))
console.log("reset feito")

await pool.end()