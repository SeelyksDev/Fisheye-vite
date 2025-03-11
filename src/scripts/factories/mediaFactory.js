import { handleLike } from "../templates/gallery";

export function MediaFactory(photographerName, media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.name = photographerName;
    this.title = media.title;
    this.image = media.image;
    this.video = media.video;
    this.likes = media.likes;
    this.isLiked = false;

    // Méthode pour ajouter des cards dans la gallerie
    function getGalleryDOM () {
        const workGallery = document.querySelector(".work-gallery");
        workGallery.setAttribute(
            "aria-label",
            `Gallerie des travaux de ${this.name}`
        );

        const card = document.createElement("article");
        card.classList.add("work-card");
        card.setAttribute("data-id", this.id);
        card.setAttribute("data-title", this.title);
        card.setAttribute("tabIndex", "0");
        card.setAttribute("aria-describedby", "info-carousel");

        card.innerHTML = `
            ${
                this.image
                    ? `<img src="assets/images/${this.name}/${this.image}" alt="${this.image}" class="card-media">`
                    : ""
            }
            ${
                this.video
                    ? `
                <video class="card-media">
                    <source src="assets/images/${this.name}/${this.video}" type="video/mp4" />
                </video>`
                    : ""
            }
            <div class="card-description">
                <p class="card-title">${this.title}</p>
                <div class="card-likes-stats">
                    <p class="number-likes" aria-label="${this.likes} likes">${
            this.likes
        }</p>
                    <img src="./assets/icons/red-heart.svg" alt="image d'un coeur rouge" aria-label="Bouton pour ajouter un 'j'aime' à cette photo" class="card-heart" tabIndex=0>
                </div>
            </div>
            <span id="info-carousel" hidden>Ouvre une modale contenant un carrousel.</span>
        `;

        // Gestion des likes 
        handleLike(card, media, this.isLiked, photographerName);
        
        return card
    };

    return {
        id: this.id,
        photographerId: this.photographerId,
        name: this.name,
        title: this.title,
        image: this.image,
        video: this.video,
        likes: this.likes,
        isLiked: this.isLiked,
        getGalleryDOM
    };
}
