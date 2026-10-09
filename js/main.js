
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