-- 1) Definición de tipos ENUM
CREATE TYPE seccion_enum AS ENUM (
  'Deportes',
  'Cultura',
  'Tecnología',
  'Historias',
  'Eventos'
);

CREATE TYPE estado_enum AS ENUM (
  'borrador',
  'revisión',
  'publicado',
  'archivado'
);

CREATE TYPE multimedia_tipo_enum AS ENUM (
  'imagen',
  'video',
  'documento'
);

CREATE TYPE relacion_tipo_enum AS ENUM (
  'portada',
  'galeria',
  'adjunto'
);


-- 2) Función genérica para actualizar updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
  RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 3) Tabla categorias
CREATE TABLE categorias (
  id_categoria SERIAL PRIMARY KEY,
  nombre       VARCHAR(50) NOT NULL UNIQUE,
  descripcion  TEXT,
  color        VARCHAR(7) DEFAULT '#3a7d44',  -- Verde FIME
  icono        VARCHAR(50),
  seccion      seccion_enum NOT NULL
);


-- 4) Tabla noticias
--    * Se añadió la columna id_autor, que faltaba en la versión MySQL original.
--    * LONGTEXT -> TEXT
CREATE TABLE noticias (
  id_noticia   SERIAL PRIMARY KEY,
  titulo       VARCHAR(255) NOT NULL,
  fecha        TIMESTAMP NOT NULL,
  id_categoria INT NOT NULL
    REFERENCES categorias(id_categoria),
  id_autor     INT NOT NULL
    REFERENCES usuarios(id_usuario),
  descripcion  TEXT NOT NULL,
  contenido    TEXT NOT NULL,
  vistas       INT DEFAULT 0,
  destacada    BOOLEAN DEFAULT FALSE,
  estado       estado_enum NOT NULL DEFAULT 'borrador',
  created_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para updated_at en noticias
CREATE TRIGGER noticias_update_timestamp
  BEFORE UPDATE ON noticias
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();


-- 5) Tabla multimedia
CREATE TABLE multimedia (
  id_media     SERIAL PRIMARY KEY,
  tipo         multimedia_tipo_enum NOT NULL,
  url          VARCHAR(255) NOT NULL,
  nombre_archivo VARCHAR(255) NOT NULL,
  descripcion  TEXT,
  id_usuario   INT NOT NULL
    REFERENCES usuarios(id_usuario),
  fecha_subida TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 6) Tabla noticia_multimedia (relación N-a-N)
CREATE TABLE noticia_multimedia (
  id_noticia   INT NOT NULL
    REFERENCES noticias(id_noticia) ON DELETE CASCADE,
  id_media     INT NOT NULL
    REFERENCES multimedia(id_media) ON DELETE CASCADE,
  tipo_relacion relacion_tipo_enum NOT NULL,
  orden        INT DEFAULT 0,
  PRIMARY KEY (id_noticia, id_media)
);


-- 7) Tabla eventos
CREATE TABLE eventos (
  id_evento    SERIAL PRIMARY KEY,
  titulo       VARCHAR(255) NOT NULL,
  descripcion  TEXT NOT NULL,
  id_categoria INT
    REFERENCES categorias(id_categoria),
  fecha_inicio TIMESTAMP NOT NULL,
  fecha_fin    TIMESTAMP NOT NULL,
  ubicacion    VARCHAR(255) NOT NULL,
  imagen_portada INT
    REFERENCES multimedia(id_media),
  id_organizador INT
    REFERENCES usuarios(id_usuario),
  created_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para updated_at en eventos
CREATE TRIGGER eventos_update_timestamp
  BEFORE UPDATE ON eventos
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();
