
/* =========================================
   TECNOCLICK - FUNCIONES PRINCIPALES
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Activar los iconos de Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Seleccionar los elementos del menú
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    // 3. Abrir y cerrar el menú móvil
    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            // Cambiar el icono del botón
            const icon = menuToggle.querySelector("svg");

            if (icon) {
                icon.setAttribute(
                    "data-lucide",
                    isOpen ? "x" : "menu"
                );

                if (window.lucide) {
                    lucide.createIcons();
                }
            }
        });

        // Cerrar el menú al elegir una sección
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

                const icon = menuToggle.querySelector("svg");

                if (icon) {
                    icon.setAttribute("data-lucide", "menu");

                    if (window.lucide) {
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    // 4. Marcar la sección seleccionada en el menú
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navItems.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    // 5. Mostrar automáticamente el año actual
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});

/* =====================================
   MODAL: INFORMÁTICA BÁSICA
===================================== */

const abrirInformatica = document.getElementById("abrir-informatica");
const modalInformatica = document.getElementById("modal-informatica");
const cerrarInformatica = document.getElementById("cerrar-informatica");
const botonListoInformatica = document.getElementById("boton-listo-informatica");

if (
    abrirInformatica &&
    modalInformatica &&
    cerrarInformatica &&
    botonListoInformatica
) {
    function abrirModalInformatica(event) {
        if (event) event.preventDefault();

        modalInformatica.classList.add("activo");
        modalInformatica.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (window.lucide) {
            window.lucide.createIcons();
        }

        cerrarInformatica.focus();
    }

    function cerrarModalInformatica() {
        modalInformatica.classList.remove("activo");
        modalInformatica.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        abrirInformatica.focus();
    }

    abrirInformatica.addEventListener("click", abrirModalInformatica);

    cerrarInformatica.addEventListener("click", cerrarModalInformatica);

    botonListoInformatica.addEventListener("click", cerrarModalInformatica);

    // Cerrar al pulsar fuera de la ventana
    modalInformatica.addEventListener("click", function (event) {
        if (event.target === modalInformatica) {
            cerrarModalInformatica();
        }
    });

    // Cerrar al pulsar Escape
    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modalInformatica.classList.contains("activo")
        ) {
            cerrarModalInformatica();
        }
    });
}
/* =====================================
   MODALES: LOS OTROS TRES CURSOS
===================================== */

const cursosConModal = [
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

cursosConModal.forEach(function (curso) {
    const enlaceAbrir = document.getElementById(curso.abrir);
    const ventana = document.getElementById(curso.modal);
    const botonCerrar = document.getElementById(curso.cerrar);
    const botonListo = document.getElementById(curso.listo);

    // Comprobar que existan los elementos del curso
    if (!enlaceAbrir || !ventana || !botonCerrar || !botonListo) {
        return;
    }

    function abrirVentana(event) {
        event.preventDefault();

        ventana.classList.add("activo");
        ventana.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (window.lucide) {
            window.lucide.createIcons();
        }

        botonCerrar.focus();
    }

    function cerrarVentana() {
        ventana.classList.remove("activo");
        ventana.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        enlaceAbrir.focus();
    }

    enlaceAbrir.addEventListener("click", abrirVentana);
    botonCerrar.addEventListener("click", cerrarVentana);
    botonListo.addEventListener("click", cerrarVentana);

    // Cerrar cuando se hace clic fuera del contenido
    ventana.addEventListener("click", function (event) {
        if (event.target === ventana) {
            cerrarVentana();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            ventana.classList.contains("activo")
        ) {
            cerrarVentana();
        }
    });
});
