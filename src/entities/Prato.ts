class Prato {

    constructor(
        public id: number,
        public playerId: string,
        public recipeId: number,
        public estrelas: number,
        public horaCriada: Date
    ) {}
}

export default Prato;