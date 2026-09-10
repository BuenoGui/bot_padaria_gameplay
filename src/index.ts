import { vender } from "./services/vender_service.js";
import { conectarWhatsApp } from "./whatsapp/connections.js";

await conectarWhatsApp();

setInterval(async () => {
    await vender()
    console.log("vendas realizadas")
}, 5 * 60 * 1000)