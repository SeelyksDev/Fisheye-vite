export function PhotographerFactory(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;

    // Méthode pour génerer les cards de la homepage
    function getPhotographerPreviewDOM() {
        const article = document.createElement("article");
        article.innerHTML = `
            <a href="./photographer.html?id=${this.id}" aria-label="Profil de ${this.name}">
                <img src="assets/photographers/${this.portrait}" alt="Photo de ${this.name}" tabIndex=0 />
                <h2 tabIndex=0>${this.name}</h2>
                <p class="overview-location" tabIndex=0>${this.city}, ${this.country}</p>
                <p class="overview-description" tabIndex=0>${this.tagline}</p>
                <p class="overview-price" tabIndex=0 aria-label="${this.price} euros par jour">${this.price}€/jour</p>
            </a>
        `;
        return article;
    }

    // Méthode pour générer les informations du photographe dans la page individuelle d'un photographe
    function getPhotographerProfilDOM() {
        const template = `
                <div class="photograph-header-informations" tabIndex=0>
                    <h1 class="photograph-name" aria-label="${this.name}.">${
            this.name
        }</h1>
                    <address class="photograph-location">
                        <p class="photograph-city" aria-label="${this.city}.">${
            this.city
        },</p>
                        <p class="photograph-country" aria-label="${
                            this.country
                        }.">${this.country}</p>
                    </address>
                    <p class="photograph-description" aria-label="${
                        this.tagline
                    }.">${this.tagline}</p>
                </div>
                <button class="contact_button" aria-haspopup="dialog" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
                <img class="photograph-img" src="./assets/photographers/${
                    this.portrait ? this.portrait : "account.png"
                }" alt="Photo de profil de ${this.name}" tabIndex=0></img>
            `;

        const pricePerDay = document.querySelector(".price-per-day");
        pricePerDay.innerHTML = `<p class="price" tabIndex=0 aria-label="Son tarif est de ${this.price}€ par jour">${this.price}€ / jour</p>`;

        return template;
    }

    return {
        id: this.id,
        name: this.name,
        city: this.city,
        country: this.country,
        tagline: this.tagline,
        price: this.price,
        portrait: this.portrait,
        getPhotographerPreviewDOM,
        getPhotographerProfilDOM,
    };
}
