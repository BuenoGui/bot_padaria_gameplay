create TABLE upgrades (
    id_upgrades INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player INT NOT NULL UNIQUE,
    nivel_gas INT NOT NULL DEFAULT 0,   
    nivel_geladeira INT NOT NULL DEFAULT 0,                                     
    nivel_vitrine INT NOT NULL DEFAULT 0,
    nivel_rolo INT NOT NULL DEFAULT 0,                                       
    nivel_forno INT NOT NULL DEFAULT 0, 

    FOREIGN KEY (id_player) REFERENCES players(id_player)
)