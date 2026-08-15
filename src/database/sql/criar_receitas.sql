create TABLE receitas (
    id_receita INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    raridade VARCHAR(15) NOT NULL,
    preco_base NUMERIC NOT NULL
);

INSERT INTO receitas (nome, raridade, preco_base)
VALUES ('Pão francês', 'Comum', 3.0),
       ('Pão de leite', 'Comum', 3.0),
       ('Baquete', 'Comum', 3.2),
       ('Brioche', 'Comum', 3.5),
       ('Pão sovado', 'Comum', 3.5),
       ('Pão de hot-dog', 'Incomum', 6.0),
       ('Massa de Pizza', 'Incomum', 6.0),
       ('Massa de ciabatta', 'Incomum', 6.8),
       ('Pão Australiano', 'Incomum', 8.0);