/*!
* Anthe Shop - Scripts
*/

document.addEventListener('DOMContentLoaded', () => {

  const PAGINA = document.body.dataset.pagina || '';

  /* ===================== UTILIDADES ===================== */
  const fmt = (n) => `$${Number(n).toLocaleString('es-CL')}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const normalizar = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const porId = (id) => PRODUCTOS.find((p) => p.id === Number(id));
  const urlProducto = (id) => `producto.html?id=${id}`;
  const imgSrc = (p) => `assets/${p.img}`;
  const nombreCategoria = (c) => CATEGORIAS[c] || '';

  const mezclar = (array) => {                       // Fisher-Yates
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  PRODUCTOS.forEach((p) => {
    if (!CATEGORIAS[p.categoria]) console.warn(`Producto ${p.id}: la categoría "${p.categoria}" no existe en CATEGORIAS.`);
  });

  /* ===================== CONTENEDOR TOAST NOTIFICACIONES ===================== */
  if (!document.getElementById('toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '1100';
    toastContainer.innerHTML = `
      <div id="liveToast" class="toast align-items-center text-bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi-check-circle-fill text-success fs-5"></i>
            <span id="toast-mensaje">Producto agregado al carrito.</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
        </div>
      </div>
    `;
    document.body.appendChild(toastContainer);
  }

  const mostrarToast = (mensaje) => {
    const toastEl = document.getElementById('liveToast');
    const msgEl = document.getElementById('toast-mensaje');
    if (toastEl && msgEl) {
      msgEl.textContent = mensaje;
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  };

  /* ===================== NAVBAR Y FOOTER ===================== */
  
  const categoriasConProductos = Object.keys(CATEGORIAS)
    .filter((c) => PRODUCTOS.some((p) => p.categoria === c));

  const itemNav = (href, texto, activo) => `
    <li class="nav-item">
      <a class="nav-link${activo ? ' active' : ''}"${activo ? ' aria-current="page"' : ''} href="${href}">${texto}</a>
    </li>`;

  const navbarHTML = () => `
  <div class="top-bar py-1 text-center">
    <!-- AQUÍ VA LA LÍNEA: -->
    <div class="top-bar-marquee">
      ✨ Entregas presenciales en San Felipe y Los Andes &nbsp;&bull;&nbsp; Envíos a todo Chile 🇨🇱 &nbsp;&bull;&nbsp; ✨ Entregas presenciales en San Felipe y Los Andes &nbsp;&bull;&nbsp; Envíos a todo Chile 🇨🇱
    </div>
  </div>


    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="index.html">
          <img src="assets/logosinfondo.png" alt="Logo ${esc(TIENDA.nombreCorto)}" class="logo-navbar">
          <span>${esc(TIENDA.nombreCorto)}</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal"
                aria-controls="menuPrincipal" aria-expanded="false" aria-label="Mostrar menú">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menuPrincipal">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            ${itemNav('index.html', 'Inicio', PAGINA === 'inicio')}
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle${['productos', 'producto'].includes(PAGINA) ? ' active' : ''}"
                 id="menuShop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="menuShop">
                <li><a class="dropdown-item" href="productos.html">Todos los productos</a></li>
                <li><hr class="dropdown-divider"></li>
                ${categoriasConProductos.map((c) =>
                  `<li><a class="dropdown-item" href="productos.html?categoria=${c}">${esc(CATEGORIAS[c])}</a></li>`).join('')}
              </ul>
            </li>
            ${itemNav('populares.html', 'Populares', PAGINA === 'populares')}
            ${itemNav('nuevos.html', 'Nuevos', PAGINA === 'nuevos')}
            ${itemNav('sobre-nosotros.html', 'Sobre nosotros', PAGINA === 'sobre')}
          </ul>
          <a class="btn btn-outline-light ms-lg-3" href="carrito.html">
            <i class="bi-cart-fill me-1"></i>
            Carrito
            <span id="contador-carrito" class="badge ms-1 rounded-pill">0</span>
          </a>
        </div>
      </div>
    </nav>`;

  const footerHTML = () => `
    <footer class="bg-marca text-white py-5">
      <div class="container px-4 px-lg-5">
        <div class="row gy-4">
          <div class="col-12 col-md-4">
            <h5 class="fw-bolder">${esc(TIENDA.nombre)}</h5>
            <p class="text-white-50 mb-0">
              •Desde Los Andes para ti!🇨🇱<br>
              •Perlas y mostacillas hechas arte💫<br>  
              •Pedidos y consultas al DM.
            </p>
          </div>
          <div class="col-6 col-md-4">
            <h5 class="fw-bolder">Navegación</h5>
            <ul class="list-unstyled mb-0">
              <li><a class="link-light text-decoration-none" href="index.html">Inicio</a></li>
              <li><a class="link-light text-decoration-none" href="productos.html">Productos</a></li>
              <li><a class="link-light text-decoration-none" href="populares.html">Populares</a></li>
              <li><a class="link-light text-decoration-none" href="nuevos.html">Nuevos</a></li>
              <li><a class="link-light text-decoration-none" href="sobre-nosotros.html">Sobre nosotros</a></li>
            </ul>
          </div>
          <div class="col-6 col-md-4">
            <h5 class="fw-bolder">Contacto</h5>
            <ul class="list-unstyled mb-0">
              <li><i class="bi-envelope me-2"></i>${esc(TIENDA.correo)}</li>
              <li><i class="bi-whatsapp me-2"></i>${esc(TIENDA.telefono)}</li>
            </ul>
            <div class="mt-3">
              <a class="link-light me-3 fs-5" href="${esc(TIENDA.instagram)}" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi-instagram"></i></a>
              ${TIENDA.tiktok ? `<a class="link-light me-3 fs-5" href="${esc(TIENDA.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok"><i class="bi-tiktok"></i></a>` : ''}
              <a class="link-light me-3 fs-5" href="${esc(TIENDA.facebook)}" aria-label="Facebook"><i class="bi-facebook"></i></a>
            </div>
          </div>
        </div>
        <hr class="border-secondary my-4">
        <p class="m-0 text-center text-white-50">Copyright &copy; ${esc(TIENDA.nombre)} ${new Date().getFullYear()}</p>
      </div>
    </footer>`;

  const marcaNavbar = document.getElementById('navbar');
  if (marcaNavbar) marcaNavbar.outerHTML = navbarHTML();
  const marcaFooter = document.getElementById('footer');
  if (marcaFooter) marcaFooter.outerHTML = footerHTML();

  document.querySelectorAll('[data-contacto]').forEach((el) => {
    const tipo = el.dataset.contacto;
    if (tipo === 'whatsapp') el.href = `https://wa.me/${TIENDA.whatsapp}`;
    if (tipo === 'instagram') el.href = TIENDA.instagram;
    if (tipo === 'correo') el.href = `mailto:${TIENDA.correo}`;
  });

  /* ===================== CARRITO (localStorage) ===================== */
  const obtenerCarrito = () => {
    try {
      const datos = JSON.parse(localStorage.getItem('carrito'));
      return Array.isArray(datos) ? datos : [];
    } catch (e) {
      return [];
    }
  };

  const actualizarContador = () => {
    const badge = document.getElementById('contador-carrito');
    if (!badge) return;
    badge.textContent = obtenerCarrito().reduce((total, item) => total + (item.cantidad || 0), 0);
  };

  const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
  };

  const agregarAlCarrito = ({ id, nombre, precio }, cantidad = 1) => {
    const carrito = obtenerCarrito();
    const item = carrito.find((i) => String(i.id) === String(id));
    if (item) item.cantidad += cantidad;
    else carrito.push({ id, nombre, precio, cantidad });
    guardarCarrito(carrito);
    mostrarToast(`¡${nombre} se agregó al carrito!`);
  };

  const cambiarCantidad = (id, cambio) => {
    let carrito = obtenerCarrito();
    const item = carrito.find((i) => String(i.id) === String(id));
    if (item) {
      item.cantidad += cambio;
      if (item.cantidad <= 0) {
        carrito = carrito.filter((i) => String(i.id) !== String(id));
      }
      guardarCarrito(carrito);
      renderizarCarrito();
    }
  };

  const btnCheckout = document.getElementById('btn-checkout');
  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      const carrito = obtenerCarrito();
      if (!carrito.length) {
        mostrarToast('Tu carrito está vacío. Agrega productos antes de pagar.');
        return;
      }

      let mensaje = `*¡Hola ${TIENDA.nombreCorto}! Quisiera realizar el siguiente pedido:*\n\n`;
      let total = 0;

      carrito.forEach((p, index) => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;
        mensaje += `${index + 1}. *${p.nombre}* (${p.cantidad} x ${fmt(p.precio)}) = ${fmt(subtotal)}\n`;
      });

      mensaje += `\n*Total a pagar:* ${fmt(total)}\n`;
      mensaje += `*Método de entrega preferido:* (Retiro presencial / Envío a domicilio)\n`;
      mensaje += `Quedo a la espera de la información para realizar la transferencia.`;
      
      const url = `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  document.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-agregar-carrito');
    if (!boton) return;
    const precio = Number(boton.dataset.precio);
    if (!boton.dataset.id || Number.isNaN(precio)) return;

    const campo = document.getElementById('cantidad');
    const cantidad = campo ? Math.max(1, parseInt(campo.value, 10) || 1) : 1;
    agregarAlCarrito({ id: boton.dataset.id, nombre: boton.dataset.nombre, precio }, cantidad);
  });

  /* ===================== TARJETA DE PRODUCTO REDISEÑADA ===================== */
  const crearTarjeta = (p) => `
    <div class="col">
      <div class="card h-100 shadow-sm border-0 overflow-hidden position-relative">
        ${p.nuevo ? '<span class="etiqueta-nuevo">Nuevo</span>' : ''}
        <div class="ratio ratio-1x1 bg-light overflow-hidden">
          <a href="${urlProducto(p.id)}" aria-label="Ver ${esc(p.nombre)}">
            <img class="card-img-top w-100 h-100 object-fit-cover" src="${imgSrc(p)}" alt="${esc(p.nombre)}" loading="lazy">
          </a>
        </div>
        <div class="card-body text-center d-flex flex-column justify-content-between p-3">
          <div>
            <span class="text-uppercase text-muted fs-7 fw-bold mb-1 d-block">${esc(nombreCategoria(p.categoria))}</span>
            <h5 class="fw-bolder mb-2">
              <a href="${urlProducto(p.id)}" class="enlace-producto text-dark text-decoration-none">${esc(p.nombre)}</a>
            </h5>
          </div>
          <div class="fw-bold fs-6 text-dark mt-1">${fmt(p.precio)}</div>
        </div>
        <div class="card-footer bg-transparent border-0 p-3 pt-0 d-grid gap-2">
          <button type="button" class="btn btn-dark btn-sm rounded-pill btn-agregar-carrito py-2 fw-semibold"
                  data-id="${p.id}" data-nombre="${esc(p.nombre)}" data-precio="${p.precio}">
            <i class="bi-cart-plus me-1"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </div>`;

  /* ===================== INICIO ===================== */
  const carrusel = document.getElementById('miCarrusel');
  if (carrusel) {
    const elegidos = mezclar(PRODUCTOS).slice(0, 8);

    carrusel.querySelector('.carousel-indicators').innerHTML = elegidos.map((_, i) => `
      <button type="button" data-bs-target="#miCarrusel" data-bs-slide-to="${i}"
              class="${i === 0 ? 'active' : ''}"${i === 0 ? ' aria-current="true"' : ''}
              aria-label="Foto ${i + 1}"></button>`).join('');

    carrusel.querySelector('.carousel-inner').innerHTML = elegidos.map((p, i) => `
      <div class="carousel-item${i === 0 ? ' active' : ''}">
        <a href="${urlProducto(p.id)}" aria-label="Ver ${esc(p.nombre)}">
          <img src="${imgSrc(p)}" class="d-block w-100" alt="${esc(p.nombre)}">
        </a>
      </div>`).join('');

    if (window.bootstrap) {
      bootstrap.Carousel.getOrCreateInstance(carrusel, {
        interval: 5000, ride: 'carousel', pause: false, wrap: true
      }).cycle();
    }
  }

  const destacados = document.getElementById('destacados');
  if (destacados) {
    const POR_VEZ = 8;
    const CADA_MS = 10000;
    const FADE_MS = 500;
    let cola = [];

    const siguientes = (n) => {
      const grupo = [];
      while (grupo.length < n && grupo.length < PRODUCTOS.length) {
        if (cola.length === 0) cola = mezclar(PRODUCTOS);
        const p = cola.pop();
        if (!grupo.includes(p)) grupo.push(p);
      }
      return grupo;
    };
    const pintar = () => { destacados.innerHTML = siguientes(POR_VEZ).map(crearTarjeta).join(''); };

    pintar();
    setInterval(() => {
      destacados.classList.add('fade-out');
      setTimeout(() => { pintar(); destacados.classList.remove('fade-out'); }, FADE_MS);
    }, CADA_MS);
  }

  /* ===================== CATÁLOGO ===================== */
  const appCatalogo = document.getElementById('catalogo-app');
  if (appCatalogo) {
    const POR_PAGINA = 24;
    const VISTA = document.body.dataset.vista || '';

    const VISTAS = {
      '':        { titulo: 'Todos los productos', subtitulo: 'Explora el catálogo completo' },
      populares: { titulo: 'Populares',           subtitulo: 'Los productos que más gustan' },
      nuevos:    { titulo: 'Nuevos',              subtitulo: 'Lo último que llegó a la tienda' }
    };

    const ORDENES = {
      relevancia:    { texto: 'Destacados',            fn: null },
      recientes:     { texto: 'Más nuevos primero',    fn: (a, b) => b.id - a.id },
      'precio-asc':  { texto: 'Precio: menor a mayor', fn: (a, b) => a.precio - b.precio },
      'precio-desc': { texto: 'Precio: mayor a menor', fn: (a, b) => b.precio - a.precio },
      'nombre-asc':  { texto: 'Nombre: A a Z',         fn: (a, b) => a.nombre.localeCompare(b.nombre, 'es', { numeric: true }) },
      'nombre-desc': { texto: 'Nombre: Z a A',         fn: (a, b) => b.nombre.localeCompare(a.nombre, 'es', { numeric: true }) }
    };
    const ORDEN_DEFECTO = VISTA === 'nuevos' ? 'recientes' : 'relevancia';

    const base = PRODUCTOS.filter((p) =>
      VISTA === 'populares' ? p.popular : VISTA === 'nuevos' ? p.nuevo : true);
    const tiposBase = Object.keys(CATEGORIAS).filter((c) => base.some((p) => p.categoria === c));

    const params = new URLSearchParams(location.search);
    const estado = {
      q: params.get('q') || '',
      cats: new Set((params.get('categoria') || '').split(',').filter((c) => CATEGORIAS[c])),
      min: params.get('min') || '',
      max: params.get('max') || '',
      nuevo: params.get('nuevo') === '1',
      popular: params.get('popular') === '1',
      orden: ORDENES[params.get('orden')] ? params.get('orden') : ORDEN_DEFECTO,
      pagina: Math.max(1, parseInt(params.get('pagina'), 10) || 1)
    };

    appCatalogo.innerHTML = `
      <header class="bg-marca text-white text-center py-4">
        <div class="container px-4 px-lg-5">
          <h1 class="display-6 fw-bolder mb-1" id="cat-titulo">${VISTAS[VISTA].titulo}</h1>
          <p class="lead fw-normal text-white-50 mb-0">${VISTAS[VISTA].subtitulo}</p>
        </div>
      </header>

      <main class="container px-4 px-lg-5 py-4">
        <div class="row g-4">
          <aside class="col-lg-3">
            <button class="btn btn-outline-dark w-100 d-lg-none mb-3" type="button"
                    data-bs-toggle="collapse" data-bs-target="#panelFiltros"
                    aria-expanded="false" aria-controls="panelFiltros">
              <i class="bi-funnel me-1"></i> Filtros
            </button>
            <div class="collapse d-lg-block" id="panelFiltros">
              <form id="filtros" class="panel-filtros" autocomplete="off">
                <div class="mb-4">
                  <label class="form-label fw-bold" for="f-buscar">Buscar</label>
                  <input class="form-control" type="search" id="f-buscar" name="q" placeholder="Nombre del producto">
                </div>

                ${tiposBase.length > 1 ? `
                <fieldset class="mb-4">
                  <legend class="h6 fw-bold">Tipo de producto</legend>
                  ${tiposBase.map((c) => `
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="categoria" value="${c}" id="cat-${c}">
                      <label class="form-check-label" for="cat-${c}">
                        ${esc(CATEGORIAS[c])} <span class="text-muted">(${base.filter((p) => p.categoria === c).length})</span>
                      </label>
                    </div>`).join('')}
                </fieldset>` : ''}

                <fieldset class="mb-4">
                  <legend class="h6 fw-bold">Precio</legend>
                  <div class="d-flex align-items-center gap-2">
                    <input class="form-control" type="number" name="min" min="0" step="500" placeholder="Mínimo" aria-label="Precio mínimo">
                    <span>a</span>
                    <input class="form-control" type="number" name="max" min="0" step="500" placeholder="Máximo" aria-label="Precio máximo">
                  </div>
                </fieldset>

                ${VISTA === '' ? `
                <fieldset class="mb-4">
                  <legend class="h6 fw-bold">Mostrar solo</legend>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="nuevo" id="f-nuevo">
                    <label class="form-check-label" for="f-nuevo">Nuevos</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="popular" id="f-popular">
                    <label class="form-check-label" for="f-popular">Populares</label>
                  </div>
                </fieldset>` : ''}

                <button type="button" class="btn btn-outline-secondary w-100" id="f-limpiar">Limpiar filtros</button>
              </form>
            </div>
          </aside>

          <section class="col-lg-9" id="cat-lista">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <p class="mb-0 text-muted" id="resultados" aria-live="polite"></p>
              <div class="d-flex align-items-center gap-2">
                <label class="form-label mb-0 text-nowrap" for="f-orden">Ordenar por</label>
                <select class="form-select form-select-sm" id="f-orden">
                  ${Object.entries(ORDENES).map(([clave, o]) => `<option value="${clave}">${o.texto}</option>`).join('')}
                </select>
              </div>
            </div>

            <div id="catalogo" class="row g-3 g-lg-4 row-cols-2 row-cols-md-3"></div>

            <div id="sin-resultados" class="text-center py-5" hidden>
              <p class="mb-3">No encontramos productos con esos filtros.</p>
              <button type="button" class="btn btn-dark" id="vacio-limpiar">Limpiar filtros</button>
            </div>

            <nav id="paginacion" class="mt-4 d-flex justify-content-center" aria-label="Páginas del catálogo"></nav>
          </section>
        </div>
      </main>`;

    const f = document.getElementById('filtros');
    const grid = document.getElementById('catalogo');
    const selOrden = document.getElementById('f-orden');
    const vacio = document.getElementById('sin-resultados');
    const pag = document.getElementById('paginacion');
    const titulo = document.getElementById('cat-titulo');
    const info = document.getElementById('resultados');

    const escribirControles = () => {
      f.elements.q.value = estado.q;
      f.elements.min.value = estado.min;
      f.elements.max.value = estado.max;
      f.querySelectorAll('input[name="categoria"]').forEach((i) => { i.checked = estado.cats.has(i.value); });
      if (f.elements.nuevo) f.elements.nuevo.checked = estado.nuevo;
      if (f.elements.popular) f.elements.popular.checked = estado.popular;
      selOrden.value = estado.orden;
    };

    const leerControles = () => {
      estado.q = f.elements.q.value.trim();
      estado.min = f.elements.min.value.trim();
      estado.max = f.elements.max.value.trim();
      estado.cats = new Set([...f.querySelectorAll('input[name="categoria"]:checked')].map((i) => i.value));
      estado.nuevo = f.elements.nuevo ? f.elements.nuevo.checked : false;
      estado.popular = f.elements.popular ? f.elements.popular.checked : false;
      estado.orden = selOrden.value;
    };

    const filtrar = () => base.filter((p) => {
      if (estado.cats.size && !estado.cats.has(p.categoria)) return false;
      if (estado.min !== '' && p.precio < Number(estado.min)) return false;
      if (estado.max !== '' && p.precio > Number(estado.max)) return false;
      if (estado.nuevo && !p.nuevo) return false;
      if (estado.popular && !p.popular) return false;
      if (estado.q && !normalizar(`${p.nombre} ${nombreCategoria(p.categoria)}`).includes(normalizar(estado.q))) return false;
      return true;
    });

    const ordenar = (lista) => {
      const fn = ORDENES[estado.orden].fn;
      return fn ? [...lista].sort(fn) : lista;
    };

    const botonPagina = (n, actual) => `
      <li class="page-item${n === actual ? ' active' : ''}"${n === actual ? ' aria-current="page"' : ''}>
        <button type="button" class="page-link" data-pagina="${n}">${n}</button>
      </li>`;

    const crearPaginacion = (actual, total) => {
      if (total <= 1) return '';
      const numeros = [...new Set([1, total, actual - 1, actual, actual + 1])]
        .filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
      let html = `
        <li class="page-item${actual === 1 ? ' disabled' : ''}">
          <button type="button" class="page-link" data-pagina="${actual - 1}" aria-label="Página anterior">Anterior</button>
        </li>`;
      let anterior = 0;
      numeros.forEach((n) => {
        if (n - anterior > 1) html += '<li class="page-item disabled"><span class="page-link">…</span></li>';
        html += botonPagina(n, actual);
        anterior = n;
      });
      html += `
        <li class="page-item${actual === total ? ' disabled' : ''}">
          <button type="button" class="page-link" data-pagina="${actual + 1}" aria-label="Página siguiente">Siguiente</button>
        </li>`;
      return `<ul class="pagination mb-0">${html}</ul>`;
    };

    const actualizarURL = () => {
      const p = new URLSearchParams();
      if (estado.q) p.set('q', estado.q);
      if (estado.cats.size) p.set('categoria', [...estado.cats].join(','));
      if (estado.min !== '') p.set('min', estado.min);
      if (estado.max !== '') p.set('max', estado.max);
      if (estado.nuevo) p.set('nuevo', '1');
      if (estado.popular) p.set('popular', '1');
      if (estado.orden !== ORDEN_DEFECTO) p.set('orden', estado.orden);
      if (estado.pagina > 1) p.set('pagina', String(estado.pagina));
      const qs = p.toString();
      try { history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : '')); } catch (e) { }
    };

    const render = () => {
      const lista = ordenar(filtrar());
      const total = lista.length;
      const paginas = Math.max(1, Math.ceil(total / POR_PAGINA));
      estado.pagina = Math.min(estado.pagina, paginas);
      const ini = (estado.pagina - 1) * POR_PAGINA;
      const visibles = lista.slice(ini, ini + POR_PAGINA);

      grid.innerHTML = visibles.map(crearTarjeta).join('');
      vacio.hidden = total > 0;
      info.textContent = total
        ? `Mostrando ${ini + 1} a ${ini + visibles.length} de ${total} productos`
        : '0 productos';
      pag.innerHTML = crearPaginacion(estado.pagina, paginas);

      titulo.textContent = (VISTA === '' && estado.cats.size === 1)
        ? CATEGORIAS[[...estado.cats][0]]
        : VISTAS[VISTA].titulo;

      actualizarURL();
    };

    let espera;
    const aplicar = () => { leerControles(); estado.pagina = 1; render(); };

    f.addEventListener('input', (e) => {
      clearTimeout(espera);
      espera = setTimeout(aplicar, e.target.type === 'checkbox' ? 0 : 250);
    });
    f.addEventListener('submit', (e) => e.preventDefault());
    selOrden.addEventListener('change', aplicar);

    const limpiar = () => {
      estado.q = ''; estado.cats = new Set(); estado.min = ''; estado.max = '';
      estado.nuevo = false; estado.popular = false; estado.orden = ORDEN_DEFECTO; estado.pagina = 1;
      escribirControles();
      render();
    };
    document.getElementById('f-limpiar').addEventListener('click', limpiar);
    document.getElementById('vacio-limpiar').addEventListener('click', limpiar);

    pag.addEventListener('click', (e) => {
      const boton = e.target.closest('[data-pagina]');
      if (!boton) return;
      estado.pagina = Number(boton.dataset.pagina);
      render();
      const arriba = document.getElementById('cat-lista');
      if (arriba && arriba.scrollIntoView) arriba.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    escribirControles();
    render();
  }

  /* ===================== DETALLE DE PRODUCTO ===================== */
  const detalle = document.getElementById('detalle');
  if (detalle) {
    const p = porId(new URLSearchParams(location.search).get('id'));

    if (!p) {
      document.title = `Producto no encontrado | ${TIENDA.nombre}`;
      detalle.innerHTML = `
        <main class="container px-4 px-lg-5 py-5 text-center">
          <h1 class="h3 fw-bolder">No encontramos ese producto</h1>
          <p>Puede que el enlace esté mal o que ya no esté disponible.</p>
          <a href="productos.html" class="btn btn-dark">Ver todos los productos</a>
        </main>`;
    } else {
      document.title = `${p.nombre} | ${TIENDA.nombre}`;
      const tipo = nombreCategoria(p.categoria);
      const relacionados = mezclar(PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id)).slice(0, 4);

      detalle.innerHTML = `
        <main class="container px-4 px-lg-5 py-5">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-4">
              <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
              <li class="breadcrumb-item"><a href="productos.html">Productos</a></li>
              ${tipo ? `<li class="breadcrumb-item"><a href="productos.html?categoria=${p.categoria}">${esc(tipo)}</a></li>` : ''}
              <li class="breadcrumb-item active" aria-current="page">${esc(p.nombre)}</li>
            </ol>
          </nav>

          <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6">
              <img class="img-fluid rounded mb-4 mb-md-0 shadow-sm" src="${imgSrc(p)}" alt="${esc(p.nombre)}">
            </div>
            <div class="col-md-6">
              <div class="small mb-1 text-muted fw-bold">CÓDIGO: ${esc(p.categoria.slice(0, 3).toUpperCase())}-${p.id}</div>
              <h1 class="display-6 fw-bolder mb-2">${esc(p.nombre)}</h1>
              <div class="fs-4 fw-bold text-dark mb-3">${fmt(p.precio)}</div>
              <p class="lead text-secondary fs-6 mb-4">${esc(p.descripcion || 'Consulta por materiales, medidas y disponibilidad.')}</p>

              <div class="d-flex gap-2 mb-4">
                <input class="form-control text-center" id="cantidad" type="number" value="1" min="1"
                       style="max-width: 4.5rem" aria-label="Cantidad">
                <button type="button" class="btn btn-dark rounded-pill px-4 btn-agregar-carrito"
                        data-id="${p.id}" data-nombre="${esc(p.nombre)}" data-precio="${p.precio}">
                  <i class="bi-cart-fill me-1"></i> Agregar al carrito
                </button>
              </div>

              <div>
                <a href="productos.html" class="text-muted text-decoration-none small">&larr; Volver a productos</a>
              </div>
            </div>
          </div>

          ${relacionados.length ? `
          <section class="mt-5 pt-4">
            <h2 class="h4 fw-bolder mb-4">También te puede gustar</h2>
            <div class="row g-3 g-lg-4 row-cols-2 row-cols-md-4">${relacionados.map(crearTarjeta).join('')}</div>
          </section>` : ''}
        </main>`;
    }
  }

  /* ===================== CARRITO (VISTA) ===================== */
  const listaCarrito = document.getElementById('lista-carrito');

  const renderizarCarrito = () => {
    if (!listaCarrito) return;
    const carrito = obtenerCarrito();
    const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  const btnCheckout = document.getElementById('btn-checkout');
    if (btnCheckout) {
      if (carrito.length === 0) { /* si carrito es cero bloquear boton de pago*/
        btnCheckout.classList.add('disabled');
        btnCheckout.setAttribute('aria-disabled', 'true');
      } else {
        btnCheckout.classList.remove('disabled');
        btnCheckout.removeAttribute('aria-disabled');
      }
    }
    listaCarrito.innerHTML = carrito.length
      ? carrito.map((p) => `
        <tr>
          <td><a class="enlace-producto fw-bold" href="${urlProducto(p.id)}">${esc(p.nombre)}</a></td>
          <td class="align-middle">${fmt(p.precio)}</td>
          <td class="align-middle">
            <div class="d-flex align-items-center gap-1">
              <button class="btn btn-sm btn-outline-secondary py-0 px-2 btn-menos" data-id="${p.id}">-</button>
              <span class="fw-bold px-2">${p.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary py-0 px-2 btn-mas" data-id="${p.id}">+</button>
            </div>
          </td>
          <td class="align-middle">${fmt(p.precio * p.cantidad)}</td>
          <td class="align-middle">
            <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${p.id}" aria-label="Quitar ${esc(p.nombre)}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>`).join('')
      : `<tr>
          <td colspan="5" class="text-center py-4">Tu carrito está vacío. <a href="productos.html">Ver productos</a></td>
        </tr>`;

    ['resumen-subtotal', 'resumen-total'].forEach((idEl) => {
      const el = document.getElementById(idEl);
      if (el) el.textContent = fmt(total);
    });
  };

  if (listaCarrito) {
    listaCarrito.addEventListener('click', (e) => {
      const btnEliminar = e.target.closest('.btn-eliminar');
      const btnMas = e.target.closest('.btn-mas');
      const btnMenos = e.target.closest('.btn-menos');

      if (btnEliminar) {
        guardarCarrito(obtenerCarrito().filter((i) => String(i.id) !== btnEliminar.dataset.id));
        renderizarCarrito();
      } else if (btnMas || btnMenos) {
        const btn = btnMas || btnMenos;
        const idProducto = btn.dataset.id;
        const cambio = btnMas ? 1 : -1;
        const fila = btn.closest('tr');

        // 1. Aplicar la clase a la fila actual
        if (fila) fila.classList.add('table-active');

        // 2. Dar 150ms para que el usuario perciba el toque visual antes de refrescar el carrito
        setTimeout(() => {
          cambiarCantidad(idProducto, cambio);
        }, 150);
      }
    });
  }


  const btnVaciar = document.getElementById('vaciar-carrito');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
      const carrito = obtenerCarrito();
      if (!carrito.length) return;

      // Confirmación nativa del navegador
      if (confirm('¿Estás seguro de que deseas vaciar todos los productos del carrito?')) {
        localStorage.removeItem('carrito');
        actualizarContador();
        renderizarCarrito();
        mostrarToast('El carrito se ha vaciado.');
      }
    });
  }

  actualizarContador();
  renderizarCarrito();
});
