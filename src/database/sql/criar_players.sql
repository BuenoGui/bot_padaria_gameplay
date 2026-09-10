create TABLE players (
    id_player INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lid VARCHAR(40) NOT NULL,
    nickname VARCHAR(20) NOT NULL DEFAULT '',
    level INT NOT NULL DEFAULT 0,
    xp INT NOT NULL DEFAULT 0,
    dinheiro NUMERIC(10,2) NOT NULL DEFAULT 0,
    receitas_compradas INT NOT NULL DEFAULT 0,

    UNIQUE(id_player, lid)
)