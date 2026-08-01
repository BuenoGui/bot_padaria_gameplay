import { listaRaridades } from "../../data/Raridades.js";
import { listaReceitas } from "../../data/Receitas.js";
import pool from "../../database/connection.js";

const vitrine = await pool.query(
    "SELECT * FROM vitrine")
const dados_vitrine = vitrine.rows

dados_vitrine.forEach(
    (prato) => {

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
        const estrela_prato = prato.estrelas;



        let chance_compra = Math.floor(Math.random() * 100) + 1
        if (chance_compra <= chance_venda) {

            const dinheiro_recebido = ((preco_base * preco_raridade) * (estrela_prato * 0.8))

            // ((Preço do produto * (Preço da raridade)) * (Quantidade de estrelas * 0.8))

            console.log(`prato vendido por ${dinheiro_recebido} `, [prato])
            // VENDIDO
        } else {
            // NADA
        }
        

    } 
)