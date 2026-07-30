create TABLE players (
    player_id VARCHAR(15) PRIMARY KEY,
    player_nickname VARCHAR(20) NOT NULL,
    level INT NOT NULL DEFAULT 0,
    xp INT NOT NULL DEFAULT 0,
    money NUMERIC(10,2) NOT NULL DEFAULT 0
)