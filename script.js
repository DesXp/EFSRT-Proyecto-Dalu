
document.addEventListener('DOMContentLoaded', () => {
    const btnMenuMovil = document.getElementById('btn-menu-movil');
    const menuMovil = document.getElementById('menu-movil');
    if (btnMenuMovil && menuMovil) {
        btnMenuMovil.addEventListener('click', () => {
            menuMovil.classList.toggle('abierto');
        });
        document.querySelectorAll('#menu-movil a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                menuMovil.classList.remove('abierto');
            });
        });
    }

    const encabezado = document.getElementById('encabezado');
    if (encabezado) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                encabezado.classList.add('con-scroll');
            } else {
                encabezado.classList.remove('con-scroll');
            }
        });
    }

    const elementosAnimados = document.querySelectorAll('.animar-al-revelar');
    if (elementosAnimados.length > 0) {
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
    }

    const secciones = document.querySelectorAll('section[id]');
    const enlacesNav = document.querySelectorAll('.navegacion-escritorio a, #menu-movil a');
    if (secciones.length > 0 && enlacesNav.length > 0) {
        const actualizarNavActiva = () => {
            const scrollY = window.scrollY + 100;

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
        };
        window.addEventListener('scroll', actualizarNavActiva);
        actualizarNavActiva();
    }

    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    const itemsGaleria = document.querySelectorAll('.galeria-item');
    const galeriaGrid = document.querySelector('.galeria-grid');
    if (botonesFiltro.length > 0 && itemsGaleria.length > 0 && galeriaGrid) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesFiltro.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');

                const filtro = boton.getAttribute('data-filter');
                itemsGaleria.forEach(item => {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.classList.remove('visible');
                });

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
    }

    const formularioContacto = document.getElementById('formulario-contacto');
    const notificacion = document.getElementById('notificacion');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const servicioSelect = document.getElementById('servicio-interes');
            const servicio = servicioSelect.options[servicioSelect.selectedIndex].text;
            const mensaje = document.getElementById('mensaje').value;
            const numeroWhatsApp = '51968832779';
            const mensajeWhatsApp = `*Nuevo contacto desde el sitio web*
            *Cliente:* ${nombre}
            *Email:* ${email}
            *Servicio de Interés:* ${servicio}

            *Consulta:*
            ${mensaje}`;
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
            window.open(urlWhatsApp, '_blank');
            if (notificacion) {
                notificacion.classList.add('visible');
                setTimeout(() => {
                    notificacion.classList.remove('visible');
                }, 4000);
            }
            formularioContacto.reset();
        });
    }
});
