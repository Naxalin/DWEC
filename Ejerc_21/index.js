require('dotenv').config()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const mysql = require('mysql2')
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')

const app = express()
app.use(express.static('public'))

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const s3 = new S3Client({
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const upload = multer({ storage: multer.memoryStorage() })

app.post('/subir', upload.single('imagen'), async (req, res) => {
    const { nombre, apellidos, localidad } = req.body
    const extension = path.extname(req.file.originalname)
    const nombreUUID = uuidv4() + extension

    await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: nombreUUID,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }))

    db.query(
        'INSERT INTO alumno (nombre, apellidos, localidad, imagen) VALUES (?, ?, ?, ?)',
        [nombre, apellidos, localidad, nombreUUID],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            res.json({ ok: true })
        }
    )
})

app.get('/imagenes', (req, res) => {
    db.query('SELECT * FROM alumno', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message })

        const alumnos = rows.map(alumno => ({
            ...alumno,
            imagen: `https://${process.env.AWS_BUCKET_NAME}.s3.filebase.com/${alumno.imagen}`
        }))

        res.json(alumnos)
    })
})

app.delete('/alumno/:id', async (req, res) => {
    const { id } = req.params

    db.query('SELECT imagen FROM alumno WHERE id = ?', [id], async (err, rows) => {
        if (err) return res.status(500).json({ error: err.message })

        const nombreImagen = rows[0].imagen

        await s3.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: nombreImagen
        }))

        db.query('DELETE FROM alumno WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message })
            res.json({ ok: true })
        })
    })
})

app.listen(3000, () => console.log('Servidor en puerto 3000'))