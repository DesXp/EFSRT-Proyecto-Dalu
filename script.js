document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para Menú Móvil ---
    const btnMenuMovil = document.getElementById('btn-menu-movil');
    const menuMovil = document.getElementById('menu-movil');
    btnMenuMovil.addEventListener('click', () => {
        menuMovil.classList.toggle('abierto');
    });
    document.querySelectorAll('#menu-movil a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuMovil.classList.remove('abierto');
        });
    });

    // --- Estilo del encabezado al hacer scroll ---
    const encabezado = document.getElementById('encabezado');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            encabezado.classList.add('con-scroll');
        } else {
            encabezado.classList.remove('con-scroll');
        }
    });

    // --- Animación de elementos al revelarse con scroll ---
    const elementosAnimados = document.querySelectorAll('.animar-al-revelar');
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    elementosAnimados.forEach(el => {
        observador.observe(el);
    });

    // --- Indicador de navegación activa ---
    const secciones = document.querySelectorAll('section[id]');
    const enlacesNav = document.querySelectorAll('.navegacion-escritorio a, #menu-movil a');

    function actualizarNavActiva() {
        const scrollY = window.scrollY + 100; // Offset para mejor detección

        secciones.forEach(seccion => {
            const seccionTop = seccion.offsetTop;
            const seccionHeight = seccion.offsetHeight;
            const seccionId = seccion.getAttribute('id');

            if (scrollY >= seccionTop && scrollY < seccionTop + seccionHeight) {
                enlacesNav.forEach(enlace => {
                    enlace.classList.remove('activo');
                    if (enlace.getAttribute('href') === `#${seccionId}`) {
                        enlace.classList.add('activo');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', actualizarNavActiva);
    actualizarNavActiva(); // Ejecutar al cargar la página

    // --- Filtro de Galería ---
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    const itemsGaleria = document.querySelectorAll('.galeria-item');
    const galeriaGrid = document.querySelector('.galeria-grid');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            botonesFiltro.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');

            // Ocultar todos los items primero
            itemsGaleria.forEach(item => {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.classList.remove('visible');
            });

            // Mostrar items filtrados con animación
            setTimeout(() => {
                let itemsVisibles = 0;
                itemsGaleria.forEach(item => {
                    if (filtro === 'todos' || item.getAttribute('data-category') === filtro) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.classList.add('visible');
                        itemsVisibles++;
                    }
                });

                // Ajustar el grid layout basado en la cantidad de items visibles
                if (itemsVisibles <= 2) {
                    galeriaGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
                    galeriaGrid.style.justifyContent = 'center';
                } else if (itemsVisibles <= 4) {
                    galeriaGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
                    galeriaGrid.style.justifyContent = 'center';
                } else {
                    galeriaGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
                    galeriaGrid.style.justifyContent = 'start';
                }
            }, 150);
        });
    });

    // --- Lógica del Carrusel de Imágenes ---
    const diapositivas = document.querySelector('.carrusel-diapositivas');
    const totalDiapositivas = document.querySelectorAll('.diapositiva').length;
    let indiceActual = 0;

    const btnSiguiente = document.getElementById('btn-siguiente');
    const btnAnterior = document.getElementById('btn-anterior');

    function mostrarDiapositiva(indice) {
        const desplazamiento = -indice * 100;
        diapositivas.style.transform = `translateX(${desplazamiento}%)`;
    }

    btnSiguiente.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % totalDiapositivas;
        mostrarDiapositiva(indiceActual);
    });

    btnAnterior.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + totalDiapositivas) % totalDiapositivas;
        mostrarDiapositiva(indiceActual);
    });

    // --- Filtros de Galería ---
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filtroBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galeriaItems.forEach(item => {
                if (filterValue === 'todos' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Agregar animación de entrada
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- Envío del Formulario de Contacto ---
    const formularioContacto = document.getElementById('formulario-contacto');
    const notificacion = document.getElementById('notificacion');
    formularioContacto.addEventListener('submit', (e) => {
        e.preventDefault();

        // Recopilar datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const servicio = document.getElementById('servicio-interes').value;
        const mensaje = document.getElementById('mensaje').value;

        // Crear mensaje para WhatsApp con formato profesional
        const mensajeWhatsApp = `*DALU Comunicaciones SAC*%0A%0A*Nuevo contacto desde sitio web*%0A%0A*Cliente:* ${nombre}%0A*Email:* ${email}%0A*Servicio:* ${servicio}%0A*Consulta:* ${mensaje}%0A%0A*Fecha:* ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE')}`;

        // Número de WhatsApp (con código de Perú +51)
        const numeroWhatsApp = '51916325859';

        // Crear URL de WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;

        // Abrir WhatsApp en nueva ventana
        window.open(urlWhatsApp, '_blank');

        // Mostrar notificación de éxito
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
        }, 4000);

        // Resetear formulario
        formularioContacto.reset();
    });
});

