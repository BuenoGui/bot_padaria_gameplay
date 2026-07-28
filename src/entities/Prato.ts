class Prato {

    constructor(
        public id: number,
        public playerId: number,
        public recipeId: number,
        public estrelas: number,
        public horaCriada: number
    ) {}
}

export default Prato;