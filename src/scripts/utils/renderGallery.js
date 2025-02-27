import { resetNumberOfLikes, galleryTemplate } from "../templates/gallery";
import { modalCarouselTemplate } from "../templates/modalCarousel";

export function renderGallery(media, photographerMedia, photographerProfils) {
    const workGallery = document.querySelector(".work-gallery");
    workGallery.innerHTML = "";

    resetNumberOfLikes();

    media.forEach((photographMedia) => {
        const galleryModel = galleryTemplate(
            photographMedia,
            photographerProfils
        );
        galleryModel.getGalleryDOM();
    });

    const workCards = document.querySelectorAll(".work-card");
    workCards.forEach((workCard) => {
        workCard.addEventListener("click", () => {
            const id = workCard.dataset.id;
            const carousel = modalCarouselTemplate(
                photographerMedia,
                photographerProfils,
                id
            );
            carousel.getCarouselDOM();
        });
        workCard.addEventListener("keydown", (event) => {
            const id = workCard.dataset.id;
            const carousel = modalCarouselTemplate(
                photographerMedia,
                photographerProfils,
                id
            );
            if (event.key === "Enter") {
                carousel.getCarouselDOM();
            }
        });
    });
}