import { modalCarouselTemplate } from "../templates/modalCarousel";
import { MediaFactory } from "../factories/mediaFactory";

let numberOfLikes = 0;

// Fonction qui remet numberOfLikes (compteur) à zéro.
export function resetNumberOfLikes() {
    numberOfLikes = 0;
}

// Fonction qui génère la galerie des travaux du photographe séléctionné et gère l'affichage du carousel.
export function renderGallery(media, photographerMedia, photographerProfils) {
    const workGallery = document.querySelector(".work-gallery");
    workGallery.innerHTML = "";

    resetNumberOfLikes();

    const photographerTotalOfLikes = getTotalLikesCount(photographerMedia);
    numberOfLikes = photographerTotalOfLikes;
    getTotalLikesDOM(photographerProfils.name, numberOfLikes);

    media.forEach((photographMedia) => {
        const galleryTemplate = new MediaFactory(
            photographerProfils.name,
            photographMedia
        );
        const userCardDOM = galleryTemplate.getGalleryDOM();
        workGallery.appendChild(userCardDOM);
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

// Fonction qui gère les likes
export function handleLike(card, media, isLiked, photographerName) {
    const heart = card.querySelector(".card-heart");

    if (heart) {
        heart.setAttribute("role", "button");

        heart.addEventListener("click", (event) => {
            event.stopPropagation();
            const { newLikes, newStatus, newTotalLikes } = toggleLike(
                isLiked,
                media.likes,
                numberOfLikes
            );
            media.likes = newLikes;
            isLiked = newStatus;
            numberOfLikes = newTotalLikes;
            getLikesCardDOM(card, newLikes);
            getTotalLikesDOM(photographerName, newTotalLikes);
        });

        heart.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                const { newLikes, newStatus, newTotalLikes } = toggleLike(
                    isLiked,
                    media.likes,
                    numberOfLikes
                );
                media.likes = newLikes;
                isLiked = newStatus;
                numberOfLikes = newTotalLikes;
                getLikesCardDOM(card, newLikes);
                getTotalLikesDOM(photographerName, newTotalLikes);
            }
        });
    }
}

// Fonction qui calcule le nombre total de likes d'un photogrpahe.
function getTotalLikesCount(medias) {
    return medias.reduce((acc, currentValue) => acc + currentValue.likes, 0);
}

// Fonction qui gère l'ajout ou le retrait d'un like sur une carte
function toggleLike(isLiked, currentLikes, currentTotalLikes) {
    if (!isLiked) {
        currentLikes++;
        currentTotalLikes++;
        isLiked = true;
        document.getElementById("status-message").textContent =
            "Vous avez ajouté un 'j'aime' à cette photo";
    } else {
        currentLikes--;
        currentTotalLikes--;
        isLiked = false;
        document.getElementById("status-message").textContent =
            "Vous avez retiré votre 'j'aime'";
    }
    return {
        newLikes: currentLikes,
        newStatus: isLiked,
        newTotalLikes: currentTotalLikes,
    };
}

// Fonction qui met à jour l'affichage du compteur total de likes
function getTotalLikesDOM(photographerName, numberOfLikes) {
    const likesCounter = document.querySelector(".likes-stats");
    if (likesCounter) {
        likesCounter.textContent = numberOfLikes;
        likesCounter.setAttribute(
            "aria-label",
            `Les travaux de ${photographerName} comptabilisent ${numberOfLikes} likes au total`
        );
        likesCounter.setAttribute("tabIndex", "0");
    }
}

// Fonction qui mett à jour l'affichage du nombre de likes sur une carte.
function getLikesCardDOM(card, number) {
    const cardLikeElement = card.querySelector(".number-likes");
    if (cardLikeElement) {
        cardLikeElement.textContent = number;
    }
}
