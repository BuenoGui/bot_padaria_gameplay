import { listaRaridades } from "../data/Raridades.js";
import { listaReceitas } from "../data/Receitas.js";
import pool from "../database/connection.js";

export async function vender() {
    const vitrine = await pool.query(
    "SELECT * FROM vitrine")
    const dados_vitrine = vitrine.rows

    for(const prato of dados_vitrine) {

        // DADOS DO PRATO ATUAL
        const id_prato = prato.id_receita;
        const dados_prato = listaReceitas[id_prato];
        const raridade_prato = dados_prato?.raridade;
        const prato_feito = listaRaridades.find(raridade => raridade.nome === raridade_prato);
        const chance_venda = Number(prato_feito?.chance_venda);
        
        // DADOS LÓGICA VENDA
        const preco_base = Number(dados_prato?.preco_base);
        const preco_raridade = Number(prato_feito?.multiplicador_venda);
        const hora_prato = prato.hora_criada;
        let estrela_prato = prato.estrelas;

        // dar dinheiro ao player
        const id_player = prato.id_player;

        // dados SQL
        const id_prato_vendido = prato.id

        // mecanica hora
        // const horas recebe uma hora
        const horas = (Date.now() - new Date(hora_prato).getTime()) / (1000 * 60 *60)

        let chance_compra = Math.floor(Math.random() * 100) + 1

        // MECANICA DE PERDER ESTRELA AO LONGO DO TEMPO
        if (horas >= 2) {
            estrela_prato = 1
            chance_compra = 0
        }
        
        // essa lógica tá escrita de um jeito esquisita mas eu juro que funciona
        if (chance_compra <= chance_venda) {

            const dinheiro_recebido = Number(((preco_base * preco_raridade) * (estrela_prato * 1.4)).toFixed(2))

            // ATUALIZAR DINHEIRO PLAYER
            await pool.query(
                "UPDATE players SET dinheiro = dinheiro + $1 WHERE id_player = $2",
                [dinheiro_recebido, id_player]
            )

            // REMOVER PRATO DA VITRINE
            await pool.query (
                "DELETE FROM vitrine where id = $1 ",
                [id_prato_vendido]
            )



            // VENDIDO
        } else {
            // NADA AINDA
        }
        
    }
}