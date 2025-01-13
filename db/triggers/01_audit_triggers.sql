-- Update Timestamp Triggers
CREATE TRIGGER update_usuarios_timestamp
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_servicos_timestamp
    BEFORE UPDATE ON servicos
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_eventos_timestamp
    BEFORE UPDATE ON eventos
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp(); 