export function modalCarouselTemplate(media, details, id) {
    const numberID = Number(id);
    let allMedias = [];
    media.forEach((el) => {
        if (el.image) {
            allMedias.push({
                image: el.image,
                title: el.title,
                id: el.id,
            });
        } else if (el.video) {
            allMedias.push({
                video: el.video,
                title: el.title,
                id: el.id,
            });
        }
    });

    let currentIndex;
    const getIndexSelected = (el) => el.id === numberID;
    currentIndex = allMedias.findIndex(getIndexSelected);

    function getCarouselDOM() {
        const carouselModal = document.querySelector(".carousel-modal");
        const headerPhotograph = document.querySelector(".header-photograph");
        const main = document.getElementById("main");
        window.scrollTo({ top: 0 });
        carouselModal.style.display = "block";
        document.body.style.overflow = "hidden";
        carouselModal.innerHTML = `
            <div class="lightbox">
                <div class="arrow-image">
                    <img class="lightbox-cross" tabIndex="0" src="/assets/icons/red-cross.svg" alt="icone d'une croix" />
                    <img class="lightbox-arrow-left lightbox-arrow" tabIndex="0" src="/assets/icons/red-arrow-left.svg" alt="flèche vers la gauche" />
                    <div class="media-title">
                    ${
                        allMedias[currentIndex].image
                            ? `<img class="lightbox-media" src="assets/images/${details.name}/${allMedias[currentIndex].image}" alt="${allMedias[currentIndex].title}" />`
                            : ""
                    }
                    ${
                        allMedias[currentIndex].video
                            ? `<video controls class="lightbox-media">>
                       <source src="assets/images/${details.name}/${allMedias[currentIndex].video}" type="video/mp4"/>
                       </video>`
                            : ""
                    }
                        <h4 class="lightbox-title">${
                            allMedias[currentIndex].title
                        }</h4>
                    </div>
                    <img class="lightbox-arrow-right lightbox-arrow" tabIndex="0" src="/assets/icons/red-right-arrow.svg" alt="" />
                </div>
            </div>
        `;

        headerPhotograph.setAttribute("aria-hidden", "true");
        headerPhotograph.setAttribute("inert", "");
        main.setAttribute("aria-hidden", "true");
        main.setAttribute("inert", "");

        function previousMedia() {
            if (currentIndex === 0) {
                currentIndex = allMedias.length - 1;
            } else {
                currentIndex--;
            }
            getCarouselDOM();
        }

        function nextMedia() {
            if (currentIndex + 1 === allMedias.length) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            getCarouselDOM();
        }

        const arrowLeft = document.querySelector(".lightbox-arrow-left");
        arrowLeft.addEventListener("click", previousMedia);
        arrowLeft.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                previousMedia();
            }
        });

        const arrowRight = document.querySelector(".lightbox-arrow-right");
        arrowRight.addEventListener("click", nextMedia);
        arrowRight.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                nextMedia();
            }
        });

        function closeCarousel() {
            document.body.style.overflow = "auto";
            carouselModal.style.display = "none";
            carouselModal.innerHTML = "";
            headerPhotograph.removeAttribute("aria-hidden");
            headerPhotograph.removeAttribute("inert");
            main.removeAttribute("aria-hidden");
            main.removeAttribute("inert");
            window.removeEventListener("keydown", handleKeyDownEscape);
            lightboxCross.removeEventListener("keydown", handleEnterPress);
        }

        function handleEnterPress(event) {
            if (event.key === "Enter") {
                closeCarousel();
            }
        }

        const lightboxCross = document.querySelector(".lightbox-cross");
        lightboxCross.addEventListener("keydown", handleEnterPress);
        lightboxCross.addEventListener("click", closeCarousel);

        function handleKeyDownEscape(event) {
            if (event.key === "Escape") {
                closeCarousel();
            }
        }

        window.addEventListener("keydown", handleKeyDownEscape);
    }

    return { getCarouselDOM };
}
