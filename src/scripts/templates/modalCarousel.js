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
        window.scrollTo({ top: 0 });
        carouselModal.style.display = "block";
        document.body.style.overflow = "hidden";
        carouselModal.innerHTML = `
            <div class="lightbox">
                <div class="arrow-image">
                    <img class="lightbox-cross" src="/assets/icons/red-cross.svg" alt="icone d'une croix" />
                    <img class="lightbox-arrow-left lightbox-arrow" src="/assets/icons/red-arrow-left.svg" alt="flèche vers la gauche" />
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
                    <img class="lightbox-arrow-right lightbox-arrow" src="/assets/icons/red-right-arrow.svg" alt="" />
                </div>
            </div>
        `;

        const arrowLeft = document.querySelector(".lightbox-arrow-left");
        arrowLeft.addEventListener("click", () => {
            if (currentIndex === 0) {
                currentIndex = allMedias.length - 1;
            } else {
                currentIndex--;
            }
            getCarouselDOM();
        });

        const arrowRight = document.querySelector(".lightbox-arrow-right");
        arrowRight.addEventListener("click", () => {
            if (currentIndex + 1 === allMedias.length) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            getCarouselDOM();
        });

        const closeCarousel = document.querySelector(".lightbox-cross");
        closeCarousel.addEventListener("click", () => {
            document.body.style.overflow = "auto";
            carouselModal.style.display = "none";
            carouselModal.innerHTML = "";
        });
    }

    return { getCarouselDOM };
}
