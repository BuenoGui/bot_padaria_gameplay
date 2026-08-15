class Player {

    // Substituir NOME por Tell no futuro

    constructor (
        public id_player: string,
        public tell: string,
        public nickname: string,
        public level: number,
        public xp: number,
        public dinheiro: number
    ) {}
}

export default Player;