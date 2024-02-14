import dotenv from 'dotenv';
import express from 'express';
import aws from 'aws-sdk';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const s3 = new aws.S3({
  accessKeyId: process.env.VITE_ACCESS_KEY,
  secretAccessKey: process.env.VITE_ACCESS_SECRET

});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No se ha adjuntado ningún archivo' });
  }

  const fileName = req.file.originalname;
  console.log(fileName);
  try {
    const params = {
      Bucket: process.env.VITE_BUKECT_NAME,
      Key: fileName, // Nombre que deseas asignar a la imagen en S3
      Body: req.file.buffer,
      ContentType: req.file.mimetype // Tipo de contenido de la imagen
    };

    await s3.upload(params).promise();
    res.json({ success: true, message: 'Imagen cargada exitosamente' });
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    res.status(500).json({ success: false, message: 'Error al cargar la imagen' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
