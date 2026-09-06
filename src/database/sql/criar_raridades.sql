create TABLE raridades (
    id_raridade INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    multiplicador_venda NUMERIC NOT NULL,
    gas_necessario INT NOT NULL,
    chance_venda INT NOT NULL,
    xp_raridade INT NOT NULL
);

