create TABLE padarias (
    player_id VARCHAR(15) NOT NULL PRIMARY KEY,
    gas_atual SMALLINT NOT NULL DEFAULT 100,
    gas_max SMALLINT NOT NULL DEFAULT 100,
    forno_nivel SMALLINT NOT NULL DEFAULT 0,

    FOREIGN KEY (player_id) REFERENCES players(player_id)
)