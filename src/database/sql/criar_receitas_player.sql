create TABLE receitas_player (
    id_receitas_player INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    id_receita INT NOT NULL,
    id_player INT NOT NULL,

    FOREIGN KEY (id_player) REFERENCES players(id_player) ON DELETE CASCADE,
    FOREIGN KEY (id_receita) REFERENCES receitas(id_receita) ON DELETE CASCADE,

    UNIQUE(id_player, id_receita)
);