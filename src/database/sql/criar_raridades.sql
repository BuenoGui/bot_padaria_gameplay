create TABLE raridades (
    id_raridade INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    multiplicador_venda NUMERIC NOT NULL,
    gas_necessario VARCHAR(15) NOT NULL,
    chance_venda INT NOT NULL
);

INSERT INTO raridades (nome, multiplicador_venda, gas_necessario, chance_venda)
VALUES ('Comum', 1, 5, 10),
       ('Incomum', 1.8, 7, 15),
       ('Raro', 2, 12, 25),
       ('Épico', 3.5, 25, 33),
       ('Lendário', 5, 45, 45),
       ('Mysthico', 15, 65, 65),
       ('Lenda', 25, 95, 85);