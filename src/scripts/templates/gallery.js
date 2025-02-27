import { getLikesCardDOM } from "../utils/getLikesCardDOM";

let numberOfLikes = 0;

export function resetNumberOfLikes() {
    numberOfLikes = 0;
}

export function galleryTemplate(media, details) {
    numberOfLikes += media.likes;

    function getGalleryDOM() {
        const workGallery = document.querySelector(".work-gallery");
        workGallery.setAttribute(
            "aria-label",
            `Gallerie des travaux de ${details.name}`
        );

        const card = document.createElement("article");
        card.classList.add("work-card");
        card.setAttribute("data-id", media.id);
        card.setAttribute("data-title", media.title);
        card.setAttribute("tabIndex", "0");
        card.setAttribute("aria-describedby", "info-carousel");

        card.innerHTML = `
            ${
                media.image
                    ? `<img src="assets/images/${details.name}/${media.image}" alt="" class="card-media">`
                    : ""
            }
            ${
                media.video
                    ? `
                <video class="card-media">
                    <source src="assets/images/${details.name}/${media.video}" type="video/mp4" />
                </video>`
                    : ""
            }
            <div class="card-description">
                <p class="card-title">${media.title}</p>
                <div class="card-likes-stats">
                    <p class="number-likes" aria-label="${media.likes} likes">${
            media.likes
        }</p>
                    <img src="./assets/icons/red-heart.svg" alt="image d'un coeur rouge" aria-label="Bouton pour ajouter un 'j'aime' à cette photo" class="card-heart" tabIndex=0>
                </div>
            </div>
            <span id="info-carousel" hidden>Ouvre une modale contenant un carrousel.</span>
        `;

        workGallery.appendChild(card);

        handleLike(card, media);
        getTotalLikesDOM();
    }

    function getTotalLikesDOM() {
        const likesCounter = document.querySelector(".likes-stats");
        if (likesCounter) {
            likesCounter.textContent = numberOfLikes;
            likesCounter.setAttribute(
                "aria-label",
                `Les travaux de ${details.name} comptabilisent ${numberOfLikes} likes au total`
            );
        }
    }

    function handleLike(card, media) {
        let number = media.likes;
        let isLiked = false;
        const heart = card.querySelector(".card-heart");

        if (heart) {
            heart.setAttribute("role", "button");

            heart.addEventListener("click", (event) => {
                event.stopPropagation();
                toggleLike();
            });

            heart.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleLike();
                }
            });

            function toggleLike() {
                if (!isLiked) {
                    numberOfLikes++;
                    number++;
                    isLiked = true;
                    document.getElementById("status-message").textContent =
                        "Vous avez ajouté un 'j'aime' à cette photo";
                } else {
                    numberOfLikes--;
                    number--;
                    isLiked = false;
                    document.getElementById("status-message").textContent =
                        "Vous avez retiré votre 'j'aime'";
                }
                getLikesCardDOM(card, number);
                getTotalLikesDOM();
            }
        }
    }

    return { getGalleryDOM, getTotalLikesDOM };
}
