class Prato {

    constructor(
        public id: number,
        public id_player: string,
        public id_receita: number,
        public estrelas: number,
        public hora_criada: Date,
        public vendido: boolean
    ) {}
}

export default Prato;