import { vender } from "./services/vender_service.js";
import { conectarWhatsApp } from "./whatsapp/connections.js";
import { id_grupo } from "./whatsapp/dados_connections.js";

const sock = await conectarWhatsApp();

setInterval(async () => {
    const mensagem_venda = await vender()

    if(mensagem_venda) {
        await sock.sendMessage(
            id_grupo,
            {text: mensagem_venda}
        )
    }
    
}, 5 * 60 * 1000)