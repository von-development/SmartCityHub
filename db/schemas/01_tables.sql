-- Main Tables
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil perfil_enum NOT NULL,
    preferencias JSONB DEFAULT '{}',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    status BOOLEAN DEFAULT true
);

CREATE TABLE servicos (
    servico_id SERIAL PRIMARY KEY,
    categoria_id INTEGER REFERENCES categorias(categoria_id),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    fornecedor VARCHAR(255),
    tipo_acao tipo_acao_enum,
    link_externo VARCHAR(255),
    status BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE localizacoes (
    localizacao_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    tipo tipo_local_enum,
    status BOOLEAN DEFAULT true
);

CREATE TABLE eventos (
    evento_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo tipo_evento_enum,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP,
    localizacao_id INTEGER REFERENCES localizacoes(localizacao_id),
    preco DECIMAL(10,2),
    gratuito BOOLEAN DEFAULT false,
    link_externo VARCHAR(255),
    status BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 