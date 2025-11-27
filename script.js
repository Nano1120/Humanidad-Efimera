document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btn-empezar");
    const paginaTitulo = document.getElementById("historia");
    const tituloPrincipal = document.getElementById("titulo-humanidad");

    if (!paginaTitulo) return;

    /* =====================
          MÚSICA DE FONDO
    ====================== */
    const music = new Audio("assets/music.mp3");
    music.loop = true;
    music.volume = 1.0;

    // Reproduce la música en el PRIMER clic en cualquier parte
    document.addEventListener("click", () => {
        if (music.paused) {
            music.play().catch(e => console.log("Autoplay bloqueado:", e));
        }
    }, { once: true });



    /* =====================
       FUNCIÓN: IR AL TÍTULO
    ====================== */
    function irATitulo() {

        document.body.classList.add("fade-out");

        setTimeout(() => {
            document.body.classList.remove("no-scroll");

            paginaTitulo.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            setTimeout(() => {
                document.body.classList.remove("fade-out");
            }, 600);

        }, 250);
    }



    /* ========== BOTÓN ========== */
    if (btn) {
        btn.addEventListener("click", () => {
            requestAnimationFrame(() => irATitulo());
        });
    }



    /* ========== TÍTULO CLICABLE ========== */
    if (tituloPrincipal) {
        tituloPrincipal.style.cursor = "pointer";

        tituloPrincipal.addEventListener("click", () => {
            requestAnimationFrame(() => irATitulo());
        });
    }

});
