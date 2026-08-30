create TABLE vitrines (
    id_vitrine INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player INT NOT NULL,
    id_receita INT NOT NULL,
    estrelas SMALLINT NOT NULL,
    hora_criada TIMESTAMP NOT NULL,

    FOREIGN KEY (id_player) REFERENCES players(id_player)
)