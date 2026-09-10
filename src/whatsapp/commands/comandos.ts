
const textos_comandos = [
    "Comandos_disponiveis:","\n",
    "/comandos ---> cita todos os comandos desenvolvidos", "\n",
    "/nick {seu_nick} ---> define um nome para você de até 20 caracteres", "\n",
    "/sovar ---> Você prepara uma massa e a deixa na sua geladeira", "\n",
    "/geladeira ---> Você pode ver as massas que você sovou e deixou na geladeira", "\n",
    "/assar ---> Você cozinha uma massa da geladeira e a deixa para ser vendida na vitrine", "\n",
    "/vitrine ---> Você pode ver seus pratos que estão para serem vendidos", "\n",
    "/padaria ---> Você pode ver os dados da sua padaria, como seu gás"
]

let texto_formatado: string = ""

for(const linha of textos_comandos) {
    texto_formatado += linha
}

export const texto_comandos = texto_formatado


