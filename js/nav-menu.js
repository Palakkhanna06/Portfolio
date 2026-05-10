(() => {
    const mobileBreakpoint = window.matchMedia("(max-width: 600px)");
    const headers = document.querySelectorAll(".site-header");

    headers.forEach((header) => {
        const button = header.querySelector(".nav-toggle");
        const nav = header.querySelector("nav");

        if (!button || !nav) {
            return;
        }

        const syncMenuState = () => {
            const isMobile = mobileBreakpoint.matches;

            if (!isMobile) {
                nav.classList.remove("is-collapsed");
                button.setAttribute("aria-expanded", "true");
                return;
            }

            if (!nav.classList.contains("is-collapsed")) {
                button.setAttribute("aria-expanded", "true");
            }
        };

        button.addEventListener("click", () => {
            if (!mobileBreakpoint.matches) {
                return;
            }

            const isCollapsed = nav.classList.toggle("is-collapsed");
            button.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (!mobileBreakpoint.matches) {
                    return;
                }

                nav.classList.remove("is-collapsed");
                button.setAttribute("aria-expanded", "true");
            });
        });

        window.addEventListener("resize", syncMenuState);
        syncMenuState();
    });
})();
