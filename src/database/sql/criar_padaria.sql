create TABLE padarias (
    id_padaria INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player INT NOT NULL,
    gas_atual SMALLINT NOT NULL DEFAULT 100,
    gas_max SMALLINT NOT NULL DEFAULT 100,
    forno_nivel SMALLINT NOT NULL DEFAULT 0,

    FOREIGN KEY (id_player) REFERENCES players(id_player)
)