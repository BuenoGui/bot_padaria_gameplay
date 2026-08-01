create TABLE players (
    id_player VARCHAR(15) PRIMARY KEY,
    player_nickname VARCHAR(20) NOT NULL,
    level INT NOT NULL DEFAULT 0,
    xp INT NOT NULL DEFAULT 0,
    dinheiro NUMERIC(10,2) NOT NULL DEFAULT 0
)