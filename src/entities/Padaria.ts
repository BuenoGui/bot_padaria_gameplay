class Padaria {

    constructor(
        public id_player: string,
        public gas_atual: number,
        public gas_max: number,
        public forno_nivel: number,
        public vitrine: number,
        public espaco_geladeira: number
    ){}
}

export default Padaria;