class Receita {

    constructor (
        public id: number,
        public nome: string,
        public raridade: string,
        public gas_necessario: number,
        public preco_base: number,
        public chance_venda: number
    ) {}

}

export default Receita;