export let numberOfLikes = 0;
let isLiked = false;
let like = 0
export function galleryTemplate(media, details) {
    function getGalleryDOM() {
        like += media.likes
        numberOfLikes += Number(media.likes);
        const likesCounter = document.querySelector(".likes-stats");
        const workGallery = document.querySelector(".work-gallery");
        workGallery.innerHTML += `
                <article class="work-card" data-title="${
                    media.title
                }" data-id="${media.id}">
                 ${
                     media.image
                         ? `<img src="assets/images/${details.name}/${media.image}" alt="${media.title}" class="card-media">`
                         : ""
                 }
                 ${
                     media.video
                         ? `<video class="card-media">>
                    <source src="assets/images/${details.name}/${media.video}" type="video/mp4"/>
                    </video>`
                         : ""
                 }
                    <div class="card-description">
                        <p class="card-title">${media.title}</p>
                        <div class="card-likes-stats">
                            <p class="number-likes">${media.likes}</p>
                            <img src="./assets/icons/red-heart.svg" alt="image d'un coeur rouge" class="card-heart">
                        </div>
                    </div>
                </article>
                `;
        likesCounter.textContent = numberOfLikes;

        const hearts = document.querySelectorAll(".card-heart");
        hearts.forEach((heart) => {
            heart.addEventListener("click", (event) => {
                event.stopPropagation();
                console.log("click heart");
                if (!isLiked) {
                    numberOfLikes++;
                    isLiked = true;
                    getGalleryDOM();
                } else if (isLiked) {
                    numberOfLikes--;
                    isLiked = false;
                }
            });
        });
    }
    console.log(like)
    return { getGalleryDOM };
}
