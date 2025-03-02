//Mettre le code JavaScript lié à la page photographer.html
import "../../css/photographer.css";
import { getPhotographers } from "./home.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import { renderGallery } from "../templates/gallery.js";

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

function handleKeyboardNavigation(event, details) {
    const visibleOptions = [
        ...document.querySelectorAll(".options li:not(.hidden)"),
    ];
    const currentIndex = visibleOptions.findIndex(
        (opt) => opt === document.activeElement
    );

    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (currentIndex < visibleOptions.length - 1) {
            visibleOptions[currentIndex + 1].focus();
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (currentIndex > 0) {
            visibleOptions[currentIndex - 1].focus();
        }
    } else if (event.key === "Enter") {
        event.preventDefault();
        if (currentIndex !== -1) {
            visibleOptions[currentIndex].click();
        }
    } else if (event.key === "Escape") {
        details.removeAttribute("open");
    }
}

function handleOptionClick(
    option,
    summary,
    details,
    sortedMedia,
    photographerMedia,
    photographerProfils
) {
    option.setAttribute("tabindex", "0");
    option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-value");
        const selectedText = option.textContent;

        const currentlySelected = document.querySelector(".options li.hidden");
        if (currentlySelected) {
            currentlySelected.classList.remove("hidden");
        }

        summary.textContent = selectedText;
        summary.setAttribute("data-value", selectedValue);

        option.classList.add("hidden");
        details.removeAttribute("open");

        if (selectedValue === "popularity") {
            sortedMedia = photographerMedia.sort((a, b) => b.likes - a.likes);
        } else if (selectedValue === "date") {
            sortedMedia = photographerMedia.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
        } else if (selectedValue === "title") {
            sortedMedia = photographerMedia.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }
        renderGallery(sortedMedia, photographerMedia, photographerProfils);
        updateBorders();
    });
}

function updateBorders() {
    const visibleOptions = [
        ...document.querySelectorAll(".options li:not(.hidden)"),
    ];

    visibleOptions.forEach((option) => {
        option.style.borderTop = "none";
        option.style.borderBottom = "none";
    });

    if (visibleOptions.length > 0) {
        visibleOptions[0].style.borderTop = "1px solid white";
        visibleOptions[0].style.borderBottom = "1px solid white";
    }
}

initPhotographerDetails();
