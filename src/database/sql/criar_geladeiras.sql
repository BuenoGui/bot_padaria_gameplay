create TABLE geladeiras (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player VARCHAR(15) NOT NULL,
    id_receita INT NOT NULL,

    FOREIGN KEY (id_player) REFERENCES players(id_player)
)