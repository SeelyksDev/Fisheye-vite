import { displayModal } from "../utils/contactForm.js";

export function PhotographerFactory(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;

    // Méthode pour génerer les cards de la homepage
    this.getPhotographerPreviewDOM = () => {
        const article = document.createElement("article");
        article.innerHTML = `
            <a href="./photographer.html?id=${this.id}">
                <img src="assets/photographers/${this.portrait}" alt="Photo de ${this.name}" />
                <h2>${this.name}</h2>
                <p class="overview-location">${this.city}, ${this.country}</p>
                <p class="overview-description">${this.tagline}</p>
                <p class="overview-price">${this.price}€/jour</p>
            </a>
        `;
        return article;
    };

    // Méthode pour générer les informations du photographe dans la page individuelle d'un photographe
    this.getPhotographerProfilDOM = () => {
        const photographHeader = document.querySelector(".photograph-header");

        photographHeader.innerHTML = `
                <div class="photograph-header-informations">
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
                }" alt="Photo de ${this.name}" aria-label="Photo de ${this.name}"></img>
            `;

        const pricePerDay = document.querySelector(".price-per-day");
        pricePerDay.innerHTML = `<p class="price" aria-label="${this.price}€ par jour">${this.price}€ / jour</p>`;

        const contactButton = document.querySelector(".contact_button");
        contactButton.addEventListener("click", displayModal);
    };
}
