create TABLE receitas (
    id_receita INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    raridade VARCHAR(15) NOT NULL,
    preco_base NUMERIC NOT NULL,
    receita_bloqueada BOOLEAN NOT NULL DEFAULT TRUE
);