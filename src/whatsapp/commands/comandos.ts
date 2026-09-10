
const textos_comandos = [
    "Comandos gameplay:","\n",
    "/comandos ---> cita todos os comandos desenvolvidos", "\n",
    "/nick {seu_nick} ---> define um nome para você de até 20 caracteres", "\n",
    "/sovar ---> Você prepara uma massa e a deixa na sua geladeira", "\n",
    "/sovar [posição na geladeira] ---> Você escolhe uma massa para sovar, massas sovadas tem mais estrelas", "\n",
    "/assar ---> Você cozinha uma massa da geladeira e a deixa para ser vendida na vitrine", "\n",
    "/geladeira ---> Você pode ver as massas que você sovou e deixou na geladeira", "\n",
    "/vitrine ---> Você pode ver seus pratos que estão para serem vendidos", "\n",
    "/padaria ---> Você pode ver os dados da sua padaria, como seu gás",
    "\n\n\n",
    "Comandos da loja", "\n",
    "/comprar gas", "\n",
    "Adiciona +10 de gás a sua padaria, para poder cozinhar outros pratos", "\n",
    "/comprar gas N", "\n",
    "/comprar gas 5, ira comprar +50 de gás, para facilitas as grandes companhias", "\n",
    "/melhorar gas", "\n",
    "Aumenta a capacidade de gás da sua padaria em +10, podendo assar mais pratos antes de comprar mais gás", "\n",
    "/melhorar geladeira", "\n",
    "Aumenta em +5 a capacidade de massas na sua geladeira", "\n",
    "/melhorar vitrine", "\n",
    "Aumenta em +2 a capacidade de pratos na sua vitrine", "\n",
    "/melhorar rolo", "\n",
    "Faz você conseguir preparar +1 massa por vez no /sovar", "\n",
    "/melhorar forno", "\n",
    "Faz você conseguir preparar +1 prato por vez no /assar"
]

let texto_formatado: string = ""

for(const linha of textos_comandos) {
    texto_formatado += linha
}

export const texto_comandos = texto_formatado


