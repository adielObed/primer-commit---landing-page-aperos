import express from 'express';
import cors from 'cors';

const app = express();
const puerto = 3000;

app.use(cors());
// ¡NUEVO! 1. Le enseñamos a Express a leer paquetes en formato JSON
app.use(express.json()); 

// ¡NUEVO! 2. Sacamos el inventario afuera de las rutas para que funcione como una base de datos temporal
let aperos = [
  {
    id: 1, badge: 'NUEVO', badgeColor: '#d4af37', badgeTextColor: '#000',
    name: 'Sombrero Pelo de Guama', price: '$450.000', oldPrice: null,
    desc: 'Auténtico sombrero llanero fabricado en pelo de guama de primera calidad.',
    rating: 4.5, reviews: 24, category: 'Sombreros', img: '/img/sombrero.jpeg'
  },
  {
    id: 2, badge: null, badgeColor: null, badgeTextColor: null,
    name: 'Silla de Coleo Profesional', price: '$2.800.000', oldPrice: null,
    desc: 'Diseñada para la alta competencia. Fuste anatómico garantizado por 10 años.',
    rating: 5, reviews: 18, category: 'Sillas de Montar', img: '/img/silla.jpeg'
  }
  // (Nota: Dejé solo 2 para no hacer el código tan largo aquí, pero tú puedes dejar tus 6 productos completos)
];

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola! El servidor de Aperos Puro Coleo está funcionando 🐴🚀');
});

// Ruta para LEER los productos (GET)
app.get('/api/productos', (req, res) => {
  res.json(aperos);
});

// ¡NUEVO! 3. Ruta para GUARDAR un producto nuevo (POST)
app.post('/api/productos', (req, res) => {
  const nuevoProducto = req.body; // Aquí viene la información que mandó React (el nombre, precio, etc.)
  
  // Le agregamos un ID automático y un par de datos por defecto para que no se rompa el diseño
  nuevoProducto.id = aperos.length + 1;
  nuevoProducto.rating = 5;
  nuevoProducto.reviews = 1;
  nuevoProducto.img = '/img/correa.jpeg'; // Le ponemos una foto genérica por ahora

  // Guardamos el nuevo producto en nuestro inventario
  aperos.push(nuevoProducto);

  // Le avisamos a React que todo salió bien y le mandamos la lista actualizada
  res.json({ mensaje: 'Producto guardado con éxito', productos: aperos });
});

app.listen(puerto, () => {
  console.log(`Servidor backend corriendo en: http://localhost:${puerto}`);
});