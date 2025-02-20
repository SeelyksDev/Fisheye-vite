//Mettre le code JavaScript lié à la page photographer.html
import "../../css/photographer.css";
import { getPhotographers } from "./home.js";
import { photographerTemplate } from "../templates/photographer.js";
import { galleryTemplate, resetNumberOfLikes } from "../templates/gallery.js";
import { modalCarouselTemplate } from "../templates/modalCarousel.js";

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
            function renderGallery(media) {
                const workGallery = document.querySelector(".work-gallery");
                workGallery.innerHTML = "";

                resetNumberOfLikes();

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
                    workCard.addEventListener("keydown", (event) => {
                        const id = workCard.dataset.id;
                        const carousel = modalCarouselTemplate(
                            photographerMedia,
                            photographerDetails,
                            id
                        );
                        if (event.key === "Enter") {
                            carousel.getCarouselDOM();
                        }
                    });
                });
            }

            function updateBorders() {
                const visibleOptions = [...document.querySelectorAll(".options li:not(.hidden)")];

                visibleOptions.forEach(option => {
                    option.style.borderTop = "none";
                    option.style.borderBottom = "none";
                });

                if (visibleOptions.length > 0) {
                    visibleOptions[0].style.borderTop = "1px solid white";
                    visibleOptions[0].style.borderBottom = "1px solid white";
                }
            }

            function handleKeyboardNavigation(event) {
                const visibleOptions = [...document.querySelectorAll(".options li:not(.hidden)")];
                const currentIndex = visibleOptions.findIndex(opt => opt === document.activeElement);
            
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

            

            const details = document.querySelector(".custom-select");
            const summary = details.querySelector(".select-title");
            const options = details.querySelectorAll(".options li");

            details.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    details.open = !details.open; 
                    
                    if (details.open) {
                        setTimeout(() => {
                            const firstVisibleOption = document.querySelector(".options li:not(.hidden)");
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
            renderGallery(sortedMedia);

            const defaultSelected = options[0];
            defaultSelected.classList.add("hidden");

            options.forEach((option) => {
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
                        sortedMedia = photographerMedia.sort(
                            (a, b) => b.likes - a.likes
                        );
                    } else if (selectedValue === "date") {
                        sortedMedia = photographerMedia.sort(
                            (a, b) => new Date(b.date) - new Date(a.date)
                        );
                    } else if (selectedValue === "title") {
                        sortedMedia = photographerMedia.sort((a, b) =>
                            a.title.localeCompare(b.title)
                        );
                    }

                    renderGallery(sortedMedia);
                    updateBorders();
                });
            });
            details.addEventListener("keydown", handleKeyboardNavigation);
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
