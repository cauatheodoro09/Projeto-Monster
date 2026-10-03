// ==========================================
// MONSTER FLAVORS
// FILTROS + PESQUISA + MENU MOBILE + LOGO + BOTÃO MAIS
// ==========================================


// ==============================
// MENU MOBILE
// ==============================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });

}


// ==============================
// ELEMENTOS
// ==============================

const filters = document.querySelectorAll(".filter");

const cards = document.querySelectorAll(".flavor-card");

const searchInput = document.getElementById("searchInput");

const noResults = document.getElementById("noResults");

const filterLogo = document.getElementById("filterLogo");


// Categoria selecionada
let categoriaAtual = "all";


// ==============================
// BOTÃO MAIS / MENOS NOS CARDS
// ==============================

document.querySelectorAll(".more-btn").forEach(botao => {

    botao.addEventListener("click", () => {

        // Procura o texto dentro do mesmo card
        const texto = botao.parentElement.querySelector(".card-desc");

        if (!texto) {
            console.error("Não achei o <p class=\"card-desc\"> neste card.");
            return;
        }

        const aberto = texto.classList.toggle("expanded");

        botao.setAttribute("aria-expanded", aberto);

        botao.textContent = aberto ? "MENOS" : "MAIS";

    });

});


// ==============================
// LOGOS POR CATEGORIA
// ==============================

const logoPadrao = {
    src: "img/logo.png",
    alt: "Logo Monster Energy"
};

const logos = {
    juice: {
        src: "img/logo-dragon-tea.png",   // <- troque pelo nome real do arquivo
        alt: "Logo Dragon Tea"
    }
};

function atualizarLogo() {

    if (!filterLogo) return;

    const logo = logos[categoriaAtual] || logoPadrao;

    filterLogo.onerror = () => {

        console.error("Logo não encontrada:", logo.src);

        // Evita loop infinito se a logo padrão também falhar
        filterLogo.onerror = null;

        filterLogo.src = logoPadrao.src;
        filterLogo.alt = logoPadrao.alt;

    };

    filterLogo.src = logo.src;
    filterLogo.alt = logo.alt;

}


// ==============================
// FILTRAR PRODUTOS
// ==============================

function filtrarProdutos() {

    const pesquisa = searchInput.value
        .toLowerCase()
        .trim();


    let encontrados = 0;


    cards.forEach(card => {

        // Um card pode ter várias categorias separadas por espaço
        const categorias =
            card.dataset.category.split(" ");

        const nome =
            card.dataset.name.toLowerCase();


        // Verifica categoria

        const categoriaCorreta =
            categoriaAtual === "all" ||
            categorias.includes(categoriaAtual);


        // Verifica pesquisa

        const pesquisaCorreta =
            nome.includes(pesquisa);


        // Mostra ou esconde

        if (
            categoriaCorreta &&
            pesquisaCorreta
        ) {

            card.style.display = "";

            encontrados++;

        } else {

            card.style.display = "none";

        }

    });


    // ==============================
    // SEM RESULTADOS
    // ==============================

    if (encontrados === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// ==============================
// BOTÕES DE FILTRO
// ==============================

filters.forEach(filter => {

    filter.addEventListener("click", () => {


        // Remove active

        filters.forEach(item => {

            item.classList.remove("active");

        });


        // Adiciona active

        filter.classList.add("active");


        // Pega categoria

        categoriaAtual =
            filter.dataset.category;


        // Atualiza logo e cards

        atualizarLogo();

        filtrarProdutos();

    });

});


// ==============================
// PESQUISA
// ==============================

searchInput.addEventListener("input", () => {

    filtrarProdutos();

});


// ==============================
// ENTER NA BUSCA
// ==============================

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        event.preventDefault();

        filtrarProdutos();

    }

});


// ==============================
// INICIALIZAÇÃO
// ==============================

atualizarLogo();

filtrarProdutos();