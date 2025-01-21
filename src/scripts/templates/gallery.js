let numberOfLikes = 0;

export function resetNumberOfLikes() {
    numberOfLikes = 0;
}

export function galleryTemplate(media, details) {
    numberOfLikes += media.likes;

    function getGalleryDOM() {
        const workGallery = document.querySelector(".work-gallery");

        const card = document.createElement("article");
        card.classList.add("work-card");
        card.setAttribute("data-id", media.id);
        card.setAttribute("data-title", media.title);

        card.innerHTML = `
            ${media.image ? `<img src="assets/images/${details.name}/${media.image}" alt="${media.title}" class="card-media">` : ""}
            ${media.video ? `
                <video class="card-media">
                    <source src="assets/images/${details.name}/${media.video}" type="video/mp4" />
                </video>` : ""}
            <div class="card-description">
                <p class="card-title">${media.title}</p>
                <div class="card-likes-stats">
                    <p class="number-likes">${media.likes}</p>
                    <img src="./assets/icons/red-heart.svg" alt="image d'un coeur rouge" class="card-heart">
                </div>
            </div>
        `;

        workGallery.appendChild(card);

        let number = media.likes;
        let isLiked = false;
        const heart = card.querySelector(".card-heart");

        if (heart) {
            heart.addEventListener("click", (event) => {
                event.stopPropagation();
                if (!isLiked) {
                    numberOfLikes++;
                    number++;
                    isLiked = true;
                } else {
                    numberOfLikes--;
                    number--;
                    isLiked = false;
                }

                getLikesCardDOM(card, number);
                getTotalLikesDOM();
            });
        }
        getTotalLikesDOM();
    }

    function getLikesCardDOM(card, number) {
        const cardLikeElement = card.querySelector(".number-likes");
        if (cardLikeElement) {
            cardLikeElement.textContent = number;
        }
    }

    function getTotalLikesDOM() {
        const likesCounter = document.querySelector(".likes-stats");
        if (likesCounter) {
            likesCounter.textContent = numberOfLikes;
        }
    }

    return { getGalleryDOM, getTotalLikesDOM };
}