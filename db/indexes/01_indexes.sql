-- Performance Indexes
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_eventos_data ON eventos(data_inicio, status);
CREATE INDEX idx_localizacoes_coords ON localizacoes(latitude, longitude);
CREATE INDEX idx_servicos_categoria ON servicos(categoria_id, status);

-- Full Text Search
CREATE INDEX idx_eventos_busca ON eventos 
USING gin(to_tsvector('portuguese', nome || ' ' || COALESCE(descricao, '')));

CREATE INDEX idx_servicos_busca ON servicos 
USING gin(to_tsvector('portuguese', nome || ' ' || COALESCE(descricao, ''))); 