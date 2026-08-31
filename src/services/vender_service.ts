import pool from "../database/connection.js";
import { atualizar_xp, construir_player, dinheiro_venda, get_raridade_receita, get_xp_raridade, set_xp_cozinhar, sortInt } from "../utils/Formulas.js";

export async function vender() {
    const vitrine = await pool.query(
        `SELECT * FROM vitrines`
    )
    const dados_vitrine = vitrine.rows

    const lista_receitas_sql = await pool.query(`
        SELECT * FROM receitas`
    )
    const lista_receitas = lista_receitas_sql.rows

    const lista_raridades_sql = await pool.query(`
        SELECT * FROM raridades`
    )
    const lista_raridades = lista_raridades_sql.rows

    for(const prato of dados_vitrine) {

        // DADOS DO PRATO ATUAL
        const id_receita = prato.id_receita;
        const dados_prato = lista_receitas[id_receita];

        const id_player = prato.id_player;
        const player = await construir_player(id_player)

        const raridade_prato = dados_prato?.raridade;
        const prato_feito = lista_raridades.find(raridade => raridade.nome === raridade_prato);
        const chance_venda = Number(prato_feito?.chance_venda);
        
        // DADOS LÓGICA VENDA
        const preco_base = Number(dados_prato?.preco_base);
        const preco_raridade = Number(prato_feito?.multiplicador_venda);
        const hora_prato = prato.hora_criada;
        let estrela_prato = prato.estrelas;

        let dinheiro_recebido = dinheiro_venda(preco_base, preco_raridade, estrela_prato)

        const receita_raridade = await get_raridade_receita(id_receita)
        const xp_raridade = await get_xp_raridade(receita_raridade)
        const xp_recebido = set_xp_cozinhar(xp_raridade)


        // dados SQL
        const id_prato_vendido = prato.id_vitrine

        // mecanica hora
        // const horas recebe uma hora
        const horas = (Date.now() - new Date(hora_prato).getTime()) / (1000 * 60 *60)

        let chance_compra = sortInt(0, 100)

        // MECANICA DE PERDER ESTRELA AO LONGO DO TEMPO
        if (horas >= 1) {
            estrela_prato = 1
            chance_compra = 0
        }
        
        // essa lógica tá escrita de um jeito esquisita mas eu juro que funciona
        if (chance_compra <= chance_venda) {

            // ATUALIZAR DINHEIRO PLAYER
            await pool.query(
                "UPDATE players SET dinheiro = dinheiro + $1 WHERE id_player = $2",
                [dinheiro_recebido, id_player]
            )

            // REMOVER PRATO DA VITRINE
            await pool.query (
                "DELETE FROM vitrines where id_vitrine = $1 ",
                [id_prato_vendido]
            )



            // VENDIDO

            console.log(id_player, "recebeu", dinheiro_recebido,"ao vender um prato: " , prato_feito.nome)
            atualizar_xp(player , xp_recebido)

        } else {
            // NADA AINDA
        }
        
    }
}