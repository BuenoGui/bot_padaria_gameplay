create TABLE padarias (
    id_player VARCHAR(15) NOT NULL PRIMARY KEY,
    gas_atual SMALLINT NOT NULL DEFAULT 100,
    gas_max SMALLINT NOT NULL DEFAULT 100,
    forno_nivel SMALLINT NOT NULL DEFAULT 0,
    espaco_geladeira SMALLINT NOT NULL DEFAULT 0,
    espaco_vitrine SMALLINT NOT NULL DEFAULT 0,

    FOREIGN KEY (id_player) REFERENCES players(id_player)
)