-- Initial Categories
INSERT INTO categorias (nome, descricao) VALUES
('Turismo', 'Serviços e informações turísticas'),
('Documentos', 'Serviços de documentação'),
('Eventos', 'Eventos culturais e sociais'),
('Urbanismo', 'Serviços de urbanismo e obras');

-- Initial Services
INSERT INTO servicos (categoria_id, nome, descricao, tipo_acao) VALUES
(1, 'Guia Turístico', 'Informações turísticas da cidade', 'CONSULTAR'),
(2, 'Certidão Online', 'Emissão de certidões', 'SOLICITAR'),
(3, 'Agenda Cultural', 'Eventos culturais da cidade', 'CONSULTAR'),
(4, 'Alvará de Obras', 'Solicitação de alvará', 'CADASTRAR'); 