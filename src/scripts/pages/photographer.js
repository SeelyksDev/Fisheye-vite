//Mettre le code JavaScript lié à la page photographer.html
import "../../css/photographer.css";
import { getPhotographers } from './home.js'
import { photographerTemplate } from '../templates/photographer.js';
import { galleryTemplate, numberOfLikes } from '../templates/gallery.js';
import { modalCarouselTemplate } from '../templates/modalCarousel.js';


export async function getPhotographerById(id) {
    const data = await getPhotographers();
    const dataDetails = data.photographers;
    const dataMedias = data.media;

    const photographerDetails = dataDetails.find(
        (photographer) => photographer.id === id
    );
    const photographerMedia = dataMedias.filter(
        (media) => media.photographerId === id
    );

    return { photographerDetails, photographerMedia };
}

async function displayPhotographerDetails(id) {
    if (id) {
        const { photographerDetails } = await getPhotographerById(id);

        if (photographerDetails) {
            const photographer = photographerTemplate(photographerDetails);
            return photographer.getDetailsDOM();
        }
    }
}

async function displayGalleryWorks(id) {
    if (id) {
        const { photographerMedia, photographerDetails } =
            await getPhotographerById(id);

        if (photographerMedia && photographerDetails) {
            const select = document.getElementById("select");

            function renderGallery(media) {
                const workGallery = document.querySelector(".work-gallery");
                workGallery.innerHTML = "";
                media.forEach((photographMedia) => {
                    const galleryModel = galleryTemplate(
                        photographMedia,
                        photographerDetails
                    );
                    galleryModel.getGalleryDOM();
                });
                const workCards = document.querySelectorAll(".work-card");
                workCards.forEach((workCard) => {
                    workCard.addEventListener("click", () => {
                        const id = workCard.dataset.id;
                        const carousel = modalCarouselTemplate(
                            photographerMedia,
                            photographerDetails,
                            id
                        );
                        carousel.getCarouselDOM();
                    });
                });
            }

            let sortedMedia = photographerMedia.sort(
                (a, b) => b.likes - a.likes
            );
            renderGallery(sortedMedia);

            select.addEventListener("change", (e) => {
                if (e.target.value === "popularity") {
                    sortedMedia = photographerMedia.sort(
                        (a, b) => b.likes - a.likes
                    );
                } else if (e.target.value === "date") {
                    sortedMedia = photographerMedia.sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                    );
                } else if (e.target.value === "title") {
                    sortedMedia = photographerMedia.sort((a, b) =>
                        a.title.localeCompare(b.title)
                    );
                }
                renderGallery(sortedMedia);
            });
        }
    }
}

function initPhotographerDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    const toNumberId = Number(photographerId);

    if (toNumberId) {
        displayPhotographerDetails(toNumberId);
        displayGalleryWorks(toNumberId);
    }
}

initPhotographerDetails();
