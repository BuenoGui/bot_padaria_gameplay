create TABLE receitas_player (
    id_receitas_player INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    id_receita INT NOT NULL,
    id_player INT NOT NULL,
    raridade VARCHAR(15) NOT NULL,

    FOREIGN KEY (id_player) REFERENCES players(id_player),
    FOREIGN KEY (id_receita) REFERENCES receitas(id_receita),

    UNIQUE(id_player, id_receita)
);