

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. INICIALIZAR ICONOS
    // =====================================

    function actualizarIconos() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    actualizarIconos();


    // =====================================
    // 2. MENÚ DE NAVEGACIÓN
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const menuAbierto = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", menuAbierto);
            menuToggle.setAttribute(
                "aria-label",
                menuAbierto ? "Cerrar menú" : "Abrir menú"
            );

            menuToggle.innerHTML = menuAbierto
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            actualizarIconos();
        });

        // Cerrar menú al seleccionar una sección
        navLinks.querySelectorAll("a").forEach(enlace => {

            enlace.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");

                menuToggle.innerHTML = '<i data-lucide="menu"></i>';

                actualizarIconos();
            });

        });

        // Cerrar menú al pulsar fuera
        document.addEventListener("click", (evento) => {

            const clicDentroMenu = navLinks.contains(evento.target);
            const clicEnBoton = menuToggle.contains(evento.target);

            if (!clicDentroMenu && !clicEnBoton) {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");

                menuToggle.innerHTML = '<i data-lucide="menu"></i>';

                actualizarIconos();
            }

        });

    }


    // =====================================
    // 3. AÑO AUTOMÁTICO DEL FOOTER
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // 4. FUNCIÓN GENERAL PARA MODALES
    // =====================================

    function configurarModal(configuracion) {

        const botonAbrir = document.getElementById(configuracion.abrir);
        const modal = document.getElementById(configuracion.modal);
        const botonCerrar = document.getElementById(configuracion.cerrar);
        const botonListo = document.getElementById(configuracion.listo);

        // Comprobar que existan los elementos
        if (!botonAbrir || !modal || !botonCerrar) {
            console.warn(
                "No se encontró algún elemento del modal:",
                configuracion.modal
            );
            return;
        }

        const contenido = modal.querySelector('[role="dialog"]');

        let elementoAnterior = null;

        // ABRIR MODAL
        function abrirModal() {

            elementoAnterior = document.activeElement;

            modal.classList.add("activo");
            modal.setAttribute("aria-hidden", "false");

            document.body.classList.add("modal-abierto");

            botonCerrar.focus();

            actualizarIconos();
        }

        // CERRAR MODAL
        function cerrarModal() {

            modal.classList.remove("activo");
            modal.setAttribute("aria-hidden", "true");

            // Comprobar si todavía existe otro modal abierto
            const otroModalAbierto = document.querySelector(
                ".modal.activo"
            );

            if (!otroModalAbierto) {
                document.body.classList.remove("modal-abierto");
            }

            if (elementoAnterior) {
                elementoAnterior.focus();
            }
        }

        // Abrir ventana
        botonAbrir.addEventListener("click", abrirModal);

        // Cerrar con la X
        botonCerrar.addEventListener("click", cerrarModal);

        // Cerrar con el botón ¡Entendido!
        if (botonListo) {
            botonListo.addEventListener("click", cerrarModal);
        }

        // Cerrar al pulsar fuera del contenido
        modal.addEventListener("click", (evento) => {

            if (evento.target === modal) {
                cerrarModal();
            }

        });

        // Cerrar con Escape y controlar el enfoque
        modal.addEventListener("keydown", (evento) => {

            if (evento.key === "Escape") {
                cerrarModal();
                return;
            }

            if (evento.key === "Tab" && contenido) {

                const elementos = contenido.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );

                if (elementos.length === 0) return;

                const primero = elementos[0];
                const ultimo = elementos[elementos.length - 1];

                if (evento.shiftKey && document.activeElement === primero) {
                    evento.preventDefault();
                    ultimo.focus();

                } else if (!evento.shiftKey && document.activeElement === ultimo) {
                    evento.preventDefault();
                    primero.focus();
                }

            }

        });

    }


    // =====================================
    // 5. MODALES DE LOS CUATRO CURSOS
    // =====================================

    const modalesCursos = [

        {
            abrir: "abrir-informatica",
            modal: "modal-informatica",
            cerrar: "cerrar-informatica",
            listo: "boton-listo-informatica"
        },

        {
            abrir: "abrir-diseno",
            modal: "modal-diseno",
            cerrar: "cerrar-diseno",
            listo: "listo-diseno"
        },

        {
            abrir: "abrir-ofimatica",
            modal: "modal-ofimatica",
            cerrar: "cerrar-ofimatica",
            listo: "listo-ofimatica"
        },

        {
            abrir: "abrir-web",
            modal: "modal-web",
            cerrar: "cerrar-web",
            listo: "listo-web"
        }

    ];

    modalesCursos.forEach(configuracion => {
        configurarModal(configuracion);
    });


    // =====================================
    // 6. MODALES DE LOS BENEFICIOS
    // =====================================

    const modalesBeneficios = [

        {
            abrir: "abrir-facil",
            modal: "modal-facil",
            cerrar: "cerrar-facil",
            listo: "listo-facil"
        },

        {
            abrir: "abrir-practico",
            modal: "modal-practico",
            cerrar: "cerrar-practico",
            listo: "listo-practico"
        },

        {
            abrir: "abrir-ritmo",
            modal: "modal-ritmo",
            cerrar: "cerrar-ritmo",
            listo: "listo-ritmo"
        }

    ];

    modalesBeneficios.forEach(configuracion => {
        configurarModal(configuracion);
    });


    // =====================================
    // 7. MODAL DE CONTACTO
    // =====================================

    configurarModal({

        abrir: "abrir-contacto",
        modal: "modal-contacto",
        cerrar: "cerrar-contacto",
        listo: "listo-contacto"

    });


    // =====================================
    // 8. FINALIZAR INICIALIZACIÓN
    // =====================================

    actualizarIconos();

    console.log("TecnoClick se ha iniciado correctamente.");

});
