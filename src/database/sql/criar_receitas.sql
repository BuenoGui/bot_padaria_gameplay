create TABLE receitas (
    id_receita INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    raridade VARCHAR(15) NOT NULL,
    preco_base NUMERIC NOT NULL
);

-- COMUM

INSERT INTO receitas (nome, raridade, preco_base)
VALUES ('Pão de forma', 'Comum', 3.0),
       ('Pão caseiro', 'Comum', 3.0),
       ('Pão francês', 'Comum', 3.0),
       ('Pão de leite', 'Comum', 3.0),
       ('Pão de milho', 'Comum', 3.2),
       ('Baquete', 'Comum', 3.2),
       ('Pão de batata', 'Comum', 3.5),
       ('Brioche', 'Comum', 3.5),
       ('Pão sovado', 'Comum', 3.5);

-- INCOMUM

INSERT INTO receitas (nome, raridade, preco_base)
VALUES ('Pão de queijo', 'Incomum', 5.5),
       ('Pão sírio', 'Incomum', 6.0),
       ('Pão de hot-dog', 'Incomum', 6.0),
       ('Massa de Pizza', 'Incomum', 6.0),
       ('Pão de alho', 'Incomum', 6.5),
       ('Massa de ciabatta', 'Incomum', 6.8),
       ('Bagel', 'Incomum', 7.5),
       ('Pão Australiano', 'Incomum', 8.0);

-- RARO

INSERT INTO receitas (nome, raridade, preco_base)
VALUES ('Pão de centeio', 'Raro', 9.0),
       ('Naan', 'Raro', 9.5),
       ('Pretzel alemão', 'Raro', 10.0),
       ('Pão integral multigrãos', 'Raro', 10.5),
       ('Focaccia', 'Raro', 11.0);

-- ÉPICO

INSERT INTO receitas (nome, raridade, preco_base)
VALUES ('Croissant', 'Épico', 18.0),
       ('Baguete de fermentação longa', 'Épico', 20.0),
       ('Sourdough', 'Épico', 22.0),
       ('Panettone', 'Épico', 25.0),
       ('Kouign-amann', 'Épico', 28.0);