//Mettre le code JavaScript lié à la page photographer.html
import "../../css/photographer.css";
import { getPhotographers } from "./home.js";
import { PhotographerFactory } from "../factories/photographerFactory.js"
import { renderGallery } from "../utils/renderGallery.js";
import { updateBorders } from "../utils/updateBorders.js";
import { handleKeyboardNavigation } from "../utils/handleKeyboardNavigation.js";
import { handleOptionClick } from "../utils/handleOptionClick.js";

export async function getPhotographerById(id) {
    const data = await getPhotographers();
    const dataProfils = data.photographers;
    const dataMedias = data.media;

    const photographerProfils = dataProfils.find(
        (photographer) => photographer.id === id
    );

    const photographerMedia = dataMedias.filter(
        (media) => media.photographerId === id
    );

    return { photographerProfils, photographerMedia };
}

async function displayPhotographerDetails(id) {
    if (id) {
        const { photographerProfils } = await getPhotographerById(id);

        if (photographerProfils) {
            const photographerProfilTemplate = new PhotographerFactory(
                photographerProfils
            );

            return photographerProfilTemplate.getPhotographerProfilDOM();
        }
    }
}

async function displayGalleryWorks(id) {
    if (id) {
        const { photographerMedia, photographerProfils } =
            await getPhotographerById(id);

        if (photographerMedia && photographerProfils) {
            const details = document.querySelector(".custom-select");
            const summary = details.querySelector(".select-title");
            const options = details.querySelectorAll(".options li");

            details.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    details.open = !details.open;

                    if (details.open) {
                        setTimeout(() => {
                            const firstVisibleOption = document.querySelector(
                                ".options li:not(.hidden)"
                            );
                            if (firstVisibleOption) {
                                firstVisibleOption.focus();
                            }
                        }, 50);
                    }
                }
            });

            let sortedMedia = photographerMedia.sort(
                (a, b) => b.likes - a.likes
            );
            renderGallery(sortedMedia, photographerMedia, photographerProfils);

            const defaultSelected = options[0];
            defaultSelected.classList.add("hidden");

            options.forEach((option) => {
                handleOptionClick(
                    option,
                    summary,
                    details,
                    sortedMedia,
                    photographerMedia,
                    photographerProfils
                );
            });
            details.addEventListener("keydown", (event) =>
                handleKeyboardNavigation(event, details)
            );
            updateBorders();
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
