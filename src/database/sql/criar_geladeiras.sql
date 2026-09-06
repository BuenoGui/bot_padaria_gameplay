create TABLE geladeiras (
    id_geladeira INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player INT NOT NULL,
    id_receita INT NOT NULL,
    vezes_sovado SMALLINT not NULL DEFAULT 0,

    FOREIGN KEY (id_player) REFERENCES players(id_player) ON DELETE CASCADE
)