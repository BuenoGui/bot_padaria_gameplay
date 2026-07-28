class Receita {

    constructor (
        public id: number,
        public nome: string,
        public raridade: string,
        public gasNecessario: number,
        public precoBase: number
    ) {}

}

export default Receita;