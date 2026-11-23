-- Esquema de la base de datos Jardín Online.
-- MySQL 8.0. No incluye datos personales ni contraseñas/hash de usuarios.
CREATE DATABASE IF NOT EXISTS jardin_online
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE jardin_online;

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  contrasena_hash VARCHAR(255) NOT NULL,
  rol ENUM('administrador','vendedor','cliente') NOT NULL,
  activo TINYINT(1) DEFAULT '1',
  PRIMARY KEY (id_usuario),
  UNIQUE KEY correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT '0',
  imagen VARCHAR(255) DEFAULT NULL,
  id_categoria INT DEFAULT NULL,
  PRIMARY KEY (id_producto),
  KEY id_categoria (id_categoria),
  CONSTRAINT productos_ibfk_1 FOREIGN KEY (id_categoria)
    REFERENCES categorias (id_categoria),
  CONSTRAINT productos_chk_1 CHECK (precio >= 0),
  CONSTRAINT productos_chk_2 CHECK (stock >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT NOT NULL AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  id_vendedor INT DEFAULT NULL,
  fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('pendiente','confirmado','entregado','cancelado')
    NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (id_pedido),
  KEY id_cliente (id_cliente),
  KEY id_vendedor (id_vendedor),
  CONSTRAINT pedidos_ibfk_1 FOREIGN KEY (id_cliente)
    REFERENCES usuarios (id_usuario),
  CONSTRAINT pedidos_ibfk_2 FOREIGN KEY (id_vendedor)
    REFERENCES usuarios (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS detalle_pedido (
  id_detalle INT NOT NULL AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_detalle),
  KEY id_pedido (id_pedido),
  KEY id_producto (id_producto),
  CONSTRAINT detalle_pedido_ibfk_1 FOREIGN KEY (id_pedido)
    REFERENCES pedidos (id_pedido),
  CONSTRAINT detalle_pedido_ibfk_2 FOREIGN KEY (id_producto)
    REFERENCES productos (id_producto),
  CONSTRAINT detalle_pedido_chk_1 CHECK (cantidad > 0),
  CONSTRAINT detalle_pedido_chk_2 CHECK (precio_unitario >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
