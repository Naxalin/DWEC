# 🏥 Hospital Clínico — Aplicación Full-Stack

Aplicación web full-stack para la gestión de un sistema hospitalario. Permite administrar médicos, pacientes, citas y valoraciones, integrando una base de datos relacional (MySQL) y una base de datos documental (MongoDB) en el mismo ecosistema.

---

## 📋 Descripción de la aplicación

El sistema permite a los usuarios del hospital gestionar de forma centralizada:

- **Médicos**: alta, edición, baja y consulta con filtros por especialidad y estado.
- **Pacientes**: consulta del historial completo de citas de cada paciente.
- **Citas**: gestión completa del ciclo de vida de una cita (Pendiente → Completada / Cancelada), con filtros por estado, médico y fecha.
- **Valoraciones**: gestión de opiniones de pacientes sobre sus médicos, almacenadas en MongoDB por su naturaleza flexible y semiestructurada. Permite marcarlas como anónimas y moderar su estado (Publicada / Pendiente / Ocultada).
- **Dashboard**: resumen estadístico en tiempo real con contadores de médicos activos, pacientes, citas de hoy, estados de citas y media de valoraciones.

La interfaz es una **SPA (Single Page Application)**: un único `index.html` cuyo contenido es reemplazado dinámicamente por módulos JavaScript que consumen la API REST del servidor.

---

## 🗄️ Diseño de la Base de Datos MySQL

### Diagrama Entidad-Relación


![alt text](image-3.png)

### Tablas y campos

#### `especialidades`
| Campo       | Tipo         | Restricciones |
|-------------|--------------|---------------|
| id          | INT          | PK, Auto-increment |
| nombre      | VARCHAR(100) | NOT NULL |
| descripcion | VARCHAR(255) | |

#### `medicos`
| Campo           | Tipo         | Restricciones |
|-----------------|--------------|---------------|
| id              | INT          | PK, Auto-increment |
| id_especialidad | INT          | FK → especialidades.id, NOT NULL |
| nombre          | VARCHAR(100) | NOT NULL |
| apellidos       | VARCHAR(100) | NOT NULL |
| email           | VARCHAR(150) | UNIQUE, NOT NULL |
| telefono        | VARCHAR(20)  | |
| estado          | ENUM         | 'Activo' / 'Inactivo', DEFAULT 'Activo' |

#### `pacientes`
| Campo           | Tipo         | Restricciones |
|-----------------|--------------|---------------|
| id              | INT          | PK, Auto-increment |
| nombre          | VARCHAR(100) | NOT NULL |
| apellidos       | VARCHAR(100) | NOT NULL |
| email           | VARCHAR(150) | UNIQUE, NOT NULL |
| telefono        | VARCHAR(20)  | |
| fecha_nacimiento| DATE         | |

#### `citas`
| Campo       | Tipo         | Restricciones |
|-------------|--------------|---------------|
| id          | INT          | PK, Auto-increment |
| id_medico   | INT          | FK → medicos.id, NOT NULL |
| id_paciente | INT          | FK → pacientes.id, NOT NULL |
| fecha_hora  | DATETIME     | NOT NULL |
| motivo      | VARCHAR(255) | NOT NULL |
| estado      | ENUM         | 'Pendiente' / 'Completada' / 'Cancelada' |

---



### Justificación del uso de NoSQL

Las valoraciones se guardan en MongoDB porque son datos más “libres”: pueden tener texto distinto cada vez, ser anónimas o cambiar con el tiempo. Como no necesitan estar tan controladas ni relacionadas con otras tablas, es más cómodo usar MongoDB y así no tener que tocar la base de datos principal cada vez que cambien.

### Estructura de valoraciones

```json
{
  "_id": "ObjectId (generado automáticamente por MongoDB)",
  "id_cita": 1,
  "id_paciente": 1,
  "id_medico": 1,
  "puntuacion": 5,
  "comentario": "El médico fue muy atento y explicó todo con claridad.",
  "anonima": false,
  "estado": "Publicada",
  "fecha_creacion": "2025-06-02T11:00:00.000Z"
}
```

| Campo          | Tipo    | Valores posibles |
|----------------|---------|-----------------|
| _id            | ObjectId| Generado por MongoDB |
| id_cita        | Number  | Referencia manual a `citas.id` en MySQL |
| id_paciente    | Number  | Referencia manual a `pacientes.id` en MySQL |
| id_medico      | Number  | Referencia manual a `medicos.id` en MySQL |
| puntuacion     | Number  | 1 – 5 |
| comentario     | String  | Texto libre |
| anonima        | Boolean | true / false |
| estado         | String  | 'Publicada' / 'Pendiente' / 'Ocultada' |
| fecha_creacion | ISODate | Fecha automática al crear |

---

## 📸 Capturas de pantalla de las bases de datos

> ⚠️ **Pendiente de completar**: añadir capturas desde MySQL Workbench (tablas `especialidades`, `medicos`, `pacientes`, `citas` con datos) y desde MongoDB Compass (colección `valoraciones` con documentos).


![MySQL Workbench](image-4.png)
![mango compass](image-2.png)

---

## 🗺️ Listado de rutas de la aplicación

### API REST — Backend (Express)

#### Dashboard
| Método | Ruta            | Descripción |
|--------|-----------------|-------------|
| GET    | /api/dashboard  | Estadísticas generales: contadores, últimas citas y media de valoraciones |

#### Especialidades
| Método | Ruta                  | Descripción |
|--------|-----------------------|-------------|
| GET    | /api/especialidades   | Listado de todas las especialidades |

#### Médicos
| Método | Ruta               | Descripción |
|--------|--------------------|-------------|
| GET    | /api/medicos       | Listado con filtros: `?especialidad=`, `?estado=`, `?buscar=` |
| GET    | /api/medicos/:id   | Ficha completa del médico con sus citas |
| POST   | /api/medicos       | Crear nuevo médico |
| PUT    | /api/medicos/:id   | Actualizar médico |
| DELETE | /api/medicos/:id   | Eliminar médico |

#### Citas
| Método | Ruta             | Descripción |
|--------|------------------|-------------|
| GET    | /api/citas       | Listado con filtros: `?estado=`, `?medico=`, `?fecha=` |
| GET    | /api/citas/:id   | Ficha completa de la cita con médico y paciente |
| POST   | /api/citas       | Crear nueva cita |
| PUT    | /api/citas/:id   | Actualizar cita |
| DELETE | /api/citas/:id   | Eliminar cita |

#### Pacientes
| Método | Ruta                | Descripción |
|--------|---------------------|-------------|
| GET    | /api/pacientes      | Listado de pacientes con buscador |
| GET    | /api/pacientes/:id  | Ficha del paciente con historial completo de citas |

#### Valoraciones (MongoDB)
| Método | Ruta                      | Descripción |
|--------|---------------------------|-------------|
| GET    | /api/valoraciones         | Listado con filtros: `?estado=`, `?medico=`, `?puntuacion=` |
| GET    | /api/valoraciones/:id     | Ficha completa de la valoración |
| POST   | /api/valoraciones         | Crear nueva valoración |
| PUT    | /api/valoraciones/:id     | Actualizar valoración |
| DELETE | /api/valoraciones/:id     | Eliminar valoración |

### SPA — Frontend (hash routing)

| Hash                          | Vista que se carga |
|-------------------------------|--------------------|
| `#/dashboard`                 | Dashboard con estadísticas |
| `#/medicos`                   | Listado de médicos + filtros |
| `#/medicos/nuevo`             | Formulario de alta de médico |
| `#/medicos/:id`               | Ficha del médico + sus citas |
| `#/medicos/editar/:id`        | Formulario de edición de médico |
| `#/citas`                     | Listado de citas + filtros |
| `#/citas/nuevo`               | Formulario de alta de cita |
| `#/citas/:id`                 | Ficha de la cita con médico y paciente |
| `#/citas/editar/:id`          | Formulario de edición de cita |
| `#/pacientes`                 | Listado de pacientes |
| `#/pacientes/:id`             | Ficha del paciente + historial de citas |
| `#/valoraciones`              | Listado de valoraciones + filtros |
| `#/valoraciones/nuevo`        | Formulario de alta de valoración |
| `#/valoraciones/:id`          | Ficha de la valoración |
| `#/valoraciones/editar/:id`   | Formulario de edición de valoración |

---

## 🧭 Navegación Contextual

La aplicación implementa dos flujos de navegación contextual entre entidades relacionadas:

**1. Desde la ficha de una cita** → se muestran tarjetas con los datos del médico y del paciente, cada una con un enlace directo a su ficha completa.

**2. Desde la ficha de un paciente** → se muestra el historial completo de sus citas, con enlace al médico de cada cita.

---

## 🔍 Filtros implementados

| Sección       | Filtros disponibles |
|---------------|---------------------|
| Médicos       | Especialidad + Estado + Buscador por nombre/email |
| Citas         | Estado + Médico + Fecha |
| Valoraciones  | Estado + Médico + Puntuación mínima |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Servidor | Node.js + Express.js |
| ORM (MySQL) | Sequelize |
| ODM (MongoDB) | Mongoose |
| Base de datos relacional | MySQL (Railway) |
| Base de datos documental | MongoDB Atlas |
| Frontend | HTML + CSS + JavaScript vanilla (SPA) |
| Despliegue | Vercel + GitHub |

---


### Variables de entorno (`.env`)

DB_HOST=hospital.cfim8i2qyeyo.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=hospital
 
MONGO_URI=mongodb+srv://gonzalo:gonzalo123@proyectohospital.vqn8nnu.mongodb.net/?appName=ProyectoHospital
PORT=3000

---

## 🌐 URL de la aplicación desplegada



---


ESTRUCTURA : 

hospital/
├── config/
│   ├── db.mysql.js          # Conexión Sequelize
│   └── db.mongo.js          # Conexión Mongoose
├── models/
│   ├── Especialidad.js      # Modelo Sequelize
│   ├── Medico.js            # Modelo Sequelize
│   ├── Paciente.js          # Modelo Sequelize
│   ├── Cita.js              
│   └── Valoracion.js       
├── controllers/
│   ├── dashboardController.js
│   ├── medicoController.js
│   ├── citaController.js
│   ├── pacienteController.js
│   └── valoracionController.js
├── routes/
│   ├── index.js
│   ├── medicos.js
│   ├── citas.js
│   ├── pacientes.js
│   └── valoraciones.js
├── public/
│   ├── index.html           # Único HTML — SPA
│   ├── css/style.css
│   └── js/
│       ├── app.js           # Router SPA + utilidades globales
│       ├── dashboard.js
│       ├── medicos.js
│       ├── medico-detalle.js
│       ├── medico-form.js
│       ├── citas.js
│       ├── cita-detalle.js
│       ├── cita-form.js
│       ├── pacientes.js
│       ├── paciente-detalle.js
│       ├── valoraciones.js
│       ├── valoracion-detalle.js
│       └── valoracion-form.js
├── data/
│   ├── hospital.sql         # Script MySQL con tablas e INSERTs
│   └── valoraciones.json    # Documentos MongoDB iniciales
├── .env
├── .gitignore
├── app.js                   # Servidor Express principal
├── package.json
└── README.md