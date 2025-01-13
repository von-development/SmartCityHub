# Projeto de Banco de Dados — SmartCity Hub (Aveiro)

Uma estrutura de banco de dados escalável e robusta para suportar serviços municipais integrados, eventos, mobilidade e suporte a diferentes perfis de usuários.

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Estrutura do Banco de Dados](#2-estrutura-do-banco-de-dados)
3. [Índices e Otimizações](#3-índices-e-otimizações)
4. [Considerações de Segurança](#4-considerações-de-segurança)
5. [Estratégia de Backup](#5-estratégia-de-backup)
6. [Monitoramento e Manutenção](#6-monitoramento-e-manutenção)

## 1. Visão Geral

### 1.1 Objetivos
- Centralizar dados municipais
- Suportar múltiplos serviços e integrações
- Garantir performance e escalabilidade
- Manter segurança e conformidade LGPD

### 1.2 Principais Funcionalidades
- Gestão de usuários e perfis
- Serviços municipais integrados
- Sistema de eventos
- Informações geográficas
- Histórico de interações

## 2. Estrutura do Banco de Dados

### 2.1 Tabelas Principais

#### usuarios
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| usuario_id | INT (PK) | Identificador único |
| nome | VARCHAR(255) | Nome completo |
| email | VARCHAR(255) | Email único |
| senha | VARCHAR(255) | Hash da senha |
| perfil | ENUM | Tipo de usuário |
| preferencias | JSON | Configurações pessoais |
| data_criacao | TIMESTAMP | Data de registro |
| data_atualizacao | TIMESTAMP | Última atualização |

#### categorias
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| categoria_id | INT (PK) | Identificador único |
| nome | VARCHAR(255) | Nome da categoria |
| descricao | TEXT | Detalhamento |
| status | BOOLEAN | Ativo/Inativo |

#### servicos
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| servico_id | INT (PK) | Identificador único |
| categoria_id | INT (FK) | Referência à categoria |
| nome | VARCHAR(255) | Nome do serviço |
| descricao | TEXT | Detalhamento |
| fornecedor | VARCHAR(255) | Responsável |
| tipo_acao | ENUM | Tipo de interação |
| link_externo | VARCHAR(255) | URL externa |
| status | BOOLEAN | Ativo/Inativo |
| data_criacao | TIMESTAMP | Criação |
| data_atualizacao | TIMESTAMP | Atualização |

#### eventos
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| evento_id | INT (PK) | Identificador único |
| nome | VARCHAR(255) | Nome do evento |
| tipo | ENUM | Categoria do evento |
| descricao | TEXT | Detalhamento |
| data_inicio | DATETIME | Início |
| data_fim | DATETIME | Término |
| localizacao_id | INT (FK) | Local |
| preco | DECIMAL(10,2) | Valor |
| gratuito | BOOLEAN | Se é gratuito |
| link_externo | VARCHAR(255) | Mais informações |
| status | BOOLEAN | Ativo/Inativo |
| data_criacao | TIMESTAMP | Criação |
| data_atualizacao | TIMESTAMP | Atualização |

#### localizacoes
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| localizacao_id | INT (PK) | Identificador único |
| nome | VARCHAR(255) | Nome do local |
| endereco | TEXT | Endereço completo |
| latitude | DECIMAL(10,8) | Coordenada |
| longitude | DECIMAL(11,8) | Coordenada |
| tipo | ENUM | Tipo do local |
| status | BOOLEAN | Ativo/Inativo |

### 2.2 Tabelas de Relacionamento

#### usuarios_eventos
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| usuario_id | INT (FK) | Referência ao usuário |
| evento_id | INT (FK) | Referência ao evento |
| tipo_participacao | ENUM | Interesse/Confirmado |
| data_registro | TIMESTAMP | Data do registro |

#### usuarios_servicos
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| usuario_id | INT (FK) | Referência ao usuário |
| servico_id | INT (FK) | Referência ao serviço |
| status | ENUM | Estado da interação |
| data_inicio | TIMESTAMP | Início do uso |
| data_conclusao | TIMESTAMP | Conclusão |

### 2.3 Enums e Tipos

#### Perfis de Usuário
- MORADOR
- TURISTA
- EMPREENDEDOR
- ADMINISTRADOR

#### Tipos de Evento
- CULTURAL
- ESPORTIVO
- EDUCACIONAL
- EMPRESARIAL
- SOCIAL

#### Status de Serviço
- PENDENTE
- EM_ANDAMENTO
- CONCLUIDO
- CANCELADO

## 3. Índices e Otimizações

### 3.1 Índices Primários
- Todas as PKs com auto_increment
- Índices clusterizados por ID

### 3.2 Índices Secundários
- usuarios(email) - UNIQUE
- eventos(data_inicio, status)
- localizacoes(latitude, longitude)
- servicos(categoria_id, status)

### 3.3 Particionamento
- Eventos por data
- Logs por mês
- Usuários por região

## 4. Considerações de Segurança

### 4.1 Proteção de Dados
- Criptografia de senhas (bcrypt)
- Mascaramento de dados sensíveis
- Auditoria de acessos

### 4.2 Controle de Acesso
- Roles específicas por tipo de usuário
- Logs de alterações
- Timeout de sessões

## 5. Estratégia de Backup

### 5.1 Rotinas
- Backup completo diário
- Backup incremental a cada 6 horas
- Retenção de 30 dias

### 5.2 Procedimentos
- Verificação de integridade
- Teste de restauração mensal
- Documentação de processos

## 6. Monitoramento e Manutenção

### 6.1 Métricas
- Tempo de resposta de queries
- Uso de recursos
- Taxa de crescimento

### 6.2 Manutenção
- Limpeza de dados obsoletos
- Otimização de índices
- Atualização de estatísticas

---
