// Cargar o inicializar usuarios
function cargarUsuarios() {
  const datos = localStorage.getItem('usuarios');
  return datos ? JSON.parse(datos) : [
    { username: 'admin', password: '123456', role: 'admin' },
    { username: 'cliente1', password: '1234', role: 'cliente' }
  ];
}
let users = cargarUsuarios();
function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(users));
}

// Alternar formularios
function toggleForms() {
  document.getElementById('loginForm').classList.toggle('hidden');
  document.getElementById('signupForm').classList.toggle('hidden');
}

// Iniciar sesión
function login() {
  const username = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();
  const role = document.getElementById('loginRole').value;

  const user = users.find(u => u.username === username && u.password === password && u.role === role);

  if (user) {
    alert(`Bienvenido, ${username}`);
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('productSection').classList.remove('hidden');
    mostrarProductosAlIniciar(); // <-- Agrega esta línea
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}


// Registrar nuevo usuario
function signup() {
  const newUser = document.getElementById('newUser').value.trim();
  const newPass = document.getElementById('newPass').value.trim();
  const newRole = document.getElementById('newRole').value;

  if (!newUser || !newPass) {
    alert('Completa todos los campos');
    return;
  }

  const existe = users.some(u => u.username === newUser);
  if (existe) {
    alert('El nombre de usuario ya está registrado.');
    return;
  }

  users.push({ username: newUser, password: newPass, role: newRole });
  guardarUsuarios();

  alert(`Cuenta creada como ${newRole}. Ahora puedes iniciar sesión.`);
  toggleForms();
}

// Lista de productos
const productos = [
  // Laptops
  {nombre: 'Laptop Gamer ASUS ROG',categoria: 'Laptop',imagen: 'https://tiendainfotech.com/wp-content/uploads/2024/07/1-121.jpg',imagenes: ['https://i.ytimg.com/vi/NYiSikcWlWQ/maxresdefault.jpg','https://www.asus.com/media/Odin/Websites/pe/ProductLine/20240125025512.png' ],descripcion: 'La ASUS ROG es una laptop gamer de alto rendimiento, diseñada para los jugadores más exigentes. Cuenta con potentes gráficos, pantalla de alta tasa de refresco y un sistema de refrigeración avanzado para largas sesiones de juego.'},
  { nombre: 'Laptop HP Ryzen 5', categoria: 'Laptop', imagen: 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/5650/PMP20000859200/full_image-1.png',imagenes: ["https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/5650/PMP20000859200/full_image-1.png","https://http2.mlstatic.com/D_NQ_NP_2X_688225-MPE76419349276_052024-F-laptop-hp-ryzen-5-7520u-8gb-256gb-156-fhd-ssd.webp","https://http2.mlstatic.com/D_NQ_NP_2X_641559-MPE76614509135_052024-F-laptop-hp-ryzen-5-7520u-8gb-256gb-156-fhd-ssd.webp"] ,descripcion: 'Una laptop confiable y eficiente con procesador AMD Ryzen 5, ideal para estudiantes y profesionales que buscan rendimiento sin comprometer el presupuesto.' },
  { nombre: 'Laptop Lenovo Core i7', categoria: 'Laptop', imagen: 'https://media.falabella.com/falabellaPE/883349759_01/w=1500,h=1500,fit=pad',imagenes: ['https://media.falabella.com/falabellaPE/883349759_2/w=1500,h=1500,fit=pad','https://m.media-amazon.com/images/I/61z6GKwnq2L._AC_SX425_.jpg'],descripcion: 'La Lenovo Core i7 es una laptop potente y versátil, perfecta para tareas intensivas como edición de video, diseño gráfico y programación. Su pantalla de alta resolución y teclado ergonómico la hacen ideal para largas jornadas de trabajo.' },
  { nombre: 'Laptop Dell Inspiron', categoria: 'Laptop', imagen: 'https://sahuaperu.com.pe/wp-content/uploads/2024/09/HP-SPECTRE-X360-14-EU0000LA-A14MTLAABM-c.jpg',imagenes: ['https://www.infotec.com.pe/91051-medium_default/laptop-dell-inspiron-14-2-in-1-core-7-150u-16gb-1tb-ssd-14-wuxga-tactil-windows-11-i7440-7304blu-pus.jpg','https://e7.pngegg.com/pngimages/1012/279/png-clipart-laptop-dell-inspiron-intel-core-laptop-angle-electronics-thumbnail.png'],descripcion: 'La Dell Inspiron es una laptop equilibrada que combina rendimiento y portabilidad. Con un diseño elegante y características sólidas, es ideal para estudiantes y profesionales que necesitan una máquina confiable para el día a día.' },
  {nombre: 'Laptop Apple MacBook Air', categoria: 'Laptop', imagen: 'https://rymportatiles.com.pe/cdn/shop/files/MACBOOK-AIR-A2337-GOLD_a923a779-4d43-49af-918b-181bc4808cef.png?v=1728926477&width=1214',imagenes: ['https://pe.tiendasishop.com/cdn/shop/files/IMG-5577524_803fc5fb-aa2e-4221-ab21-28d1dcd85add.jpg?v=1734372786'],descripcion: 'El MacBook Air es una laptop ultradelgada y ligera, con el potente chip M2 de Apple. Ofrece un rendimiento excepcional, larga duración de batería y una pantalla Retina impresionante, ideal para usuarios que buscan portabilidad y potencia.'},
  { nombre: 'Laptop Acer Aspire 5', categoria: 'Laptop', imagen: 'https://www.pcfactory.com.pe/public/foto/3163/1_1000.jpg?t=1748747209982',descripcion: 'La Acer Aspire 5 es una laptop asequible con un buen equilibrio entre rendimiento y precio. Ideal para estudiantes y profesionales que necesitan una máquina confiable para tareas diarias como navegación web, procesamiento de textos y multimedia.' },

  // Teclados
  { nombre: 'Teclado Mecánico Corsair', categoria: 'Teclado', imagen: 'https://img.kwcdn.com/product/fancy/a190b57e-bd2a-4788-87d1-c70145b81053.jpg?imageView2/2/w/800/q/70/format/webp',imagenes: ['https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Gaming-Keyboards/K70-PRO-TKL-APAC/Gallery/CH-911911G-DE/CH-911911G-DE_01.webp'],descripcion: 'Un teclado mecánico de alto rendimiento con retroiluminación RGB, ideal para gamers y escritores que buscan precisión y durabilidad.' },
  { nombre: 'Teclado Logitech G Pro', categoria: 'Teclado', imagen: 'https://img.kwcdn.com/product/fancy/e4b109d1-39d0-40ee-a9a9-c9391d8a7267.jpg?imageView2/2/w/800/q/70/format/webp',descripcion: 'El Logitech G Pro es un teclado mecánico compacto diseñado para esports, con switches de alta calidad y retroiluminación personalizable.' },
  { nombre: 'Teclado Razer BlackWidow', categoria: 'Teclado', imagen: 'https://img.kwcdn.com/product/fancy/706c7a39-8efd-4779-b541-5cc9e4d2ce81.jpg?imageView2/2/w/800/q/70/format/webp',descripcion: 'Un teclado mecánico con switches Razer, retroiluminación RGB y un diseño robusto, ideal para gamers que buscan una experiencia de juego superior.' },
  { nombre: 'Teclado HyperX Alloy', categoria: 'Teclado', imagen: 'https://oechsle.vteximg.com.br/arquivos/ids/4552847-1000-1000/image-fbe6e09534bc4eaa82dd9dfd67ccf3b8.jpg?v=637657862587330000',descripcion: 'El HyperX Alloy es un teclado mecánico compacto con retroiluminación roja, diseñado para ofrecer durabilidad y rendimiento en juegos.' },
  {nombre: 'Teclado Logitech K380', categoria: 'Teclado', imagen: 'https://media.falabella.com/falabellaPE/119931484_01/w=1500,h=1500,fit=pad',descripcion: 'Un teclado inalámbrico compacto y portátil, ideal para uso diario y compatible con múltiples dispositivos, con teclas silenciosas y diseño ergonómico.'},
  { nombre: 'Teclado Apple Magic Keyboard', categoria: 'Teclado', imagen: 'https://mac-center.com.pe/cdn/shop/files/magic-keyboard_MXCL3Y.jpg?v=1730310544',descripcion: 'El Apple Magic Keyboard es un teclado inalámbrico elegante y minimalista, con teclas de perfil bajo y una batería recargable de larga duración, ideal para usuarios de Mac.' },

  // Auriculares
  { nombre: 'Auriculares Sony', categoria: 'Auriculares', imagen: 'https://oechsle.vteximg.com.br/arquivos/ids/20196510-1000-1000/2257380jpg.jpg?v=638699681374870000',descripcion: 'Auriculares Sony con cancelación de ruido, sonido envolvente y diseño ergonómico, ideales para disfrutar de música y películas sin distracciones.' },
  { nombre: 'Auriculares JBL', categoria: 'Auriculares', imagen: 'https://realplaza.vtexassets.com/arquivos/ids/31640636/imageUrl_1.jpg?v=638108894295430000',descripcion: 'Los auriculares JBL ofrecen un sonido potente y claro, con conectividad Bluetooth y diseño plegable para mayor comodidad al transportarlos.' },
  { nombre: 'Auriculares Logitech', categoria: 'Auriculares', imagen: 'https://mercury.vtexassets.com/arquivos/ids/19644171-800-800?v=638707605259000000&width=800&height=800&aspect=true',descripcion: 'Auriculares Logitech con micrófono integrado, ideales para videollamadas y conferencias, con sonido nítido y diseño cómodo para largas horas de uso.' },
  { nombre: 'Auriculares Apple AirPods', categoria: 'Auriculares', imagen: 'https://i5.walmartimages.com/seo/JBL-Live-660NC-Wireless-over-ear-NC-headphones-White_f91e1229-4d50-4420-8be7-110b9032a2a0.a5f1355f9dcdb3acbb5f484a1b236af2.jpeg',descripcion: 'Los AirPods de Apple ofrecen una experiencia inalámbrica sin igual, con sonido de alta calidad, integración perfecta con dispositivos Apple y un diseño elegante y minimalista.' },
  {nombre: 'Auriculares Bose QuietComfort', categoria: 'Auriculares', imagen: 'https://promart.vteximg.com.br/arquivos/ids/7891007-1000-1000/imageUrl_1.jpg?v=638460478202970000',descripcion: 'Los auriculares Bose QuietComfort ofrecen una cancelación de ruido líder en la industria, sonido premium y comodidad para largas sesiones de escucha.'},
  { nombre: 'Auriculares Sennheiser HD 450BT', categoria: 'Auriculares', imagen: 'https://oechsle.vteximg.com.br/arquivos/ids/15528756/image-0.jpg?v=638278815651900000',descripcion: 'Los Sennheiser HD 450BT son auriculares inalámbricos con cancelación de ruido, sonido de alta fidelidad y batería de larga duración, ideales para audiófilos.' },

  // Smartphones
  { nombre: 'iPhone 14 Pro', categoria: 'Smartphone', imagen: 'https://www.reuse.pe/cdn/shop/files/63dab5e7cb3cb_s23-5g-rosa-1jpg_1024x1024.jpg?v=1737395254',descripcion: 'El iPhone 14 Pro es un smartphone de alta gama con cámara avanzada, pantalla Super Retina XDR y rendimiento excepcional gracias a su chip A16 Bionic.' },
  { nombre: 'Samsung Galaxy S24', categoria: 'Smartphone', imagen: 'https://mac-center.com.pe/cdn/shop/files/iPhone_14_Midnight_PDP_Image_Spring23_Position-6_COES.jpg?v=1700293686&width=823',descripcion: 'El Samsung Galaxy S24 es un smartphone insignia con pantalla AMOLED, cámara de alta resolución y rendimiento potente, ideal para usuarios exigentes.' },
  { nombre: 'Xiaomi Redmi Note 12', categoria: 'Smartphone', imagen: 'https://m.media-amazon.com/images/I/61CB-MZkbYL.jpg',descripcion: 'El Xiaomi Redmi Note 12 ofrece una excelente relación calidad-precio, con pantalla AMOLED, cámara cuádruple y batería de larga duración, perfecto para quienes buscan un buen rendimiento sin gastar mucho.' },
  { nombre: 'Motorola Edge 40', categoria: 'Smartphone', imagen: 'https://pe.celulares.com/fotos/oneplus-11-96759-g-alt.jpg',descripcion: 'El Motorola Edge 40 es un smartphone con pantalla curva, rendimiento fluido y cámara de alta calidad, ideal para quienes buscan un dispositivo elegante y potente.' },
  {nombre: 'Google Pixel 7a', categoria: 'Smartphone', imagen: 'https://m.media-amazon.com/images/I/71m09hEhnwL.jpg',descripcion: 'El Google Pixel 7a es un smartphone con cámara excepcional, software optimizado y actualizaciones rápidas, ideal para quienes valoran la fotografía y la experiencia Android pura.'},
  { nombre: 'OnePlus Nord 2T', categoria: 'Smartphone', imagen: 'https://pe.celulares.com/fotos/oneplus-nord-2t-94171-g-alt.jpg',descripcion: 'El OnePlus Nord 2T es un smartphone de gama media con rendimiento sólido, carga rápida y cámara versátil, ideal para usuarios que buscan un buen equilibrio entre precio y características.' },

  // Monitores
  { nombre: 'Monitor LG 24”', categoria: 'Monitores', imagen: 'https://compumarket.pe/fotos/producto_13899_lg.jpg',descripcion: 'Un monitor de 24 pulgadas con resolución Full HD, ideal para trabajo y entretenimiento, con tecnología IPS para colores más vivos y ángulos de visión amplios.' },
  { nombre: 'Monitor Samsung Curvo', categoria: 'Monitores', imagen: 'https://m.media-amazon.com/images/I/71AlcYfuONL._AC_SL1200_.jpg',descripcion: 'Monitor curvo de 27 pulgadas con resolución QHD, ideal para juegos y películas, ofreciendo una experiencia inmersiva con colores vibrantes y contraste mejorado.' },
  { nombre: 'Monitor ASUS ProArt', categoria: 'Monitores', imagen: 'https://pcya.pe/wp-content/uploads/2024/03/PA248QV-1.png',descripcion: 'El monitor ASUS ProArt es perfecto para diseñadores y creadores de contenido, con una excelente reproducción del color, resolución 4K y conectividad versátil.' },
  { nombre: 'Monitor HP 27”', categoria: 'Monitores', imagen: 'https://pe-media.hptiendaenlinea.com/catalog/product/2/V/2V6B2AA-1_T1679063020.png',descripcion: 'Un monitor de 27 pulgadas con diseño elegante y pantalla Full HD, ideal para uso diario, con tecnología antirreflejo y conectividad HDMI.' },
  { nombre: 'Monitor Dell UltraSharp', categoria: 'Monitores', imagen: 'https://caltechstore.pe/image/cache/catalog/DELL%20U2724DE/81fCUAajF9L._AC_SL1500-1200x1200.jpg',descripcion: 'El Dell UltraSharp es un monitor de alta gama con resolución 4K, ideal para profesionales que requieren precisión en el color y detalles nítidos en sus trabajos.' },
  { nombre: 'Monitor Acer Nitro', categoria: 'Monitores', imagen: 'https://m.media-amazon.com/images/I/71oi2XX-YEL._AC_SL1500_.jpg',descripcion: 'Un monitor gamer de 27 pulgadas con tasa de refresco alta y tecnología FreeSync, ideal para juegos competitivos y experiencias visuales fluidas.' },

  // Mouse
  { nombre: 'Mouse Logitech G203', categoria: 'Mouse', imagen: 'https://cyccomputer.pe/44457-large_default/mouse-logitech-mx-master-3s-graphite-wireless-pn910-006561.jpg',descripcion: 'Un mouse gaming con sensor de alta precisión, retroiluminación RGB y diseño ergonómico, ideal para largas sesiones de juego.' },
  { nombre: 'Mouse Redragon Cobra', categoria: 'Mouse', imagen: 'https://ezpc.pe/wp-content/uploads/2022/10/RZ01-03350100-R3U1.jpg',descripcion: 'El Redragon Cobra es un mouse ergonómico con múltiples botones programables, ideal para gamers que buscan personalización y comodidad.' },
  { nombre: 'Mouse Razer Viper', categoria: 'Mouse', imagen: 'https://hca.pe/storage/media/large_ob6gvnlesx4SAQ6WPwSVBAqjRtFLPrR3Y5GmeEc0.png',descripcion: 'Un mouse ultraligero con tecnología de sensor óptico de alta precisión, diseñado para ofrecer velocidad y precisión en juegos competitivos.' },
  { nombre: 'Mouse HyperX Pulsefire', categoria: 'Mouse', imagen: 'https://m.media-amazon.com/images/I/61IUHE0j07L._AC_UF350,350_QL80_.jpg',imagenes: ['https://wondercris.com/cdn/shop/files/bc0697bf-1f7c-48e9-bcab-56952a7b3703.jpg?v=1719125121'],descripcion: 'El HyperX Pulsefire es un mouse gaming con diseño ergonómico, sensor Pixart 3389 y retroiluminación RGB, ideal para gamers que buscan rendimiento y estilo.' },
  { nombre: 'Mouse Corsair Harpoon', categoria: 'Mouse', imagen: 'https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Gaming-Mice/CH-9301011-NA/Gallery/HARPOON_RGB_08.webp',imagenes: ['https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Gaming-Mice/CH-9301011-NA/Gallery/HARPOON_RGB_01.webp'],descripcion: 'Un mouse compacto y ligero con sensor óptico de alta precisión, ideal para gamers que buscan un dispositivo portátil y eficiente.' },
  { nombre: 'Mouse Apple Magic Mouse', categoria: 'Mouse', imagen: 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/2216/PMP20000225978/full_image-1.jpeg',imagenes: ['https://www.appleperu.pe/wp-content/uploads/Diseno-sin-titulo-3.jpg','https://i.blogs.es/ece1fc/magic-mouse-carga/1366_2000.jpeg'],descripcion: 'El Apple Magic Mouse es un mouse inalámbrico con diseño minimalista, superficie táctil y batería recargable, ideal para usuarios de Mac que buscan elegancia y funcionalidad.' }
];


// Mostrar productos en el grid
function renderizarProductos(productos) {
  const grid = document.getElementById('searchResults');
  grid.innerHTML = '';
  productos.forEach(p => {
    grid.innerHTML += `
  <div class="product-card">
    <img src="${p.imagen}" alt="${p.nombre}" class="product-img" />
    <h3>${p.nombre}</h3>
    <p class="product-short-desc">${p.descripcion.slice(0, 60)}...</p>
    <button class="btn-ver-mas" onclick="abrirInfoProducto('${encodeURIComponent(JSON.stringify(p))}'); event.stopPropagation();">Ver más</button>
  </div>
    `;
  });
}

// Simulación de imágenes adicionales (puedes adaptar esto a tu estructura real)
function obtenerImagenesAdicionales(producto) {
  if (producto.imagenes && Array.isArray(producto.imagenes) && producto.imagenes.length > 0) {
    // Si la imagen principal no está en el array, la agregamos al inicio
    if (!producto.imagenes.includes(producto.imagen)) {
      return [producto.imagen, ...producto.imagenes];
    }
    return producto.imagenes;
  }
  // Si no hay galería, usa solo la imagen principal
  return [producto.imagen];
}

// Abre el modal enriquecido
function abrirInfoProducto(productoStr) {
  const producto = JSON.parse(decodeURIComponent(productoStr));
  const imagenes = obtenerImagenesAdicionales(producto);

  // Contenedor para la imagen grande
  const imgGrandeContainer = document.getElementById('modalImgGrandeContainer');
  imgGrandeContainer.innerHTML = ''; // Limpia cualquier imagen anterior

  // Crea y muestra la imagen principal grande
  const imgGrande = document.createElement('img');
  imgGrande.id = 'modalImgGrande';
  imgGrande.src = imagenes[0];
  imgGrande.style.width = '320px';
  imgGrande.style.height = '320px';
  imgGrande.style.objectFit = 'cover';
  imgGrande.style.borderRadius = '10px';
  imgGrande.style.marginBottom = '12px';
  imgGrandeContainer.appendChild(imgGrande);

  // Miniaturas de galería (incluida la principal)
  const galeria = document.getElementById('modalGaleria');
  galeria.innerHTML = imagenes.map((img, i) =>
    `<img src="${img}" alt="img${i}" onclick="mostrarImagenModal('${img}')">`
  ).join('');

  // Nombre y categoría
  document.getElementById('modalNombre').textContent = producto.nombre;
  document.getElementById('modalCategoria').innerHTML = `<strong>Categoría:</strong> ${producto.categoria}`;
  // Descripción enriquecida
  document.getElementById('modalDescripcion').innerHTML = `
    <ul>
      <li><b>Descripción:</b> ${producto.descripcion}</li>
      <li><b>Modelo:</b> ${producto.nombre}</li>
      <li><b>Garantía:</b> 1 año</li>
      <li><b>Envío:</b> Gratis a todo el país</li>
    </ul>
  `;
  // Mostrar modal
  document.getElementById('modalProducto').style.display = 'flex';
}

// Cambia la imagen principal en el modal al hacer clic en una miniatura
function mostrarImagenModal(src) {
  const imgGrande = document.getElementById('modalImgGrande');
  if (imgGrande) {
    imgGrande.src = src;
  }
}

// Cierra el modal
function cerrarModalProducto() {
  document.getElementById('modalProducto').style.display = 'none';
}

// Buscar productos por texto
function searchProduct() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultados = productos.filter(p => p.nombre.toLowerCase().includes(query));
  renderizarProductos(resultados);

  // Efecto rebote en las imágenes encontradas
  setTimeout(() => {
    const imgs = document.querySelectorAll('.product-img');
    imgs.forEach(img => {
      img.classList.remove('bounce'); // Por si ya tenía la clase
      void img.offsetWidth; // Reflow para reiniciar animación
      img.classList.add('bounce');
    });
  }, 100);
}

// Filtrar por categoría desde la barra lateral
function filtrarPorCategoria(cat) {
  if (!cat) {
    renderizarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === cat);
    renderizarProductos(filtrados);
  }
// Hacer scroll suave a la primera imagen de producto
  setTimeout(() => {
    const primeraImg = document.querySelector('.product-img');
    if (primeraImg) {
      primeraImg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100); // Espera breve para asegurar que el DOM se actualizó
}

// Mostrar/ocultar botón flotante solo en la sección de productos
window.addEventListener('scroll', function() {
  const btn = document.getElementById('btnScrollTop');
  const productSection = document.getElementById('productSection');
  if (
    productSection && 
    !productSection.classList.contains('hidden') && 
    window.scrollY > 200
  ) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

// Scroll suave hacia el logo
function scrollToLogo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}