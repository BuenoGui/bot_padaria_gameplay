class Player {

    constructor (
        public id_player: string,
        public lid: string,
        public nickname: string,
        public level: number,
        public xp: number,
        public dinheiro: number,
        public receitas_compradas: number
    ) {}
}

export default Player;