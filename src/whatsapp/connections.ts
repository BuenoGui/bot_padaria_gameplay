import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState
} from "@whiskeysockets/baileys";

import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";
import { id_grupo } from "./dados_connections.js";
import { processar_mensagem } from "./handlers/mensagem_handler.js";

export async function conectarWhatsApp() {

    const { state, saveCreds } =
        await useMultiFileAuthState("auth_info_baileys");

    const sock = makeWASocket({
        auth: state
    });

    sock.ev.on("connection.update", (update) => {

        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === "open") {
            console.log("WhatsApp conectado!");
        }

        if (connection === "close") {

            const statusCode =
                (lastDisconnect?.error as Boom)?.output?.statusCode;

            const shouldReconnect =
                statusCode !== DisconnectReason.loggedOut;

            console.log("WhatsApp desconectado.");

            if (shouldReconnect) {
                console.log("Tentando reconectar...");
                conectarWhatsApp();
            } else {
                console.log("Sessão encerrada.");
            }
        }
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({messages, type, }) => {

        if (type !== "notify") return;

        for (const mensagem of messages) {

            const remoteJid = mensagem.key.remoteJid;
            
            if(remoteJid !== id_grupo) continue
            
            processar_mensagem(sock, mensagem)

            }
    })

    return sock;
}
