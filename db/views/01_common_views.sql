-- Active Events View
CREATE VIEW eventos_ativos AS
SELECT 
    e.evento_id,
    e.nome,
    e.descricao,
    e.data_inicio,
    e.data_fim,
    l.nome as local,
    l.endereco,
    l.latitude,
    l.longitude
FROM eventos e
JOIN localizacoes l ON e.localizacao_id = l.localizacao_id
WHERE e.status = true
AND e.data_fim >= CURRENT_TIMESTAMP;

-- User Services View
CREATE VIEW usuario_servicos_ativos AS
SELECT 
    u.nome as usuario,
    s.nome as servico,
    us.status,
    us.data_inicio,
    us.data_conclusao
FROM usuarios_servicos us
JOIN usuarios u ON us.usuario_id = u.usuario_id
JOIN servicos s ON us.servico_id = s.servico_id
WHERE us.status != 'CANCELADO'; 