CREATE DATABASE IF NOT EXISTS hospital_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hospital_db;

CREATE TABLE especialidades (
  id          INT          NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE medicos (
  id              INT          NOT NULL AUTO_INCREMENT,
  id_especialidad INT          NOT NULL,
  nombre          VARCHAR(100) NOT NULL,
  apellidos       VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  telefono        VARCHAR(20),
  num_colegiado   VARCHAR(50)  NOT NULL UNIQUE,
  PRIMARY KEY (id),
  CONSTRAINT fk_medico_especialidad FOREIGN KEY (id_especialidad)
    REFERENCES especialidades (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);


CREATE TABLE pacientes (
  id                  INT          NOT NULL AUTO_INCREMENT,
  nombre              VARCHAR(100) NOT NULL,
  apellidos           VARCHAR(100) NOT NULL,
  fecha_nacimiento    DATE         NOT NULL,
  dni                 VARCHAR(20)  NOT NULL UNIQUE,
  num_seguridad_social VARCHAR(20) NOT NULL UNIQUE,
  email               VARCHAR(150),
  telefono            VARCHAR(20),
  direccion           VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE citas (
  id           INT         NOT NULL AUTO_INCREMENT,
  id_medico    INT         NOT NULL,
  id_paciente  INT         NOT NULL,
  fecha_hora   DATETIME    NOT NULL,
  motivo       VARCHAR(255) NOT NULL,
  estado       ENUM('Pendiente','Confirmada','Realizada','Cancelada') NOT NULL DEFAULT 'Pendiente',
  observaciones TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_cita_medico   FOREIGN KEY (id_medico)   REFERENCES medicos   (id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_cita_paciente FOREIGN KEY (id_paciente) REFERENCES pacientes (id) ON UPDATE CASCADE ON DELETE RESTRICT
);


INSERT INTO especialidades (nombre, descripcion) VALUES
  ('Cardiología',     'Diagnóstico y tratamiento de enfermedades del corazón'),
  ('Traumatología',   'Lesiones del aparato locomotor, huesos y articulaciones'),
  ('Pediatría',       'Atención médica a niños y adolescentes'),
  ('Dermatología',    'Enfermedades de la piel, cabello y uñas'),
  ('Neurología',      'Trastornos del sistema nervioso central y periférico'),
  ('Medicina General','Atención primaria y seguimiento del paciente');


INSERT INTO medicos (id_especialidad, nombre, apellidos, email, telefono, num_colegiado) VALUES
  (1, 'Carlos',   'García López',    'c.garcia@hospital.es',    '612000001', 'COL-28001'),
  (1, 'Laura',    'Martínez Ruiz',   'l.martinez@hospital.es',  '612000002', 'COL-28002'),
  (2, 'Alejandro','Fernández Mora',  'a.fernandez@hospital.es', '612000003', 'COL-28003'),
  (3, 'Sofía',    'Ramírez Vega',    's.ramirez@hospital.es',   '612000004', 'COL-28004'),
  (4, 'Javier',   'Torres Blanco',   'j.torres@hospital.es',    '612000005', 'COL-28005'),
  (5, 'Elena',    'Sánchez Gil',     'e.sanchez@hospital.es',   '612000006', 'COL-28006'),
  (6, 'Miguel',   'Díaz Hernández',  'm.diaz@hospital.es',      '612000007', 'COL-28007');


INSERT INTO pacientes (nombre, apellidos, fecha_nacimiento, dni, num_seguridad_social, email, telefono, direccion) VALUES
  ('Ana',      'López Martínez',  '1985-04-12', '12345678A', 'SS-001-ANA',  'ana.lopez@email.es',    '600100001', 'Calle Mayor 1, Madrid'),
  ('Pedro',    'Gómez Ruiz',      '1972-09-23', '23456789B', 'SS-002-PED',  'pedro.gomez@email.es',  '600100002', 'Av. Libertad 22, Sevilla'),
  ('María',    'Fernández Alba',  '1990-01-30', '34567890C', 'SS-003-MAR',  'maria.f@email.es',      '600100003', 'Calle Real 5, Valencia'),
  ('Luis',     'Sánchez Vega',    '1965-11-08', '45678901D', 'SS-004-LUI',  'luis.sv@email.es',      '600100004', 'Plaza España 3, Bilbao'),
  ('Carmen',   'Torres Díaz',     '2000-06-15', '56789012E', 'SS-005-CAR',  'carmen.td@email.es',    '600100005', 'Calle Nueva 10, Zaragoza'),
  ('Jorge',    'Ramírez Peña',    '1978-03-20', '67890123F', 'SS-006-JOR',  'jorge.rp@email.es',     '600100006', 'Av. Constitución 7, Málaga'),
  ('Isabel',   'Moreno Castro',   '1955-12-01', '78901234G', 'SS-007-ISA',  'isabel.mc@email.es',    '600100007', 'Calle Sol 14, Alicante'),
  ('Rubén',    'Jiménez Ortiz',   '1995-07-19', '89012345H', 'SS-008-RUB',  'ruben.jo@email.es',     '600100008', 'Paseo Colón 2, Córdoba');


INSERT INTO citas (id_medico, id_paciente, fecha_hora, motivo, estado, observaciones) VALUES
  (1, 1, '2025-05-05 09:00:00', 'Revisión anual cardiológica',         'Confirmada', NULL),
  (1, 2, '2025-05-05 09:30:00', 'Dolor en el pecho ocasional',         'Pendiente',  NULL),
  (2, 3, '2025-05-06 10:00:00', 'Control de arritmia',                 'Confirmada', 'Traer último ECG'),
  (3, 4, '2025-05-07 11:00:00', 'Dolor rodilla derecha tras caída',    'Realizada',  'Se prescribe fisioterapia'),
  (3, 5, '2025-05-07 11:30:00', 'Revisión postoperatoria columna',     'Realizada',  'Evolución favorable'),
  (4, 6, '2025-05-08 09:00:00', 'Fiebre persistente en menor',         'Confirmada', NULL),
  (5, 7, '2025-05-09 12:00:00', 'Manchas en la piel brazo izquierdo',  'Pendiente',  NULL),
  (6, 8, '2025-05-10 10:30:00', 'Cefaleas frecuentes y mareos',        'Confirmada', 'Pedir resonancia magnética'),
  (7, 1, '2025-05-12 08:30:00', 'Revisión tensión arterial',           'Pendiente',  NULL),
  (1, 7, '2025-05-13 09:00:00', 'Segunda opinión cardíaca',            'Cancelada',  'Paciente no se presentó'),
  (2, 8, '2025-05-14 10:00:00', 'Holter 24 horas — entrega resultados','Realizada',  'Resultados dentro de la normalidad'),
  (4, 3, '2025-05-15 11:00:00', 'Esguince tobillo derecho',            'Confirmada', NULL);