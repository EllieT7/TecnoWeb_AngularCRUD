-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-11-14 03:26:47.815

-- tables
-- Table: artista
CREATE TABLE artista (
    id_artista int AUTO_INCREMENT NOT NULL,
    nombre varchar(125) NOT NULL,
    descripcion varchar(500) NOT NULL,
    img varchar(255) NOT NULL,
    CONSTRAINT artista_pk PRIMARY KEY (id_artista)
);

-- Table: producto
CREATE TABLE producto (
    id_producto int AUTO_INCREMENT NOT NULL,
    nombre varchar(255) NOT NULL,
    descripcion varchar(1000) NOT NULL,
    precio decimal(10,2) NOT NULL,
    img varchar(255) NOT NULL,
    artista_id_artista int NOT NULL,
    tipo_producto_id_tp int NOT NULL,
    CONSTRAINT producto_pk PRIMARY KEY (id_producto)
);

-- Table: tipo_producto
CREATE TABLE tipo_producto (
    id_tp int AUTO_INCREMENT NOT NULL,
    descripcion varchar(125) NOT NULL,
    CONSTRAINT tipo_producto_pk PRIMARY KEY (id_tp)
);

-- Table: venta
CREATE TABLE venta (
    id_venta int AUTO_INCREMENT NOT NULL,
    total decimal(10,2) NOT NULL,
    ci varchar(125) NOT NULL,
    nombre_cliente varchar(255) NOT NULL,
    email varchar(125) NOT NULL,
    telefono varchar(125) NOT NULL,
    CONSTRAINT venta_pk PRIMARY KEY (id_venta)
);

-- Table: venta_producto
CREATE TABLE venta_producto (
    id_vp int AUTO_INCREMENT NOT NULL,
    cantidad int NOT NULL,
    producto_id_producto int NOT NULL,
    venta_id_venta int NOT NULL,
    CONSTRAINT venta_producto_pk PRIMARY KEY (id_vp)
);

-- foreign keys
-- Reference: producto_artista (table: producto)
ALTER TABLE producto ADD CONSTRAINT producto_artista FOREIGN KEY producto_artista (artista_id_artista)
    REFERENCES artista (id_artista);

-- Reference: producto_tipo_producto (table: producto)
ALTER TABLE producto ADD CONSTRAINT producto_tipo_producto FOREIGN KEY producto_tipo_producto (tipo_producto_id_tp)
    REFERENCES tipo_producto (id_tp);

-- Reference: venta_producto_producto (table: venta_producto)
ALTER TABLE venta_producto ADD CONSTRAINT venta_producto_producto FOREIGN KEY venta_producto_producto (producto_id_producto)
    REFERENCES producto (id_producto);

-- Reference: venta_producto_venta (table: venta_producto)
ALTER TABLE venta_producto ADD CONSTRAINT venta_producto_venta FOREIGN KEY venta_producto_venta (venta_id_venta)
    REFERENCES venta (id_venta);

-- End of file.

