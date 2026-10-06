/* =====================================================================
   DATOS DE LA TIENDA: aquí editas productos, tipos de producto y contacto
   ===================================================================== */

const TIENDA = {
  nombre: 'ANTHE 《 Joyería Artesanal y Bisutería',
  nombreCorto: 'Anthe Shop',
  correo: 'anthe.joyeria.bisuteria@gmail.cl',
  telefono: '+56 9 8667 1499',
  whatsapp: '56986671499',   // solo números y con código de país (Chile: 56)
  instagram: 'https://www.instagram.com/anthebisuteria/',
  tiktok: 'https://www.tiktok.com/@anthebisuteria', // enlace TikTok
  facebook: '#'
};

/* Tipos de producto: 'clave': 'Nombre que se ve'.
   Los tipos que no tengan productos no aparecen en los filtros ni en el menú. */
const CATEGORIAS = {
  pulseras: 'Pulseras',
  colgantes: 'Colgantes',
  aros: 'Aros',
  collares: 'Collares',
  anillos: 'Anillos'
};

/* Un producto por línea:
     id          número único. Su página es producto.html?id=NUMERO
                 (los productos nuevos van al final, con el número siguiente)
     nombre      como se ve en la tienda
     categoria   una clave de CATEGORIAS
     precio      número, sin $ ni puntos
     img         nombre del archivo dentro de la carpeta assets/
     nuevo       true = aparece en la página "Nuevos"
     popular     true = aparece en la página "Populares"
     elegido     (opcional) true = sale primero en "Nuestros elegidos"
     precioAnterior (opcional) el precio antes del descuento; con eso el producto
                 queda en "Promociones" (ej: precio: 3990, precioAnterior: 4990)
     descripcion (opcional) texto que se ve en la página del producto
 
   OJO: "nuevo" y "popular" de abajo son de ejemplo (nuevos: 36 al 43,
   populares: 1 al 8). Cámbialos según corresponda. */const PRODUCTOS = [
  { id: 1, nombre: 'Pulsera 1', categoria: 'pulseras', precio: 4990, img: 'pulsera1.webp', nuevo: false, popular: true },
  { id: 2, nombre: 'Pulsera 2', categoria: 'pulseras', precio: 4990, img: 'pulsera2.webp', nuevo: false, popular: true },
  { id: 3, nombre: 'Pulsera 3', categoria: 'pulseras', precio: 4990, img: 'pulsera3.webp', nuevo: false, popular: true },
  { id: 4, nombre: 'Pulsera 4', categoria: 'pulseras', precio: 4990, img: 'pulsera4.webp', nuevo: false, popular: true },
  { id: 5, nombre: 'Pulsera 5', categoria: 'pulseras', precio: 4990, img: 'pulsera5.webp', nuevo: false, popular: true },
  { id: 6, nombre: 'Pulsera 6', categoria: 'pulseras', precio: 4990, img: 'pulsera6.webp', nuevo: false, popular: true },
  { id: 7, nombre: 'Pulsera 7', categoria: 'pulseras', precio: 4990, img: 'pulsera7.webp', nuevo: false, popular: true },
  { id: 8, nombre: 'Pulsera 8', categoria: 'pulseras', precio: 4990, img: 'pulsera8.webp', nuevo: false, popular: true },
  { id: 9, nombre: 'Pulsera 9', categoria: 'pulseras', precio: 4990, img: 'pulsera9.webp', nuevo: false, popular: false },
  { id: 10, nombre: 'Pulsera 10', categoria: 'pulseras', precio: 4990, img: 'pulsera10.webp', nuevo: false, popular: false },
  { id: 11, nombre: 'Pulsera 11', categoria: 'pulseras', precio: 4990, img: 'pulsera11.webp', nuevo: false, popular: false },
  { id: 12, nombre: 'Pulsera 12', categoria: 'pulseras', precio: 4990, img: 'pulsera12.webp', nuevo: false, popular: false },
  { id: 13, nombre: 'Pulsera 13', categoria: 'pulseras', precio: 4990, img: 'pulsera13.webp', nuevo: false, popular: false },
  { id: 14, nombre: 'Pulsera 14', categoria: 'pulseras', precio: 4990, img: 'pulsera14.webp', nuevo: false, popular: false },
  { id: 15, nombre: 'Pulsera 15', categoria: 'pulseras', precio: 4990, img: 'pulsera15.webp', nuevo: false, popular: false },
  { id: 16, nombre: 'Pulsera 16', categoria: 'pulseras', precio: 4990, img: 'pulsera16.webp', nuevo: false, popular: false },
  { id: 17, nombre: 'Pulsera 17', categoria: 'pulseras', precio: 4990, img: 'pulsera17.webp', nuevo: false, popular: false },
  { id: 18, nombre: 'Pulsera 18', categoria: 'pulseras', precio: 4990, img: 'pulsera18.webp', nuevo: false, popular: false },
  { id: 19, nombre: 'Pulsera 19', categoria: 'pulseras', precio: 4990, img: 'pulsera19.webp', nuevo: false, popular: false },
  { id: 20, nombre: 'Pulsera 20', categoria: 'pulseras', precio: 4990, img: 'pulsera20.webp', nuevo: false, popular: false },
  { id: 21, nombre: 'Pulsera 21', categoria: 'pulseras', precio: 4990, img: 'pulsera21.webp', nuevo: false, popular: false },
  { id: 22, nombre: 'Pulsera 22', categoria: 'pulseras', precio: 4990, img: 'pulsera22.webp', nuevo: false, popular: false },
  { id: 23, nombre: 'Pulsera 23', categoria: 'pulseras', precio: 4990, img: 'pulsera23.webp', nuevo: false, popular: false },
  { id: 24, nombre: 'Pulsera 24', categoria: 'pulseras', precio: 4990, img: 'pulsera24.webp', nuevo: false, popular: false },
  { id: 25, nombre: 'Pulsera 25', categoria: 'pulseras', precio: 4990, img: 'pulsera25.webp', nuevo: false, popular: false },
  { id: 26, nombre: 'Pulsera 26', categoria: 'pulseras', precio: 4990, img: 'pulsera26.webp', nuevo: false, popular: false },
  { id: 27, nombre: 'Pulsera 27', categoria: 'pulseras', precio: 4990, img: 'pulsera27.webp', nuevo: false, popular: false },
  { id: 28, nombre: 'Pulsera 28', categoria: 'pulseras', precio: 4990, img: 'pulsera28.webp', nuevo: false, popular: false },
  { id: 29, nombre: 'Pulsera 29', categoria: 'pulseras', precio: 4990, img: 'pulsera29.webp', nuevo: false, popular: false },
  { id: 30, nombre: 'Pulsera 30', categoria: 'pulseras', precio: 4990, img: 'pulsera30.webp', nuevo: false, popular: false },
  { id: 31, nombre: 'Pulsera 31', categoria: 'pulseras', precio: 4990, img: 'pulsera31.webp', nuevo: false, popular: false },
  { id: 32, nombre: 'Pulsera 32', categoria: 'pulseras', precio: 4990, img: 'pulsera32.webp', nuevo: false, popular: false },
  { id: 33, nombre: 'Pulsera 33', categoria: 'pulseras', precio: 4990, img: 'pulsera33.webp', nuevo: false, popular: false },
  { id: 34, nombre: 'Pulsera 34', categoria: 'pulseras', precio: 4990, img: 'pulsera34.webp', nuevo: false, popular: false },
  { id: 35, nombre: 'Pulsera 35', categoria: 'pulseras', precio: 4990, img: 'pulsera35.webp', nuevo: false, popular: false },
  { id: 36, nombre: 'Pulsera 36', categoria: 'pulseras', precio: 4990, img: 'pulsera36.webp', nuevo: true, popular: false },
  { id: 37, nombre: 'Pulsera 37', categoria: 'pulseras', precio: 4990, img: 'pulsera37.webp', nuevo: true, popular: false },
  { id: 38, nombre: 'Pulsera 38', categoria: 'pulseras', precio: 4990, img: 'pulsera38.webp', nuevo: true, popular: false },
  { id: 39, nombre: 'Pulsera 39', categoria: 'pulseras', precio: 4990, img: 'pulsera39.webp', nuevo: true, popular: false },
  { id: 40, nombre: 'Pulsera 40', categoria: 'pulseras', precio: 4990, img: 'pulsera40.webp', nuevo: true, popular: false },
  { id: 41, nombre: 'Pulsera 41', categoria: 'pulseras', precio: 4990, img: 'pulsera41.webp', nuevo: true, popular: false },
  { id: 42, nombre: 'Pulsera 42', categoria: 'pulseras', precio: 4990, img: 'pulsera42.webp', nuevo: true, popular: false },
  { id: 43, nombre: 'Pulsera 43', categoria: 'pulseras', precio: 4990, img: 'pulsera43.webp', nuevo: true, popular: false }
];
