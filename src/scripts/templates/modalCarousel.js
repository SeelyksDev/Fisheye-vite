// Fonction qui crée un carrousel dans une modal pour afficher les médias travaux du photographe
export function modalCarouselTemplate(media, details, id) {
    const numberID = Number(id);
    let allMedias = [];

    // Stocke les images et vidéos avec leur titre et ID
    media.forEach((el) => {
        if (el.image) {
            allMedias.push({ image: el.image, title: el.title, id: el.id });
        } else if (el.video) {
            allMedias.push({ video: el.video, title: el.title, id: el.id });
        }
    });

    let currentIndex = allMedias.findIndex((el) => el.id === numberID);
    let lastFocusedElement;

    // Affiche le média précédent dans le carrousel
    function previousMedia() {
        currentIndex =
            currentIndex === 0 ? allMedias.length - 1 : currentIndex - 1;
        updateMedia();
    }

    // Affiche le média suivant dans le carrousel
    function nextMedia() {
        currentIndex =
            currentIndex + 1 === allMedias.length ? 0 : currentIndex + 1;
        updateMedia();
    }

    // Gère l'événement du clic et du clavier pour la flèche gauche
    function setupArrowLeft() {
        const arrowLeft = document.querySelector(".lightbox-arrow-left");
        arrowLeft.addEventListener("click", previousMedia);
        arrowLeft.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                previousMedia();
            }
        });
    }

    // Gère l'événement du clic et du clavier pour la flèche droite
    function setupArrowRight() {
        const arrowRight = document.querySelector(".lightbox-arrow-right");
        arrowRight.addEventListener("click", nextMedia);
        arrowRight.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                nextMedia();
            }
        });
    }

    // Ferme le carrousel et rétablit l'accessibilité du reste de la page
    function closeCarousel() {
        document.body.style.overflow = "auto";
        const carouselModal = document.querySelector(".carousel-modal");
        const headerPhotograph = document.querySelector(".header-photograph");
        const main = document.getElementById("main");
        const pricePerDay = document.querySelector(".price-per-day");
        const likesCounter = document.querySelector(".likes-stats");

        carouselModal.style.display = "none";
        carouselModal.innerHTML = "";
        carouselModal.setAttribute("aria-hidden", "true");

        headerPhotograph.setAttribute("aria-hidden", "false");
        headerPhotograph.removeAttribute("inert");
        main.setAttribute("aria-hidden", "false");
        main.removeAttribute("inert");
        pricePerDay.setAttribute("aria-hidden", "false");
        likesCounter.setAttribute("aria-hidden", "false");
        pricePerDay.removeAttribute("inert");
        likesCounter.removeAttribute("inert");

        window.removeEventListener("keydown", handleKeyDown);
        const lightboxCross = document.querySelector(".lightbox-cross");
        if (lightboxCross) {
            lightboxCross.removeEventListener("keydown", handleEnterPress);
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    // Gère la fermeture du carrousel avec la touche "Entrée"
    function handleEnterPress(event) {
        if (event.key === "Enter") {
            closeCarousel();
        }
    }

    // Gère la navigation dans le carrousel avec le clavier
    function handleKeyDown(event) {
        if (event.key === "Escape") {
            closeCarousel();
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            previousMedia();
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            nextMedia();
        }
    }

    // Affiche et initialise le carrousel modal et désactive l'interaction avec le reste de la page
    function getCarouselDOM() {
        lastFocusedElement = document.activeElement;
        const carouselModal = document.querySelector(".carousel-modal");
        const headerPhotograph = document.querySelector(".header-photograph");
        const main = document.getElementById("main");
        const pricePerDay = document.querySelector(".price-per-day");
        const likesCounter = document.querySelector(".likes-stats");

        carouselModal.setAttribute("aria-hidden", "false");
        window.scrollTo({ top: 0 });
        carouselModal.style.display = "block";
        document.body.style.overflow = "hidden";

        carouselModal.innerHTML = `
            <div class="lightbox">
                <div class="arrow-image">
                    <img class="lightbox-cross" tabIndex="0" src="./assets/icons/red-cross.svg" alt="" aria-label="Bouton pour fermer le carrousel" />
                    <img class="lightbox-arrow-left lightbox-arrow" tabIndex="0" src="./assets/icons/red-arrow-left.svg" alt="" aria-label="Média précédant" />
                    <div class="media-title"></div>
                    <img class="lightbox-arrow-right lightbox-arrow" tabIndex="0" src="./assets/icons/red-right-arrow.svg" alt="" aria-label="Média suivant" />
                </div>
            </div>
        `;

        document.querySelector(".lightbox-cross").focus();
        headerPhotograph.setAttribute("aria-hidden", "true");
        headerPhotograph.setAttribute("inert", "");
        main.setAttribute("aria-hidden", "true");
        main.setAttribute("inert", "");
        pricePerDay.setAttribute("aria-hidden", "true");
        likesCounter.setAttribute("aria-hidden", "true");
        pricePerDay.setAttribute("inert", "");
        likesCounter.setAttribute("inert", "");

        setupArrowLeft();
        setupArrowRight();

        const lightboxCross = document.querySelector(".lightbox-cross");
        lightboxCross.addEventListener("click", closeCarousel);
        lightboxCross.addEventListener("keydown", handleEnterPress);
        window.addEventListener("keydown", handleKeyDown);

        updateMedia();
    }

    // Met à jour l'affichage du média en cours dans le carrousel
    function updateMedia() {
        const mediaContainer = document.querySelector(".media-title");
        if (!mediaContainer) return;

        mediaContainer.innerHTML = `
            ${
                allMedias[currentIndex].image
                    ? `<img class="lightbox-media" src="assets/images/${details.name}/${allMedias[currentIndex].image}" alt="${allMedias[currentIndex].title}" tabIndex=0 />`
                    : ""
            }
            ${
                allMedias[currentIndex].video
                    ? `<video controls class="lightbox-media" aria-label="${allMedias[currentIndex].title}"><source src="assets/images/${details.name}/${allMedias[currentIndex].video}" type="video/mp4"/></video>`
                    : ""
            }
            <h4 class="lightbox-title" tabIndex=0>${
                allMedias[currentIndex].title
            }</h4>
        `;
    }

    return { getCarouselDOM };
}
