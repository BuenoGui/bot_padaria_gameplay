create TABLE raridades (
    id_raridade INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    multiplicador_venda NUMERIC NOT NULL,
    gas_necessario INT NOT NULL,
    chance_venda INT NOT NULL,
    xp_raridade INT NOT NULL
);

INSERT INTO raridades (nome, multiplicador_venda, gas_necessario, chance_venda, xp_raridade)
VALUES ('Comum', 1, 5, 10, 2),
       ('Incomum', 1.8, 7, 15, 5),
       ('Raro', 2, 12, 25, 8),
       ('Épico', 3.5, 25, 33, 20),
       ('Lendário', 5, 45, 45, 35),
       ('Lenda', 25, 95, 85, 70),
       ('Mysthico', 15, 65, 65, 90);