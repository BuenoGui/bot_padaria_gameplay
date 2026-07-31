create TABLE inventarios (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player VARCHAR(15) NOT NULL,
    id_receita INT NOT NULL,
    estrelas SMALLINT NOT NULL,
    hora_criada TIMESTAMP NOT NULL,

    FOREIGN KEY (player_id) REFERENCES players(player_id)
)