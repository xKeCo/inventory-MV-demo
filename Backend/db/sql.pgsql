CREATE DATABASE mascotas_valle;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TABLAS 
CREATE TABLE usuario (
    user_id uuid DEFAULT uuid_generate_v4 () 
    username VARCHAR(30),
    email VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    type CHAR(1) NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE proveedor (
    prov_id uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR(50) NOT NULL,
    number BIGINT NOT NULL,
    other_contact VARCHAR(50) NULL,
    PRIMARY KEY(prov_id)
);

CREATE TABLE categoria (
    categ_id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description VARCHAR NULL,
    PRIMARY KEY(categ_id)
);

CREATE TABLE mascota (
    mascota_id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description VARCHAR NULL,
    PRIMARY KEY(mascota_id)
);

CREATE TABLE producto (
    prod_id VARCHAR(30),
    provid_fk uuid,
    name VARCHAR(50) NOT NULL,
    stock INT NOT NULL,
    peso NUMERIC(5,2) NULL,
    price INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    categid_fk uuid,
    mascotaid_fk uuid,
    PRIMARY KEY(prod_id),
    CONSTRAINT fk_proveedor FOREIGN KEY(provid_fk) REFERENCES proveedor(prov_id), 
    CONSTRAINT fk_categoria FOREIGN KEY(categid_fk) REFERENCES categoria(categ_id), 
    CONSTRAINT fk_mascota FOREIGN KEY(mascotaid_fk) REFERENCES mascota(mascota_id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON producto
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE pedido_details (
    pedidodetails_id uuid DEFAULT uuid_generate_v4 (),
    proveedor VARCHAR(50) NOT NULL,
    total INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NOW(),
    arrived_at TIMESTAMP,
    PRIMARY KEY(pedidodetails_id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON pedido_details
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE pedido_items (
    pedidoitems_id uuid DEFAULT uuid_generate_v4 (),
    detailsid_fk uuid,
    produid_fk VARCHAR(30),
    name VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NOW(),
    PRIMARY KEY(pedidoitems_id),
    CONSTRAINT fk_details FOREIGN KEY(detailsid_fk) REFERENCES pedido_details(pedidodetails_id),
    CONSTRAINT fk_producto FOREIGN KEY(produid_fk) REFERENCES producto(prod_id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON pedido_items
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();