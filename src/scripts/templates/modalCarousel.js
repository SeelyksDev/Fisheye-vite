export function modalCarouselTemplate(media, details, id) {
    const numberID = Number(id);
    let allMedias = [];
    
    media.forEach((el) => {
        if (el.image) {
            allMedias.push({ image: el.image, title: el.title, id: el.id });
        } else if (el.video) {
            allMedias.push({ video: el.video, title: el.title, id: el.id });
        }
    });

    let currentIndex = allMedias.findIndex(el => el.id === numberID);
    let lastFocusedElement;

    function previousMedia() {
        currentIndex = (currentIndex === 0) ? allMedias.length - 1 : currentIndex - 1;
        updateMedia();
    }

    function nextMedia() {
        currentIndex = (currentIndex + 1 === allMedias.length) ? 0 : currentIndex + 1;
        updateMedia();
    }

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

    function closeCarousel() {
        document.body.style.overflow = "auto";
        const carouselModal = document.querySelector(".carousel-modal");
        const headerPhotograph = document.querySelector(".header-photograph");
        const main = document.getElementById("main");

        carouselModal.style.display = "none";
        carouselModal.innerHTML = "";
        carouselModal.setAttribute('aria-hidden', "true");

        headerPhotograph.setAttribute("aria-hidden", "false");
        headerPhotograph.removeAttribute("inert");
        main.setAttribute("aria-hidden", "false");
        main.removeAttribute("inert");

        window.removeEventListener("keydown", handleKeyDown);
        const lightboxCross = document.querySelector(".lightbox-cross");
        if (lightboxCross) {
            lightboxCross.removeEventListener("keydown", handleEnterPress);
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function handleEnterPress(event) {
        if (event.key === "Enter") {
            closeCarousel();
        }
    }

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

    function getCarouselDOM() {
        lastFocusedElement = document.activeElement;
        const carouselModal = document.querySelector(".carousel-modal");
        const headerPhotograph = document.querySelector(".header-photograph");
        const main = document.getElementById("main");

        carouselModal.setAttribute('aria-hidden', "false");
        window.scrollTo({ top: 0 });
        carouselModal.style.display = "block";
        document.body.style.overflow = "hidden";
        
        carouselModal.innerHTML = `
            <div class="lightbox">
                <div class="arrow-image">
                    <img class="lightbox-cross" tabIndex="0" src="/assets/icons/red-cross.svg" alt="" aria-label="Bouton pour fermer le carrousel" />
                    <img class="lightbox-arrow-left lightbox-arrow" tabIndex="0" src="/assets/icons/red-arrow-left.svg" alt="" aria-label="Média précédant" />
                    <div class="media-title"></div>
                    <img class="lightbox-arrow-right lightbox-arrow" tabIndex="0" src="/assets/icons/red-right-arrow.svg" alt="" aria-label="Média suivant" />
                </div>
            </div>
        `;

        document.querySelector('.lightbox-cross').focus();
        headerPhotograph.setAttribute("aria-hidden", "true");
        headerPhotograph.setAttribute("inert", "");
        main.setAttribute("aria-hidden", "true");
        main.setAttribute("inert", "");

        setupArrowLeft();
        setupArrowRight();

        const lightboxCross = document.querySelector(".lightbox-cross");
        lightboxCross.addEventListener("click", closeCarousel);
        lightboxCross.addEventListener("keydown", handleEnterPress);
        window.addEventListener("keydown", handleKeyDown);

        updateMedia();
    }

    function updateMedia() {
        const mediaContainer = document.querySelector(".media-title");
        if (!mediaContainer) return;
        
        mediaContainer.innerHTML = `
            ${allMedias[currentIndex].image ? `<img class="lightbox-media" src="assets/images/${details.name}/${allMedias[currentIndex].image}" alt="${allMedias[currentIndex].title}" />` : ""}
            ${allMedias[currentIndex].video ? `<video controls class="lightbox-media"><source src="assets/images/${details.name}/${allMedias[currentIndex].video}" type="video/mp4"/></video>` : ""}
            <h4 class="lightbox-title">${allMedias[currentIndex].title}</h4>
        `;
    }

    return { getCarouselDOM };
}