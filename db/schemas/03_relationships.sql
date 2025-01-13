-- Relationship Tables
CREATE TABLE usuarios_eventos (
    usuario_id INTEGER REFERENCES usuarios(usuario_id),
    evento_id INTEGER REFERENCES eventos(evento_id),
    tipo_participacao VARCHAR(50),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, evento_id)
);

CREATE TABLE usuarios_servicos (
    usuario_id INTEGER REFERENCES usuarios(usuario_id),
    servico_id INTEGER REFERENCES servicos(servico_id),
    status status_servico_enum,
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    PRIMARY KEY (usuario_id, servico_id)
); 