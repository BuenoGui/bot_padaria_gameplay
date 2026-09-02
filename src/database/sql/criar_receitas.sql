create TABLE receitas (
    id_receita INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    raridade VARCHAR(15) NOT NULL,
    preco_base NUMERIC NOT NULL,
    receita_bloqueada BOOLEAN NOT NULL DEFAULT TRUE
);

-- COMUM

INSERT INTO receitas (nome, raridade, preco_base, receita_bloqueada)
VALUES ('Pão de forma', 'Comum', 3.0, FALSE),
       ('Pão caseiro', 'Comum', 3.0, FALSE),
       ('Pão francês', 'Comum', 3.0, FALSE),
       ('Pão de leite', 'Comum', 3.0, FALSE),
       ('Pão de milho', 'Comum', 3.2, FALSE),
       ('Baquete', 'Comum', 3.2, FALSE),
       ('Pão de batata', 'Comum', 3.5, FALSE),
       ('Brioche', 'Comum', 3.5, FALSE),
       ('Pão sovado', 'Comum', 3.5, FALSE);

-- INCOMUM

INSERT INTO receitas (nome, raridade, preco_base, receita_bloqueada)
VALUES
    ('Pão de queijo', 'Incomum', 5.5, FALSE),
    ('Pão sírio', 'Incomum', 6.0, FALSE),
    ('Pão de hot-dog', 'Incomum', 6.0, TRUE),
    ('Massa de Pizza', 'Incomum', 6.0, FALSE),
    ('Pão de alho', 'Incomum', 6.5, FALSE),
    ('Massa de ciabatta', 'Incomum', 6.8, FALSE),
    ('Bagel', 'Incomum', 7.5, FALSE),
    ('Pão Australiano', 'Incomum', 8.0, TRUE),
    ('Pão de abóbora', 'Incomum', 7.2, FALSE),
    ('Pão de cebola', 'Incomum', 7.0, FALSE),
    ('Pão de coco', 'Incomum', 7.5, FALSE),
    ('Pão de cenoura', 'Incomum', 7.8, TRUE),
    ('Pão de mel', 'Incomum', 8.2, TRUE),
    ('Pão de ervas', 'Incomum', 7.5, FALSE),
    ('Pão de batata-doce', 'Incomum', 8.0, FALSE),
    ('Pão de parmesão', 'Incomum', 8.5, FALSE),
    ('Pão de gergelim', 'Incomum', 7.0, TRUE),
    ('Pão de chia', 'Incomum', 8.0, FALSE),
    ('Pão de aveia', 'Incomum', 7.5, FALSE),
    ('Pão de milho com queijo', 'Incomum', 8.8, TRUE);

-- RARO

INSERT INTO receitas (nome, raridade, preco_base, receita_bloqueada)
VALUES
    ('Pão de centeio', 'Raro', 9.0, FALSE),
    ('Naan', 'Raro', 9.5, FALSE),
    ('Pretzel alemão', 'Raro', 10.0, FALSE),
    ('Pão integral multigrãos', 'Raro', 10.5, FALSE),
    ('Focaccia', 'Raro', 11.0, FALSE),
    ('Pão de nozes', 'Raro', 12.0, TRUE),
    ('Pão de azeitonas', 'Raro', 12.5, FALSE),
    ('Pão de alecrim', 'Raro', 11.5, FALSE),
    ('Pão de tomate seco', 'Raro', 13.0, FALSE),
    ('Pão de castanhas', 'Raro', 13.5, TRUE),
    ('Pão de cebola caramelizada', 'Raro', 14.0, FALSE),
    ('Pão de alho assado', 'Raro', 12.5, FALSE),
    ('Pão de ervas finas', 'Raro', 13.0, FALSE),
    ('Pão de queijo artesanal', 'Raro', 14.5, FALSE),
    ('Pão de abóbora com mel', 'Raro', 15.0, TRUE),
    ('Pão de batata com alecrim', 'Raro', 13.5, FALSE),
    ('Pão de grãos tostados', 'Raro', 14.0, FALSE),
    ('Pão de malte', 'Raro', 15.0, FALSE),
    ('Pão de centeio com nozes', 'Raro', 16.0, TRUE),
    ('Focaccia de alecrim e sal grosso', 'Raro', 16.5, TRUE);

-- ÉPICO

INSERT INTO receitas (nome, raridade, preco_base, receita_bloqueada)
VALUES
    ('Croissant', 'Épico', 18.0, FALSE),
    ('Baguete de fermentação longa', 'Épico', 20.0, FALSE),
    ('Sourdough', 'Épico', 22.0, FALSE),
    ('Panettone', 'Épico', 25.0, TRUE),
    ('Kouign-amann', 'Épico', 28.0, FALSE),
    ('Brioche folhado', 'Épico', 30.0, FALSE),
    ('Pain au chocolat', 'Épico', 32.0, FALSE),
    ('Cinnamon roll', 'Épico', 30.0, FALSE),
    ('Croissant de amêndoas', 'Épico', 34.0, FALSE),
    ('Pão de chocolate', 'Épico', 35.0, FALSE),
    ('Brioche de baunilha', 'Épico', 36.0, FALSE),
    ('Focaccia trufada', 'Épico', 40.0, FALSE),
    ('Pão de pistache', 'Épico', 42.0, FALSE),
    ('Croissant de pistache', 'Épico', 45.0, TRUE),
    ('Sourdough de azeitonas', 'Épico', 38.0, FALSE),
    ('Panettone de chocolate', 'Épico', 45.0, FALSE),
    ('Kouign-amann de maçã', 'Épico', 42.0, TRUE),
    ('Brioche de pistache', 'Épico', 48.0, FALSE),
    ('Pão de nozes caramelizadas', 'Épico', 44.0, FALSE),
    ('Pão de frutas vermelhas', 'Épico', 46.0, FALSE);

-- LENDA

INSERT INTO receitas (nome, raridade, preco_base)
VALUES
    ('Croissant Imperial', 'Lenda', 80.0),
    ('Baguete Real', 'Lenda', 90.0),
    ('Panettone Imperial', 'Lenda', 100.0),
    ('Brioche Real', 'Lenda', 110.0),
    ('Pão de Pistache Real', 'Lenda', 120.0),
    ('Sourdough Imperial', 'Lenda', 130.0),
    ('Kouign-amann Real', 'Lenda', 140.0),
    ('Pão Dourado', 'Lenda', 150.0);

-- MYSTHICO

INSERT INTO receitas (nome, raridade, preco_base)
VALUES
    ('Croissant De Nuvens', 'Mysthico', 240),
    ('Pão Celestial', 'Mysthico', 245),
    ('Brioche dos Astros', 'Mysthico', 250),
    ('Sourdough Ancestral', 'Mysthico', 268),
    ('Panettone Celestial', 'Mysthico', 270),
    ('Pão do Eclipse', 'Mysthico', 285),
    ('Pão da Aurora', 'Mysthico', 299),
    ('Massa Folhada ', 'Mysthico', 380);