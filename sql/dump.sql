CREATE TABLE IF NOT EXISTS area (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    color VARCHAR,
    poly POLYGON,
    hash VARCHAR
);
DROP INDEX IF EXISTS hash_index;
CREATE UNIQUE INDEX hash_index ON area (hash);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION is_in_poly(poly_hash TEXT, p POINT) RETURNS BOOLEAN AS $$
    BEGIN
        CASE
            WHEN EXISTS(
                    SELECT *
                    FROM area
                    WHERE p <@ poly AND hash = poly_hash
                )
            THEN RETURN TRUE;
            ELSE RETURN FALSE;
        END CASE;
    END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_hash_id() RETURNS TRIGGER AS $$
    BEGIN
        NEW.hash = encode(digest(NEW.id::text, 'sha1'), 'hex');
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS hash_update ON area;
CREATE TRIGGER hash_update BEFORE INSERT ON area
FOR EACH ROW EXECUTE FUNCTION insert_hash_id();

CREATE OR REPLACE FUNCTION update_data_by_hash() RETURNS TRIGGER AS $$
    BEGIN
        NEW.poly = (
            CASE
                WHEN NEW.poly::TEXT <> 'undefined' THEN NEW.poly
                ELSE OLD.poly
            END
        );
        NEW.name = (
            CASE
                WHEN NEW.name <> 'undefined' THEN NEW.name
                ELSE OLD.name
            END
        );
        NEW.color = (
            CASE
                WHEN NEW.color <> 'undefined' THEN NEW.color
                ELSE OLD.color
            END
        );

        RETURN NEW;
    END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS data_update ON area;
CREATE TRIGGER data_update BEFORE UPDATE ON area
FOR EACH ROW EXECUTE FUNCTION update_data_by_hash();
