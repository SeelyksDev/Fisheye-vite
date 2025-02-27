export function photographerHomeTemplate(photographer) {
    function getPhotographerPreviewDOM() {
        const article = document.createElement("article");
        article.innerHTML = `
            <a href="./photographer.html?id=${photographer.id}">
                <img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}" />
                <h2>${photographer.name}</h2>
                <p class="overview-location">${photographer.city}, ${photographer.country}</p>
                <p class="overview-description">${photographer.tagline}</p>
                <p class="overview-price">${photographer.price}€/jour</p>
            </a>
        `;
        return article;
    }

    return { getPhotographerPreviewDOM };
}