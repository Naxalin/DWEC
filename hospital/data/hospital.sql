CREATE DATABASE IF NOT EXISTS hospital;
USE hospital;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS especialidades;
CREATE TABLE especialidades (
  id          INT          NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO especialidades (nombre, descripcion) VALUES
  ('Cardiología',       'Diagnóstico y tratamiento de enfermedades del corazón'),
  ('Pediatría',         'Atención médica a niños y adolescentes'),
  ('Traumatología',     'Lesiones del aparato locomotor, huesos y articulaciones'),
  ('Neurología',        'Enfermedades del sistema nervioso central y periférico'),
  ('Dermatología',      'Diagnóstico y tratamiento de enfermedades de la piel'),
  ('Oncología',         'Detección y tratamiento del cáncer'),
  ('Ginecología',       'Salud reproductiva y sistema reproductor femenino'),
  ('Medicina Interna',  'Diagnóstico y tratamiento de enfermedades del adulto');

DROP TABLE IF EXISTS medicos;
CREATE TABLE medicos (
  id               INT          NOT NULL AUTO_INCREMENT,
  id_especialidad  INT          NOT NULL,
  nombre           VARCHAR(100) NOT NULL,
  apellidos        VARCHAR(100) NOT NULL,
  email            VARCHAR(150) NOT NULL UNIQUE,
  telefono         VARCHAR(20),
  estado           ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  PRIMARY KEY (id),
  CONSTRAINT fk_medico_especialidad FOREIGN KEY (id_especialidad)
    REFERENCES especialidades(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO medicos (id_especialidad, nombre, apellidos, email, telefono, estado) VALUES
  (1, 'Andrés',   'Martínez López',    'amartinez@hospital.es',  '612 001 001', 'Activo'),
  (1, 'Lucía',    'Fernández Ruiz',    'lfernandez@hospital.es', '612 001 002', 'Activo'),
  (2, 'Carlos',   'García Sánchez',    'cgarcia@hospital.es',    '612 001 003', 'Activo'),
  (2, 'Marta',    'Pérez Jiménez',     'mperez@hospital.es',     '612 001 004', 'Inactivo'),
  (3, 'Rafael',   'Torres Moreno',     'rtorres@hospital.es',    '612 001 005', 'Activo'),
  (4, 'Elena',    'Ramos Navarro',     'eramos@hospital.es',     '612 001 006', 'Activo'),
  (5, 'José',     'Molina Castro',     'jmolina@hospital.es',    '612 001 007', 'Activo'),
  (6, 'Patricia', 'Delgado Herrera',   'pdelgado@hospital.es',   '612 001 008', 'Activo'),
  (7, 'Miguel',   'Romero Vega',       'mromero@hospital.es',    '612 001 009', 'Inactivo'),
  (8, 'Sofía',    'Alonso Guerrero',   'salonso@hospital.es',    '612 001 010', 'Activo');

DROP TABLE IF EXISTS pacientes;
CREATE TABLE pacientes (
  id               INT          NOT NULL AUTO_INCREMENT,
  nombre           VARCHAR(100) NOT NULL,
  apellidos        VARCHAR(100) NOT NULL,
  email            VARCHAR(150) NOT NULL UNIQUE,
  telefono         VARCHAR(20),
  fecha_nacimiento DATE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO pacientes (nombre, apellidos, email, telefono, fecha_nacimiento) VALUES
  ('Laura',    'Suárez Blanco',     'laura.suarez@email.com',    '600 100 001', '1990-03-15'),
  ('Pablo',    'Ortega Domínguez',  'pablo.ortega@email.com',    '600 100 002', '1985-07-22'),
  ('Carmen',   'Iglesias Serrano',  'carmen.iglesias@email.com', '600 100 003', '1978-11-08'),
  ('Javier',   'Rubio Cano',        'javier.rubio@email.com',    '600 100 004', '1995-01-30'),
  ('Ana',      'Vargas Medina',     'ana.vargas@email.com',      '600 100 005', '2001-06-12'),
  ('Tomás',    'Fuentes Pascual',   'tomas.fuentes@email.com',   '600 100 006', '1968-09-25'),
  ('Isabel',   'Reyes Montoya',     'isabel.reyes@email.com',    '600 100 007', '1982-04-03'),
  ('Diego',    'Mora Gallego',      'diego.mora@email.com',      '600 100 008', '1973-12-19'),
  ('Natalia',  'Caballero León',    'natalia.caballero@email.com','600 100 009','2000-08-07'),
  ('Sergio',   'Prieto Campos',     'sergio.prieto@email.com',   '600 100 010', '1988-02-14'),
  ('Beatriz',  'Santos Esteban',    'beatriz.santos@email.com',  '600 100 011', '1993-10-28'),
  ('Hugo',     'Guerrero Nieto',    'hugo.guerrero@email.com',   '600 100 012', '1965-05-17');

DROP TABLE IF EXISTS citas;
CREATE TABLE citas (
  id           INT          NOT NULL AUTO_INCREMENT,
  id_medico    INT          NOT NULL,
  id_paciente  INT          NOT NULL,
  fecha_hora   DATETIME     NOT NULL,
  motivo       VARCHAR(255) NOT NULL,
  estado       ENUM('Pendiente','Completada','Cancelada') NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (id),
  CONSTRAINT fk_cita_medico   FOREIGN KEY (id_medico)   REFERENCES medicos(id)   ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_cita_paciente FOREIGN KEY (id_paciente) REFERENCES pacientes(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO citas (id_medico, id_paciente, fecha_hora, motivo, estado) VALUES
  (1,  1,  '2025-06-02 09:00:00', 'Revisión tensión arterial',         'Completada'),
  (1,  2,  '2025-06-03 10:30:00', 'Dolor en el pecho',                 'Completada'),
  (2,  3,  '2025-06-04 11:00:00', 'Control colesterol',                'Completada'),
  (3,  4,  '2025-06-05 08:30:00', 'Revisión anual pediátrica',         'Completada'),
  (3,  5,  '2025-06-06 09:00:00', 'Fiebre persistente',                'Cancelada'),
  (5,  6,  '2025-06-09 12:00:00', 'Dolor lumbar crónico',              'Completada'),
  (5,  7,  '2025-06-10 10:00:00', 'Fractura de muñeca seguimiento',    'Completada'),
  (6,  8,  '2025-06-11 09:30:00', 'Cefaleas frecuentes',               'Completada'),
  (6,  9,  '2025-06-12 11:30:00', 'Mareos y vértigos',                 'Cancelada'),
  (7,  10, '2025-06-13 08:00:00', 'Eccema en brazo derecho',           'Completada'),
  (8,  11, '2025-06-16 10:00:00', 'Seguimiento tratamiento oncológico','Completada'),
  (1,  12, '2025-06-17 09:00:00', 'Arritmia cardíaca',                 'Completada'),
  (2,  1,  '2025-06-18 11:00:00', 'Electrocardiograma de control',     'Completada'),
  (3,  2,  '2025-06-19 09:30:00', 'Vacuna anual',                      'Completada'),
  (4,  3,  '2025-07-01 10:00:00', 'Revisión ginecológica anual',       'Pendiente'),
  (5,  4,  '2025-07-02 09:00:00', 'Dolor rodilla derecha',             'Pendiente'),
  (6,  5,  '2025-07-03 11:00:00', 'Seguimiento migraña',               'Pendiente'),
  (7,  6,  '2025-07-04 08:30:00', 'Lunar sospechoso en espalda',       'Pendiente'),
  (1,  7,  '2025-07-07 10:30:00', 'Ecocardiograma',                    'Pendiente'),
  (10, 8,  '2025-07-08 09:00:00', 'Análisis de sangre completo',       'Pendiente');

SET FOREIGN_KEY_CHECKS = 1;