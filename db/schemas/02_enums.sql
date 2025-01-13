-- Enums
CREATE TYPE perfil_enum AS ENUM (
    'MORADOR',
    'TURISTA',
    'EMPREENDEDOR',
    'ADMINISTRADOR',
    'ESTUDANTE',
    'IDOSO',
    'COMERCIANTE',
    'FUNCIONARIO_PUBLICO'
);

CREATE TYPE tipo_evento_enum AS ENUM (
    'CULTURAL',
    'ESPORTIVO',
    'EDUCACIONAL',
    'EMPRESARIAL',
    'SOCIAL',
    'GASTRONOMICO',
    'ARTISTICO',
    'TECNOLOGICO',
    'AMBIENTAL',
    'RELIGIOSO',
    'ACADEMICO',
    'MUNICIPAL'
);

CREATE TYPE status_servico_enum AS ENUM (
    'PENDENTE',
    'EM_ANDAMENTO',
    'CONCLUIDO',
    'CANCELADO',
    'AGUARDANDO_DOCUMENTACAO',
    'EM_ANALISE',
    'APROVADO',
    'REJEITADO'
);

CREATE TYPE tipo_local_enum AS ENUM (
    'PONTO_TURISTICO',
    'SERVICO_PUBLICO',
    'EVENTO',
    'COMERCIAL',
    'EDUCACIONAL',
    'SAUDE',
    'LAZER',
    'CULTURAL',
    'RELIGIOSO',
    'ESPORTIVO',
    'TRANSPORTE',
    'GOVERNAMENTAL',
    'PARQUE',
    'PRAIA',
    'RESTAURANTE',
    'HOTEL'
);

CREATE TYPE tipo_acao_enum AS ENUM (
    'CONSULTAR',
    'CADASTRAR',
    'AGENDAR',
    'SOLICITAR',
    'AVALIAR',
    'DENUNCIAR',
    'COMPARTILHAR',
    'FAVORITAR',
    'COMENTAR',
    'RESERVAR',
    'PAGAR',
    'CANCELAR'
);

-- Participation Types
CREATE TYPE tipo_participacao_enum AS ENUM (
    'INTERESSADO',
    'CONFIRMADO',
    'CANCELADO',
    'LISTA_ESPERA',
    'PRESENTE',
    'ORGANIZADOR'
);

-- Weather Conditions
CREATE TYPE condicao_clima_enum AS ENUM (
    'ENSOLARADO',
    'NUBLADO',
    'CHUVOSO',
    'TEMPESTADE',
    'PARCIALMENTE_NUBLADO',
    'VENTOSO'
);

-- Transport Types
CREATE TYPE tipo_transporte_enum AS ENUM (
    'ONIBUS',
    'BICICLETA',
    'TREM',
    'TAXI',
    'BARCO',
    'PATINETE',
    'A_PE'
);

-- Service Categories
CREATE TYPE categoria_servico_enum AS ENUM (
    'DOCUMENTACAO',
    'URBANISMO',
    'SAUDE',
    'EDUCACAO',
    'TURISMO',
    'TRANSPORTE',
    'CULTURA',
    'ESPORTE',
    'ASSISTENCIA_SOCIAL',
    'MEIO_AMBIENTE',
    'SEGURANCA',
    'FINANCEIRO'
);

-- Notification Types
CREATE TYPE tipo_notificacao_enum AS ENUM (
    'EVENTO',
    'SERVICO',
    'ALERTA',
    'INFORMATIVO',
    'ATUALIZACAO',
    'CONFIRMACAO',
    'CANCELAMENTO',
    'LEMBRETE'
); 